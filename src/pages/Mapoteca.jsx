import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import MapotecaSidebar from '../components/mapoteca/MapotecaSidebar.jsx'
import MapotecaFilters from '../components/mapoteca/MapotecaFilters.jsx'
import PdfCard from '../components/mapoteca/PdfCard.jsx'
import PdfViewerModal from '../components/mapoteca/PdfViewerModal.jsx'
import { categories, getCategoryById } from '../data/categories.js'
import { loadMapotecaPdfs } from '../services/mapotecaService.js'

const initialFilters = {
  category: 'all',
  municipio: 'all',
  escala: 'all',
  year: 'all',
  format: 'all',
}

function uniqueValues(items, field) {
  return [...new Set(items.map((item) => item[field]).filter(Boolean))]
    .filter((item) => item !== 'Sin año')
    .sort((a, b) => String(a).localeCompare(String(b)))
}

export default function Mapoteca() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState(initialFilters)
  const [pdfs, setPdfs] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [selectedPdf, setSelectedPdf] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)

      const result = await loadMapotecaPdfs()

      if (!mounted) return

      setPdfs(result.pdfs)
      setUsingFallback(result.usingFallback)
      setLoading(false)
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  const totals = useMemo(() => {
    const totalValues = { all: pdfs.length }

    categories.forEach((category) => {
      totalValues[category.id] = pdfs.filter((pdf) => pdf.categoryId === category.id).length
    })

    return totalValues
  }, [pdfs])

  const municipios = useMemo(() => uniqueValues(pdfs, 'municipio'), [pdfs])
  const years = useMemo(() => uniqueValues(pdfs, 'year').reverse(), [pdfs])
  const scales = useMemo(() => uniqueValues(pdfs, 'escala'), [pdfs])

  const filteredPdfs = useMemo(() => {
    const search = query.trim().toLowerCase()

    return pdfs
      .filter((pdf) => activeCategory === 'all' || pdf.categoryId === activeCategory)
      .filter((pdf) => filters.category === 'all' || pdf.categoryId === filters.category)
      .filter((pdf) => filters.municipio === 'all' || pdf.municipio === filters.municipio)
      .filter((pdf) => filters.escala === 'all' || pdf.escala === filters.escala)
      .filter((pdf) => filters.year === 'all' || pdf.year === filters.year)
      .filter((pdf) => filters.format === 'all' || pdf.format === filters.format)
      .filter((pdf) => {
        if (!search) return true

        return (
          pdf.title.toLowerCase().includes(search) ||
          pdf.fileName.toLowerCase().includes(search) ||
          pdf.categoryLabel.toLowerCase().includes(search) ||
          pdf.municipio.toLowerCase().includes(search)
        )
      })
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [pdfs, activeCategory, filters, query])

  const selectedCategory =
    activeCategory === 'all'
      ? { label: 'Todas las categorías', description: 'Consulta consolidada de la mapoteca.' }
      : getCategoryById(activeCategory)

  const clearFilters = () => {
    setQuery('')
    setFilters(initialFilters)
    setActiveCategory('all')
  }

  const handleCategory = (categoryId) => {
    setActiveCategory(categoryId)
    setFilters((current) => ({
      ...current,
      category: categoryId,
    }))
  }

  return (
    <main>
      <section className="mapoteca-banner">
        <div className="mapoteca-banner-content">
          <p className="section-kicker">Catálogo cartográfico</p>
          <h1>Mapoteca</h1>
          <p>
            Catálogo de mapas, documentos y publicaciones del territorio quindiano.
          </p>
        </div>
        <div className="banner-plants"></div>
      </section>

      <section className="mapoteca-content">
        <MapotecaFilters
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          municipios={municipios}
          years={years}
          scales={scales}
          onClear={clearFilters}
        />

        {usingFallback && (
          <div className="cors-warning">
            <AlertTriangle size={20} />
            <div>
              <strong>Modo demo activado</strong>
              <p>
                No fue posible leer todas las carpetas desde el navegador local. Se muestran
                PDFs de ejemplo y los PDFs que enviaste de Industria y Comercio. En el mismo
                dominio del servidor, la lectura del explorador de archivos debería funcionar.
              </p>
            </div>
          </div>
        )}

        <div className="mapoteca-layout">
          <MapotecaSidebar
            categories={categories}
            activeCategory={activeCategory}
            totals={totals}
            onSelect={handleCategory}
          />

          <section className="mapoteca-results">
            <div className="results-header">
              <div>
                <h2>{selectedCategory?.label}</h2>
                <p>{selectedCategory?.description}</p>
              </div>

              <div className="results-order">
                <span>Mostrando {filteredPdfs.length} de {pdfs.length} mapas</span>
                <select>
                  <option>Más recientes</option>
                  <option>Título A-Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading-box">
                <Loader2 className="spin" size={38} />
                <p>Consultando carpetas de PDFs...</p>
              </div>
            ) : filteredPdfs.length === 0 ? (
              <div className="empty-box">
                <h3>No se encontraron mapas</h3>
                <p>Prueba limpiando los filtros o usando otra palabra clave.</p>
              </div>
            ) : (
              <div className="map-grid">
                {filteredPdfs.map((pdf) => (
                  <PdfCard key={pdf.id} pdf={pdf} onPreview={setSelectedPdf} />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      <PdfViewerModal pdf={selectedPdf} onClose={() => setSelectedPdf(null)} />
    </main>
  )
}
