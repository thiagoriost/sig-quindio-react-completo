import IconByName from './IconByName.jsx'

export default function MapotecaSidebar({ categories, activeCategory, totals, onSelect }) {
  return (
    <aside className="mapoteca-sidebar">
      <h2>Categorías</h2>

      <button
        className={`sidebar-category ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelect('all')}
      >
        <IconByName name="FileText" />
        <span>Todas</span>
        <strong>{totals.all || 0}</strong>
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={`sidebar-category ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelect(category.id)}
        >
          <IconByName name={category.icon} />
          <span>{category.shortLabel}</span>
          <strong>{totals[category.id] || 0}</strong>
        </button>
      ))}
    </aside>
  )
}
