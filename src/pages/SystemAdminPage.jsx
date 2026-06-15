import { defaultNavItems } from '../data/navigation.js'

export function SystemAdminPage({ authData, onChange }) {
  const updateUser = (username, field, value) => {
    onChange({
      ...authData,
      users: authData.users.map((user) => user.username === username ? { ...user, [field]: value } : user),
    })
  }

  const addUser = () => {
    onChange({
      ...authData,
      users: [
        { username: 'user' + (authData.users.length + 1), password: '123456', fullName: 'Người dùng mới', department: '', role: 'Kế hoạch sản xuất', status: 'Hoạt động' },
        ...authData.users,
      ],
    })
  }

  const deleteUser = (username) => {
    onChange({ ...authData, users: authData.users.filter((user) => user.username !== username) })
  }

  const togglePermission = (role, menuId) => {
    const current = authData.roles[role] || []
    const next = current.includes(menuId) ? current.filter((id) => id !== menuId) : [...current, menuId]
    onChange({ ...authData, roles: { ...authData.roles, [role]: next } })
  }

  return (
    <div className="page-content admin-page">
      <section className="panel">
        <div className="panel-header-row">
          <div>
            <h2>Quản trị hệ thống</h2>
            <p className="panel-text">Quản lý tài khoản, vai trò, phân quyền menu và nhật ký truy cập.</p>
          </div>
          <button className="primary-button" onClick={addUser}>Thêm người dùng</button>
        </div>

        <h3>Quản lý người dùng</h3>
        <div className="table-wrapper">
          <table className="admin-wide-table">
            <thead>
              <tr>
                <th>Tài khoản</th>
                <th>Mật khẩu</th>
                <th>Họ tên</th>
                <th>Bộ phận</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {authData.users.map((user) => (
                <tr key={user.username}>
                  <td><input value={user.username} onChange={(event) => updateUser(user.username, 'username', event.target.value)} /></td>
                  <td><input value={user.password} onChange={(event) => updateUser(user.username, 'password', event.target.value)} /></td>
                  <td><input value={user.fullName} onChange={(event) => updateUser(user.username, 'fullName', event.target.value)} /></td>
                  <td><input value={user.department} onChange={(event) => updateUser(user.username, 'department', event.target.value)} /></td>
                  <td>
                    <select value={user.role} onChange={(event) => updateUser(user.username, 'role', event.target.value)}>
                      {Object.keys(authData.roles).map((role) => <option key={role}>{role}</option>)}
                    </select>
                  </td>
                  <td><input value={user.status} onChange={(event) => updateUser(user.username, 'status', event.target.value)} /></td>
                  <td><button className="danger-button" onClick={() => deleteUser(user.username)}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel admin-role-panel">
        <h3>Quản lý vai trò và phân quyền menu</h3>
        <div className="role-permission-grid">
          {Object.entries(authData.roles).map(([role, permissions]) => (
            <article key={role} className="role-card">
              <strong>{role}</strong>
              {defaultNavItems.map((item) => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    checked={permissions.includes(item.id)}
                    onChange={() => togglePermission(role, item.id)}
                  />
                  {item.label}
                </label>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Nhật ký truy cập</h3>
        <div className="table-wrapper">
          <table className="admin-wide-table">
            <thead><tr><th>Thời gian</th><th>Tài khoản</th><th>Hành động</th><th>Vai trò</th></tr></thead>
            <tbody>
              {authData.accessLogs.slice().reverse().map((log) => (
                <tr key={log.id}><td>{log.time}</td><td>{log.username}</td><td>{log.action}</td><td>{log.role}</td></tr>
              ))}
              {authData.accessLogs.length === 0 && <tr><td colSpan="4" className="empty-row">Chưa có nhật ký truy cập.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
