import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CareerEvents.css';

gsap.registerPlugin(ScrollTrigger);

const discoveredImages = Object.entries(import.meta.glob('../../assets/career & event/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})).sort(([a], [b]) => a.localeCompare(b));

const workshopBanner = discoveredImages.find(([path]) => path.toLowerCase().includes('banner workshop'))?.[1] as string | undefined;
const imageFiles = discoveredImages
  .filter(([path]) => !path.toLowerCase().includes('banner workshop'))
  .map(([, url]) => url as string);

// Filenames carry no event names, so all editorial copy lives here and stays easy to revise.
const eventCopy = [
  { category: 'PRACTICAL EXPERIENCE', title: 'Care, precision, practice.', description: 'A closer look at hands-on beauty training, where technique grows through attentive practice.', shape: 'event-card--portrait' },
  { category: 'STUDENT EXPERIENCE', title: 'Learning, side by side.', description: 'Students build confidence through guided practice and shared learning.', shape: 'event-card--landscape' },
  { category: 'INDUSTRY EXPOSURE', title: 'A day beyond the classroom.', description: 'A Fiona seminar brings learning and conversation into a live event setting.', shape: 'event-card--portrait' },
  { category: 'ACADEMY MOMENTS', title: 'A moment to be recognised.', description: 'Students share a proud moment together at the academy.', shape: 'event-card--landscape' },
  { category: 'STUDENT SHOWCASE', title: 'The work behind the craft.', description: 'A gathering that celebrates student effort, creativity and progress.', shape: 'event-card--portrait' },
  { category: 'STUDENT SHOWCASE', title: 'Confidence in the spotlight.', description: 'Students present their looks in a fashion-inspired academy showcase.', shape: 'event-card--landscape' },
  { category: 'STUDENT SHOWCASE', title: 'Made to make an impression.', description: 'A moment from a student runway presentation.', shape: 'event-card--portrait' },
  { category: 'ACADEMY MOMENTS', title: 'Celebrating creative work.', description: 'An on-stage presentation honours the work and commitment of students.', shape: 'event-card--landscape' },
  { category: 'ACADEMY MOMENTS', title: 'A shared achievement.', description: 'Students and mentors come together to mark a special academy moment.', shape: 'event-card--portrait' },
  { category: 'PRACTICAL EXPERIENCE', title: 'The details make the look.', description: 'Focused practice helps students bring a beauty look together with care.', shape: 'event-card--landscape' },
];

const events = imageFiles.map((image, index) => ({
  image,
  ...eventCopy[index % eventCopy.length],
  index,
}));

export default function CareerEvents() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const ctx = gsap.context(() => {
      const hero = root.querySelector('.ce-hero');
      const introHeading = root.querySelector('.ce-intro-heading');
      if (introHeading) {
        const introText = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: introHeading, start: 'top 82%', once: true },
        });
        introText.fromTo(introHeading.querySelector('.ce-eyebrow'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 })
          .fromTo(introHeading.querySelectorAll('.ce-intro-line'), { yPercent: 55, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.72, stagger: 0.12 }, '-=0.08');
      }
      const featureSection = root.querySelector('.ce-feature');
      const featurePhoto = featureSection?.querySelector('.ce-feature-photo');
      const featureImage = featureSection?.querySelector('.ce-feature-image');
      const featureCopy = featureSection?.querySelector('.ce-feature-copy');
      if (featureSection && featurePhoto && featureImage && featureCopy) {
        const featureText = Array.from(featureCopy.children).filter((child) => !child.classList.contains('ce-feature-ornament'));
        const featureReveal = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: featureSection, start: 'top 78%', once: true },
        });
        featureReveal.fromTo(featurePhoto, { x: isMobile ? -18 : -42, autoAlpha: 0, clipPath: 'inset(0 10% 0 0)' }, { x: 0, autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.85 }, 0)
          .fromTo(featureImage, { scale: 1.12 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
          .fromTo(featureText, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.12 }, 0.18);
      }
      if (reducedMotion) {
        gsap.set(root.querySelectorAll('[data-reveal], .ce-hero-copy > *'), { clearProps: 'all' });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.fromTo('.ce-hero-image', { scale: isMobile ? 1.04 : 1.08 }, { scale: 1, duration: 1.25, ease: 'power2.out' }, 0)
        .fromTo('.ce-hero-shade', { opacity: 0.2 }, { opacity: 1, duration: 0.8 }, 0)
        .fromTo('.ce-hero-eyebrow', { y: isMobile ? 10 : 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.12)
        .fromTo('.ce-hero-title span', { yPercent: isMobile ? 65 : 105, clipPath: 'inset(0 0 100% 0)', opacity: 0 }, { yPercent: 0, clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.68, stagger: 0.12 }, 0.22)
        .fromTo('.ce-hero-copy > :not(.ce-hero-eyebrow):not(.ce-hero-title)', { y: isMobile ? 10 : 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.54);

      root.querySelectorAll<HTMLElement>('[data-reveal]:not(.ce-event)').forEach((el) => {
        gsap.fromTo(el, { y: isMobile ? 16 : 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
      const eventRow = root.querySelector('.ce-event-grid');
      const eventCards = root.querySelectorAll('.ce-event');
      if (eventRow && eventCards.length) {
        gsap.fromTo(eventCards, { y: isMobile ? 18 : 34, autoAlpha: 0, scale: 0.96 }, {
          y: 0, autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: eventRow, start: 'top 84%', once: true },
        });
      }
      const line = root.querySelector('.ce-intro-rule');
      if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: line, start: 'top 85%', once: true } });

      if (window.matchMedia('(min-width: 768px)').matches) {
        const ctaImage = root.querySelector('.ce-cta-image');
        if (ctaImage) gsap.to(ctaImage, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: ctaImage, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
      }
      void hero;
    }, root);
    return () => ctx.revert();
  }, []);

  const heroImage = workshopBanner ?? events[0]?.image;
  const featuredImage = events[0]?.image;
  const ctaImage = events[events.length - 1]?.image;

  return (
    <article className="career-events-page" ref={pageRef}>
      <section className="ce-hero" aria-labelledby="ce-hero-title">
        {heroImage && <img className="ce-hero-image" src={heroImage} alt="Fiona workshop event and student showcase" fetchPriority="high" decoding="async" />}
        <div className="ce-hero-shade" />
        <div className="ce-hero-copy">
          <p className="ce-eyebrow ce-hero-eyebrow"><span /> FIONA BEAUTY ACADEMY</p>
          <h1 className="ce-hero-title" id="ce-hero-title"><span>CAREER &amp;</span><span>EVENTS</span></h1>
          <p className="ce-hero-deck">Beyond lessons. Into real experience.</p>
          <p className="ce-hero-description">Workshops, practical learning and student showcases open new ways to explore the beauty industry.</p>
          <a className="ce-button ce-button--light" href="#experiences">EXPLORE THE EXPERIENCE <ArrowRight size={16} aria-hidden="true" /></a>
          <p className="ce-locations">GUWAHATI <i /> TINSUKIA</p>
        </div>
        <a className="ce-scroll-cue" href="#beyond" aria-label="Scroll to learn more"><ArrowDown size={15} /></a>
        <span className="ce-hero-index" aria-hidden="true">01 / 04</span>
      </section>

      <section className="ce-intro ce-wrap" id="beyond">
        <div className="ce-intro-heading">
          <p className="ce-eyebrow">BEYOND THE CLASSROOM</p>
          <h2><span className="ce-intro-line">WHERE</span><span className="ce-intro-line">PASSION</span><span className="ce-intro-line">BECOMES</span><span className="ce-intro-line"><em>EXPERIENCE.</em></span></h2>
        </div>
        <div className="ce-intro-rule" aria-hidden="true" />
        <div className="ce-intro-copy" data-reveal>
          <span className="ce-mark" aria-hidden="true">F</span>
          <p>At Fiona, professional growth is shaped through more than lessons alone. Workshops, demonstrations, showcases and practical experiences help students build confidence, creativity and an understanding of the professional beauty environment.</p>
          <span className="ce-intro-caption">LEARN WITH PURPOSE. GROW THROUGH EXPERIENCE.</span>
        </div>
      </section>

      {featuredImage && <section className="ce-feature ce-wrap" aria-label="Featured experience">
        <div className="ce-feature-photo">
          <img className="ce-feature-image" src={featuredImage} alt="Students learning together during a practical session" loading="lazy" decoding="async" />
          <span className="ce-photo-index">FIONA / FIELD NOTES</span>
        </div>
        <div className="ce-feature-copy">
          <p className="ce-eyebrow">FEATURED EXPERIENCE</p>
          <h2>LEARN.<br />CREATE.<br /><em>STEP INTO<br />THE INDUSTRY.</em></h2>
          <p>From the classroom to shared experiences, every opportunity adds another perspective to a student's creative journey.</p>
          <a className="ce-text-link" href="#experiences">EXPLORE EXPERIENCE <ArrowRight size={17} /></a>
          <span className="ce-feature-ornament" aria-hidden="true">F</span>
        </div>
      </section>}

      <section className="ce-events" id="experiences">
        <div className="ce-wrap">
          <div className="ce-events-heading" data-reveal>
            <div><p className="ce-eyebrow">A JOURNAL OF LEARNING</p><h2>OUR CAREER<br /><em>&amp; EVENTS</em></h2></div>
            <p>Moments that turn learning<br />into real experience.</p>
          </div>
          <div className="ce-event-grid">
            {events.slice(1, -1).map((event) => (
              <article className={`ce-event ${event.shape}`} key={event.image} data-reveal>
                <div className="ce-event-photo">
                  <img src={event.image} alt={event.title} loading="lazy" decoding="async" />
                  <span className="ce-event-number">{String(event.index + 1).padStart(2, '0')}</span>
                  <span className="ce-event-open" aria-hidden="true"><ArrowRight size={18} /></span>
                </div>
                <div className="ce-event-caption">
                  <p className="ce-eyebrow">{event.category}</p>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="ce-marquee" aria-label="Learn, create, perform, experience, grow">
        <div className="ce-marquee-track" aria-hidden="true">{[0, 1].map((copy) => <span className="ce-marquee-group" key={copy}>FIONA BEAUTY ACADEMY <i>✳</i> LEARN <i>✳</i> CREATE <i>✳</i> PERFORM <i>✳</i> EXPERIENCE <i>✳</i> GROW <i>✳</i></span>)}</div>
      </div>

      <section className="ce-career ce-wrap">
        <div className="ce-career-heading" data-reveal><p className="ce-eyebrow">FROM LEARNING TO WHAT'S NEXT</p><h2>EXPERIENCE THAT<br /><em>BUILDS CONFIDENCE.</em></h2><p>Every workshop, practical session and creative experience is an opportunity to strengthen technique, confidence, communication and professional readiness.</p></div>
        <div className="ce-principles">
          {[
            ['01', 'PRACTICAL EXPOSURE', 'Hands-on learning that complements classroom education.'],
            ['02', 'CREATIVE CONFIDENCE', 'Opportunities to experiment, create and present ideas.'],
            ['03', 'PROFESSIONAL READINESS', 'Experiences designed to help students understand the expectations of the beauty industry.'],
          ].map(([number, title, copy]) => <article className="ce-principle" key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="ce-cta">
        {ctaImage && <img className="ce-cta-image" src={ctaImage} alt="" loading="lazy" decoding="async" />}
        <div className="ce-cta-content" data-reveal>
          <p className="ce-eyebrow">READY FOR YOUR NEXT STEP?</p>
          <h2>TURN YOUR<br />PASSION INTO<br /><em>A PROFESSION.</em></h2>
          <p>Explore Fiona's professional beauty programs and discover where your skills can take you.</p>
          <div className="ce-cta-actions"><Link className="ce-button ce-button--gold" to="/courses">EXPLORE COURSES <ArrowRight size={16} /></Link><Link className="ce-button ce-button--outline" to="/book-counselling">BOOK A COUNSELLING SESSION</Link></div>
        </div>
        <img className="ce-cta-seal" src="/logo.jpeg" alt="Fiona Beauty Academy logo" loading="lazy" decoding="async" />
      </section>
    </article>
  );
}
