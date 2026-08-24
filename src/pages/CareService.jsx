import { useState } from 'react'
import { FiArrowLeft, FiSend, FiStar, FiMessageSquare, FiHeart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import './CareService.css'

function CareService({ telegramId, user }) {
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: 'review', label: '⭐ Отзыв о блюде', icon: <FiStar /> },
    { id: 'improve', label: '💡 Что улучшить', icon: <FiMessageSquare /> },
    { id: 'compliment', label: '❤️ Благодарность', icon: <FiHeart /> },
    { id: 'problem', label: '⚠️ Проблема с заказом', icon: <FiMessageSquare /> },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!category || !message.trim()) return

    setLoading(true)

    const tgId = telegramId || parseInt(localStorage.getItem('telegram_id'))

    try {
      const { error } = await supabase.from('feedback').insert({
        telegram_id: tgId,
        category,
        message,
        rating: rating || null,
        user_name: user?.name || 'Аноним',
      })

      if (error) console.error('Supabase error:', error)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setCategory('')
      setMessage('')
      setRating(0)
    }, 3000)
  }

  return (
    <div className="care-page">
      <div className="care-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FiArrowLeft size={20} />
        </button>
        <h1>Служба заботы</h1>
        <div style={{ width: 36 }}></div>
      </div>

      <p className="care-subtitle">
        Расскажите нам — мы хотим стать лучше для вас 💛
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            className="care-success"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="success-icon">💛</div>
            <h2>Спасибо!</h2>
            <p>Ваш отзыв очень важен для нас</p>
          </motion.div>
        ) : (
          <motion.form
            className="care-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="form-group">
              <label>Тема обращения</label>
              <div className="category-grid">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-btn ${category === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {(category === 'review' || category === 'compliment') && (
              <div className="form-group">
                <label>Оценка</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${rating >= star ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Сообщение</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  category === 'review' ? 'Расскажите о блюде...' :
                  category === 'improve' ? 'Что бы вы хотели изменить...' :
                  category === 'compliment' ? 'Что вам понравилось...' :
                  category === 'problem' ? 'Опишите проблему...' :
                  'Выберите тему и напишите...'
                }
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="care-submit-btn"
              disabled={!category || !message.trim() || loading}
            >
              <FiSend size={18} />
              <span>{loading ? 'Отправляем...' : 'Отправить'}</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CareService
