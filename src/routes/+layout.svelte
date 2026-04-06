<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';

  let { children } = $props();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' }
  ];
</script>

<svelte:head>
  <title>Wanker.Bike</title>
  <meta
    name="description"
    content="Hip bike store with cleaner design, bike gear, and a sticker section that knows exactly what it is."
  />
</svelte:head>

<div class="site-frame">
  <header class="shell site-header">
    <a class="brand" href="/">
      <span class="brand-mark">WB</span>
      <span class="brand-copy">
        <span>WANKER.BIKE</span>
        <small>Fast bikes. Mean little objects.</small>
      </span>
    </a>

    <nav class="site-nav" aria-label="Primary">
      {#each links as link}
        <a href={link.href} class:active={page.url.pathname === link.href}>
          {link.label}
        </a>
      {/each}
    </nav>
  </header>

  {@render children()}

  <footer class="shell site-footer">
    <p>Wanker.Bike</p>
    <p>Stickers, bikes, and a calmer product grid.</p>
  </footer>
</div>
