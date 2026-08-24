import { motion } from 'framer-motion'
import './PromoBanner.css'

function PromoBanner() {
  return (
    <motion.div
      className="promo-banner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="promo-content">
        <span className="promo-label">Акции</span>
        <h2 className="promo-title">Вкус Искусства: Скидка 20% на Авторские Блюда</h2>
        <button className="promo-btn">Подробнее</button>
      </div>
      <div className="promo-image">
        <div className="promo-image-placeholder">🍽️</div>
      </div>
    </motion.div>
  )
}

export default PromoBanner
