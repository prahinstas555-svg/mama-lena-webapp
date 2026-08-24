import { useState } from 'react'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Checkout.css'

function Checkout({ cart, onClear }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = (e) => {
    e.preventDefault()

    const orderData = {
      items: cart,
      total: totalPrice,
      customer: { name, phone, address, comment },
      timestamp: new Date().toISOString()
    }

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(orderData))
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            required
          />
        </div>
        <div className="form-group">
          <label>Телефон</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
            required
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

        <button type="submit" className="submit-order-btn">
          Подтвердить заказ — {totalPrice} ₽
        </button>
      </form>
    </div>
  )
}

export default Checkout
