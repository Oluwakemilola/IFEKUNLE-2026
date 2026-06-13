import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Heart, Calendar, MapPin, Phone, Gift, Clock, ChevronDown, Copy, Check, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const WEDDING_DATE = new Date('2026-09-11T15:00:00');

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
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map(i => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${8 + i * 8}%`, bottom: '-20px' }}
          animate={{ y: [0, -600], opacity: [0, 1, 1, 0], scale: [0.5, 1, 0.8] }}
          transition={{ duration: 4 + (i % 3), delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
        >
          <Heart className="w-4 h-4" style={{ color: i % 2 === 0 ? '#C9A96E' : '#8B1A2F', fill: i % 2 === 0 ? '#C9A96E' : '#8B1A2F' }} />
        </motion.div>
      ))}
    </div>
  );
}

function GiftSection({ gold, maroon, creamLight, creamMid }: { gold: string; maroon: string; creamLight: string; creamMid: string }) {
  const [showGiftDetails, setShowGiftDetails] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setShowGiftDetails(true), 800);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${maroon} 0%, #8B1A2F 50%, #4A0F1E 100%)` }}>
      <FloatingHearts />

      {/* Glowing orb background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${gold}22 0%, transparent 70%)` }} />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Sparkle header */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Sparkles className="w-6 h-6" style={{ color: gold }} />
            </motion.div>
            <p className="text-xs tracking-[0.4em] uppercase" style={{ color: gold }}>A Gift from the Heart</p>
            <motion.div animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
              <Sparkles className="w-6 h-6" style={{ color: gold }} />
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#FDF8F0' }}>Bless the Couple</h2>
          <p className="mb-10 leading-relaxed" style={{ color: `${gold}cc`, fontSize: '0.95rem' }}>
            Your presence is our greatest joy. If you wish to honour us<br />with a monetary gift, we would be deeply grateful.
          </p>

          {/* Gift box button */}
          {!opened && (
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative mx-auto block"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-3"
              >
                {/* Gift box graphic */}
                <div className="relative w-32 h-32">
                  {/* Box lid */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute top-0 left-0 right-0 h-10 rounded-t-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${gold}, #A07840)` }}
                  >
                    <div className="w-full h-1 rounded-full" style={{ background: '#FDF8F0', opacity: 0.5 }} />
                  </motion.div>
                  {/* Ribbon vertical */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-3 rounded" style={{ background: '#FDF8F0', opacity: 0.3 }} />
                  {/* Box body */}
                  <div className="absolute bottom-0 left-0 right-0 top-8 rounded-b-lg" style={{ background: `linear-gradient(135deg, #8B1A2F, #4A0F1E)`, border: `2px solid ${gold}66` }} />
                  {/* Ribbon horizontal */}
                  <div className="absolute left-0 right-0 top-8 h-3" style={{ background: '#FDF8F0', opacity: 0.3 }} />
                  {/* Bow */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span style={{ fontSize: '1.6rem' }}>🎀</span>
                  </div>
                </div>
                <span className="text-sm font-serif px-6 py-2 rounded-full" style={{ color: '#FDF8F0', border: `1px solid ${gold}66`, background: 'rgba(255,255,255,0.08)' }}>
                  Tap to open ✨
                </span>
              </motion.div>
            </motion.button>
          )}

          {/* Opening animation */}
          {opened && !showGiftDetails && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.3, 0], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="text-6xl">🎁</div>
            </motion.div>
          )}

          {/* Account details */}
          <AnimatePresence>
            {showGiftDetails && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
                className="rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: `1px solid ${gold}55` }}
              >
                {/* Header */}
                <div className="py-5 px-8" style={{ background: `linear-gradient(135deg, ${gold}, #A07840)` }}>
                  <div className="flex items-center justify-center gap-2">
                    <Gift className="w-5 h-5 text-white" />
                    <p className="text-white font-serif text-lg">Bride's Account Details</p>
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Account rows */}
                <div className="p-6 space-y-3" style={{ background: creamLight }}>
                  {[
                    { label: 'Account Name', value: 'Oriloye Ifeoluwa Toyosi', copyable: false },
                    { label: 'Account Number', value: '5780005590', copyable: true },
                    { label: 'Bank', value: 'Ecobank Nigeria', copyable: false },
                  ].map(({ label, value, copyable }) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{ background: creamMid, border: `1px solid ${gold}33` }}
                    >
                      <div className="text-left">
                        <p className="text-xs uppercase tracking-wider mb-1" style={{ color: gold }}>
                          {label}
                        </p>
                        <p className="font-serif font-semibold text-lg" style={{ color: maroon }}>
                          {value}
                        </p>
                      </div>
                      {copyable && (
                        <button
                          onClick={() => copyToClipboard(value, label)}
                          className="p-2 rounded-lg transition-all"
                          style={{ background: copied === label ? '#16a34a22' : `${gold}22` }}
                        >
                          {copied === label
                            ? <Check className="w-5 h-5" style={{ color: '#16a34a' }} />
                            : <Copy className="w-5 h-5" style={{ color: gold }} />
                          }
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Footer note */}
                <div className="py-4 px-8 text-center" style={{ background: `${gold}11` }}>
                  <p className="text-xs" style={{ color: `${gold}cc` }}>
                    💛 Thank you for your love and generosity
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const countdown = useCountdown(WEDDING_DATE);

  const gold = '#C9A96E';
  const maroon = '#6D1A2E';
  const deepMaroon = '#4A0F1E';
  const creamLight = '#FDF8F0';
  const creamMid = '#F5ECD9';

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, ease: 'easeOut' }
  };

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: i * 0.15 }
  });

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: creamLight }} className="min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-end overflow-hidden pb-12">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <ImageWithFallback
            src="/images/first.JPG"
            alt="Ifeoluwa and Olakunle"
            className="w-full h-full object-cover object-top"
          />
          {/* Lighter top, darker bottom so faces visible, text readable */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(74,15,30,0.10) 0%, rgba(74,15,30,0.05) 35%, rgba(74,15,30,0.55) 70%, rgba(74,15,30,0.88) 100%)'
          }} />
        </motion.div>

        <div className="relative z-10 text-center px-6 w-full max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16" style={{ background: gold }} />
              <div className="w-2 h-2 rounded-full" style={{ background: gold }} />
              <div className="h-px w-16" style={{ background: gold }} />
            </div>
            <p className="text-xs tracking-[0.45em] uppercase mb-3" style={{ color: gold }}>Crowned in Love '26</p>
            <h1 className="text-white font-serif leading-tight mb-1" style={{ fontSize: 'clamp(2.4rem, 8vw, 5.5rem)' }}>
              Ifeoluwa & Olakunle
            </h1>
            <p className="tracking-widest text-white/75 mb-1" style={{ fontSize: '1rem' }}>11 — 12 September 2026</p>
            <p className="text-sm tracking-wider mb-6" style={{ color: gold }}>Ado Ekiti, Nigeria</p>
          </motion.div>

          {/* Countdown */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="flex justify-center gap-3">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Mins', value: countdown.minutes },
              { label: 'Secs', value: countdown.seconds },
            ].map(({ label, value }) => (
              <motion.div
                key={label}
                animate={{ scale: label === 'Secs' ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-center px-3 py-2 rounded-xl"
                style={{ background: 'rgba(0,0,0,0.40)', border: `1px solid ${gold}66`, minWidth: '62px' }}
              >
                <div className="text-2xl font-bold text-white">{String(value).padStart(2, '0')}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: gold }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* ── FAMILIES ── */}
      <section className="py-20 px-6" style={{ background: creamLight }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>With Joy & Gratitude</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-3" style={{ color: maroon }}>
              The Families Cordially Invite You
            </h2>
            <p className="text-gray-500 mb-10 text-sm">to the solemnization & holy matrimony of their beloved children</p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Bride's Family", names: "Sir Sunday & Lady Deborah Oriloye" },
                { label: "Groom's Family", names: "Mr Olaiya & Late Mrs Oluremi Obasola" },
              ].map((f, i) => (
                <motion.div key={f.label} {...stagger(i)} className="p-8 rounded-2xl"
                  style={{ background: creamMid, borderTop: `3px solid ${gold}` }}
                  whileHover={{ y: -4, boxShadow: `0 12px 30px ${gold}33` }}
                  transition={{ type: 'spring', stiffness: 300 }}>
                  <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: gold }}>{f.label}</p>
                  <p className="text-lg font-serif" style={{ color: maroon }}>{f.names}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COUPLE ── */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: maroon }}>
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(${gold} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-16" style={{ background: gold }} />
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Heart className="w-5 h-5" style={{ color: gold, fill: gold }} />
              </motion.div>
              <div className="h-px w-16" style={{ background: gold }} />
            </div>

            {/* Two portrait photos */}
            <div className="flex justify-center items-center gap-6 md:gap-12 mb-10">
              {[
                { src: '/images/bride.JPG', label: 'The Bride', name: 'Ifeoluwa' },
                { src: '/images/groom.JPG', label: 'The Groom', name: 'Olakunle' },
              ].map((p, i) => (
                <motion.div key={p.label}
                  initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-36 h-44 md:w-44 md:h-56 rounded-2xl overflow-hidden shadow-2xl"
                    style={{ border: `3px solid ${gold}` }}>
                    <ImageWithFallback src={p.src} alt={p.name}
                      className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-xs tracking-[0.25em] uppercase" style={{ color: gold }}>{p.label}</p>
                </motion.div>
              ))}
            </div>

            <h2 className="font-serif mb-2" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#FDF8F0' }}>
              Ifeoluwa Oluwatomiyosi
            </h2>
            <div className="text-3xl my-2" style={{ color: gold }}>&</div>
            <h2 className="font-serif mb-8" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#FDF8F0' }}>
              Olakunle Oladotun
            </h2>

            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ background: gold }} />
              <div className="w-2 h-2 rounded-full" style={{ background: gold }} />
              <div className="h-px w-16" style={{ background: gold }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section className="py-20 px-6" style={{ background: creamLight }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>Save the Dates</p>
            <h2 className="text-3xl md:text-4xl font-serif" style={{ color: maroon }}>Wedding Events</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                src: '/images/engagement.JPG',
                day: 'Friday',
                title: 'Engagement',
                details: [
                  { icon: Calendar, text: 'Thursday, 11 September 2026' },
                  { icon: Clock, text: '3:00 PM' },
                  { icon: MapPin, text: 'NULGE Cooperative Hall, Basiri\nOff Old Iyin Road, Ado Ekiti' },
                ],
              },
              {
                src: '/images/white.JPG',
                day: 'Saturday',
                title: 'Church Wedding',
                details: [
                  { icon: Calendar, text: 'Saturday, 12 September 2026' },
                  { icon: Clock, text: '10:00 AM' },
                  { icon: MapPin, text: 'Gospel Methodist Church (GMC), Basiri\nAdjacent Gateway Baptist Church, Ado Ekiti' },
                  { icon: MapPin, text: 'Reception: Cathybee Event Centre, Basiri\nOff Old Iyin Road, Ado-Ekiti\n(Follows immediately)' },
                ],
              },
            ].map((event, i) => (
              <motion.div key={event.title} {...stagger(i)}
                className="rounded-2xl overflow-hidden shadow-xl group"
                whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 250 }}>
                <div className="overflow-hidden" style={{ height: '300px' }}>
                  <ImageWithFallback src={event.src} alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: 'center 20%' }} />
                </div>
                <div className="p-8" style={{ background: creamMid }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-px" style={{ background: gold }} />
                    <p className="text-xs tracking-[0.3em] uppercase" style={{ color: gold }}>{event.day}</p>
                  </div>
                  <h3 className="text-2xl font-serif mb-5" style={{ color: maroon }}>{event.title}</h3>
                  <div className="space-y-3">
                    {event.details.map(({ icon: Icon, text }, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: gold }} />
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{text}</p>
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
      <section className="py-20 px-6" style={{ background: deepMaroon }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>What to Wear</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-14" style={{ color: '#FDF8F0' }}>Dress Code</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  day: 'Friday — Engagement',
                  colors: [
                    { bg: 'linear-gradient(135deg,#e91e8c,#c2185b)', label: 'Magenta' },
                    { bg: '#ffffff', label: 'White' },
                  ],
                  name: 'Magenta & White',
                },
                {
                  day: 'Saturday — Wedding',
                  colors: [
                    { bg: 'linear-gradient(135deg,#F0D5A8,#C9A96E,#A07840)', label: 'Champagne Gold' },
                    { bg: 'linear-gradient(135deg,#8B1A2F,#6D1A2E,#4A0F1E)', label: 'Maroon' },
                  ],
                  name: 'Champagne Gold & Maroon',
                },
              ].map((dc, i) => (
                <motion.div key={dc.day} {...stagger(i)}
                  className="rounded-2xl p-8"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${gold}44` }}
                  whileHover={{ background: 'rgba(255,255,255,0.10)' }}>
                  <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: gold }}>{dc.day}</p>
                  <div className="flex justify-center gap-6 mb-5">
                    {dc.colors.map(c => (
                      <div key={c.label} className="flex flex-col items-center gap-2">
                        <motion.div whileHover={{ scale: 1.15, rotate: 5 }}
                          className="w-20 h-20 rounded-full shadow-xl"
                          style={{ background: c.bg, border: `2px solid ${gold}55` }} />
                        <span className="text-xs text-white/60">{c.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-serif text-lg" style={{ color: '#FDF8F0' }}>{dc.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GIFT ── */}
      <GiftSection gold={gold} maroon={maroon} creamLight={creamLight} creamMid={creamMid} />

      {/* ── RSVP ── */}
      <section className="py-20 px-6" style={{ background: creamMid }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Phone className="w-12 h-12 mx-auto mb-5" style={{ color: gold }} />
            </motion.div>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>Confirm Attendance</p>
            <h2 className="text-3xl font-serif mb-4" style={{ color: maroon }}>RSVP</h2>
            <p className="text-gray-500 text-sm mb-10">Please reach out to any of our coordinators to confirm your attendance</p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'Yinka Olaniyi', phone: '08137247155' },
                { name: 'Mrs Mosunmade Ajibola', phone: '08037263956' },
              ].map(({ name, phone }, i) => (
                <motion.a key={phone} href={`tel:${phone}`} {...stagger(i)}
                  whileHover={{ y: -4, boxShadow: `0 12px 30px ${gold}44` }}
                  className="rounded-2xl p-6 bg-white shadow-md block"
                  style={{ borderTop: `3px solid ${gold}` }}>
                  <p className="font-serif mb-1" style={{ color: maroon }}>{name}</p>
                  <p className="text-sm font-semibold tracking-wide" style={{ color: gold }}>{phone}</p>
                  <p className="text-xs text-gray-400 mt-2">Tap to call</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section className="py-20 px-6 text-center" style={{ background: deepMaroon }}>
        <motion.div {...fadeInUp}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden mb-8 shadow-2xl"
            style={{ border: `4px solid ${gold}` }}
          >
            <ImageWithFallback
              src="/images/dance.JPG"
              alt="Ifeoluwa and Olakunle"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center top' }}
            />
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background: gold }} />
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart className="w-5 h-5" style={{ color: gold, fill: gold }} />
            </motion.div>
            <div className="h-px w-12" style={{ background: gold }} />
          </div>

          <p className="font-serif text-xl mb-2" style={{ color: '#FDF8F0' }}>We look forward to celebrating with you</p>
          <p className="text-sm mb-6" style={{ color: gold }}>11 — 12 September 2026 · Ado Ekiti</p>
          <p className="text-xs" style={{ color: gold + '77' }}>© 2026 Crowned in Love '26</p>
        </motion.div>
      </section>

    </div>
  );
}