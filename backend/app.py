from __future__ import annotations

import sqlite3
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path
from typing import Annotated
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .catalog import PRODUCT_CATALOG

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "shop.db"


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def setup_database() -> None:
    with closing(get_connection()) as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS products (
                slug TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                price_cents INTEGER NOT NULL,
                shop_pay_url TEXT
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS checkout_intents (
                id TEXT PRIMARY KEY,
                product_slug TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                checkout_url TEXT,
                status TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY (product_slug) REFERENCES products(slug)
            )
            """
        )
        connection.executemany(
            """
            INSERT INTO products (slug, name, price_cents, shop_pay_url)
            VALUES (:slug, :name, :price_cents, :shop_pay_url)
            ON CONFLICT(slug) DO UPDATE SET
                name = excluded.name,
                price_cents = excluded.price_cents,
                shop_pay_url = COALESCE(products.shop_pay_url, excluded.shop_pay_url)
            """,
            PRODUCT_CATALOG,
        )
        connection.commit()


class CheckoutIntentPayload(BaseModel):
    slug: str
    quantity: Annotated[int, Field(ge=1, le=10)] = 1


class CheckoutIntentResponse(BaseModel):
    intent_id: str
    product_slug: str
    quantity: int
    status: str
    checkout_url: str | None = None
    message: str


app = FastAPI(title="Wanker.Bike Checkout API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    setup_database()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/products")
def list_products() -> list[dict[str, str | int | None]]:
    with closing(get_connection()) as connection:
        rows = connection.execute(
            "SELECT slug, name, price_cents, shop_pay_url FROM products ORDER BY name"
        ).fetchall()
        return [dict(row) for row in rows]


@app.post("/checkout-intents", response_model=CheckoutIntentResponse)
def create_checkout_intent(payload: CheckoutIntentPayload) -> CheckoutIntentResponse:
    with closing(get_connection()) as connection:
        product = connection.execute(
            "SELECT slug, shop_pay_url FROM products WHERE slug = ?",
            (payload.slug,),
        ).fetchone()

        if product is None:
            raise HTTPException(status_code=404, detail="Unknown product slug")

        checkout_url = product["shop_pay_url"]
        status = "ready" if checkout_url else "pending_configuration"
        intent_id = str(uuid4())
        created_at = datetime.now(timezone.utc).isoformat()

        connection.execute(
            """
            INSERT INTO checkout_intents (
                id, product_slug, quantity, checkout_url, status, created_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (intent_id, payload.slug, payload.quantity, checkout_url, status, created_at),
        )
        connection.commit()

    message = (
        "Checkout intent created. Redirecting to Shop Pay."
        if checkout_url
        else "Checkout intent recorded. Add a Shop Pay checkout URL for this product to enable redirects."
    )

    return CheckoutIntentResponse(
        intent_id=intent_id,
        product_slug=payload.slug,
        quantity=payload.quantity,
        status=status,
        checkout_url=checkout_url,
        message=message,
    )
