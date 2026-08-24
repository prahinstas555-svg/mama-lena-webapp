import { useState, useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Profile.css'

function Profile({ user, telegramId }) {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const tgId = telegramId || parseInt(localStorage.getItem('telegram_id'))
    if (!tgId) {
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('telegram_id', tgId)
      .order('created_at', { ascending: false })

    if (data) {
      setOrders(data)
    }
    setLoading(false)
  }

  const defaultUser = {
    name: 'Гость',
    phone: '',
    points: 0,
    ...user
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusText = (status) => {
    const statuses = {
      'new': '🕐 Новый',
      'notified': '✅ Принят',
      'cooking': '🍳 Готовится',
      'delivery': '🚗 Доставляется',
      'done': '✔️ Выполнен'
    }
    return statuses[status] || status
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FiArrowLeft size={20} />
        </button>
        <h1>Профиль</h1>
        <div style={{ width: 36 }}></div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {defaultUser.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h2>{defaultUser.name}</h2>
          <p>{defaultUser.phone || 'Телефон не указан'}</p>
        </div>
      </div>

      <div className="points-card">
        <div className="points-label">Баллы</div>
        <div className="points-value">{defaultUser.points || 0}</div>
        <div className="points-hint">1 балл = 1 ₽ при оплате</div>
      </div>

      <div className="profile-section">
        <h3>История заказов</h3>
        {loading ? (
          <div className="order-item">
            <span style={{ color: 'var(--taupe)', fontSize: 14 }}>Загрузка...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="order-item">
            <span style={{ color: 'var(--taupe)', fontSize: 14 }}>Заказов пока нет</span>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-item">
              <div>
                <div className="order-date">{formatDate(order.created_at)}</div>
                <div className="order-items-list">
                  {order.items?.map((item, i) => (
                    <span key={i} style={{ fontSize: 12, color: 'var(--taupe)' }}>
                      {item.name} x{item.quantity}{i < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                <div className="order-total">{order.total} ₽</div>
              </div>
              <span className="order-status">{getStatusText(order.status)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Profile
