import { useEffect, useRef } from 'react';

const founderPortrait = new URL('../../assets/founder-transparent.png', import.meta.url).href;

const principles = [
  {
    number: '01',
    title: 'THE VISION',
    text: 'Practical beauty education that prepares students for professional careers.',
  },
  {
    number: '02',
    title: 'THE APPROACH',
    text: 'Study the craft. Practice hands-on. Learn from industry professionals.',
  },
  {
    number: '03',
    title: 'THE PURPOSE',
    text: 'Open career pathways across beauty, hair, skin, makeup and wellness.',
  },
];

export default function Founder({ embedded = false }: { embedded?: boolean }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.classList.add('motion-ready');

    const revealIfVisible = () => {
      const bounds = hero.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.85 && bounds.bottom > 0) {
        hero.classList.add('is-entered');
        return true;
      }
      return false;
    };

    if (revealIfVisible()) return;
    let previousScrollY = window.scrollY;

    const revealOnScrollDown = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > previousScrollY;
      previousScrollY = currentScrollY;
      if (!scrollingDown) return;

      if (revealIfVisible()) {
        window.removeEventListener('scroll', revealOnScrollDown);
      }
    };

    window.addEventListener('scroll', revealOnScrollDown, { passive: true });
    return () => window.removeEventListener('scroll', revealOnScrollDown);
  }, []);

  return (
    <div className={`founder-page${embedded ? ' founder-page--embedded' : ''}`}>
      <section ref={heroRef} className="founder-hero" aria-labelledby="founder-heading">
        <div className="founder-hero-inner">
          <div className="founder-copy">
            <div className="founder-eyebrow"><span aria-hidden="true" />FOUNDER &amp; LEADERSHIP</div>
            <h1 id="founder-heading" className="founder-headline">
              <span>A VISION.</span>
              <span>A STANDARD.</span>
              <span className="founder-headline-accent">A LEGACY</span>
              <span className="founder-headline-finale">IN THE MAKING.</span>
            </h1>

            <div className="founder-identity">
              <h2>Lovleena Dutta Chanda</h2>
              <p>Founder Director, Fiona Beauty &amp; Wellness Academy Pvt. Ltd.</p>
            </div>

            <figure className="founder-portrait founder-portrait-mobile">
              <span className="founder-portrait-orbit" aria-hidden="true" />
              <img
                src={founderPortrait}
                alt="Lovleena Dutta Chanda, Founder Director of Fiona Beauty & Wellness Academy"
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>THE FOUNDER · FIONA BEAUTY &amp; WELLNESS ACADEMY</figcaption>
            </figure>

            <div className="founder-biography">
              <section className="founder-text-block" aria-labelledby="founder-introduction">
                <h3 id="founder-introduction">INTRODUCTION</h3>
                <p>Fiona turns a passion for beauty into practical skills and meaningful careers through professional, hands-on education.</p>
              </section>
              <section className="founder-text-block" aria-labelledby="founder-approach">
                <h3 id="founder-approach">FOUNDER’S APPROACH</h3>
                <p>Lovleena leads with structured training, expert mentorship and industry-focused learning.</p>
                <p>Her goal: graduates with the knowledge, confidence and skill to thrive in beauty.</p>
              </section>
            </div>
          </div>

          <figure className="founder-portrait founder-portrait-desktop">
            <span className="founder-portrait-glow" aria-hidden="true" />
            <span className="founder-portrait-orbit" aria-hidden="true" />
            <span className="founder-portrait-rule" aria-hidden="true" />
            <img
              src={founderPortrait}
              alt="Lovleena Dutta Chanda, Founder Director of Fiona Beauty & Wellness Academy"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>THE FOUNDER · FIONA BEAUTY &amp; WELLNESS ACADEMY</figcaption>
            <span className="founder-portrait-index" aria-hidden="true">F / 01</span>
          </figure>
        </div>
        <div className="founder-hero-footer" aria-hidden="true"><span>EDUCATION WITH INTENTION</span><span>GUWAHATI · INDIA</span></div>
      </section>

      <section className="founder-principles" aria-labelledby="founder-principles-heading">
        <div className="founder-principles-inner">
          <div className="founder-principles-intro">
            <p className="founder-light-eyebrow">THE FIONA POINT OF VIEW</p>
            <h2 id="founder-principles-heading">Education with<br /><em>purpose.</em></h2>
          </div>
          <div className="founder-principles-grid">
            {principles.map((principle) => (
              <article className="founder-principle" key={principle.number}>
                <span className="founder-principle-number">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
