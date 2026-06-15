export function TopBar({ title, subtitle, user, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar-chip">Hệ thống quản lý sản xuất V3</p>
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions">
        <span>{subtitle}</span>
        {user && (
          <div className="user-session">
            <strong>{user.fullName}</strong>
            <small>{user.role}</small>
            <button className="secondary-button" onClick={onLogout}>Đăng xuất</button>
          </div>
        )}
      </div>
    </header>
  )
}
