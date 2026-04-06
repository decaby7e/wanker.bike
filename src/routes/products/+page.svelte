<script lang="ts">
  import { products } from '$lib/data';

  const featured = products.find((product) => product.featured);
  const standardProducts = products.filter((product) => !product.featured);
</script>

<svelte:head>
  <title>Wanker.Bike | Products</title>
</svelte:head>

<main class="shell page products-page">
  <section class="search-row">
    <div>
      <p class="eyebrow">Products</p>
      <h1>Products</h1>
    </div>

    <form class="search-box" action="/products" method="get">
      <input aria-label="Search products" name="keyword" type="text" value="" placeholder="Search products" />
      <button class="button primary" type="submit">Search</button>
    </form>
  </section>

  <div class="toolbar">
    <span class="pill">{products.length} products</span>
  </div>

  <section class="products-layout">
    <aside class="filter-panel">
      <div class="filter-group">
        <p class="eyebrow">Category</p>
        <a class="filter-link active" href="/products">All products</a>
        <a class="filter-link" href="#sticker">Bike stickers</a>
        <a class="filter-link" href="#grid">Car stickers</a>
        <a class="filter-link" href="#grid">Apparel</a>
        <a class="filter-link" href="#grid">Gear</a>
      </div>
      <div class="filter-group">
        <p class="eyebrow">Price</p>
        <p class="subtle">$6 to $42</p>
      </div>
    </aside>

    <div class="products-grid" id="grid">
      {#if featured}
        <a class="product-card featured product-link" id="sticker" href="/products/{featured.slug}">
          <div class="product-image sticker-image">
            <div class="sticker-bar"></div>
            <p>BICYCLE LANE</p>
            <p>BICYCLES ONLY</p>
            <p>SCOOTERS OKAY</p>
            <p>DOORDASH PARKING OK</p>
          </div>
          <div class="product-copy">
            <div class="product-meta">
              <span class="listing-badge">{featured.category}</span>
              <span class="price">{featured.price}</span>
            </div>
            <h2>{featured.name}</h2>
            <p>{featured.description}</p>
            <div class="specs">
              {#each featured.specs ?? [] as spec}
                <span>{spec}</span>
              {/each}
            </div>
          </div>
        </a>
      {/if}

      {#each standardProducts as product}
        <a class="product-card product-link" href="/products/{product.slug}">
          {#if product.image}
            <img class="product-image" src={product.image} alt={product.imageAlt} />
          {/if}
          <div class="product-copy">
            <div class="product-meta">
              <span class="listing-badge">{product.category}</span>
              <span class="price">{product.price}</span>
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        </a>
      {/each}
    </div>
  </section>
</main>
