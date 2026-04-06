import { error } from '@sveltejs/kit';
import { getProduct, products } from '$lib/data';

export const entries = () => products.map((product) => ({ slug: product.slug }));

export function load({ params }) {
  const product = getProduct(params.slug);

  if (!product) {
    error(404, 'Product not found');
  }

  return { product };
}
