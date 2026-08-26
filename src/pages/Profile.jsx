import { useState, useEffect } from 'react'
import { FiArrowLeft, FiMessageCircle, FiClock, FiPackage } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../lib/supabase'
import './Profile.css'

function Profile({ user, telegramId }) {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  const defaultUser = {
    name: 'Гость',
    phone: '',
    points: 0,
    ...user
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const tgId = telegramId || parseInt(localStorage.getItem('telegram_id'))
    if (tgId) {
      const { data } = await getOrders(tgId)
      if (data) setOrders(data)
    }
    setLoadingOrders(false)
  }

  const getStatusText = (status) => {
    const statuses = {
      'new': '🆕 Новый',
      'notified': '✅ Принят',
      'cooking': '👨‍🍳 Готовится',
      'delivering': '🚗 Доставляется',
      'done': '✔️ Выполнен',
      'cancelled': '❌ Отменён'
    }
    return statuses[status] || status
  }

  const getStatusClass = (status) => {
    if (status === 'done') return 'status-done'
    if (status === 'cancelled') return 'status-cancelled'
    if (status === 'new' || status === 'notified') return 'status-new'
    return 'status-progress'
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
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
        <div className="points-value">{defaultUser.points}</div>
        <div className="points-hint">1 балл = 1 ₽ при оплате</div>
      </div>

      {/* Кнопка службы заботы */}
      <button className="support-btn" onClick={() => navigate('/support')}>
        <FiMessageCircle size={20} />
        <span>Служба заботы</span>
      </button>

      {/* История заказов */}
      <div className="profile-section">
        <h3><FiPackage size={16} /> История заказов</h3>
        {loadingOrders ? (
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
              <div className="order-left">
                <div className="order-number">Заказ #{order.id}</div>
                <div className="order-date">
                  <FiClock size={12} /> {formatDate(order.created_at)}
                </div>
                <div className="order-items-list">
                  {(order.items || []).map((item, i) => (
                    <span key={i} className="order-item-name">
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="order-right">
                <div className="order-total">{order.total} ₽</div>
                <span className={`order-status ${getStatusClass(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Profile
