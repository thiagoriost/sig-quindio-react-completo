import { categories, getCategoryUrl } from '../data/categories.js'
import { fallbackPdfs } from '../data/fallbackPdfs.js'

function safeDecode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function cleanHref(href) {
  return href
    .replace(/^\.\//, '')
    .replace(/^\//, '')
    .trim()
}

function isPdf(href) {
  return href.toLowerCase().endsWith('.pdf')
}

function titleFromFileName(fileName) {
  return safeDecode(fileName)
    .replace(/\.pdf$/i, '')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function inferYearFromFileName(fileName) {
  const match = fileName.match(/(20\d{2}|19\d{2})/)
  return match ? match[0] : 'Sin año'
}

function inferScale() {
  return '1:25.000'
}

function inferMunicipio() {
  return 'Departamento del Quindío'
}

export async function loadPdfsFromDirectory(category) {
  const folderUrl = getCategoryUrl(category)

  const response = await fetch(folderUrl, {
    method: 'GET',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml',
    },
  })

  if (!response.ok) {
    throw new Error(`No fue posible consultar ${category.label}`)
  }

  const html = await response.text()
  const doc = new DOMParser().parseFromString(html, 'text/html')

  const pdfLinks = Array.from(doc.querySelectorAll('a'))
    .map((link) => link.getAttribute('href') || '')
    .map(cleanHref)
    .filter(isPdf)

  return pdfLinks.map((fileName) => {
    const decodedFile = safeDecode(fileName)

    return {
      id: `${category.id}-${decodedFile}`,
      title: titleFromFileName(decodedFile),
      fileName: decodedFile,
      categoryId: category.id,
      categoryLabel: category.label,
      municipio: inferMunicipio(decodedFile),
      escala: inferScale(decodedFile),
      year: inferYearFromFileName(decodedFile),
      format: 'PDF',
      url: new URL(fileName, folderUrl).href,
    }
  })
}

export async function loadMapotecaPdfs() {
  const responses = await Promise.allSettled(
    categories.map(async (category) => {
      const pdfs = await loadPdfsFromDirectory(category)
      return { category, pdfs }
    }),
  )

  const pdfs = responses.flatMap((response) =>
    response.status === 'fulfilled' ? response.value.pdfs : [],
  )

  const errors = responses
    .map((response, index) => {
      if (response.status === 'fulfilled') return null

      return {
        category: categories[index],
        message: response.reason?.message || 'No fue posible consultar la carpeta',
      }
    })
    .filter(Boolean)

  if (pdfs.length === 0) {
    return {
      pdfs: fallbackPdfs,
      errors,
      usingFallback: true,
    }
  }

  return {
    pdfs,
    errors,
    usingFallback: errors.length > 0,
  }
}
