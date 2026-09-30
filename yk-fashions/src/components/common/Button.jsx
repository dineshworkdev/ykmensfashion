import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-forest text-ivory hover:bg-burgundy',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory',
}

// Renders a router Link when `to` is given, otherwise a button.
export default function Button({ to, variant = 'primary', className = '', children, ...rest }) {
  const cls = `label inline-flex items-center justify-center px-8 py-4 transition-colors duration-500 ease-editorial ${variants[variant]} ${className}`
  return to ? (
    <Link to={to} className={cls} {...rest}>{children}</Link>
  ) : (
    <button className={cls} {...rest}>{children}</button>
  )
}
