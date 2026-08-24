import { useRef } from 'react'
import './CategoryTabs.css'

function CategoryTabs({ categories, activeCategory, onSelect }) {
  const scrollRef = useRef(null)

  return (
    <div className="category-tabs" ref={scrollRef}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className="cat-icon">{cat.icon}</span>
          <span className="cat-name">{cat.name}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
