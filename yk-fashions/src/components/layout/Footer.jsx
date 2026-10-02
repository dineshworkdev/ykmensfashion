import { Link } from 'react-router-dom'
import { Compass, ShieldCheck, Sparkles, Clock, ArrowUpRight, Globe } from 'lucide-react'
import { DoodleStar, RetroStampBadge } from '../common/Doodles.jsx'

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const footerLinks = [
  {
    heading: 'SHOP',
    links: [
      { to: '/shop', label: 'All T-Shirts' },
      { to: '/shop?filter=new', label: 'New Arrivals' },
      { to: '/collection/oversized', label: 'Oversized Series' },
      { to: '/collection/graphic', label: 'Graphic Editions' },
      { to: '/collection/essentials', label: 'Daily Essentials' },
    ],
  },
  {
    heading: 'EXPLORE',
    links: [
      { to: '/lookbook', label: 'Style Inspiration' },
      { to: '/about', label: 'About Us' },
      { to: '/search', label: 'Search' },
    ],
  },
  {
    heading: 'CLIENT SERVICE',
    links: [
      { to: '/about', label: 'Contact Us' },
      { to: '/about', label: "Men's Fit Guide" },
      { to: '/about', label: 'Shipping & Delivery' },
      { to: '/about', label: 'Returns & Exchanges' },
    ],
  },
]

const socialLinks = [
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    handle: '@ykmensfashion',
    icon: InstagramIcon,
  },
  {
    href: 'https://pinterest.com',
    label: 'Pinterest',
    handle: 'ykmensfashion',
    icon: Compass,
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-espresso/20 bg-[#14382F] text-[#FFF1DF]">
      {/* ── Upper Footer ───────────────────────────── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Brand Info & Atelier Hallmark (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-white/30 bg-white/10 text-white font-serif italic text-base font-bold">
                YK
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                YK MENS FASHION
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#FFF1DF]/75 font-normal max-w-sm mb-6 leading-relaxed">
              Independent retro men's fashion brand. We create high-density
              240 GSM organic combed cotton t-shirts — boxy cuts with personality.
            </p>

            {/* Atelier Hallmark Stamp */}
            <div className="p-3 rounded-[4px] border border-white/15 bg-white/5 flex items-center gap-3">
              <RetroStampBadge className="w-12 h-12 text-[#FFF1DF]" centerText="YK" text="100% HEAVY COTTON • YK MENS FASHION • " />
              <div>
                <span className="font-sans font-bold text-xs text-white block">
                  100% COMBED ORGANIC COTTON
                </span>
                <span className="text-[10px] text-[#FFF1DF]/60">
                  Ethically milled & hand-printed in Mumbai
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-coral mb-3">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-xs text-[#FFF1DF]/75 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Links & Atelier Hours (3 cols) */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-coral mb-3">
              CONNECT
            </p>
            <div className="flex flex-col gap-2 mb-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-[3px] border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200 text-xs font-medium text-white group hover:-translate-y-[0.5px]"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-coral" />
                      <span>{social.label}</span>
                    </div>
                    <span className="text-[10px] text-[#FFF1DF]/60 flex items-center gap-1">
                      <span>{social.handle}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </span>
                  </a>
                )
              })}
            </div>

            <div className="p-3 rounded-[4px] border border-white/10 bg-white/5 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-coral shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white block mb-0.5">
                  STORE HOURS
                </span>
                <span className="text-xs text-[#FFF1DF]/70">
                  Mon – Sat: 10:00 AM – 7:30 PM IST
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower Footer Strip ───────────────────────────── */}
      <div className="border-t border-white/10 bg-[#0E2620] py-4 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-[#FFF1DF]/60 font-medium">
            © {new Date().getFullYear()} YK MENS FASHION. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-[#FFF1DF]/60">
            <Link to="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-white transition-colors">
              Shipping & Exchanges
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
