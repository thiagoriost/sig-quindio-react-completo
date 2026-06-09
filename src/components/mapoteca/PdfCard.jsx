import { Download, Eye, FileText } from 'lucide-react'

export default function PdfCard({ pdf, onPreview }) {
  return (
    <article className="map-card">
      <div className={`map-thumbnail category-${pdf.categoryId}`}>
        <FileText size={42} />
        <span>PDF</span>
      </div>

      <div className="map-card-body">
        <span className="map-category-label">{pdf.categoryLabel}</span>
        <h3>{pdf.title}</h3>

        <div className="map-metadata">
          <span>Escala: {pdf.escala}</span>
          <span>Año: {pdf.year}</span>
          <span>{pdf.municipio}</span>
        </div>

        <div className="map-card-actions">
          <button onClick={() => onPreview(pdf)}>
            <Eye size={16} />
            Ver detalles
          </button>
          {/* <a href={pdf.url} target="_blank" rel="noreferrer">
            <Download size={16} />
            Abrir PDF
          </a> */}
        </div>
      </div>
    </article>
  )
}
