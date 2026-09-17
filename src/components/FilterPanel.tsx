import { CATEGORY_LABELS, SORT_LABELS, type Filters, type Meta, type SortKey } from '../api/types'

interface Props {
  filters: Filters
  meta: Meta | null
  onChange: (patch: Partial<Filters>) => void
  onReset: () => void
}

export function FilterPanel({ filters, meta, onChange, onReset }: Props) {
  const hasFilters =
    filters.category || filters.brand || filters.minPrice || filters.maxPrice || filters.minRating || filters.inStock

  return (
    <aside className="filters">
      <div className="filters__head">
        <h2>Фильтры</h2>
        {hasFilters && (
          <button type="button" className="link" onClick={onReset}>
            Сбросить
          </button>
        )}
      </div>

      <div className="filters__group">
        <h3>Категория</h3>
        <ul className="chips">
          <li>
            <button
              type="button"
              className={filters.category === '' ? 'chip chip--active' : 'chip'}
              onClick={() => onChange({ category: '' })}
            >
              Все
            </button>
          </li>
          {meta?.categories.map((c) => (
            <li key={c.name}>
              <button
                type="button"
                className={filters.category === c.name ? 'chip chip--active' : 'chip'}
                onClick={() => onChange({ category: filters.category === c.name ? '' : c.name })}
              >
                {CATEGORY_LABELS[c.name] ?? c.name} <span className="chip__count">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filters__group">
        <h3>Бренд</h3>
        <select value={filters.brand} onChange={(e) => onChange({ brand: e.target.value })}>
          <option value="">Все бренды</option>
          {meta?.brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <h3>Цена, $</h3>
        <div className="range">
          <input
            type="number"
            min={0}
            placeholder={meta ? String(meta.priceRange.min) : 'от'}
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
          />
          <span>—</span>
          <input
            type="number"
            min={0}
            placeholder={meta ? String(meta.priceRange.max) : 'до'}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
          />
        </div>
      </div>

      <div className="filters__group">
        <h3>Рейтинг</h3>
        <select value={filters.minRating} onChange={(e) => onChange({ minRating: e.target.value })}>
          <option value="">Любой</option>
          <option value="4.5">4.5 и выше</option>
          <option value="4">4.0 и выше</option>
          <option value="3.5">3.5 и выше</option>
        </select>
      </div>

      <div className="filters__group">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onChange({ inStock: e.target.checked })}
          />
          Только в наличии
        </label>
      </div>

      <div className="filters__group">
        <h3>Сортировка</h3>
        <select value={filters.sort} onChange={(e) => onChange({ sort: e.target.value as SortKey })}>
          {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
            <option key={k} value={k}>
              {SORT_LABELS[k]}
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}
