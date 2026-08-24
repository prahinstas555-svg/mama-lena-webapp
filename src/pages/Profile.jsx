import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

function Profile({ user, orders }) {
  const navigate = useNavigate()

  const defaultUser = {
    name: 'Гость',
    phone: '',
    points: 0,
    ...user
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

      <div className="profile-section">
        <h3>История заказов</h3>
        {(!orders || orders.length === 0) ? (
          <div className="order-item">
            <span style={{ color: 'var(--taupe)', fontSize: 14 }}>
              Заказов пока нет
            </span>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-item">
              <div>
                <div className="order-date">{order.date}</div>
                <div className="order-total">{order.total} ₽</div>
              </div>
              <span className="order-status">{order.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Profile
