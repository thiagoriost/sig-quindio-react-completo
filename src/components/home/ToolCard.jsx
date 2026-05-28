export default function ToolCard({ icon, title, text, action, onClick }) {
  return (
    <button className="tool-card" onClick={onClick}>
      <div className="tool-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span>{action} →</span>
    </button>
  )
}
