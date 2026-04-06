<script lang="ts">
  import { products } from '$lib/data';

  const featured = products[0];
  const previewProducts = products.slice(1, 5);
</script>

<svelte:head>
  <title>Wanker.Bike | Home</title>
</svelte:head>

<main class="shell page">
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Bike Store</p>
      <h1>
        Hip killer bikes
        <span>and clever merch with a nasty little grin.</span>
      </h1>
      <p class="lede">
        Carbon menace. Alleycat posture. Apparel for people who think a bell is
        too polite. We sell complete bikes, cursed upgrades, bike stickers, and
        car stickers for drivers who insist on embarrassing themselves in public.
      </p>
      <div class="actions">
        <a class="button primary" href="/products">Shop the damage</a>
        <a class="button secondary" href="/products/{featured.slug}">See the sticker</a>
      </div>
      <div class="hero-stats">
        <span>Petty product drops</span>
        <span>Mean little objects</span>
        <span>Fast bikes</span>
      </div>
    </div>

    <div class="hero-panel">
      <p class="eyebrow">Featured Product</p>
      <h2>{featured.name}</h2>
      <p>{featured.description}</p>
      <div class="specs">
        {#each featured.specs ?? [] as spec}
          <span>{spec}</span>
        {/each}
      </div>
      <p class="price">{featured.price}</p>
      <p class="subtle">“BICYCLE LANE BICYCLES ONLY SCOOTERS OKAY DOORDASH PARKING OK”</p>
    </div>
  </section>

  <section class="home-section">
    <div class="home-section-heading">
      <div>
        <p class="eyebrow">Merch Drop</p>
        <h2>Spiteful stickers and clever merch.</h2>
      </div>
      <a class="button secondary" href="/products">Browse all products</a>
    </div>

    <div class="section-grid">
      {#each previewProducts as product}
        <a class="section-card product-preview" href="/products/{product.slug}">
          {#if product.image}
            <img class="preview-image" src={product.image} alt={product.imageAlt} />
          {/if}
          <p class="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p class="price">{product.price}</p>
        </a>
      {/each}
    </div>
  </section>
</main>
