import { useState } from 'react'
import { FiArrowLeft, FiCheck, FiTruck, FiShoppingBag } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createOrder } from '../lib/supabase'
import './Checkout.css'

function Checkout({ cart, onClear, telegramId, user }) {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [payment, setPayment] = useState('card')
  const [delivery, setDelivery] = useState('delivery')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (delivery === 'delivery' && !address.trim()) {
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

    const { data, error: err } = await createOrder(tgId, items, totalPrice, address, comment, payment, delivery)

    if (err) {
      setError('Ошибка оформления заказа. Попробуйте снова.')
      setLoading(false)
      return
    }

    if (window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp.sendData(JSON.stringify({
          order_id: data[0]?.id,
          items,
          total: totalPrice,
          address: delivery === 'pickup' ? 'Самовывоз' : address,
          comment,
          payment,
          delivery
        }))
      } catch (e) {}
    }

    setSubmitted(true)
    setTimeout(() => {
      onClear()
      navigate('/')
    }, 4000)
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
          <p>{delivery === 'pickup' ? 'Ожидайте — мы сообщим о готовности' : 'Курьер скоро свяжется с вами'}</p>
          <div className="success-details">
            <span>{payment === 'cash' ? '💵 Оплата наличными' : '💳 Оплата картой'}</span>
            <span>{delivery === 'pickup' ? '🏪 Самовывоз' : '🚗 Доставка'}</span>
          </div>
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
          <input type="text" value={user?.name || ''} disabled style={{ opacity: 0.7 }} />
        </div>
        <div className="form-group">
          <label>Телефон</label>
          <input type="tel" value={user?.phone || ''} disabled style={{ opacity: 0.7 }} />
        </div>

        {/* Выбор доставки */}
        <div className="form-group">
          <label>Способ получения</label>
          <div className="toggle-group">
            <button
              type="button"
              className={`toggle-btn ${delivery === 'delivery' ? 'active' : ''}`}
              onClick={() => setDelivery('delivery')}
            >
              <FiTruck size={16} />
              <span>Доставка</span>
            </button>
            <button
              type="button"
              className={`toggle-btn ${delivery === 'pickup' ? 'active' : ''}`}
              onClick={() => setDelivery('pickup')}
            >
              <FiShoppingBag size={16} />
              <span>Самовывоз</span>
            </button>
          </div>
        </div>

        {delivery === 'delivery' && (
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
        )}

        {delivery === 'pickup' && (
          <div className="pickup-info">
            <p>📍 Адрес самовывоза:</p>
            <strong>ул. Примерная, д. 1</strong>
            <p className="pickup-hint">Заказ будет готов через 20-30 минут</p>
          </div>
        )}

        {/* Выбор оплаты */}
        <div className="form-group">
          <label>Способ оплаты</label>
          <div className="toggle-group">
            <button
              type="button"
              className={`toggle-btn ${payment === 'card' ? 'active' : ''}`}
              onClick={() => setPayment('card')}
            >
              💳 <span>Картой</span>
            </button>
            <button
              type="button"
              className={`toggle-btn ${payment === 'cash' ? 'active' : ''}`}
              onClick={() => setPayment('cash')}
            >
              💵 <span>Наличные</span>
            </button>
          </div>
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
            <span className="free-delivery">{delivery === 'pickup' ? '—' : 'Бесплатно'}</span>
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
