import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiMenu, FiX } from 'react-icons/fi'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-glow" />
      <div className="header-top">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Мама Лена"
            className="logo-img"
          />
        </motion.div>
        <motion.div
          className="header-actions"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Link to="/profile" className="header-btn">
            <FiUser size={20} />
          </Link>
          <button className="header-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </motion.div>
      </div>

      <motion.nav
        className="header-nav"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a href="#menu" className="nav-link active">Меню</a>
        <a href="#promos" className="nav-link">Акции</a>
        <a href="#reviews" className="nav-link">Отзывы</a>
        <a href="#about" className="nav-link">О нас</a>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Главная</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 Профиль</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 Корзина</Link>
            <a href="tel:+79001234567" onClick={() => setMenuOpen(false)}>📞 Служба заботы</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
