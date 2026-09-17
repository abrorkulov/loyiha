import { useEffect, useRef, useState } from 'react'
import { fetchMeta } from './api/client'
import { CATEGORY_LABELS, type Meta } from './api/types'
import { FilterPanel } from './components/FilterPanel'
import { Pagination } from './components/Pagination'
import { ProductCard } from './components/ProductCard'
import { ProductView } from './components/ProductView'
import { SearchBar } from './components/SearchBar'
import { useDebounce } from './hooks/useDebounce'
import { useProducts } from './hooks/useProducts'
import { useUrlFilters } from './hooks/useUrlFilters'
import { useUrlProduct } from './hooks/useUrlProduct'

function App() {
  const { filters, update, reset } = useUrlFilters()
  const [search, setSearch] = useState(filters.q)
  const debouncedSearch = useDebounce(search, 300)
  const [meta, setMeta] = useState<Meta | null>(null)
  const { productId, open: openProduct, close: closeProduct } = useUrlProduct()

  const { data, loading, error } = useProducts(filters)

  useEffect(() => {
    fetchMeta().then(setMeta).catch(() => setMeta(null))
  }, [])

  const currentQ = useRef(filters.q)
  useEffect(() => {
    currentQ.current = filters.q
  }, [filters.q])

  useEffect(() => {
    if (debouncedSearch !== currentQ.current) update({ q: debouncedSearch })
  }, [debouncedSearch, update])

  const [syncedQ, setSyncedQ] = useState(filters.q)
  if (filters.q !== syncedQ) {
    setSyncedQ(filters.q)
    setSearch(filters.q)
  }

  const activeChips: { label: string; clear: () => void }[] = []
  if (filters.q) activeChips.push({ label: `«${filters.q}»`, clear: () => setSearch('') })
  if (filters.category)
    activeChips.push({ label: CATEGORY_LABELS[filters.category] ?? filters.category, clear: () => update({ category: '' }) })
  if (filters.brand) activeChips.push({ label: filters.brand, clear: () => update({ brand: '' }) })
  if (filters.minPrice) activeChips.push({ label: `от $${filters.minPrice}`, clear: () => update({ minPrice: '' }) })
  if (filters.maxPrice) activeChips.push({ label: `до $${filters.maxPrice}`, clear: () => update({ maxPrice: '' }) })
  if (filters.minRating) activeChips.push({ label: `★ ${filters.minRating}+`, clear: () => update({ minRating: '' }) })
  if (filters.inStock) activeChips.push({ label: 'В наличии', clear: () => update({ inStock: false }) })

  return (
    <div className="layout">
      <div className="bg-blob" aria-hidden="true" />
      <header className="header">
        <div className="header__brand">
          <span className="header__logo">◈</span>
          <span className="header__title">Product Search</span>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </header>

      <div className="content">
        <FilterPanel filters={filters} meta={meta} onChange={update} onReset={reset} />

        <main className="results">
          <div className="results__bar">
            <div className="results__count">
              {loading && !data ? 'Загрузка…' : data ? `Найдено: ${data.total}` : ''}
              {loading && data && <span className="spinner" aria-hidden="true" />}
            </div>
            {activeChips.length > 0 && (
              <ul className="active-chips">
                {activeChips.map((c) => (
                  <li key={c.label}>
                    <button type="button" onClick={c.clear}>
                      {c.label} <span>×</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="link"
                    onClick={() => {
                      setSearch('')
                      reset()
                    }}
                  >
                    Очистить всё
                  </button>
                </li>
              </ul>
            )}
          </div>

          {error && (
            <div className="state state--error">
              Не удалось загрузить товары: {error}. Проверьте, что бэкенд запущен на порту 4000.
            </div>
          )}

          {!error && data && data.items.length === 0 && (
            <div className="state">
              <div className="state__icon" aria-hidden="true">🔍</div>
              <p>Ничего не найдено.</p>
              <button
                type="button"
                className="link"
                onClick={() => {
                  setSearch('')
                  reset()
                }}
              >
                Сбросить фильтры
              </button>
            </div>
          )}

          {data && data.items.length > 0 && (
            <div key={`${data.page}-${data.total}`} className={loading ? 'grid grid--loading' : 'grid'}>
              {data.items.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onTagClick={(tag) => setSearch(tag)}
                  onOpen={() => openProduct(p.id)}
                />
              ))}
            </div>
          )}

          {data && <Pagination page={data.page} totalPages={data.totalPages} onChange={(page) => update({ page })} />}
        </main>
      </div>

      {productId && (
        <ProductView
          id={productId}
          initial={data?.items.find((p) => String(p.id) === productId) ?? null}
          onClose={closeProduct}
        />
      )}
    </div>
  )
}

export default App
