import type { CSSProperties } from 'react'
import { CATEGORY_LABELS, type Product } from '../api/types'

interface Props {
  product: Product
  index?: number
  onTagClick: (tag: string) => void
  onOpen: () => void
}

export function ProductCard({ product, index = 0, onTagClick, onOpen }: Props) {
  const inStock = product.stock > 0

  return (
    <article
      className="card card--clickable"
      style={{ '--i': index } as CSSProperties}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
    >
      <div className={`card__thumb card__thumb--${product.category}`}>
        <span>{product.name.slice(0, 1)}</span>
      </div>
      <div className="card__body">
        <div className="card__meta">
          <span className="card__category">{CATEGORY_LABELS[product.category] ?? product.category}</span>
          <span className="card__brand">{product.brand}</span>
        </div>
        <h3 className="card__title">{product.name}</h3>
        <p className="card__desc">{product.description}</p>
        <ul className="card__tags">
          {product.tags.map((t) => (
            <li key={t}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onTagClick(t)
                }}
              >
                #{t}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card__footer">
        <div>
          <div className="card__price">${product.price.toLocaleString('en-US')}</div>
          <div className="card__rating">★ {product.rating.toFixed(1)}</div>
        </div>
        <span className={inStock ? 'badge badge--ok' : 'badge badge--no'}>
          {inStock ? `В наличии: ${product.stock}` : 'Нет в наличии'}
        </span>
      </div>
    </article>
  )
}
