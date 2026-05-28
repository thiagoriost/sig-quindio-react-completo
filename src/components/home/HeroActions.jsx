import { FolderDot, FileText, MapPinned } from 'lucide-react'

export default function HeroActions({ onNavigate }) {
  return (
    <div className="hero-action-cards">
      <button className="hero-action active" onClick={() => onNavigate('visor')}>
        <MapPinned size={24} />
        <span>
          <strong>Visor Geográfico</strong>
          <small>Explorar mapas</small>
        </span>
      </button>

      <button className="hero-action" onClick={() => onNavigate('mapoteca')}>
        <FileText size={24} />
        <span>
          <strong>Mapoteca</strong>
          <small>Catálogo de mapas</small>
        </span>
      </button>

      <button className="hero-action" onClick={() => document.getElementById('indicadores')?.scrollIntoView()}>
        <FolderDot size={24} />
        <span>
          <strong>Administrador</strong>
          <small>Servicios</small>
        </span>
      </button>
    </div>
  )
}
