<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Wanker.Bike | {data.product.name}</title>
  <meta name="description" content={data.product.description} />
</svelte:head>

<main class="shell page product-page">
  <div class="breadcrumb">
    <a href="/products">Products</a>
    <span>/</span>
    <span>{data.product.name}</span>
  </div>

  <section class="product-detail">
    {#if data.product.featured}
      <div class="detail-image sticker-image detail-sticker">
        <div class="sticker-bar"></div>
        <p>BICYCLE LANE</p>
        <p>BICYCLES ONLY</p>
        <p>SCOOTERS OKAY</p>
        <p>DOORDASH PARKING OK</p>
      </div>
    {:else if data.product.image}
      <img class="detail-image" src={data.product.image} alt={data.product.imageAlt} />
    {:else}
      <div class="detail-image detail-placeholder">
        <span>{data.product.category}</span>
      </div>
    {/if}

    <div class="detail-copy">
      <p class="eyebrow">{data.product.category}</p>
      <h1>{data.product.name}</h1>
      <p class="price">{data.product.price}</p>
      <p class="lede">{data.product.longDescription}</p>

      {#if data.product.specs?.length}
        <div class="specs">
          {#each data.product.specs as spec}
            <span>{spec}</span>
          {/each}
        </div>
      {/if}

      <div class="actions">
        <a class="button primary" href="mailto:shop@wanker.bike?subject={encodeURIComponent(data.product.name)}">
          Buy inquiry
        </a>
        <a class="button secondary" href="/products">Back to products</a>
      </div>
    </div>
  </section>
</main>
