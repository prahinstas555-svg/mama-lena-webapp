import { motion } from 'framer-motion'
import './PromoBanner.css'

function PromoBanner() {
  return (
    <motion.div
      className="promo-banner"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
    >
      <div className="promo-shimmer" />
      <div className="promo-content">
        <motion.span
          className="promo-label"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          🔥 Акция
        </motion.span>
        <motion.h2
          className="promo-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Скидка 20% на первый заказ
        </motion.h2>
        <motion.p
          className="promo-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Здесь готовят с любовью ❤️
        </motion.p>
        <motion.button
          className="promo-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Заказать
        </motion.button>
      </div>
      <motion.div
        className="promo-image"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      >
        <div className="promo-image-placeholder">🍽️</div>
      </motion.div>
    </motion.div>
  )
}

export default PromoBanner
