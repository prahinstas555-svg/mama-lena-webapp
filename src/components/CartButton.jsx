import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import './CartButton.css'

function CartButton({ totalItems, totalPrice }) {
  const navigate = useNavigate()

  if (totalItems === 0) return null

  return (
    <AnimatePresence>
      <motion.button
        className="cart-float-btn"
        onClick={() => navigate('/cart')}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiShoppingCart size={20} />
        <span className="cart-float-price">{totalPrice} ₽</span>
        <span className="cart-float-badge">{totalItems}</span>
      </motion.button>
    </AnimatePresence>
  )
}

export default CartButton
