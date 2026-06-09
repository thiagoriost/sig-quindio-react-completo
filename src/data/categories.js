export const MAPOTECA_BASE_URL = '/ArchivosQuindioIII/SIG_QUINDIO/MAPOTECA/'

export const categories = [
  {
    id: 'agropecuario',
    label: 'Agropecuario',
    shortLabel: 'Agropecuario',
    folder: 'AGROPECUARIO/',
    icon: 'Sprout',
    color: 'green',
    description: 'Mapas de vocación, uso, cobertura y actividad agropecuaria.',
  },
  {
    id: 'ambiental',
    label: 'Ambiental',
    shortLabel: 'Ambiental',
    folder: 'AMBIENTAL/',
    icon: 'TreePine',
    color: 'emerald',
    description: 'Información ambiental, ecosistemas, áreas protegidas y recursos naturales.',
  },
  {
    id: 'cartografia-basica',
    label: 'Cartografía Básica',
    shortLabel: 'Cartografía',
    folder: 'CARTOGRAFIA_BASICA/',
    icon: 'Map',
    color: 'blue',
    description: 'Cartografía general, límites, planchas y mapas base.',
  },
  {
    id: 'educacion',
    label: 'Educación',
    shortLabel: 'Educación',
    folder: 'EDUCACION/',
    icon: 'GraduationCap',
    color: 'teal',
    description: 'Infraestructura educativa, cobertura y sedes.',
  },
  {
    id: 'gestion-riesgo',
    label: 'Gestión del Riesgo',
    shortLabel: 'Riesgos',
    folder: 'GESTION_DEL_RIESGO/',
    icon: 'TriangleAlert',
    color: 'orange',
    description: 'Amenazas, vulnerabilidad, riesgo y gestión preventiva.',
  },
  {
    id: 'industria-comercio',
    label: 'Industria y Comercio',
    shortLabel: 'Industria',
    folder: 'INDUSTRIA_COMERCIO/',
    icon: 'Factory',
    color: 'slate',
    description: 'Actividad económica, industria, comercio y servicios.',
  },
  {
    id: 'ordenamiento-territorial',
    label: 'Ordenamiento Territorial',
    shortLabel: 'Ordenamiento',
    folder: 'ORDENAMIENTO_TERRITORIAL/',
    icon: 'Landmark',
    color: 'lime',
    description: 'Usos del suelo, normativa, instrumentos y planificación territorial.',
  },
  {
    id: 'salud',
    label: 'Salud',
    shortLabel: 'Salud',
    folder: 'SALUD/',
    icon: 'HeartPulse',
    color: 'red',
    description: 'Equipamientos, cobertura y servicios de salud.',
  },
  {
    id: 'socioeconomico',
    label: 'Socioeconómico',
    shortLabel: 'Socioeconómico',
    folder: 'SOCIOECONOMICO/',
    icon: 'BarChart3',
    color: 'yellow',
    description: 'Indicadores sociales, económicos y poblacionales.',
  },
]

export function getCategoryUrl(category) {
  return `${MAPOTECA_BASE_URL}${category.folder}`
}

export function getCategoryById(id) {
  return categories.find((category) => category.id === id)
}
