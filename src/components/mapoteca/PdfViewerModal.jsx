import { ExternalLink, X } from 'lucide-react'

export default function PdfViewerModal({ pdf, onClose }) {
  if (!pdf) return null

  return (
    <div className="viewer-backdrop">
      <section className="viewer-modal">
        <header className="viewer-header">
          <div>
            <span>{pdf.categoryLabel}</span>
            <h2>{pdf.title}</h2>
            <p>{pdf.fileName}</p>
          </div>

          <div className="viewer-actions">
            <a href={pdf.url} target="_blank" rel="noreferrer">
              <ExternalLink size={17} />
              Abrir en pestaña
            </a>
            <button onClick={onClose}>
              <X size={21} />
            </button>
          </div>
        </header>

        <iframe title={pdf.title} src={pdf.url} className="pdf-iframe"></iframe>
      </section>
    </div>
  )
}
