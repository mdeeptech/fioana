import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Banner Assets ────────────────────────────────────────────────────────────
const BANNERS: { src: string; caption: string; aspectRatio: number }[] = [
  { src: new URL('../../../assets/banner2.png', import.meta.url).href, caption: 'HAIR & MAKEUP', aspectRatio: 1.5 },
  { src: new URL('../../../assets/banner4.png', import.meta.url).href, caption: 'PROFESSIONAL TRAINING', aspectRatio: 1.5 },
  { src: new URL('../../../assets/banner1.png', import.meta.url).href, caption: 'BEAUTY EDUCATION', aspectRatio: 2 },
  { src: new URL('../../../assets/banner3.png', import.meta.url).href, caption: 'SKIN & AESTHETICS', aspectRatio: 1.776 },
];
const TOTAL = BANNERS.length;

// ─── Scroll Budget ─────────────────────────────────────────────────────────────
// Each banner "occupies" SCROLL_PER_BANNER px of scroll inside the hero zone.
const SCROLL_PER_BANNER = 320;
const HERO_SCROLL_HEIGHT = SCROLL_PER_BANNER * TOTAL;

// ─── Framer Motion ───────────────────────────────────────────────────────────
const captionVariants = {
  initial: { opacity: 0, y:  8 },
  animate: { opacity: 1, y:  0, transition: { duration: 0.45, delay: 0.15 } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.30 } },
};

