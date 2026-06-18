import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Heart, Calendar, MapPin, Phone, Gift, Clock, Copy, Check, Sparkles, Menu, X, ChevronDown, Camera } from 'lucide-react';
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

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  }
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
    { label: 'Story', id: 'story' },
    { label: 'Events', id: 'events' },
    { label: 'Dress Code', id: 'dresscode' },
    { label: 'Gift', id: 'gift' },
    { label: 'RSVP', id: 'rsvp' },
    { label: 'Gallery', id: 'gallery' },
  ];

  const handleLink = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), 50);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? `${deepMaroon}f2` : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? `1px solid ${gold}33` : 'none',
      }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button onClick={() => scrollToId('hero')}
          className="font-serif flex-shrink-0"
          style={{ color: gold, fontSize: 'clamp(1rem, 2.8vw, 1.2rem)' }}>
          Ifeoluwa & Olakunle
        </button>

        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map(l => (
            <button key={l.id} onClick={() => handleLink(l.id)}
              className="tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: `${gold}aa`, fontFamily: 'sans-serif', fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)' }}
              onMouseEnter={e => (e.currentTarget.style.color = gold)}
              onMouseLeave={e => (e.currentTarget.style.color = `${gold}aa`)}>
              {l.label}
            </button>
          ))}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(v => !v)} style={{ color: gold }}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden"
            style={{ background: `${deepMaroon}fc`, borderTop: `1px solid ${gold}33` }}>
            <div className="px-6 py-1 flex flex-col">
              {links.map((l, i) => (
                <motion.button key={l.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleLink(l.id)}
                  className="text-left py-3 text-sm tracking-[0.2em] uppercase"
                  style={{ color: gold, fontFamily: 'sans-serif', borderBottom: i < links.length - 1 ? `1px solid ${gold}1a` : 'none' }}>
                  {l.label}
                </motion.button>
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
          animate={{ y: [0, -480], opacity: [0, 0.7, 0], scale: [0.4, 1, 0.6] }}
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
    <div className="relative inline-block overflow-hidden font-serif" style={{ fontSize: size, color: maroon }}>
      {text}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(105deg, transparent 30%, ${gold}99 50%, transparent 70%)`, backgroundSize: '200% 100%' }}
        animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }} />
    </div>
  );
}

// ── FLIP CARD ──
function FlipCard({ day, colors, name, hint }: { day: string; colors: { bg: string; label: string; border?: boolean }[]; name: string; hint: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="cursor-pointer w-full" style={{ perspective: '1000px', height: '230px' }} onClick={() => setFlipped(v => !v)}>
      <motion.div className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 130 }}
        style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${gold}44`, backfaceVisibility: 'hidden' }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>{day}</p>
          <div className="flex justify-center gap-5 mb-4">
            {colors.map(c => (
              <div key={c.label} className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-xl"
                  style={{ background: c.bg, border: `2px solid ${gold}55`, outline: c.border ? '2px solid #ccc' : 'none' }} />
                <span className="text-xs text-white/50">{c.label}</span>
              </div>
            ))}
          </div>
          <p className="font-serif text-sm sm:text-base mb-2" style={{ color: creamLight }}>{name}</p>
          <p className="text-xs opacity-40" style={{ color: gold }}>Tap for style hint 👆</p>
        </div>
        <div className="absolute inset-0 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center"
          style={{ background: `linear-gradient(135deg, ${gold}25, ${gold}10)`, border: `1px solid ${gold}66`, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <Sparkles className="w-5 h-5 mb-3" style={{ color: gold }} />
          <p className="font-serif text-sm leading-relaxed" style={{ color: creamLight }}>{hint}</p>
          <p className="text-xs mt-4 opacity-40" style={{ color: gold }}>Tap to flip back 👆</p>
        </div>
      </motion.div>
    </div>
  );
}

// ── GALLERY SECTION ──
function GallerySection({ galleryImages }: { galleryImages: { src: string; alt: string }[] }) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'open'>('idle');

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => setPhase('open'), 900);
  };

  const handleClose = () => setPhase('idle');

  return (
    <>
      <section id="gallery" className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${creamMid} 0%, ${creamLight} 100%)` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${gold}15 0%, transparent 70%)` }} />
        <div className="max-w-lg mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <Camera className="w-5 h-5" style={{ color: gold }} />
              </motion.div>
              <p className="text-xs tracking-[0.4em] uppercase" style={{ color: gold }}>Memories in the Making</p>
              <motion.div animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}>
                <Camera className="w-5 h-5" style={{ color: gold }} />
              </motion.div>
            </div>
            <h2 className="font-serif mb-2" style={{ color: maroon, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>Our Moments</h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: `${gold}bb` }}>A visual love story captured in time ✨</p>
            {phase === 'idle' && (
              <motion.button onClick={handleOpen} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="mx-auto flex flex-col items-center gap-4">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-28 h-28 sm:w-32 sm:h-32">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">📸</div>
                  <div className="absolute inset-0 rounded-full" style={{ border: `3px solid ${gold}`, boxShadow: `0 0 30px ${gold}44` }} />
                </motion.div>
                <span className="text-xs sm:text-sm font-serif font-bold uppercase tracking-widest px-7 py-2.5 rounded-full shadow-lg"
                  style={{ color: deepMaroon, background: gold }}>
                  Tap to View ✨
                </span>
              </motion.button>
            )}
            {phase === 'opening' && (
              <motion.div className="flex justify-center"
                initial={{ scale: 1 }} animate={{ scale: [1, 1.4, 0], rotate: [0, -15, 15, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 0.85 }}>
                <span className="text-7xl">📸</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {phase === 'open' && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} onClick={handleClose}
              className="fixed inset-0 z-50 bg-black/70" style={{ backdropFilter: 'blur(4px)' }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] h-[90vh] max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: creamLight }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ background: `linear-gradient(135deg, ${gold}, #A07840)` }}>
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-white" />
                  <p className="text-white font-serif text-lg">Our Gallery</p>
                </div>
                <button onClick={handleClose} className="p-1 rounded-lg hover:bg-white/20" style={{ color: 'white' }}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="overflow-y-auto h-[calc(90vh-60px)] p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {galleryImages.map((img, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }}
                      className="rounded-xl overflow-hidden shadow-md cursor-pointer"
                      style={{ border: `2px solid ${gold}33` }}>
                      <ImageWithFallback src={img.src} alt={img.alt}
                        className="w-full h-40 sm:h-48 object-cover hover:opacity-90 transition-opacity"
                        style={{ objectPosition: 'center top' }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
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
    <section id="gift" className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden"
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
          <p className="text-sm mb-1 leading-relaxed" style={{ color: `${gold}bb` }}>Your presence warms our hearts.</p>
          <p className="text-sm mb-8 italic" style={{ color: `${gold}88` }}>Your gift warms our account 💛</p>

          {phase === 'idle' && (
            <motion.button onClick={handleOpen} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="mx-auto flex flex-col items-center gap-4">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-28 h-28 sm:w-32 sm:h-32">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl">🎀</div>
                <div className="absolute top-0 left-0 right-0 h-9 rounded-t-xl"
                  style={{ background: `linear-gradient(135deg, ${gold}, #A07840)` }}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full opacity-20 bg-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-8 rounded-b-xl overflow-hidden"
                  style={{ background: `linear-gradient(135deg, #8B1A2F, ${deepMaroon})`, border: `2px solid ${gold}66` }}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full opacity-10 bg-white" />
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
                        <p className="font-serif font-semibold text-sm sm:text-base" style={{ color: maroon }}>{value}</p>
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
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const galleryImages = [
    { src: '/images/first.JPG', alt: 'Ifeoluwa and Olakunle' },
    { src: '/images/engagement.JPG', alt: 'Engagement shoot' },
    { src: '/images/white.JPG', alt: 'White outfit shoot' },
    { src: '/images/dance.JPG', alt: 'Dancing together' },
    { src: '/images/bride.JPG', alt: 'The Bride' },
    { src: '/images/groom.JPG', alt: 'The Groom' },
    { src: '/images/couple-casual.JPG', alt: 'Couple casual moment' },
    { src: '/images/bride-portrait.JPG', alt: 'Bride portrait' },
    { src: '/images/groom-portrait.JPG', alt: 'Groom portrait' },
    { src: '/images/couple-traditional.JPG', alt: 'Couple in traditional attire' },
    { src: '/images/couple-closeup.JPG', alt: 'Couple closeup moment' },
    { src: '/images/couple-matching.JPG', alt: 'Couple in matching outfits' },
  ];

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: creamLight }} className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} className="relative flex flex-col items-center justify-center w-full"
        style={{ 
          minHeight: '100svh',
          paddingTop: '64px',
          paddingBottom: '32px',
          background: `linear-gradient(135deg, ${deepMaroon} 0%, ${maroon} 100%)`
        }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex flex-col items-center w-full px-4 sm:px-6"
        >
          {/* Top ornament */}
          <motion.div 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8 sm:w-12" style={{ background: `linear-gradient(to right, transparent, ${gold}88)` }} />
            <Heart className="w-6 h-6 flex-shrink-0" style={{ color: gold, fill: gold }} />
            <div className="h-px w-8 sm:w-12" style={{ background: `linear-gradient(to left, transparent, ${gold}88)` }} />
          </motion.div>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              color: `${gold}e0`,
              fontSize: 'clamp(0.85rem, 2.2vw, 1.1rem)',
              letterSpacing: '0.45em',
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
            Crowned in Love '26
          </motion.p>

          {/* Card container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="w-full max-w-4xl relative mb-5 px-2 sm:px-4"
            style={{
              aspectRatio: '4.2 / 3.2',
              borderRadius: '28px',
              padding: '12px',
              background: `#E8D4B8`,
              boxShadow: `0 24px 64px rgba(0,0,0,0.35)`
            }}
          >
            {/* Image inside card */}
            <div
              className="w-full h-full rounded-2xl overflow-hidden"
              style={{
                background: creamLight,
                boxShadow: `inset 0 1px 3px rgba(0,0,0,0.05)`
              }}
            >
              <motion.div style={{ y: heroImgY }} className="w-full h-full">
                <ImageWithFallback
                  src="/images/first.JPG"
                  alt="Ifeoluwa and Olakunle"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 25%' }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="font-serif text-white text-center"
            style={{ 
              fontSize: 'clamp(2.2rem, 8vw, 4rem)', 
              lineHeight: 1.1, 
              marginBottom: '16px',
              fontWeight: 700,
              letterSpacing: '-0.01em'
            }}>
            Ifeoluwa &amp; Olakunle
          </motion.h1>

          {/* Date & location */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mb-8"
          >
            <p 
              style={{
                color: 'white',
                fontSize: 'clamp(0.85rem, 2.2vw, 1rem)',
                letterSpacing: '0.15em',
                fontFamily: 'sans-serif',
                marginBottom: '6px',
                fontWeight: 300
              }}>
              11 — 12 · September · 2026
            </p>
            <p
              style={{
                color: `${gold}dd`,
                fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
                letterSpacing: '0.12em',
                fontFamily: 'sans-serif',
                fontWeight: 300
              }}>
              Ado Ekiti, Nigeria
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-3 sm:gap-4 flex-wrap mb-6"
          >
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Mins', value: countdown.minutes },
              { label: 'Secs', value: countdown.seconds },
            ].map(({ label, value }, idx) => (
              <motion.div
                key={label}
                animate={idx === 3 ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex flex-col items-center"
                style={{
                  background: `rgba(109,26,46,0.5)`,
                  border: `1.5px solid ${gold}55`,
                  backdropFilter: 'blur(12px)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  minWidth: '60px',
                }}
              >
                <div className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 5.5vw, 2.8rem)', lineHeight: 1, fontWeight: 900 }}>
                  {String(value).padStart(2, '0')}
                </div>
                <div style={{ color: `${gold}88`, fontSize: '0.5rem', letterSpacing: '0.15em', marginTop: '6px', fontFamily: 'sans-serif', textTransform: 'uppercase' as const, fontWeight: 700 }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.8, duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6" style={{ color: 'white' }} />
            </motion.div>
            <motion.p
              style={{
                color: 'white',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                fontFamily: 'sans-serif',
                textTransform: 'uppercase',
                fontWeight: 500
              }}
            >
              Scroll Down
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FAMILIES ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: creamLight }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>With Joy & Gratitude</p>
            <h2 className="font-serif mb-3" style={{ color: maroon, fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>
              The Families Cordially Invite You
            </h2>
            <p className="text-gray-500 mb-8 text-sm">to the solemnization & holy matrimony of their beloved children</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                { label: "Bride's Family", names: "Sir Sunday & Lady Deborah Oriloye" },
                { label: "Groom's Family", names: "Mr Olaiya & Late Mrs Oluremi Obasola" },
              ].map((f, i) => (
                <motion.div key={f.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
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
      <section id="story" className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden" style={{ background: maroon }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(${gold} 1px, transparent 1px)`, backgroundSize: '22px 22px' }} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: gold }} />
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Heart className="w-5 h-5" style={{ color: gold, fill: gold }} />
              </motion.div>
              <div className="h-px w-12" style={{ background: gold }} />
            </div>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>How It All Began</p>
            <h2 className="font-serif mb-8" style={{ color: creamLight, fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>Our Story</h2>
            <div className="relative px-4 sm:px-10 py-8 rounded-2xl mb-6"
              style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${gold}44` }}>
              <div className="absolute top-3 left-5 text-5xl font-serif leading-none opacity-25" style={{ color: gold }}>"</div>
              <p className="font-serif text-sm sm:text-base leading-relaxed pt-4" style={{ color: `${creamLight}dd` }}>
                It began at Methodist Campus fellowship in 2019 — two souls drawn together by faith and something neither could quite explain.
                By 2022, what had quietly bloomed in their hearts could no longer be denied.
                Today, what God joined in a campus hall, He now seals before family, friends, and heaven itself.
              </p>
              <div className="absolute bottom-3 right-5 text-5xl font-serif leading-none opacity-25" style={{ color: gold }}>"</div>
            </div>
            <p className="text-xs italic" style={{ color: `${gold}99` }}>Methodist Campus Fellowship, 2019 → Forever, 2026</p>
          </motion.div>
        </div>
      </section>

      {/* ── COUPLE ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: creamLight }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>The Celebrants</p>
            <div className="flex justify-center items-end gap-4 sm:gap-8 mb-6">
              {[
                { src: '/images/bride.JPG', label: 'The Bride' },
                { src: '/images/groom.JPG', label: 'The Groom' },
              ].map((p, i) => (
                <motion.div key={p.label}
                  initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  whileHover={{ y: -6 }}>
                  <div className="rounded-2xl overflow-hidden shadow-2xl"
                    style={{ width: 'clamp(130px, 30vw, 200px)', height: 'clamp(160px, 38vw, 260px)', border: `3px solid ${gold}` }}>
                    <ImageWithFallback src={p.src} alt={p.label}
                      className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
                  </div>
                </motion.div>
              ))}
            </div>
            <ShimmerText text="Ifeoluwa Oluwatomiyosi" size="clamp(1.3rem, 4vw, 2.2rem)" />
            <div className="text-2xl sm:text-3xl my-2" style={{ color: gold }}>&</div>
            <ShimmerText text="Olakunle Oladotun" size="clamp(1.3rem, 4vw, 2.2rem)" />
          </motion.div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: creamMid }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>Save the Dates</p>
            <h2 className="font-serif" style={{ color: maroon, fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>Wedding Events</h2>
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
                <div className="w-full overflow-hidden">
                  <ImageWithFallback src={event.src} alt={event.title}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: event.pos, aspectRatio: '4/3' }} />
                </div>
                <div className="p-5 sm:p-7" style={{ background: creamLight }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-px" style={{ background: gold }} />
                    <p className="text-xs tracking-[0.3em] uppercase" style={{ color: gold }}>{event.day}</p>
                  </div>
                  <h3 className="font-serif mb-4" style={{ color: maroon, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>{event.title}</h3>
                  <div className="space-y-3">
                    {event.details.map(({ icon: Icon, text }, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontSize: '0.83rem' }}>{text}</p>
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
      <section id="dresscode" className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: deepMaroon }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>What to Wear</p>
            <h2 className="font-serif mb-2" style={{ color: creamLight, fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>Dress Code</h2>
            <p className="text-sm italic mb-8" style={{ color: `${gold}88` }}>Come correct. The couple will notice 👀</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FlipCard
                day="Friday — Engagement"
                colors={[
                  { bg: 'linear-gradient(135deg,#e91e8c,#c2185b)', label: 'Magenta' },
                  { bg: '#ffffff', label: 'White', border: true },
                ]}
                name="Magenta & White"
                hint="Rich magenta agbada, gele, or evening wear paired with crisp white accents. Bold, vibrant, and celebratory."
              />
              <FlipCard
                day="Saturday — Wedding"
                colors={[
                  { bg: 'linear-gradient(135deg,#F0D5A8,#C9A96E,#A07840)', label: 'Champagne Gold' },
                  { bg: 'linear-gradient(135deg,#8B1A2F,#6D1A2E,#4A0F1E)', label: 'Maroon' },
                ]}
                name="Champagne Gold & Maroon"
                hint="Elegant champagne gold aso-ebi or formal wear with deep maroon accents. Silky, regal, and polished."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GIFT ── */}
      <GiftSection />

      {/* ── RSVP ── */}
      <section id="rsvp" className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: creamLight }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Phone className="w-10 h-10 mx-auto mb-4" style={{ color: gold }} />
            </motion.div>
            <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: gold }}>Confirm Attendance</p>
            <h2 className="font-serif mb-2" style={{ color: maroon, fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>RSVP</h2>
            <p className="text-sm italic mb-8" style={{ color: `${gold}99` }}>
              The caterer needs a headcount — please don't ghost us 😄
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                { name: 'Yinka Olaniyi', phone: '08137247155' },
                { name: 'Mrs Mosunmade Ajibola', phone: '08037263956' },
              ].map(({ name, phone }, i) => (
                <motion.a key={phone} href={`tel:${phone}`}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -5, boxShadow: `0 16px 32px ${gold}44` }}
                  className="rounded-2xl p-5 sm:p-6 bg-white shadow-md block text-center"
                  style={{ borderTop: `3px solid ${gold}` }}>
                  <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center"
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

      {/* ── GALLERY ── */}
      <GallerySection galleryImages={galleryImages} />

      {/* ── FOOTER ── */}
      <section className="py-12 sm:py-16 px-4 text-center" style={{ background: deepMaroon }}>
        <motion.div {...fadeInUp}>
          <motion.div whileHover={{ scale: 1.04 }} className="mx-auto mb-7 rounded-full overflow-hidden shadow-2xl"
            style={{ width: 'clamp(150px, 38vw, 240px)', height: 'clamp(150px, 38vw, 240px)', border: `4px solid ${gold}` }}>
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
          <p className="font-serif text-base sm:text-xl mb-2" style={{ color: creamLight }}>
            We look forward to celebrating with you
          </p>
          <p className="text-sm mb-3" style={{ color: gold }}>11 — 12 September 2026 · Ado Ekiti</p>
          <p className="text-xs italic mb-5" style={{ color: `${gold}77` }}>
            Built with love, prayers, and a little too much excitement ✨
          </p>
          <p className="text-xs" style={{ color: `${gold}44` }}>© 2026 Crowned in Love '26</p>
        </motion.div>
      </section>
    </div>
  );
}
