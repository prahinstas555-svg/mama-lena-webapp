import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <span className="logo-icon">ML</span>
          <span className="logo-text">Mama Lena</span>
        </div>
        <div className="header-actions">
          <Link to="/profile" className="header-btn">
            <FiUser size={20} />
          </Link>
          <button className="header-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
      <nav className="header-nav">
        <a href="#menu" className="nav-link active">Меню</a>
        <a href="#promos" className="nav-link">Акции</a>
        <a href="#reviews" className="nav-link">Отзывы</a>
        <a href="#about" className="nav-link">О нас</a>
      </nav>
      {menuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>Профиль</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Корзина</Link>
          <a href="tel:+79001234567" onClick={() => setMenuOpen(false)}>Служба заботы</a>
        </motion.div>
      )}
    </header>
  )
}

export default Header