// ─── Hook: detect if viewport is "mobile" (< 1024px) ─────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// ─── Marquee items ───────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'FIONA BEAUTY ACADEMY', '✦',
  'PROFESSIONAL BEAUTY EDUCATION', '✦',
  'TRANSFORMING PASSION INTO PROFESSION', '✦',
  'HAIR • MAKEUP • SKIN • AESTHETICS', '✦',
  'WELLNESS & COSMETOLOGY', '✦',
  'INDUSTRY-ORIENTED TRAINING', '✦',
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  // Preload next banner
  useEffect(() => {
    const next = (activeIndex + 1) % TOTAL;
    const img  = new Image();
    img.src    = BANNERS[next].src;
  }, [activeIndex]);

  // Scroll-driven banner index
  const handleScroll = useCallback(() => {
    const el = outerRef.current;
    if (!el) return;
    const scrolled = -el.getBoundingClientRect().top;
    if (scrolled < 0) return;
    const clamped = Math.min(
      Math.floor(Math.min(scrolled / HERO_SCROLL_HEIGHT, 1) * TOTAL),
      TOTAL - 1
    );
    setActiveIndex(clamped);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const banner = BANNERS[activeIndex];

  const scrollToBanner = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * SCROLL_PER_BANNER + 4, behavior: 'smooth' });
  };

  return (
    <div
      ref={outerRef}
      style={{ height: `calc(100svh + ${HERO_SCROLL_HEIGHT}px)` }}
      aria-label="Fiona Beauty Academy Hero"
    >
      {/* ── STICKY VIEWPORT ─────────────────────────────────────────── */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{
          height: isMobile ? 'auto' : '100svh',
          minHeight: isMobile ? 'auto' : '600px',
          background: isMobile ? `
            radial-gradient(circle at 70% 35%, rgba(212,175,98,0.10), transparent 35%),
            linear-gradient(180deg, #170812 0%, #2A0718 45%, #4A1028 100%)
          ` : `
            radial-gradient(circle at 72% 32%, rgba(126,26,62,0.52), transparent 44%),
            radial-gradient(circle at 18% 78%, rgba(91,13,42,0.40), transparent 42%),
            radial-gradient(circle at 50% 50%, rgba(42,7,24,0.30), transparent 70%),
            linear-gradient(135deg, #12060B 0%, #2A0A16 38%, #4A0B22 65%, #1C0610 100%)
          `,
        }}
      >
        {/* Grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1, opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />

        {/* Gold glow */}
        <div aria-hidden="true" className="absolute pointer-events-none" style={{ zIndex: 1, top: '-10%', right: '-8%', width: '65%', height: '65%', background: 'radial-gradient(circle at 65% 35%, rgba(212,175,98,0.09), transparent 55%)' }} />

        {/* Decorative circles — desktop only */}
        {!isMobile && (
          <>
            <div aria-hidden="true" className="absolute pointer-events-none" style={{ zIndex: 1, right: '-5vw', top: '5vh', width: 'clamp(400px, 52vw, 780px)', height: 'clamp(400px, 52vw, 780px)', border: '1px solid rgba(212,175,98,0.08)', borderRadius: '50%' }} />
            <div aria-hidden="true" className="absolute pointer-events-none" style={{ zIndex: 1, right: '2vw', top: '18vh', width: 'clamp(200px, 28vw, 420px)', height: 'clamp(200px, 28vw, 420px)', border: '1px solid rgba(212,175,98,0.05)', borderRadius: '50%' }} />
          </>
        )}

        {/* Vignette */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'radial-gradient(ellipse at center, transparent 38%, rgba(9,3,7,0.58) 100%)' }} />

        {/* ── CONTENT ─────────────────────────────────────────────── */}
        <div
          className="relative w-full flex flex-col"
          style={{ 
            zIndex: 10, 
            paddingTop: isMobile ? '60px' : 'clamp(76px, 9vh, 108px)',
            height: isMobile ? 'auto' : '100%',
          }}
        >
          {isMobile ? (
            <MobileLayout
              banner={banner}
              activeIndex={activeIndex}
              scrollToBanner={scrollToBanner}
            />
          ) : (
            <DesktopLayout
              banner={banner}
              activeIndex={activeIndex}
              scrollToBanner={scrollToBanner}
            />
          )}

          {/* ── MARQUEE ─────────────────────────────────────────── */}
          <div
            aria-label="Fiona Beauty Academy announcement strip"
            style={{
              width: '100%', overflow: 'hidden',
              backgroundColor: '#200714',
              borderTop:    '1px solid rgba(212,175,98,0.25)',
              borderBottom: '1px solid rgba(212,175,98,0.25)',
              height: isMobile ? '30px' : 'clamp(32px, 3.8vh, 42px)',
              display: 'flex', alignItems: 'center', flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                animation: 'heroMarquee 30s linear infinite',
                willChange: 'transform',
              }}
            >
              {[0, 1].map(copy => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  {MARQUEE_ITEMS.map((item, i) => (
                    <span key={i} style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: isMobile ? '8px' : 'clamp(8px, 0.8vw, 11px)',
                      letterSpacing: '0.12em',
                      fontWeight: item === '✦' ? 400 : 500,
                      color: item === '✦' ? 'rgba(212,175,98,0.50)' : 'rgba(248,243,234,0.70)',
                      textTransform: 'uppercase',
                      padding: item === '✦' ? '0 14px' : '0 6px',
                      lineHeight: 1, flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP LAYOUT  (≥ 1024px)  — split left/right
// ─────────────────────────────────────────────────────────────────────────────
function DesktopLayout({
  banner, activeIndex, scrollToBanner,
}: {
  banner: { src: string; caption: string; aspectRatio: number };
  activeIndex: number;
  scrollToBanner: (i: number) => void;
}) {
  return (
    <div
      className="flex-1 flex flex-row items-center"
      style={{
        paddingLeft:   'clamp(32px, 6vw, 96px)',
        paddingRight:  'clamp(24px, 5vw, 72px)',
        paddingBottom: 'clamp(12px, 2vh, 24px)',
        gap:           'clamp(24px, 4vw, 56px)',
        overflow:      'hidden',
      }}
    >
      {/* LEFT */}
      <div className="flex flex-col justify-center shrink-0" style={{ width: 'min(44%, 520px)', minWidth: '280px' }}>
        <EditorialContent />
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-end relative" style={{ minWidth: 0 }}>
        {/* Offset backing frame */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          right:    '-10px',
          bottom:   '-10px',
          width:    'min(54vw, 740px)',
          aspectRatio: banner.aspectRatio,
          border:   '1px solid rgba(212,175,98,0.16)',
          borderRadius: '7px',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Card */}
        <div style={{
          position: 'relative',
          width:    'min(54vw, 740px)',
          aspectRatio: banner.aspectRatio,
          borderRadius: '7px',
          overflow: 'hidden',
          background: '#12060B',
          border:   '1px solid rgba(212,175,98,0.26)',
          boxShadow:'0 32px 80px rgba(0,0,0,0.40), inset 0 1px 0 rgba(212,175,98,0.10)',
          zIndex: 1, flexShrink: 0,
        }}>
          <BannerImage banner={banner} activeIndex={activeIndex} />
          <BannerOverlays banner={banner} activeIndex={activeIndex} />
        </div>

        {/* Progress — right of card */}
        <div
          role="status"
          aria-live="polite"
          aria-label={`Banner ${activeIndex + 1} of ${TOTAL}`}
          style={{
            position: 'absolute', right: '-28px', top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '8px', zIndex: 20,
          }}
        >
          <ProgressDots activeIndex={activeIndex} scrollToBanner={scrollToBanner} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT  (< 1024px)  — stacked: banner → headline → body → CTAs
// ─────────────────────────────────────────────────────────────────────────────
function MobileLayout({
  banner, activeIndex, scrollToBanner,
}: {
  banner: { src: string; caption: string; aspectRatio: number };
  activeIndex: number;
  scrollToBanner: (i: number) => void;
}) {
  return (
    <div className="flex-1 flex flex-col" style={{ padding: '0 16px 36px', gap: '0', overflow: 'hidden' }}>

      {/* ── BANNER CARD ── */}
      <div style={{ position: 'relative', marginTop: '12px' }}>
        <div style={{
          width: '100%',
          aspectRatio: banner.aspectRatio,
          borderRadius: '10px',
          overflow: 'hidden',
          background: '#12060B',
          border:   '1px solid rgba(212,175,98,0.20)',
          boxShadow:'0 12px 32px rgba(0,0,0,0.30)',
          position: 'relative',
        }}>
          <BannerImage banner={banner} activeIndex={activeIndex} />
          <BannerOverlays banner={banner} activeIndex={activeIndex} />
        </div>

        {/* Progress dots — bottom-center of banner on mobile */}
        <div
          role="status"
          aria-live="polite"
          aria-label={`Banner ${activeIndex + 1} of ${TOTAL}`}
          style={{
            position: 'absolute', bottom: '10px', right: '12px',
            display: 'flex', flexDirection: 'row',
            alignItems: 'center', gap: '6px', zIndex: 10,
          }}
        >
          {BANNERS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to banner ${i + 1}: ${BANNERS[i].caption}`}
              onClick={() => scrollToBanner(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px', display: 'flex', alignItems: 'center',
              }}
            >
              <span style={{
                width:  i === activeIndex ? '18px' : '6px',
                height: '2px',
                borderRadius: '2px',
                background: i === activeIndex ? '#D4AF62' : 'rgba(212,175,98,0.30)',
                display: 'block',
                transition: 'width 0.4s ease, background 0.4s ease',
              }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── EDITORIAL TEXT ── */}
      <div className="flex flex-col">
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
          <div aria-hidden="true" style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,98,0.9))', flexShrink: 0 }} />
          <p style={{ fontSize: '8px', letterSpacing: '0.18em', color: '#D4AF62', fontFamily: 'Inter, sans-serif', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, whiteSpace: 'nowrap' }}>
            Fiona Beauty &amp; Wellness Academy
          </p>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1.8rem, 8vw, 2.6rem)',
          fontWeight: 500, lineHeight: 1.05,
          color: '#F8F3EA', letterSpacing: '-0.01em',
          margin: 0, marginTop: '10px',
        }}>
          TRANSFORMING
          <br />
          <span style={{ color: '#D4AF62', fontStyle: 'italic' }}>PASSION</span>
          <br />
          INTO PROFESSION.
        </h1>

        {/* Sub-label */}
        <p style={{
          color: 'rgba(248,243,234,0.70)', fontSize: '8px',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          marginTop: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600,
          lineHeight: 1.4,
        }}>
          Professional beauty education. Practical skills. Real careers.
        </p>

        {/* Body */}
        <p style={{
          color: 'rgba(248,243,234,0.78)', fontSize: '12px',
          lineHeight: 1.55, marginTop: '8px',
          fontFamily: 'Inter, sans-serif', fontWeight: 300,
          maxWidth: '340px'
        }}>
          Build your career in beauty, hair, makeup, skin, aesthetics,
          cosmetology and wellness through practical, industry-oriented training.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
          <Link
            to="/courses"
            id="hero-explore-courses-mobile"
            aria-label="Explore courses at Fiona Beauty Academy"
            style={{
              width: '100%', maxWidth: '340px', margin: '0 auto',
              background: 'linear-gradient(135deg, #9E742B, #F5D889, #C49A42, #FFE8A6, #A9792C)',
              color: '#2A0718', height: '48px',
              fontSize: '11px', letterSpacing: '0.16em',
              fontWeight: 700, fontFamily: 'Inter, sans-serif',
              borderRadius: '6px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              gap: '6px', textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(212,175,98,0.2)'
            }}
          >
            EXPLORE COURSES <span style={{ fontSize: '13px' }}>→</span>
          </Link>
          <Link
            to="/book-counselling"
            id="hero-book-consultation-mobile"
            aria-label="Book a consultation at Fiona Beauty Academy"
            style={{
              width: '100%', maxWidth: '340px', margin: '0 auto',
              background: 'rgba(74, 16, 40, 0.4)',
              border: '1px solid rgba(212,175,98,0.50)',
              color: '#F8F3EA', height: '48px',
              fontSize: '11px', letterSpacing: '0.16em',
              fontWeight: 600, fontFamily: 'Inter, sans-serif',
              borderRadius: '6px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', backdropFilter: 'blur(4px)'
            }}
          >
            BOOK A CONSULTATION
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED: Left editorial content block (desktop)
// ─────────────────────────────────────────────────────────────────────────────
function EditorialContent() {
  return (
    <>
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div aria-hidden="true" style={{ width: '28px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,98,0.9))', flexShrink: 0 }} />
        <p style={{ fontSize: 'clamp(9px, 0.75vw, 11px)', letterSpacing: '0.28em', color: '#D4AF62', fontFamily: 'Inter, sans-serif', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, whiteSpace: 'nowrap' }}>
          Fiona Beauty &amp; Wellness Academy
        </p>
        <div aria-hidden="true" style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, rgba(212,175,98,0.9), transparent)', flexShrink: 0 }} />
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize:   'clamp(2.6rem, 4.8vw, 6.2rem)',
        fontWeight: 500, lineHeight: 1.06,
        color: '#F8F3EA', letterSpacing: '-0.01em',
        margin: 0, marginBottom: 'clamp(1rem, 2.2vh, 1.8rem)',
      }}>
        TRANSFORMING
        <br />
        <span style={{ color: '#D4AF62', fontStyle: 'italic' }}>PASSION</span>
        <br />
        INTO PROFESSION.
      </h1>

      {/* Sub-label */}
      <p style={{
        color: 'rgba(248,243,234,0.55)',
        fontSize: 'clamp(10px, 0.85vw, 12px)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif', fontWeight: 500,
      }}>
        Professional beauty education.&nbsp;Practical skills.&nbsp;Real careers.
      </p>

      {/* Body */}
      <p style={{
        color: 'rgba(248,243,234,0.66)',
        fontSize: 'clamp(12px, 1vw, 14px)',
        lineHeight: 1.78, maxWidth: '460px',
        marginBottom: 'clamp(1.4rem, 2.8vh, 2.2rem)',
        fontFamily: 'Inter, sans-serif', fontWeight: 300,
      }}>
        Build your career in beauty, hair, makeup, skin, aesthetics,
        cosmetology and wellness through practical, industry-oriented training.
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link
          to="/courses"
          id="hero-explore-courses"
          aria-label="Explore courses at Fiona Beauty Academy"
          style={{
            background: 'linear-gradient(135deg, #9E742B, #F5D889, #C49A42, #FFE8A6, #A9792C)',
            color: '#12060A',
            padding: 'clamp(10px, 1.1vh, 14px) clamp(20px, 2.2vw, 32px)',
            fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '0.18em',
            fontWeight: 700, fontFamily: 'Inter, sans-serif',
            borderRadius: '5px', display: 'inline-flex', alignItems: 'center',
            gap: '8px', textDecoration: 'none',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(212,175,98,0.40)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = '';
            (e.currentTarget as HTMLElement).style.boxShadow = '';
          }}
        >
          EXPLORE COURSES <span style={{ fontSize: '12px' }}>→</span>
        </Link>
        <Link
          to="/book-counselling"
          id="hero-book-consultation"
          aria-label="Book a consultation at Fiona Beauty Academy"
          style={{
            border: '1px solid rgba(212,175,98,0.50)',
            color: '#F8F3EA',
            padding: 'clamp(10px, 1.1vh, 14px) clamp(20px, 2.2vw, 32px)',
            fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '0.18em',
            fontWeight: 600, fontFamily: 'Inter, sans-serif',
            borderRadius: '5px', display: 'inline-flex', alignItems: 'center',
            textDecoration: 'none', backdropFilter: 'blur(4px)',
            transition: 'transform 0.25s ease, background 0.25s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,98,0.10)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = '';
            (e.currentTarget as HTMLElement).style.background = '';
          }}
        >
          BOOK A CONSULTATION
        </Link>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED: Banner image with Framer Motion transitions
// ─────────────────────────────────────────────────────────────────────────────
function BannerImage({ banner, activeIndex }: { banner: { src: string; caption: string }; activeIndex: number }) {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={`banner-${activeIndex}`}
        initial={{ opacity: 0, scale: 1.04, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0,
          transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
        }}
        exit={{ opacity: 0, scale: 1.02, y: -8,
          transition: { duration: 0.60, ease: [0.55, 0, 0.8, 0.4] as [number, number, number, number] }
        }}
        style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity' }}
      >
        <img
          src={banner.src}
          alt={`Fiona Beauty Academy — ${banner.caption}`}
          loading="eager"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center',
            display: 'block',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED: Overlays (vignette, gold top line, caption)
// ─────────────────────────────────────────────────────────────────────────────
function BannerOverlays({ banner, activeIndex }: { banner: { src: string; caption: string }; activeIndex: number }) {
  return (
    <>
      {/* Vignette */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,3,7,0.12) 0%, transparent 28%, transparent 60%, rgba(10,3,7,0.30) 100%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Gold top edge */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,98,0.55) 35%, rgba(212,175,98,0.95) 60%, transparent)',
        zIndex: 3,
      }} />

      {/* Caption */}
      <div style={{ position: 'absolute', bottom: '14px', left: '14px', zIndex: 4 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`caption-${activeIndex}`}
            variants={captionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span aria-hidden="true" style={{ width: '14px', height: '1px', background: '#D4AF62', display: 'block', flexShrink: 0 }} />
              <span style={{ fontSize: '8px', letterSpacing: '0.22em', color: 'rgba(248,243,234,0.82)', fontFamily: 'Inter, sans-serif', fontWeight: 500, textTransform: 'uppercase' }}>
                {banner.caption}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED: Vertical progress dots (desktop)
// ─────────────────────────────────────────────────────────────────────────────
function ProgressDots({ activeIndex, scrollToBanner }: { activeIndex: number; scrollToBanner: (i: number) => void }) {
  return (
    <>
      {BANNERS.map((_, i) => (
        <button
          key={i}
          aria-label={`Go to banner ${i + 1}: ${BANNERS[i].caption}`}
          onClick={() => scrollToBanner(i)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '8px', fontWeight: 600,
            letterSpacing: '0.05em',
            color: i === activeIndex ? '#D4AF62' : 'rgba(212,175,98,0.28)',
            transition: 'color 0.4s ease', lineHeight: 1,
          }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span style={{
            width: '1px',
            height: i === activeIndex ? '18px' : '8px',
            background: i === activeIndex
              ? 'linear-gradient(180deg, #D4AF62, rgba(212,175,98,0.15))'
              : 'rgba(212,175,98,0.15)',
            display: 'block',
            transition: 'height 0.4s ease, background 0.4s ease',
          }} />
        </button>
      ))}
    </>
  );
}
