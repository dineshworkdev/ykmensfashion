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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const footerLinks = [
  {
    heading: 'SHOP ARCHIVE',
    links: [
      { to: '/shop', label: "All Men's Products" },
      { to: '/shop?filter=new', label: 'New Arrivals' },
      { to: '/collection/oversized', label: 'Oversized Series' },
      { to: '/collection/graphic', label: 'Graphic Drops' },
      { to: '/collection/essentials', label: 'Daily Essentials' },
    ],
  },
  {
    heading: 'EDITORIAL',
    links: [
      { to: '/lookbook', label: 'Lookbook 04' },
      { to: '/about', label: 'About Atelier' },
      { to: '/search', label: 'Search Archive' },
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
    href: 'https://facebook.com',
    label: 'Facebook',
    handle: 'YK Mens Fashion Studio',
    icon: FacebookIcon,
  },
  {
    href: 'https://pinterest.com',
    label: 'Pinterest',
    handle: 'ykmensfashion_board',
    icon: Compass,
  },
]

export default function Footer() {
  return (
    <footer className="border-t-3 border-espresso bg-[#183D35] text-[#FFF1DF]">
      {/* ── Upper Footer ───────────────────────────── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Brand Info & Stamp (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#FFF1DF] bg-butter text-espresso font-display font-black text-xl shadow-[2px_2px_0px_#FFF1DF]">
                YK
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                YK MENS FASHION
              </span>
            </div>

            <p className="font-sans text-sm text-[#FFF1DF]/80 font-medium max-w-sm mb-6 leading-relaxed">
              An independent retro men's streetwear atelier. We create high-density
              240 GSM organic tees that fuse artistic printmaking with modern
              relaxed boxy silhouettes.
            </p>

            {/* Retro Stamp */}
            <div className="p-3.5 rounded-2xl border-2 border-white/20 bg-white/10 shadow-retro flex items-center gap-3 backdrop-blur-xs">
              <RetroStampBadge className="w-14 h-14 text-butter" centerText="YK" text="100% HEAVY COTTON • YK MENS FASHION • " />
              <div>
                <span className="font-display font-black text-xs text-white block">
                  100% PRE-SHRUNK ORGANIC COTTON
                </span>
                <span className="text-[11px] font-medium text-[#FFF1DF]/70">
                  Ethically milled & screenprinted for men
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-black uppercase tracking-wider text-coral mb-3">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-xs font-medium text-[#FFF1DF]/80 hover:text-butter transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Links & Hours (3 cols) */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-black uppercase tracking-wider text-coral mb-3">
              CONNECT WITH US
            </p>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border-2 border-white/20 bg-white/10 hover:bg-white/20 transition-all text-xs font-bold text-white group shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-butter group-hover:scale-110 transition-transform" />
                      <span>{social.label}</span>
                    </div>
                    <span className="text-[10px] text-[#FFF1DF]/70 flex items-center gap-1">
                      <span>{social.handle}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </a>
                )
              })}
            </div>

            <div className="mt-4 p-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-butter shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-butter block mb-0.5">
                  ATELIER HOURS
                </span>
                <span className="text-xs font-medium text-[#FFF1DF]/80">
                  Mon – Sat: 10:00 AM – 8:00 PM IST
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower Footer Strip ───────────────────────────── */}
      <div className="border-t-2 border-white/15 bg-[#122E28] py-4 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] font-medium text-[#FFF1DF]/70">
            © {new Date().getFullYear()} YK MENS FASHION ATELIER. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-4 text-[11px] font-medium text-[#FFF1DF]/70">
            <Link to="/about" className="hover:text-butter transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-butter transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-butter transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
