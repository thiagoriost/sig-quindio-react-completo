import { Search, SlidersHorizontal } from 'lucide-react'

export default function MapotecaFilters({
  query,
  setQuery,
  filters,
  setFilters,
  municipios,
  years,
  scales,
  onClear,
}) {
  const update = (field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return (
    <div className="mapoteca-filters">
      <div className="search-row">
        <div className="search-input">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar mapas, temas, palabras clave..."
          />
        </div>

        <button className="advanced-search">
          <SlidersHorizontal size={18} />
          Búsqueda avanzada
        </button>
      </div>

      <div className="filter-row">
        <label>
          <span>Categoría</span>
          <select value={filters.category} onChange={(event) => update('category', event.target.value)}>
            <option value="all">Todas</option>
            <option value="agropecuario">Agropecuario</option>
            <option value="ambiental">Ambiental</option>
            <option value="cartografia-basica">Cartografía Básica</option>
            <option value="educacion">Educación</option>
            <option value="gestion-riesgo">Gestión del Riesgo</option>
            <option value="industria-comercio">Industria y Comercio</option>
            <option value="ordenamiento-territorial">Ordenamiento Territorial</option>
            <option value="salud">Salud</option>
            <option value="socioeconomico">Socioeconómico</option>
          </select>
        </label>

        <label>
          <span>Municipio</span>
          <select value={filters.municipio} onChange={(event) => update('municipio', event.target.value)}>
            <option value="all">Todos</option>
            {municipios.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Escala</span>
          <select value={filters.escala} onChange={(event) => update('escala', event.target.value)}>
            <option value="all">Todas</option>
            {scales.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Año</span>
          <select value={filters.year} onChange={(event) => update('year', event.target.value)}>
            <option value="all">Todos</option>
            {years.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Formato</span>
          <select value={filters.format} onChange={(event) => update('format', event.target.value)}>
            <option value="all">Todos</option>
            <option value="PDF">PDF</option>
          </select>
        </label>

        <button className="clear-filters" onClick={onClear}>
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}
