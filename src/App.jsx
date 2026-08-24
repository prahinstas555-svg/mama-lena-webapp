import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import Register from './pages/Register'
import { getUser } from './lib/supabase'
import CareService from './pages/CareService'

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [telegramId, setTelegramId] = useState(null)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    let tgId = null

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user
      if (tgUser) {
        tgId = tgUser.id
      }
    }

    // Если Telegram не передал ID, проверяем localStorage
    if (!tgId) {
      const savedId = localStorage.getItem('telegram_id')
      if (savedId) {
        tgId = parseInt(savedId)
      }
    }

    if (tgId) {
      setTelegramId(tgId)
      localStorage.setItem('telegram_id', tgId.toString())
      checkUser(tgId)
    } else {
      setLoading(false)
    }
  }, [])

  const checkUser = async (tgId) => {
    const { data } = await getUser(tgId)
    if (data) {
      setUser(data)
    }
    setLoading(false)
  }

  const handleRegistered = (userData) => {
    setUser(userData)
  }

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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Загрузка...</p>
      </div>
    )
  }

  // Показываем регистрацию если нет пользователя
  if (!user) {
    return <Register telegramId={telegramId} onRegistered={handleRegistered} />
  }

  return (
    <Routes>
      <Route path="/care" element={<CareService telegramId={telegramId} user={user} />} />
      <Route path="/" element={<Home cart={cart} onAdd={handleAdd} onRemove={handleRemove} />} />
      <Route path="/cart" element={<Cart cart={cart} onAdd={handleAdd} onRemove={handleRemove} onClear={handleClear} />} />
      <Route path="/profile" element={<Profile user={user} telegramId={telegramId} />} />
      <Route path="/checkout" element={<Checkout cart={cart} onClear={handleClear} telegramId={telegramId} user={user} />} />
    </Routes>
  )
}

export default App
