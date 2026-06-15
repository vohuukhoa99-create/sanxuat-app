import { defaultNavItems } from '../data/navigation.js'

export function Sidebar({ selected, onChange, navItems = defaultNavItems }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span>Sơn Hòa Bình</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${selected === item.id ? 'active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
