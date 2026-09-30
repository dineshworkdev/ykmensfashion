import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Feather, Palette, ShieldCheck } from 'lucide-react'
import { DoodleStar, AnimatedWavyUnderline, RetroStampBadge, EditorialMark } from '../components/common/Doodles.jsx'

const values = [
  {
    title: '240 GSM Organic Cotton',
    icon: Feather,
    badge: 'FABRIC HONESTY',
    body: "We source exclusively long-staple combed cotton from certified ethical mills. No synthetic polyester blends, no flimsy fast-fashion shortcuts. A true heavyweight drape that holds structure on men's frames.",
  },
  {
    title: 'Hand-Pulled Screenprints',
    icon: Palette,
    badge: 'CRAFT INKS',
    body: 'We mix custom water-based pigments in-house and pull every screen by hand in small batches. The ink absorbs deeply into the organic fibers rather than sitting like plastic rubber on top.',
  },
  {
    title: 'Numbered Small Batches',
    icon: Sparkles,
    badge: 'LIMITED RUNS',
    body: 'Drops are limited to 150–250 pieces per run worldwide. When an edition sells out, it enters the permanent archive. Zero landfill burning, zero clearance dumping.',
  },
]

export default function About() {
  return (
    <div className="bg-[#FFF1DF] min-h-screen text-espresso">
      {/* ── 1. Brand Story Hero ──────────────────────────────── */}
      <section className="border-b border-espresso/15 bg-[#FFF1DF] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-10 right-[6%] opacity-15 pointer-events-none hidden md:block">
          <RetroStampBadge className="w-56 h-56 text-espresso" text="100% HEAVY COTTON • YK MENS FASHION • " />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] border border-espresso/20 bg-white text-[10px] font-bold uppercase tracking-[0.18em] text-espresso mb-4 shadow-xs">
                <DoodleStar className="w-3 h-3 text-coral" />
                OUR ORIGIN STORY
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-espresso mb-6 leading-[1.04] tracking-tight">
                MEN'S CLOTHING FORGED BY{' '}
                <span className="font-serif italic font-normal text-coral relative inline-block">
                  Human Hands.
                  <AnimatedWavyUnderline className="absolute -bottom-1.5 left-0 w-full h-2.5 text-coral" />
                </span>
              </h1>

              <p className="font-sans text-sm sm:text-base lg:text-lg text-espresso/75 font-normal leading-relaxed max-w-xl mb-6">
                YK MENS FASHION started in a sunlit studio in Mumbai with one
                manual silk-screen press, two bolt rolls of 240 GSM unbleached
                cotton, and an aversion to disposable fast fashion that loses its
                shape after two washes.
              </p>

              <div className="p-4 sm:p-5 rounded-sm border border-espresso/20 bg-white/90 max-w-lg mb-8 shadow-xs">
                <p className="font-serif italic text-lg sm:text-xl text-espresso leading-snug">
                  "If a men's t-shirt doesn't look even better five years from today with
                  faded ink and softened cotton patina, we haven't done our job."
                </p>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-espresso/50 block mt-2.5">
                  — YK FOUNDER'S NOTE • MUMBAI ATELIER
                </span>
              </div>

              <Link to="/shop" className="retro-btn-primary flex items-center gap-2">
                <span>EXPLORE THE CURRENT DROP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Photo Frame */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-2.5 sm:p-3 rounded-sm border border-espresso/20 shadow-md">
                <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden bg-[#F4EDE4]">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&auto=format&fit=crop&q=80"
                    alt="Male model wearing YK Mens Fashion minimal heavyweight blank"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-[2px] border border-espresso/15 bg-white/95 text-[10px] font-mono uppercase tracking-wider text-espresso">
                    MUMBAI CUTTING ROOM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Deep Forest Editorial Workshop Section ── */}
      <section className="border-b border-espresso/15 bg-[#14382F] text-[#FFF1DF] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral block mb-2">
              ✦ CORE PRINCIPLES ✦
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-3">
              WHAT WE STAND FOR
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#FFF1DF]/75 font-normal leading-relaxed">
              Every detail is engineered with intention. From yarn density to final reinforced collar binding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-sm border border-white/20 text-espresso p-6 sm:p-8 flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="h-10 w-10 rounded-[2px] border border-espresso/20 bg-[#FFF1DF] flex items-center justify-center text-espresso">
                        <IconComp className="w-5 h-5 stroke-[1.8]" />
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-coral px-2.5 py-0.5 rounded-[2px] border border-coral/30 bg-coral/5">
                        {v.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-espresso mb-2.5">
                      {v.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-espresso/70 leading-relaxed font-normal">
                      {v.body}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-espresso/10 flex items-center justify-between text-[10px] font-mono uppercase text-espresso/50">
                    <span>SPECIFICATION 0{i + 1}</span>
                    <span>ATELIER VERIFIED</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Studio Statement Banner ── */}
      <section className="py-16 sm:py-20 text-center relative overflow-hidden bg-[#FFF1DF]">
        <div className="mx-auto max-w-2xl px-4">
          <DoodleStar className="w-6 h-6 text-coral mx-auto mb-3" />
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-espresso mb-3 leading-tight tracking-tight">
            "CLOTHING DESIGNED LIKE AN ARTIST'S PRINT."
          </h2>
          <p className="font-sans text-xs sm:text-sm text-espresso/70 font-normal max-w-md mx-auto mb-8 leading-relaxed">
            Thank you for supporting an independent men's streetwear atelier.
            When you wear YK, you're wearing an authentic piece of Indian craft streetwear.
          </p>
          <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
            <span>EXPLORE MEN'S CATALOGUE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
