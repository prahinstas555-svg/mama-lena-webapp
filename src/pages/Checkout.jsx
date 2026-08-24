import { useState } from 'react'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createOrder } from '../lib/supabase'
import './Checkout.css'

function Checkout({ cart, onClear, telegramId, user }) {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!address.trim()) {
      setError('Укажите адрес доставки')
      return
    }

    setLoading(true)
    setError('')

    const tgId = telegramId || parseInt(localStorage.getItem('telegram_id'))

    const items = cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }))

    const { data, error: err } = await createOrder(tgId, items, totalPrice, address, comment)

    if (err) {
      setError('Ошибка оформления заказа. Попробуйте снова.')
      setLoading(false)
      return
    }

    // Отправляем данные боту (если доступно)
    if (window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp.sendData(JSON.stringify({
          order_id: data[0]?.id,
          items,
          total: totalPrice,
          address,
          comment
        }))
      } catch (e) {
        // sendData может не работать на десктопе — не критично
      }
    }

    setSubmitted(true)
    setTimeout(() => {
      onClear()
      navigate('/')
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="checkout-page">
        <motion.div
          className="checkout-success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="success-icon">
            <FiCheck size={40} />
          </div>
          <h2>Заказ принят!</h2>
          <p>Мы свяжемся с вами для подтверждения</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate('/cart')}>
          <FiArrowLeft size={20} />
        </button>
        <h1>Оформление</h1>
        <div style={{ width: 36 }}></div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            value={user?.name || ''}
            disabled
            style={{ opacity: 0.7 }}
          />
        </div>
        <div className="form-group">
          <label>Телефон</label>
          <input
            type="tel"
            value={user?.phone || ''}
            disabled
            style={{ opacity: 0.7 }}
          />
        </div>
        <div className="form-group">
          <label>Адрес доставки</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Улица, дом, квартира"
            required
          />
        </div>
        <div className="form-group">
          <label>Комментарий</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Пожелания к заказу..."
            rows={3}
          />
        </div>

        {error && <p style={{ color: '#ff6b6b', fontSize: '14px' }}>{error}</p>}

        <div className="checkout-summary">
          <div className="summary-row">
            <span>Сумма заказа</span>
            <span>{totalPrice} ₽</span>
          </div>
          <div className="summary-row">
            <span>Доставка</span>
            <span className="free-delivery">Бесплатно</span>
          </div>
          <div className="summary-row total">
            <span>Итого</span>
            <span>{totalPrice} ₽</span>
          </div>
        </div>

        <button type="submit" className="submit-order-btn" disabled={loading}>
          {loading ? 'Оформляем...' : `Подтвердить заказ — ${totalPrice} ₽`}
        </button>
      </form>
    </div>
  )
}

export default Checkout
