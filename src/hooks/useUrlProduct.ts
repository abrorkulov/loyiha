import { useCallback, useEffect, useRef, useState } from 'react'

const PARAM = 'product'
const HOME = '/'

function readProductId(): string {
  return new URLSearchParams(window.location.search).get(PARAM) ?? ''
}

/** Открытие товара идёт через ?product=ID; закрытие любым способом (Esc, крестик, «назад») возвращает на главную. */
export function useUrlProduct() {
  const [productId, setProductId] = useState(readProductId)
  const openedHere = useRef(false)

  useEffect(() => {
    const onPop = () => setProductId(readProductId())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const open = useCallback((id: number) => {
    // Текущую запись истории заменяем на главную, чтобы «назад» вело на главный экран.
    window.history.replaceState(null, '', HOME)
    window.history.pushState(null, '', `${HOME}?${PARAM}=${id}`)
    openedHere.current = true
    setProductId(String(id))
  }, [])

  const close = useCallback(() => {
    if (openedHere.current) {
      openedHere.current = false
      window.history.back() // предыдущая запись — главная
      return
    }
    // Открыто по прямой ссылке — просто переходим на главную.
    window.history.replaceState(null, '', HOME)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [])

  return { productId, open, close }
}
