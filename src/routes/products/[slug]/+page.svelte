<script lang="ts">
  let { data } = $props();

  let quantity = $state(1);
  let checkoutState = $state<'idle' | 'loading' | 'error'>('idle');
  let checkoutMessage = $state('');

  const apiBaseUrl = (import.meta.env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

  async function startShopPayCheckout() {
    checkoutState = 'loading';
    checkoutMessage = '';

    try {
      const response = await fetch(`${apiBaseUrl}/checkout-intents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: data.product.slug,
          quantity
        })
      });

      if (!response.ok) {
        throw new Error('Checkout request failed');
      }

      const payload = await response.json();

      if (payload.checkout_url) {
        window.location.href = payload.checkout_url;
        return;
      }

      checkoutState = 'error';
      checkoutMessage = payload.message;
    } catch {
      checkoutState = 'error';
      checkoutMessage = 'Checkout backend unavailable. Start the FastAPI service or configure PUBLIC_API_BASE_URL.';
    }
  }
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

      <div class="checkout-controls">
        <label class="quantity-picker">
          <span class="eyebrow">Quantity</span>
          <input bind:value={quantity} min="1" max="10" type="number" />
        </label>
      </div>

      <div class="actions">
        <button class="button primary" type="button" onclick={startShopPayCheckout} disabled={checkoutState === 'loading'}>
          {checkoutState === 'loading' ? 'Starting Shop Pay...' : 'Buy with Shop Pay'}
        </button>
        <a class="button secondary" href="mailto:shop@wanker.bike?subject={encodeURIComponent(data.product.name)}">
          Email inquiry
        </a>
        <a class="button secondary" href="/products">Back to products</a>
      </div>

      {#if checkoutMessage}
        <p class="checkout-message">{checkoutMessage}</p>
      {/if}
    </div>
  </section>
</main>
