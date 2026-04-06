# Checkout Backend

Minimal FastAPI + SQLite backend for Wanker.Bike checkout intents.

What it does:
- seeds a local SQLite catalog
- records checkout intents
- returns a Shop Pay redirect URL when one has been configured for a product

Run it:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Important limitation:
- Shop Pay is not exposed here as a generic standalone public payments API.
- This backend expects each product to eventually have a real merchant-owned Shop Pay or Shopify checkout URL stored in `products.shop_pay_url`.
- Until those URLs are configured, the API records intents but returns `pending_configuration`.
