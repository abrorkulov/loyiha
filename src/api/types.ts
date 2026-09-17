export interface Product {
  id: number
  name: string
  description: string
  category: string
  brand: string
  price: number
  rating: number
  stock: number
  tags: string[]
  createdAt: string
}

export type SortKey = 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'name'

export interface ProductsResponse {
  items: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface Meta {
  categories: { name: string; count: number }[]
  brands: string[]
  priceRange: { min: number; max: number }
}

export interface Filters {
  q: string
  category: string
  brand: string
  minPrice: string
  maxPrice: string
  minRating: string
  inStock: boolean
  sort: SortKey
  page: number
}

export const DEFAULT_FILTERS: Filters = {
  q: '',
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  minRating: '',
  inStock: false,
  sort: 'relevance',
  page: 1,
}

export const SORT_LABELS: Record<SortKey, string> = {
  relevance: 'По умолчанию',
  price_asc: 'Цена: по возрастанию',
  price_desc: 'Цена: по убыванию',
  rating: 'По рейтингу',
  newest: 'Сначала новые',
  name: 'По названию',
}

export const CATEGORY_LABELS: Record<string, string> = {
  electronics: 'Электроника',
  clothing: 'Одежда',
  books: 'Книги',
  home: 'Дом',
  sports: 'Спорт',
  beauty: 'Красота',
  toys: 'Игрушки',
}
