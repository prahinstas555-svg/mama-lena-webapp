import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import PromoBanner from '../components/PromoBanner'
import CategoryTabs from '../components/CategoryTabs'
import FoodCard from '../components/FoodCard'
import CartButton from '../components/CartButton'
import { categories, menuItems } from '../data/menu'
import './Home.css'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' }
  })
}

function Home({ cart, onAdd, onRemove }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return menuItems
    return menuItems.filter(item => item.category === activeCategory)
  }, [activeCategory])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const getQuantity = (id) => {
    const item = cart.find(i => i.id === id)
    return item ? item.quantity : 0
  }

  return (
    <div className="home">
      <Header />
      <PromoBanner />
      <CategoryTabs
        categories={[{ id: 'all', name: 'Все', icon: '🍴' }, ...categories]}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <div className="menu-section" id="menu">
        <h2 className="section-title">Меню</h2>
        <div className="food-list">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <FoodCard
                item={item}
                quantity={getQuantity(item.id)}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <CartButton totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  )
}

export default Home
