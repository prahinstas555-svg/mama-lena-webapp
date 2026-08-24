import { useState } from 'react'
import { registerUser } from '../lib/supabase'

function Register({ telegramId, onRegistered }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Заполните все поля')
      return
    }

    setLoading(true)
    setError('')

    // Если нет telegramId, генерируем временный
    const tgId = telegramId || Math.floor(Date.now() / 1000)

    const { data, error: err } = await registerUser(tgId, name, phone)
    if (err) {
      setError('Ошибка регистрации. Попробуйте снова.')
      setLoading(false)
      return
    }

    // Сохраняем ID для будущих сессий
    localStorage.setItem('telegram_id', tgId.toString())
    onRegistered(data[0])
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: 400, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginBottom: '10px', color: 'var(--cream)' }}>
        Добро пожаловать!
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Для оформления заказа заполните данные
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%', padding: '14px 16px', marginBottom: '12px',
            borderRadius: '12px', border: 'none',
            background: '#1a2332', color: '#fff',
            fontSize: '16px', boxSizing: 'border-box'
          }}
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: '100%', padding: '14px 16px', marginBottom: '20px',
            borderRadius: '12px', border: 'none',
            background: '#1a2332', color: '#fff',
            fontSize: '16px', boxSizing: 'border-box'
          }}
        />
        {error && <p style={{ color: '#ff6b6b', marginBottom: '12px' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px',
            background: '#2dd4bf', color: '#0f172a', fontSize: '16px',
            fontWeight: 600, border: 'none', cursor: 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}

export default Register
