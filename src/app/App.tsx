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

// ── SMOOTH SCROLL HELPER ──
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 64; // navbar height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
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
    { label: 'Gallery', id: 'gallery' },
    { label: 'Events', id: 'events' },
    { label: 'Dress Code', id: 'dresscode' },
    { label: 'Gift', id: 'gift' },
    { label: 'RSVP', id: 'rsvp' },
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
        {/* Logo */}
        <button onClick={() => scrollToId('hero')}
          className="font-serif text-left leading-tight flex-shrink-0"
          style={{ color: gold, fontSize: 'clamp(0.8rem, 2.2vw, 1rem)', letterSpacing: '0.01em' }}>
          Ifeoluwa & Olakunle
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map(l => (
            <button key={l.id} onClick={() => handleLink(l.id)}
              className="text-xs tracking-[0.15em] uppercase transition-all duration-200 hover:opacity-100"
              style={{ color: `${gold}bb`, fontFamily: 'sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.color = gold)}
              onMouseLeave={e => (e.currentTarget.style.color = `${gold}bb`)}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2 rounded-lg" onClick={() => setOpen(v => !v)}
          style={{ color: gold, background: open ? `${gold}22` : 'transparent' }}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{ background: `${deepMaroon}fa`, borderTop: `1px solid ${gold}33` }}>
            <div className="px-6 py-2 flex flex-col">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleLink(l.id)}
                  className="text-left py-3 text-sm tracking-[0.2em] uppercase"
                  style={{
                    color: gold,
                    fontFamily: 'sans-serif',
                    borderBottom: i < links.length - 1 ? `1px solid ${gold}22` : 'none'
                  }}>
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
        {/* Front */}
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
        {/* Back */}
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
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'opening' | 'open'>('idle');

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => setPhase('open'), 900);
    setIsOpen(true);
  };

  const handleClose = () => {
    setPhase('idle');
    setIsOpen(false);
  };

  return (
    <>
      {/* Tap to View Gallery Section */}
      <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
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
                  <div className="absolute inset-0 rounded-full"
                    style={{ border: `3px solid ${gold}`, boxShadow: `0 0 30px ${gold}44` }} />
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

      {/* Gallery Modal Overlay */}
      <AnimatePresence>
        {phase === 'open' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
              className="fixed inset-0 z-50 bg-black/70"
              style={{ backdropFilter: 'blur(4px)' }}
            />

            {/* Gallery Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] h-[90vh] max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: creamLight }}>
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4" style={{ background: `linear-gradient(135deg, ${gold}, #A07840)` }}>
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-white" />
                  <p className="text-white font-serif text-lg">Our Gallery</p>
                </div>
                <button onClick={handleClose}
                  className="p-1 rounded-lg transition-all hover:bg-white/20"
                  style={{ color: 'white' }}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="overflow-y-auto h-[calc(90vh-60px)] p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {galleryImages.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
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
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  // Gallery images — add your own paths here
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
      <section id="hero" ref={heroRef} className="relative overflow-hidden" style={{ height: '100svh', minHeight: '600px', background: deepMaroon }}>
        {/* Image contained — portrait-cropped, not stretching edge to edge on wide screens */}
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <div className="absolute inset-0 max-w-xl mx-auto left-0 right-0">
            <ImageWithFallback src="/images/first.JPG" alt="Ifeoluwa and Olakunle"
              className="w-full h-full object-cover" style={{ objectPosition: '50% 15%' }} />
          </div>
          {/* Vertical fade */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(74,15,30,0.18) 0%, rgba(0,0,0,0.0) 22%, rgba(74,15,30,0.42) 58%, rgba(74,15,30,0.97) 100%)'
          }} />
          {/* Side vignettes — frames photo on desktop */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-48 lg:w-64" style={{ background: `linear-gradient(to right, ${deepMaroon}, transparent)` }} />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-48 lg:w-64" style={{ background: `linear-gradient(to left, ${deepMaroon}, transparent)` }} />
        </motion.div>

        {/* Text pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 text-center px-4 pb-8 sm:pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-10 sm:w-16" style={{ background: gold }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: gold }} />
              <div className="h-px w-10 sm:w-16" style={{ background: gold }} />
            </div>
            <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: gold }}>Crowned in Love '26</p>
            <h1 className="text-white font-serif leading-tight mb-1" style={{ fontSize: 'clamp(1.9rem, 6.5vw, 5rem)' }}>
              Ifeoluwa & Olakunle
            </h1>
            <p className="text-white/65 tracking-widest mb-5" style={{ fontSize: 'clamp(0.72rem, 2vw, 0.95rem)' }}>
              11 — 12 September 2026 · Ado Ekiti
            </p>
            <div className="flex justify-center gap-2 sm:gap-3">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Mins', value: countdown.minutes },
                { label: 'Secs', value: countdown.seconds },
              ].map(({ label, value }) => (
                <motion.div key={label}
                  animate={label === 'Secs' ? { scale: [1, 1.07, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-center rounded-xl px-3 py-2.5 sm:px-4 sm:py-3"
                  style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${gold}55`, minWidth: '54px' }}>
                  <div className="text-xl sm:text-2xl font-bold text-white">{String(value).padStart(2, '0')}</div>
                  <div className="uppercase" style={{ color: `${gold}99`, fontSize: '0.5rem', letterSpacing: '0.15em', marginTop: '2px' }}>{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute z-10 animate-bounce left-1/2 -translate-x-1/2" style={{ bottom: '8rem' }}>
          <ChevronDown className="w-5 h-5 text-white/70" />
        </motion.div>
      </section>

      {/* ── FAMILIES ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: creamLight }}>
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
      <section id="story" className="py-14 sm:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: maroon }}>
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
      <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: creamLight }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>The Celebrants</p>

            <div className="flex justify-center items-end gap-4 sm:gap-8 mb-8">
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
                    style={{
                      width: 'clamp(130px, 30vw, 200px)',
                      height: 'clamp(160px, 38vw, 260px)',
                      border: `3px solid ${gold}`
                    }}>
                    <ImageWithFallback src={p.src} alt={p.label}
                      className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Names with shimmer — NO labels under photos */}
            <ShimmerText text="Ifeoluwa Oluwatomiyosi" size="clamp(1.3rem, 4vw, 2.2rem)" />
            <div className="text-2xl sm:text-3xl my-2" style={{ color: gold }}>&</div>
            <ShimmerText text="Olakunle Oladotun" size="clamp(1.3rem, 4vw, 2.2rem)" />
          </motion.div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: creamLight }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
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
      <section id="dresscode" className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: deepMaroon }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>What to Wear</p>
            <h2 className="font-serif mb-2" style={{ color: creamLight, fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>Dress Code</h2>
            <p className="text-sm italic mb-10" style={{ color: `${gold}88` }}>Come correct. The couple will notice 👀</p>
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

      {/* ── GALLERY MODAL ── */}
      <GallerySection galleryImages={galleryImages} />

      {/* ── RSVP ── */}
      <section id="rsvp" className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: creamLight }}>
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

      {/* ── FOOTER ── */}
      <section className="py-14 sm:py-20 px-4 text-center" style={{ background: deepMaroon }}>
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