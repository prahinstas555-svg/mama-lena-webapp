import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    }
  }, [])

  const handleAdd = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const handleRemove = (id) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing && existing.quantity > 1) {
        return prev.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
      }
      return prev.filter(i => i.id !== id)
    })
  }

  const handleClear = () => setCart([])

  return (
    <Routes>
      <Route path="/" element={<Home cart={cart} onAdd={handleAdd} onRemove={handleRemove} />} />
      <Route path="/cart" element={<Cart cart={cart} onAdd={handleAdd} onRemove={handleRemove} onClear={handleClear} />} />
      <Route path="/profile" element={<Profile user={{}} orders={[]} />} />
      <Route path="/checkout" element={<Checkout cart={cart} onClear={handleClear} />} />
    </Routes>
  )
}

export default App
