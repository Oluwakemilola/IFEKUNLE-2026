import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Heart, Calendar, MapPin, Phone, Gift, Clock, Copy, Check, Sparkles, Menu, X, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const WEDDING_DATE = new Date('2026-09-11T15:00:00');
const gold = '#C9A96E';
const maroon = '#6D1A2E';
const deepMaroon = '#4A0F1E';
const creamLight = '#FDF8F0';
const creamMid = '#F5ECD9';

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id); }, []);
  return time;
}

// ── NAVBAR ──
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Story', href: '#story' },
    { label: 'Events', href: '#events' },
    { label: 'Dress Code', href: '#dresscode' },
    { label: 'Gift', href: '#gift' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? `${deepMaroon}f0` : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? `1px solid ${gold}33` : 'none' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-18">
        {/* Logo */}
        <button onClick={() => scrollTo('#hero')} className="font-serif text-left leading-tight"
          style={{ color: gold, fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)', letterSpacing: '0.02em' }}>
          Ifeoluwa & Olakunle
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              className="text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-100"
              style={{ color: `${gold}cc`, fontFamily: 'sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.color = gold)}
              onMouseLeave={e => (e.currentTarget.style.color = `${gold}cc`)}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ color: gold }}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: `${deepMaroon}f8`, borderTop: `1px solid ${gold}33` }}>
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <button key={l.label} onClick={() => scrollTo(l.href)}
                  className="text-left text-sm tracking-[0.2em] uppercase py-2"
                  style={{ color: gold, fontFamily: 'sans-serif', borderBottom: `1px solid ${gold}22` }}>
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── FLOATING HEARTS ──
function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div key={i} className="absolute" style={{ left: `${5 + i * 10}%`, bottom: '-10px' }}
          animate={{ y: [0, -500], opacity: [0, 0.7, 0], scale: [0.4, 1, 0.6] }}
          transition={{ duration: 4 + (i % 3), delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}>
          <Heart className="w-3 h-3" style={{ color: i % 2 === 0 ? gold : '#8B1A2F', fill: i % 2 === 0 ? gold : '#8B1A2F' }} />
        </motion.div>
      ))}
    </div>
  );
}

// ── GOLD SHIMMER TEXT ──
function ShimmerText({ text, size }: { text: string; size: string }) {
  return (
    <div className="relative inline-block overflow-hidden font-serif" style={{ fontSize: size, color: creamLight }}>
      {text}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(105deg, transparent 30%, ${gold}88 50%, transparent 70%)`, backgroundSize: '200% 100%' }}
        animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }} />
    </div>
  );
}

// ── FLIP CARD ──
function FlipCard({ day, colors, name, hint }: { day: string; colors: { bg: string; label: string; border?: boolean }[]; name: string; hint: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="cursor-pointer" style={{ perspective: '1000px', height: '220px' }} onClick={() => setFlipped(!flipped)}>
      <motion.div className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        style={{ transformStyle: 'preserve-3d' }}>
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${gold}44`, backfaceVisibility: 'hidden' }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>{day}</p>
          <div className="flex justify-center gap-5 mb-4">
            {colors.map(c => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl"
                  style={{ background: c.bg, border: `2px solid ${gold}55`, outline: c.border ? '2px solid #ddd' : 'none' }} />
                <span className="text-xs text-white/60">{c.label}</span>
              </div>
            ))}
          </div>
          <p className="font-serif text-sm sm:text-base" style={{ color: creamLight }}>{name}</p>
          <p className="text-xs mt-3 opacity-50" style={{ color: gold }}>Tap to see style hint 👆</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{ background: `linear-gradient(135deg, ${gold}22, ${gold}11)`, border: `1px solid ${gold}66`, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <Sparkles className="w-6 h-6 mb-3" style={{ color: gold }} />
          <p className="font-serif text-sm sm:text-base leading-relaxed" style={{ color: creamLight }}>{hint}</p>
          <p className="text-xs mt-4 opacity-50" style={{ color: gold }}>Tap to go back 👆</p>
        </div>
      </motion.div>
    </div>
  );
}

