import { Headphones, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-support">
        <div>
          <Headphones size={26} />
          <span>
            <strong>¿Necesitas ayuda?</strong>
            <small>Contáctanos</small>
          </span>
        </div>
        <div>
          <Mail size={26} />
          <span>
            <strong>Correo institucional</strong>
            <small>sigquindio@gobernacionquindio.gov.co</small>
          </span>
        </div>
        <div>
          <Phone size={26} />
          <span>
            <strong>Teléfono</strong>
            <small>+57 (6) 741 7700</small>
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SIG Quindío - Sistema de Información Geográfica del Quindío</span>
        <span>Política de privacidad · Términos de uso · Contacto</span>
      </div>
    </footer>
  )
}
