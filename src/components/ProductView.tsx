import { useEffect, useState } from 'react'
import { fetchProduct } from '../api/client'
import { CATEGORY_LABELS, type Product } from '../api/types'

interface Props {
  id: string
  initial: Product | null
  onClose: () => void
}

const MONTHS = 12

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`Рейтинг ${rating.toFixed(1)}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= Math.round(rating) ? 'stars__star stars__star--on' : 'stars__star'}>
          ★
        </span>
      ))}
    </span>
  )
}

export function ProductView({ id, initial, onClose }: Props) {
  const [product, setProduct] = useState<Product | null>(initial)
  const [failure, setFailure] = useState<{ id: string; message: string } | null>(null)
  const error = failure?.id === id ? failure.message : null

  useEffect(() => {
    const controller = new AbortController()
    fetchProduct(id, controller.signal)
      .then(setProduct)
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setFailure({ id, message: err instanceof Error ? err.message : 'Ошибка запроса' })
      })
    return () => controller.abort()
  }, [id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="view" role="dialog" aria-modal="true" aria-labelledby="view-title" onClick={onClose}>
      <div className="view__panel" onClick={(e) => e.stopPropagation()}>
        {product ? (
          <ProductDetails product={product} onClose={onClose} />
        ) : (
          <div className="view__state">
            <button type="button" className="view__close" onClick={onClose} aria-label="Закрыть">
              ×
            </button>
            {error ? (
              <>
                <div className="state__icon" aria-hidden="true">
                  😕
                </div>
                <p>{error.includes('404') ? 'Товар не найден.' : `Не удалось загрузить товар: ${error}`}</p>
                <button type="button" className="link" onClick={onClose}>
                  Вернуться к каталогу
                </button>
              </>
            ) : (
              <>
                <span className="spinner spinner--lg" aria-hidden="true" />
                <p>Загрузка…</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductDetails({ product, onClose }: { product: Product; onClose: () => void }) {
  const inStock = product.stock > 0
  const category = CATEGORY_LABELS[product.category] ?? product.category
  const perMonth = Math.ceil(product.price / MONTHS)
  const oldPrice = Math.round(product.price * 1.18)
  const sku = String(100000 + product.id)
  const added = new Date(product.createdAt)
  const letters = [0, 1, 2, 3].map((i) => product.name.slice(i, i + 1).toUpperCase() || '·')

  const specs: [string, string][] = [
    ['Бренд', product.brand],
    ['Категория', category],
    ['Артикул', sku],
    ['Рейтинг', `${product.rating.toFixed(1)} из 5`],
    ['Наличие', inStock ? `${product.stock} шт.` : 'Нет в наличии'],
    ['Теги', product.tags.join(', ')],
    ['Добавлен', added.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })],
  ]

  return (
    <>
      <div className="view__top">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <button type="button" className="crumbs__link" onClick={onClose}>
            Главная
          </button>
          <span className="crumbs__sep">›</span>
          <button type="button" className="crumbs__link" onClick={onClose}>
            {category}
          </button>
          <span className="crumbs__sep">›</span>
          <span className="crumbs__current">{product.name}</span>
        </nav>
        <button type="button" className="view__close" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
      </div>

      <div className="view__main">
        <div className="gallery">
          <div className={`gallery__hero card__thumb card__thumb--${product.category}`}>
            {inStock && product.rating >= 4.5 && <span className="gallery__badge">Хит</span>}
            <span>{product.name.slice(0, 1)}</span>
          </div>
          <div className="gallery__thumbs">
            {letters.map((l, i) => (
              <div
                key={i}
                className={`gallery__thumb card__thumb card__thumb--${product.category}${i === 0 ? ' gallery__thumb--active' : ''}`}
              >
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info">
          <div className="info__meta">
            <span className="card__category">{category}</span>
            <span className="info__sku">Артикул: {sku}</span>
          </div>
          <h1 id="view-title" className="info__title">
            {product.name}
          </h1>
          <div className="info__rating">
            <Stars rating={product.rating} />
            <span className="info__rating-num">{product.rating.toFixed(1)}</span>
            <span className="info__brand">· {product.brand}</span>
            <span className={inStock ? 'badge badge--ok' : 'badge badge--no'}>
              {inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>

          <div className="price-box">
            <div className="price-box__row">
              <span className="price-box__current">${product.price.toLocaleString('en-US')}</span>
              <span className="price-box__old">${oldPrice.toLocaleString('en-US')}</span>
              <span className="price-box__discount">−15%</span>
            </div>
            <div className="price-box__installment">
              <span className="price-box__pm">${perMonth.toLocaleString('en-US')}</span>
              <span>/ мес · в рассрочку на {MONTHS} мес.</span>
            </div>
          </div>

          <div className="info__actions">
            <button type="button" className="btn btn--primary" disabled={!inStock}>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
              В корзину
            </button>
            <button type="button" className="btn btn--ghost" disabled={!inStock}>
              Купить в 1 клик
            </button>
            <button type="button" className="btn btn--icon" aria-label="В избранное">
              ♡
            </button>
          </div>

          <ul className="perks">
            <li>
              <span className="perks__icon">🚚</span>
              <div>
                <b>Бесплатная доставка</b>
                <span>По городу — сегодня или завтра</span>
              </div>
            </li>
            <li>
              <span className="perks__icon">🛡️</span>
              <div>
                <b>Официальная гарантия</b>
                <span>12 месяцев от производителя</span>
              </div>
            </li>
            <li>
              <span className="perks__icon">↩️</span>
              <div>
                <b>Возврат 14 дней</b>
                <span>Если товар не подошёл</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="view__bottom">
        <section className="specs">
          <h2>Характеристики</h2>
          <dl className="specs__list">
            {specs.map(([k, v]) => (
              <div key={k} className="specs__row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="desc">
          <h2>Описание</h2>
          <p>{product.description}</p>
          <ul className="card__tags">
            {product.tags.map((t) => (
              <li key={t}>
                <span className="tag">#{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
