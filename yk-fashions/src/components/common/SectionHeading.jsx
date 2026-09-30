export default function SectionHeading({ title, label, className = '' }) {
  return (
    <div className={className}>
      {label && <p className="label mb-3 text-terracotta">{label}</p>}
      <h2 className="text-4xl md:text-6xl">{title}</h2>
    </div>
  )
}
