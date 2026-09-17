import { useCallback, useEffect, useState } from 'react'
import { filtersToParams } from '../api/client'
import { DEFAULT_FILTERS, type Filters, type SortKey } from '../api/types'

const SORT_KEYS: SortKey[] = ['relevance', 'price_asc', 'price_desc', 'rating', 'newest', 'name']

function readFilters(): Filters {
  const p = new URLSearchParams(window.location.search)
  const sort = p.get('sort') ?? ''
  const page = Number(p.get('page'))
  return {
    q: p.get('q') ?? '',
    category: p.get('category') ?? '',
    brand: p.get('brand') ?? '',
    minPrice: p.get('minPrice') ?? '',
    maxPrice: p.get('maxPrice') ?? '',
    minRating: p.get('minRating') ?? '',
    inStock: p.get('inStock') === 'true',
    sort: SORT_KEYS.includes(sort as SortKey) ? (sort as SortKey) : 'relevance',
    page: page >= 1 ? Math.floor(page) : 1,
  }
}


export function useUrlFilters() {
  const [filters, setFilters] = useState<Filters>(readFilters)

  useEffect(() => {
    const params = filtersToParams(filters)
    const product = new URLSearchParams(window.location.search).get('product')
    if (product) params.set('product', product)
    const qs = params.toString()
    const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    if (next !== window.location.pathname + window.location.search) {
      window.history.pushState(null, '', next)
    }
  }, [filters])

  useEffect(() => {
    const onPop = () => setFilters(readFilters())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const update = useCallback((patch: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }))
  }, [])

  const reset = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  return { filters, update, reset }
}
