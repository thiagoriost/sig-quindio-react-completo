import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ADMIN_URL } from '../../utils/urls'
import logo from '../../assets/images/logo.png'

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
        <img className="logo-image" src={logo} alt="SIG Quindio" />
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
        <a href={ADMIN_URL} target="_blank" rel="noopener noreferrer">
          Administrador
        </a>
        {/* <a href="#servicios">Servicios</a>
        <a href="#descargas">Descargas</a>
        <a href="#acerca">Acerca de</a>
        <a className="login-button" href="#login">Iniciar sesión</a> */}
      </nav>
    </header>
  )
}
