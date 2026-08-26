import { useState } from 'react'
import { FiArrowLeft, FiSend, FiCheck } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createFeedback } from '../lib/supabase'
import './Support.css'

function Support({ user, telegramId }) {
  const navigate = useNavigate()
  const [type, setType] = useState('question')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const types = [
    { id: 'question', label: '❓ Вопрос', desc: 'Задать вопрос' },
    { id: 'review', label: '⭐ Отзыв о блюде', desc: 'Оценить блюдо' },
    { id: 'complaint', label: '😤 Жалоба', desc: 'Сообщить о проблеме' },
    { id: 'wish', label: '💡 Пожелание', desc: 'Предложить идею' },
    { id: 'other', label: '💬 Другое', desc: 'Обсудить моменты' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) {
      setError('Напишите сообщение')
      return
    }

    setLoading(true)
    setError('')

    const tgId = telegramId || parseInt(localStorage.getItem('telegram_id'))

    const { error: err } = await createFeedback(
      tgId,
      type,
      message,
      user?.name || 'Гость',
      user?.phone || '—'
    )

    if (err) {
      setError('Ошибка отправки. Попробуйте снова.')
      setLoading(false)
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <div className="support-page">
        <motion.div
          className="support-success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="success-icon">
            <FiCheck size={40} />
          </div>
          <h2>Отправлено!</h2>
          <p>Мы рассмотрим ваше обращение и ответим в ближайшее время</p>
          <button className="back-home-btn" onClick={() => navigate('/profile')}>
            Вернуться в профиль
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="support-page">
      <div className="support-header">
        <button className="back-btn" onClick={() => navigate('/profile')}>
          <FiArrowLeft size={20} />
        </button>
        <h1>Служба заботы</h1>
        <div style={{ width: 36 }}></div>
      </div>

      <p className="support-subtitle">
        Мы ценим ваше мнение! Выберите тему и напишите нам
      </p>

      <form className="support-form" onSubmit={handleSubmit}>
        <div className="type-selector">
          {types.map(t => (
            <button
              key={t.id}
              type="button"
              className={`type-btn ${type === t.id ? 'active' : ''}`}
              onClick={() => setType(t.id)}
            >
              <span className="type-label">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="form-group">
          <label>Сообщение</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              type === 'review' ? 'Какое блюдо вы хотите оценить? Что понравилось?' :
              type === 'complaint' ? 'Опишите проблему — мы обязательно разберёмся' :
              type === 'wish' ? 'Что бы вы хотели видеть в нашем меню?' :
              'Напишите ваше сообщение...'
            }
            rows={5}
          />
        </div>

        {error && <p style={{ color: '#ff6b6b', fontSize: '14px' }}>{error}</p>}

        <button type="submit" className="send-btn" disabled={loading}>
          <FiSend size={16} />
          <span>{loading ? 'Отправляем...' : 'Отправить'}</span>
        </button>
      </form>
    </div>
  )
}

export default Support
