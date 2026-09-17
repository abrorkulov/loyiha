import type { Filters, Meta, Product, ProductsResponse } from './types'

const BASE = import.meta.env.VITE_API_URL ?? '/api'

export function filtersToParams(f: Filters): URLSearchParams {
  const p = new URLSearchParams()
  if (f.q) p.set('q', f.q)
  if (f.category) p.set('category', f.category)
  if (f.brand) p.set('brand', f.brand)
  if (f.minPrice) p.set('minPrice', f.minPrice)
  if (f.maxPrice) p.set('maxPrice', f.maxPrice)
  if (f.minRating) p.set('minRating', f.minRating)
  if (f.inStock) p.set('inStock', 'true')
  if (f.sort !== 'relevance') p.set('sort', f.sort)
  if (f.page > 1) p.set('page', String(f.page))
  return p
}

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

export function fetchProducts(filters: Filters, signal?: AbortSignal): Promise<ProductsResponse> {
  const params = filtersToParams(filters)
  params.set('limit', '12')
  return get(`${BASE}/products?${params}`, signal)
}

export function fetchProduct(id: string, signal?: AbortSignal): Promise<Product> {
  return get(`${BASE}/products/${encodeURIComponent(id)}`, signal)
}

export function fetchMeta(): Promise<Meta> {
  return get(`${BASE}/meta`)
}
