import { motion } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import './FoodCard.css'

function FoodCard({ item, quantity, onAdd, onRemove }) {
  return (
    <motion.div
      className="food-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="food-card-image">
        <span className="food-emoji">🍽️</span>
      </div>
      <div className="food-card-info">
        <h3 className="food-name">{item.name}</h3>
        {item.weight && <span className="food-weight">{item.weight}</span>}
        <span className="food-price">{item.price} ₽</span>
      </div>
      <div className="food-card-actions">
        {quantity > 0 ? (
          <div className="quantity-control">
            <button className="qty-btn" onClick={() => onRemove(item.id)}>
              <FiMinus size={14} />
            </button>
            <span className="qty-value">{quantity}</span>
            <button className="qty-btn add" onClick={() => onAdd(item)}>
              <FiPlus size={14} />
            </button>
          </div>
        ) : (
          <button className="add-btn" onClick={() => onAdd(item)}>
            <FiPlus size={16} />
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default FoodCard
