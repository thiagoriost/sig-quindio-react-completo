import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { id: 'home', label: 'Inicio' },
  { id: 'visor', label: 'Visor' },
  { id: 'mapoteca', label: 'Mapoteca' },
]

export default function Header({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false)

  const navigate = (page) => {
    onNavigate(page)
    setOpen(false)
  }

  return (
    <header className="site-header">
      <button className="logo-button" onClick={() => navigate('home')}>
        <span className="logo-flower">✦</span>
        <span className="logo-text">
          <strong>SIG Quindío</strong>
          <small>Sistema de Información Geográfica</small>
        </span>
      </button>

      <button className="mobile-menu-button" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`site-nav ${open ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={currentPage === item.id ? 'active' : ''}
            onClick={() => navigate(item.id)}
          >
            {item.label}
          </button>
        ))}
        {/* <a href="#indicadores">Indicadores</a>
        <a href="#servicios">Servicios</a>
        <a href="#descargas">Descargas</a>
        <a href="#acerca">Acerca de</a>
        <a className="login-button" href="#login">Iniciar sesión</a> */}
      </nav>
    </header>
  )
}
