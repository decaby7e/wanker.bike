<script lang="ts">
  import { products } from '$lib/data';

  const featured = products[0];
</script>

<svelte:head>
  <title>Wanker.Bike | Home</title>
</svelte:head>

<main class="shell page">
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Bike Store</p>
      <h1>
        Hip bikes,
        <span>cleaner pages.</span>
      </h1>
      <p class="lede">
        The storefront keeps the same tone, but the structure is calmer now.
        Shared layout, consistent header, and a proper products route instead
        of two pages arguing with each other.
      </p>
      <div class="actions">
        <a class="button primary" href="/products">Browse products</a>
        <a class="button secondary" href="/products#sticker">See the sticker</a>
      </div>
      <div class="hero-stats">
        <span>Shared header</span>
        <span>SvelteKit 5</span>
        <span>Simple catalog</span>
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

  <section class="section-grid">
    <article class="section-card">
      <p class="eyebrow">Products</p>
      <h3>Simple route structure</h3>
      <p>
        Home lives at <span class="accent">/</span> and the grid lives at
        <span class="accent">/products</span>.
      </p>
    </article>
    <article class="section-card">
      <p class="eyebrow">Design</p>
      <h3>Dialed down, not dead</h3>
      <p>
        Same warm palette and edge, but less visual shouting on the product listing.
      </p>
    </article>
    <article class="section-card">
      <p class="eyebrow">Merch</p>
      <h3>Sticker first</h3>
      <p>
        The new decal is treated like a real product instead of a full-page stunt.
      </p>
    </article>
  </section>
</main>