// ── GIFT SECTION ──
function GiftSection() {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'open'>('idle');
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => setPhase('open'), 900);
  };

  return (
    <section id="gift" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${deepMaroon} 0%, ${maroon} 60%, #8B1A2F 100%)` }}>
      <FloatingHearts />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${gold}18 0%, transparent 70%)` }} />

      <div className="max-w-lg mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Sparkles className="w-5 h-5" style={{ color: gold }} />
            </motion.div>
            <p className="text-xs tracking-[0.4em] uppercase" style={{ color: gold }}>A Gift from the Heart</p>
            <motion.div animate={{ rotate: [0, -20, 20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
              <Sparkles className="w-5 h-5" style={{ color: gold }} />
            </motion.div>
          </div>

          <h2 className="font-serif mb-2" style={{ color: creamLight, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>Bless the Couple</h2>
          <p className="text-sm mb-2 leading-relaxed" style={{ color: `${gold}bb` }}>
            Your presence warms our hearts.
          </p>
          <p className="text-sm mb-8 italic" style={{ color: `${gold}88` }}>
            Your gift warms our account 💛
          </p>

          {/* Gift box */}
          {phase === 'idle' && (
            <motion.button onClick={handleOpen} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="mx-auto flex flex-col items-center gap-4">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-32 h-32 sm:w-36 sm:h-36">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl">🎀</div>
                <div className="absolute top-0 left-0 right-0 h-10 rounded-t-xl"
                  style={{ background: `linear-gradient(135deg, ${gold}, #A07840)` }}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full opacity-25 bg-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-9 rounded-b-xl overflow-hidden"
                  style={{ background: `linear-gradient(135deg, #8B1A2F, ${deepMaroon})`, border: `2px solid ${gold}66` }}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full opacity-10 bg-white" />
                  <div className="absolute top-2 left-0 right-0 h-3 opacity-10 bg-white" />
                </div>
              </motion.div>
              <span className="text-xs sm:text-sm font-serif font-bold uppercase tracking-widest px-7 py-2.5 rounded-full shadow-lg"
                style={{ color: deepMaroon, background: gold }}>
                Tap to open ✨
              </span>
            </motion.button>
          )}

          {phase === 'opening' && (
            <motion.div className="flex justify-center"
              initial={{ scale: 1 }} animate={{ scale: [1, 1.4, 0], rotate: [0, -15, 15, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 0.85 }}>
              <span className="text-7xl">🎁</span>
            </motion.div>
          )}

          <AnimatePresence>
            {phase === 'open' && (
              <motion.div initial={{ opacity: 0, scale: 0.75, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.45, duration: 0.9 }}
                className="rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: `1px solid ${gold}55` }}>
                <div className="py-4 px-6" style={{ background: `linear-gradient(135deg, ${gold}, #A07840)` }}>
                  <div className="flex items-center justify-center gap-2">
                    <Gift className="w-4 h-4 text-white" />
                    <p className="text-white font-serif text-base sm:text-lg">Couple's Account Details</p>
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-3" style={{ background: creamLight }}>
                  {[
                    { label: 'Account Name', value: 'Oriloye Ifeoluwa Toyosi', copyable: false },
                    { label: 'Account Number', value: '5780005590', copyable: true },
                    { label: 'Bank', value: 'Ecobank Nigeria', copyable: false },
                  ].map(({ label, value, copyable }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="flex items-center justify-between p-3 sm:p-4 rounded-xl"
                      style={{ background: creamMid, border: `1px solid ${gold}33` }}>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wider mb-1" style={{ color: gold }}>{label}</p>
                        <p className="font-serif font-semibold text-sm sm:text-base truncate" style={{ color: maroon }}>{value}</p>
                      </div>
                      {copyable && (
                        <button onClick={() => copy(value, label)} className="p-2 rounded-lg ml-2 flex-shrink-0"
                          style={{ background: copied === label ? '#16a34a22' : `${gold}22` }}>
                          {copied === label
                            ? <Check className="w-4 h-4" style={{ color: '#16a34a' }} />
                            : <Copy className="w-4 h-4" style={{ color: gold }} />}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="py-3 px-6 text-center" style={{ background: `${gold}11` }}>
                  <p className="text-xs" style={{ color: `${gold}cc` }}>💛 Thank you for your love and generosity</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ── MAIN APP ──
export default function App() {
  const countdown = useCountdown(WEDDING_DATE);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: creamLight }} className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} className="relative overflow-hidden" style={{ height: '100svh', minHeight: '600px' }}>
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <ImageWithFallback src="/images/first.JPG" alt="Ifeoluwa and Olakunle"
            className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 35%, rgba(74,15,30,0.5) 65%, rgba(74,15,30,0.95) 100%)'
          }} />
        </motion.div>

        {/* Text at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 text-center px-4 pb-8 sm:pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-10 sm:w-16" style={{ background: gold }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: gold }} />
              <div className="h-px w-10 sm:w-16" style={{ background: gold }} />
            </div>
            <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: gold }}>Crowned in Love '26</p>

            <h1 className="text-white font-serif leading-tight mb-1" style={{ fontSize: 'clamp(1.8rem, 6.5vw, 5rem)' }}>
              Ifeoluwa & Olakunle
            </h1>
            <p className="text-white/70 tracking-widest mb-1" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>
              11 — 12 September 2026 · Ado Ekiti
            </p>

            {/* Dynamic tagline */}
            <motion.p className="italic mb-5 text-sm sm:text-base" style={{ color: `${gold}cc` }}
              animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
              "{countdown.days} days until forever begins 🕊️"
            </motion.p>

            {/* Countdown */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Mins', value: countdown.minutes },
                { label: 'Secs', value: countdown.seconds },
              ].map(({ label, value }) => (
                <motion.div key={label}
                  animate={label === 'Secs' ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-center rounded-xl px-2.5 py-2 sm:px-4 sm:py-3"
                  style={{ background: 'rgba(0,0,0,0.45)', border: `1px solid ${gold}66`, minWidth: '52px' }}>
                  <div className="text-lg sm:text-2xl font-bold text-white">{String(value).padStart(2, '0')}</div>
                  <div className="uppercase text-white/60" style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}>{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute z-10 animate-bounce left-1/2 -translate-x-1/2" style={{ bottom: '6.5rem' }}>
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </section>

      {/* ── FAMILIES ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: creamLight }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>With Joy & Gratitude</p>
            <h2 className="font-serif mb-3" style={{ color: maroon, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              The Families Cordially Invite You
            </h2>
            <p className="text-gray-500 mb-8 text-sm">to the solemnization & holy matrimony of their beloved children</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "Bride's Family", names: "Sir Sunday & Lady Deborah Oriloye" },
                { label: "Groom's Family", names: "Mr Olaiya & Late Mrs Oluremi Obasola" },
              ].map((f, i) => (
                <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 28px ${gold}33` }}
                  className="p-6 sm:p-8 rounded-2xl"
                  style={{ background: creamMid, borderTop: `3px solid ${gold}` }}>
                  <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: gold }}>{f.label}</p>
                  <p className="font-serif text-base sm:text-lg" style={{ color: maroon }}>{f.names}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="story" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: maroon }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(${gold} 1px, transparent 1px)`, backgroundSize: '22px 22px' }} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: gold }} />
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Heart className="w-5 h-5" style={{ color: gold, fill: gold }} />
              </motion.div>
              <div className="h-px w-12" style={{ background: gold }} />
            </div>
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>How It All Began</p>
            <h2 className="font-serif mb-8" style={{ color: creamLight, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>Our Story</h2>

            {/* Quote block */}
            <div className="relative px-4 sm:px-8 py-8 rounded-2xl mb-8"
              style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${gold}44` }}>
              <div className="absolute top-4 left-6 text-5xl sm:text-6xl font-serif leading-none opacity-30" style={{ color: gold }}>"</div>
              <p className="font-serif text-base sm:text-lg leading-relaxed pt-4" style={{ color: `${creamLight}dd` }}>
                It began with a fellowship in 2019 — two souls drawn together by faith and something neither could quite explain.
                By 2022, what had quietly bloomed in their hearts could no longer be denied.
                Today, what God joined in a campus hall, He now seals before family, friends, and heaven itself.
              </p>
              <div className="absolute bottom-4 right-6 text-5xl sm:text-6xl font-serif leading-none opacity-30" style={{ color: gold }}>"</div>
            </div>

            <p className="text-sm italic" style={{ color: `${gold}aa` }}>
              Methodist Campus Fellowship, 2019 → Forever, 2026
            </p>

            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-12" style={{ background: gold }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: gold }} />
              <div className="h-px w-12" style={{ background: gold }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COUPLE ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: creamLight }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>The Celebrants</p>
            <h2 className="font-serif mb-10" style={{ color: maroon, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              The Couple
            </h2>

            <div className="flex justify-center items-end gap-4 sm:gap-10 mb-8">
              {[
                { src: '/images/bride.JPG', label: 'The Bride' },
                { src: '/images/groom.JPG', label: 'The Groom' },
              ].map((p, i) => (
                <motion.div key={p.label}
                  initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center gap-2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl"
                    style={{ width: 'clamp(120px, 28vw, 190px)', height: 'clamp(150px, 36vw, 240px)', border: `3px solid ${gold}` }}>
                    <ImageWithFallback src={p.src} alt={p.label}
                      className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
                  </div>
                  <p className="text-xs tracking-[0.25em] uppercase" style={{ color: gold }}>{p.label}</p>
                </motion.div>
              ))}
            </div>

            <ShimmerText text="Ifeoluwa Oluwatomiyosi" size="clamp(1.4rem, 4vw, 2.5rem)" />
            <div className="text-2xl sm:text-3xl my-2" style={{ color: gold }}>&</div>
            <ShimmerText text="Olakunle Oladotun" size="clamp(1.4rem, 4vw, 2.5rem)" />

            <div className="flex items-center justify-center gap-3 mt-6" style={{ color: maroon }}>
              <div className="h-px w-12" style={{ background: maroon, opacity: 0.3 }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: maroon, opacity: 0.3 }} />
              <div className="h-px w-12" style={{ background: maroon, opacity: 0.3 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: creamMid }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>Save the Dates</p>
            <h2 className="font-serif" style={{ color: maroon, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>Wedding Events</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                src: '/images/engagement.JPG', pos: 'center 20%', day: 'Friday', title: 'Engagement',
                details: [
                  { icon: Calendar, text: 'Thursday, 11 September 2026' },
                  { icon: Clock, text: '1:00 PM' },
                  { icon: MapPin, text: 'NULGE Cooperative Hall, Basiri\nOff Old Iyin Road, Ado Ekiti' },
                ],
              },
              {
                src: '/images/white.JPG', pos: 'center 20%', day: 'Saturday', title: 'Church Wedding',
                details: [
                  { icon: Calendar, text: 'Saturday, 12 September 2026' },
                  { icon: Clock, text: '10:00 AM' },
                  { icon: MapPin, text: 'Gospel Methodist Church (GMC), Basiri\nAdjacent Gateway Baptist Church, Ado Ekiti' },
                  { icon: MapPin, text: 'Reception: Cathybee Event Centre, Basiri\nOff Old Iyin Road, Ado-Ekiti\n(Follows immediately)' },
                ],
              },
            ].map((event, i) => (
              <motion.div key={event.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl overflow-hidden shadow-xl group bg-white">
                <div className="w-full overflow-hidden bg-gray-100">
                  <ImageWithFallback src={event.src} alt={event.title}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: event.pos, aspectRatio: '4/3' }} />
                </div>
                <div className="p-5 sm:p-8" style={{ background: creamLight }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-px" style={{ background: gold }} />
                    <p className="text-xs tracking-[0.3em] uppercase" style={{ color: gold }}>{event.day}</p>
                  </div>
                  <h3 className="font-serif mb-4" style={{ color: maroon, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>{event.title}</h3>
                  <div className="space-y-3">
                    {event.details.map(({ icon: Icon, text }, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontSize: '0.85rem' }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRESS CODE ── */}
      <section id="dresscode" className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: deepMaroon }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>What to Wear</p>
            <h2 className="font-serif mb-2" style={{ color: creamLight, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>Dress Code</h2>
            <p className="text-sm italic mb-10" style={{ color: `${gold}99` }}>
              Come correct. The couple will notice 👀
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FlipCard
                day="Friday — Engagement"
                colors={[
                  { bg: 'linear-gradient(135deg,#e91e8c,#c2185b)', label: 'Magenta' },
                  { bg: '#ffffff', label: 'White', border: true },
                ]}
                name="Magenta & White"
                hint="Think rich magenta agbada, gele, or evening wear paired with crisp white accents. Bold, vibrant, and celebratory."
              />
              <FlipCard
                day="Saturday — Wedding"
                colors={[
                  { bg: 'linear-gradient(135deg,#F0D5A8,#C9A96E,#A07840)', label: 'Champagne Gold' },
                  { bg: 'linear-gradient(135deg,#8B1A2F,#6D1A2E,#4A0F1E)', label: 'Maroon' },
                ]}
                name="Champagne Gold & Maroon"
                hint="Elegant champagne gold aso-ebi or formal wear with deep maroon accents. Think silky, regal, and polished."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GIFT ── */}
      <GiftSection />

      {/* ── RSVP ── */}
      <section id="rsvp" className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: creamLight }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Phone className="w-10 h-10 mx-auto mb-4" style={{ color: gold }} />
            </motion.div>
            <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: gold }}>Confirm Attendance</p>
            <h2 className="font-serif mb-2" style={{ color: maroon, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>RSVP</h2>
            <p className="text-sm italic mb-8" style={{ color: `${gold}99` }}>
              The caterer needs a headcount — please don't ghost us 😄
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'Yinka Olaniyi', phone: '08137247155' },
                { name: 'Mrs Mosunmade Ajibola', phone: '08037263956' },
              ].map(({ name, phone }, i) => (
                <motion.a key={phone} href={`tel:${phone}`}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -5, boxShadow: `0 16px 32px ${gold}44` }}
                  className="rounded-2xl p-5 sm:p-6 bg-white shadow-md block text-center transition-shadow"
                  style={{ borderTop: `3px solid ${gold}`, borderBottom: `1px solid ${gold}22` }}>
                  <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ background: `${gold}22` }}>
                    <Phone className="w-4 h-4" style={{ color: gold }} />
                  </div>
                  <p className="font-serif mb-1 text-sm sm:text-base" style={{ color: maroon }}>{name}</p>
                  <p className="font-semibold tracking-wide text-sm" style={{ color: gold }}>{phone}</p>
                  <p className="text-xs text-gray-400 mt-1">Tap to call</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section className="py-16 sm:py-20 px-4 text-center" style={{ background: deepMaroon }}>
        <motion.div {...fadeInUp}>
          <motion.div whileHover={{ scale: 1.04 }} className="mx-auto mb-7 rounded-full overflow-hidden shadow-2xl"
            style={{ width: 'clamp(160px, 40vw, 260px)', height: 'clamp(160px, 40vw, 260px)', border: `4px solid ${gold}` }}>
            <ImageWithFallback src="/images/dance.JPG" alt="Ifeoluwa and Olakunle"
              className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: gold }} />
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart className="w-4 h-4" style={{ color: gold, fill: gold }} />
            </motion.div>
            <div className="h-px w-10" style={{ background: gold }} />
          </div>

          <p className="font-serif text-lg sm:text-xl mb-2" style={{ color: creamLight }}>
            We look forward to celebrating with you
          </p>
          <p className="text-sm mb-3" style={{ color: gold }}>11 — 12 September 2026 · Ado Ekiti</p>
          <p className="text-xs italic mb-5" style={{ color: `${gold}88` }}>
            Built with love, prayers, and a little too much excitement ✨
          </p>
          <p className="text-xs" style={{ color: `${gold}55` }}>© 2026 Crowned in Love '26</p>
        </motion.div>
      </section>
    </div>
  );
}
