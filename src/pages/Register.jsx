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
    const { data, error: err } = await registerUser(telegramId, name, phone)
    if (err) {
      setError('Ошибка регистрации. Попробуйте снова.')
      setLoading(false)
      return
    }
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
            borderRadius: 'var(--radius-sm)', border: 'none',
            background: 'var(--surface)', color: 'var(--text-light)',
            fontSize: '16px'
          }}
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: '100%', padding: '14px 16px', marginBottom: '20px',
            borderRadius: 'var(--radius-sm)', border: 'none',
            background: 'var(--surface)', color: 'var(--text-light)',
            fontSize: '16px'
          }}
        />
        {error && <p style={{ color: '#ff6b6b', marginBottom: '12px' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)',
            background: 'var(--teal)', color: 'white', fontSize: '16px',
            fontWeight: 600, opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}

export default Register
