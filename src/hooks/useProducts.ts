import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/client'
import type { Filters, ProductsResponse } from '../api/types'

interface Result {
  key: string
  data: ProductsResponse | null
  error: string | null
}

export function useProducts(filters: Filters) {
  const key = JSON.stringify(filters)
  const [result, setResult] = useState<Result>({ key: '', data: null, error: null })

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts(JSON.parse(key) as Filters, controller.signal)
      .then((data) => setResult({ key, data, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setResult((prev) => ({ key, data: prev.data, error: err instanceof Error ? err.message : 'Ошибка запроса' }))
      })

    return () => controller.abort()
  }, [key])

  return {
    data: result.data,
    loading: result.key !== key,
    error: result.key === key ? result.error : null,
  }
}
