# Product Search

Мини-проект: поиск и фильтрация товаров через query params.

- **backend/** — чистый Node.js (`http`, `URL`, `events`, `os`), без фреймворков. 50 товаров в 7 категориях.
- **src/** — React + TypeScript + Vite.

## Запуск

Два терминала:

```bash
# 1. бэкенд (http://localhost:4000)
npm run backend

# 2. фронтенд (http://localhost:5173)
npm install
npm run dev
```

Vite проксирует `/api` на `http://localhost:4000`, поэтому CORS-проблем нет.

## API

| Метод | Путь | Описание |
|---|---|---|
| GET | `/api/products` | список товаров с фильтрами |
| GET | `/api/products/:id` | один товар |
| GET | `/api/meta` | категории, бренды, диапазон цен |
| GET | `/api/health` | статус сервера (через `os`) |

### Query params для `/api/products`

| Параметр | Пример | Описание |
|---|---|---|
| `q` | `q=iphone` | поиск по названию, бренду, описанию, тегам |
| `category` | `category=books` | electronics, clothing, books, home, sports, beauty, toys |
| `brand` | `brand=Apple` | точное совпадение бренда |
| `minPrice` / `maxPrice` | `minPrice=100&maxPrice=500` | диапазон цены |
| `minRating` | `minRating=4.5` | минимальный рейтинг |
| `inStock` | `inStock=true` | только в наличии |
| `sort` | `sort=price_asc` | price_asc, price_desc, rating, newest, name |
| `page` / `limit` | `page=2&limit=12` | пагинация |

Пример:

```
http://localhost:4000/api/products?q=apple&category=electronics&maxPrice=1000&sort=price_asc
```

Все фильтры на фронтенде тоже хранятся в URL, так что ссылку на результат поиска можно скопировать.
