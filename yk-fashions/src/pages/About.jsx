import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Feather, Palette, ShieldCheck } from 'lucide-react'
import { DoodleStar, WavyUnderline, AnimatedSketchArrow, RetroStampBadge } from '../components/common/Doodles.jsx'

const values = [
  {
    title: '240 GSM Organic Cotton',
    icon: Feather,
    badge: 'FABRIC HONESTY',
    body: "We source exclusively long-staple combed cotton from certified ethical mills. No synthetic blends, no thin 140 GSM shortcuts. A true heavyweight drape that holds structure on men's frames.",
  },
  {
    title: 'Hand-Pulled Screenprints',
    icon: Palette,
    badge: 'CRAFT INKS',
    body: 'We mix custom water-based pigments in-house and pull every screen by hand. The ink absorbs into the fibers rather than sitting like plastic rubber on top.',
  },
  {
    title: 'Numbered Small Batches',
    icon: Sparkles,
    badge: 'ZERO LANDFILL',
    body: 'Drops are limited to 150–250 pieces per run. When a graphic sells out, it enters the permanent archive. No deadstock burning, no clearance dumpsters.',
  },
]

export default function About() {
  return (
    <div className="bg-[#FFF1DF] min-h-screen">
      {/* ── 1. Brand Story Hero (Warm Cream) ──────────────────────────────── */}
      <section className="border-b-3 border-espresso bg-[#FFF1DF] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-10 right-[6%] opacity-20 pointer-events-none hidden md:block">
          <RetroStampBadge className="w-56 h-56" text="100% HEAVY COTTON • YK MENS FASHION • " />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="retro-pill bg-butter text-espresso mb-4">
                <DoodleStar className="w-3.5 h-3.5" />
                OUR ORIGIN STORY
              </span>

              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-espresso mb-6 leading-[1.03]">
                MEN'S CLOTHING FORGED BY{' '}
                <span className="relative inline-block text-coral">
                  HUMAN HANDS.
                  <WavyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-butter" />
                </span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-espresso/80 font-medium leading-relaxed max-w-xl mb-6">
                YK MENS FASHION started in a sunlit print studio in Mumbai with one
                wooden screenprinting press, two bolt rolls of 240 GSM unbleached
                cotton, and a burning irritation with fast fashion that disintegrates
                after three washes.
              </p>

              <div className="p-4 rounded-2xl border-2 border-dashed border-espresso bg-white/80 max-w-lg mb-8">
                <p className="font-hand text-2xl text-terracotta leading-snug">
                  "If a men's t-shirt doesn't look even better five years from today with
                  faded ink and softened cotton, we haven't done our job."
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-espresso/60 block mt-2">
                  — YK MENS FASHION FOUNDER'S NOTE
                </span>
              </div>

              <Link to="/shop" className="retro-btn-primary flex items-center gap-2">
                <span>EXPLORE THE CURRENT DROP</span>
                <AnimatedSketchArrow className="w-6 h-3 text-white" />
              </Link>
            </div>

            {/* Right Photo Frame (100% Male Streetwear Model) */}
            <div className="lg:col-span-5 relative">
              <div className="retro-card bg-white p-3 sm:p-4 shadow-retro-xl rotate-[1.5deg]">
                <div className="relative aspect-[4/5] rounded-2xl border-2 border-espresso overflow-hidden bg-cream-dark">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&auto=format&fit=crop&q=80"
                    alt="Male model wearing YK Mens Fashion minimal heavyweight blank"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl border-2 border-espresso bg-butter font-display font-black text-xs text-espresso shadow-[2px_2px_0px_#241B16]">
                    THE MUMBAI WORKSHOP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Deep Forest Editorial Workshop Section (Section 6 Requirement) ── */}
      <section className="border-b-3 border-espresso bg-[#183D35] text-[#FFF1DF] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="retro-pill bg-butter text-espresso mb-3">
              ✦ CORE PRINCIPLES ✦
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white mb-3">
              WHAT WE STAND FOR
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#FFF1DF]/80 font-medium">
              Every detail is considered. From yarn twist to final package seal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon
              return (
                <div
                  key={v.title}
                  className="retro-card bg-[#FFF1DF] text-espresso p-6 sm:p-8 flex flex-col justify-between shadow-retro-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="h-12 w-12 rounded-2xl border-2 border-espresso bg-butter flex items-center justify-center text-espresso shadow-[2px_2px_0px_#241B16]">
                        <IconComp className="w-6 h-6 stroke-[2.2]" />
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-coral px-2.5 py-1 rounded-full border border-espresso bg-white">
                        {v.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl text-espresso mb-3">
                      {v.title}
                    </h3>

                    <p className="font-sans text-sm text-espresso/80 font-medium leading-relaxed">
                      {v.body}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-espresso/15 flex items-center gap-2">
                    <span className="text-xs font-black text-espresso">SPEC 0{i + 1}</span>
                    <span className="text-xs text-espresso/40">✦</span>
                    <span className="text-[11px] font-bold text-espresso/60 uppercase">VERIFIED</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Studio Statement Banner (Butter Yellow) ────────────────────────── */}
      <section className="border-b-3 border-espresso bg-butter py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-4">
          <DoodleStar className="w-8 h-8 text-coral mx-auto mb-3" />
          <h2 className="font-display font-black text-3xl sm:text-5xl text-espresso mb-4 leading-tight">
            "MEN'S CLOTHING AS ART. ART AS CLOTHING."
          </h2>
          <p className="font-sans text-base text-espresso/80 font-medium max-w-lg mx-auto mb-8">
            Thank you for supporting an independent men's streetwear atelier.
            When you wear YK, you're wearing an original piece of Indian street design.
          </p>
          <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
            <span>BROWSE MEN'S CATALOGUE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
