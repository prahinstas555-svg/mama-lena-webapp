import { FiArrowLeft, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Cart.css'

function Cart({ cart, onAdd, onRemove, onClear }) {
  const navigate = useNavigate()
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FiArrowLeft size={20} />
        </button>
        <h1>Корзина</h1>
        {cart.length > 0 && (
          <button className="clear-btn" onClick={onClear}>
            <FiTrash2 size={16} />
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <p>Корзина пуста</p>
          <button className="go-menu-btn" onClick={() => navigate('/')}>
            Перейти в меню
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <motion.div key={item.id} className="cart-item" layout>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <span className="cart-item-price">{item.price} ₽</span>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => onRemove(item.id)}>
                    <FiMinus size={14} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn add" onClick={() => onAdd(item)}>
                    <FiPlus size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-total">
              <span>Итого ({totalItems} шт.)</span>
              <span className="cart-total-price">{totalPrice} ₽</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
