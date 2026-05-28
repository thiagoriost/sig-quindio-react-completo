import {
  BarChart3,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  Map,
  Sprout,
  TreePine,
  TriangleAlert,
} from 'lucide-react'

const icons = {
  Sprout,
  TreePine,
  Map,
  GraduationCap,
  TriangleAlert,
  Factory,
  Landmark,
  HeartPulse,
  BarChart3,
  FileText,
}

export default function IconByName({ name, size = 20 }) {
  const Icon = icons[name] || FileText
  return <Icon size={size} />
}
