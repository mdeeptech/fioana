import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const whyChooseImages = [
  "/whychoose/1 (1).jpeg",
  "/whychoose/1 (2).jpeg",
  "/whychoose/1 (3).jpeg"
];

const whyChooseItems = [
  {
    number: "01",
    title: "INDUSTRY-ORIENTED TRAINING",
    description: "Fiona focuses on creating skilled beauty professionals through industry-oriented training and professional skill development designed for real-world demands."
  },
  {
    number: "02",
    title: "HANDS-ON PRACTICAL LEARNING",
    description: "Experience extensive practical sessions, live training, and a hands-on learning approach that ensures you are ready for professional environments."
  },
  {
    number: "03",
    title: "PROFESSIONAL MENTORSHIP",
    description: "Our learning approach includes professional mentorship and expert guidance to support your growth as a confident beauty expert."
  },
  {
    number: "04",
    title: "DEDICATED TRAINER GUIDANCE",
    description: "Learn from Fiona's dedicated trainer team, providing personalized guidance and sharing invaluable industry experience."
  },
  {
    number: "05",
    title: "STUDENT BENEFITS & SUPPORT",
    description: "Enjoy comprehensive support including Training Material, Practical Sessions, Student Kits, Industry Exposure, Uniform & ID Card, Career Guidance, Theory Notes, and Certification."
  },
  {
    number: "06",
    title: "CAREER GUIDANCE",
    description: "Fiona prepares students for professional opportunities in the beauty industry, supporting your career development every step of the way."
  },
  {
    number: "07",
    title: "PROFESSIONAL CERTIFICATION",
    description: "Graduate with recognized professional credentials that validate your skills and enhance your employability in the beauty sector."
  },
  {
    number: "08",
    title: "INDUSTRY EXPOSURE",
    description: "Gain valuable industry exposure and practical experience, connecting with experts and real scenarios to elevate your professional readiness."
  }
];

export default function WhyChooseFiona() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0); // First item open by default
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Preload images
    whyChooseImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Intersection observer for scroll reveal
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % whyChooseImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered]);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(prev => prev === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        backgroundColor: '#F7F3EA',
        backgroundImage: `
          radial-gradient(circle at 15% 50%, rgba(201,164,92,0.06), transparent 45%),
          linear-gradient(135deg, #F8F4EC, #F3EDE2)
        `
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Header, Image Carousel, Button (approx 42-45%) */}
          <div className="w-full lg:w-[42%] flex flex-col">
            
            {/* Header Area */}
            <div className={`mb-8 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-6 bg-fiona-champagne"></div>
                <span className="text-fiona-champagne tracking-[0.2em] uppercase text-[11px] font-semibold">
                  FIONA BEAUTY ACADEMY
                </span>
              </div>
              
              <h2 
                className="font-serif text-fiona-burgundy leading-[1.05] mb-0"
                style={{ fontSize: 'clamp(2.7rem, 3.7vw, 4.5rem)' }}
              >
                WHY CHOOSE <br className="hidden lg:block" />
                FIONA BEAUTY ACADEMY?
              </h2>
            </div>
          
            {/* Image Carousel */}
            <div 
              className={`relative transition-all duration-700 delay-100 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/4.8] max-h-[540px] w-full rounded-[16px] md:rounded-[20px] overflow-hidden shadow-xl bg-fiona-wine/5 border border-fiona-champagne/20">
                {whyChooseImages.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Why choose Fiona image ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ease-in-out origin-center
                      ${activeImage === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-[1.02] z-0'}
                    `}
                    style={{ objectPosition: 'center 30%' }}
                    aria-hidden={activeImage !== index}
                  />
                ))}
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-fiona-plum/20 via-transparent to-transparent pointer-events-none z-20"></div>
              </div>

              {/* Image Progress Indicator */}
              <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2 bg-fiona-ivory/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-fiona-champagne/30">
                <span className="text-fiona-champagne font-serif text-sm leading-none mt-0.5">
                  0{activeImage + 1}
                </span>
                <span className="text-fiona-burgundy/40 text-xs leading-none">/</span>
                <span className="text-fiona-burgundy/40 font-serif text-sm leading-none mt-0.5">
                  0{whyChooseImages.length}
                </span>
              </div>
            </div>

            {/* KNOW MORE Button */}
            <div className={`mt-6 md:mt-7 transition-all duration-700 delay-200 ease-out transform flex justify-center lg:justify-start ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link 
                to="/about"
                className="w-[240px] h-[52px] flex items-center justify-center gap-3 bg-gold-gradient text-fiona-burgundy rounded-[6px] text-[11px] tracking-[0.15em] font-bold shadow-[0_0_15px_rgba(212,175,98,0.3)] hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,98,0.5)] transition-all duration-300"
              >
                KNOW MORE ABOUT US
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: Accordion (approx 58%) */}
          <div className="w-full lg:w-[58%] flex flex-col lg:pt-[8.5rem]">
            <div className="flex flex-col gap-2.5 md:gap-3 w-full">
              {whyChooseItems.map((item, index) => {
                const isOpen = activeAccordion === index;
                return (
                  <div 
                    key={item.number}
                    className={`transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: isVisible ? `${200 + (index * 50)}ms` : '0ms' }}
                  >
                    <div className={`border rounded-[12px] transition-colors duration-300 overflow-hidden ${isOpen ? 'border-fiona-champagne/60 bg-[#F8F4EC] shadow-sm' : 'border-fiona-taupe/20 bg-transparent hover:border-fiona-champagne/40'}`}>
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex items-center justify-between px-5 md:px-6 py-[18px] md:py-[20px] min-h-[68px] md:min-h-[72px] text-left focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-4 md:gap-5">
                          <span className={`font-serif text-[15px] md:text-[16px] transition-colors duration-300 ${isOpen ? 'text-fiona-champagne' : 'text-fiona-burgundy/50'}`}>
                            {item.number}
                          </span>
                          <h3 className={`font-sans text-[14px] md:text-[15px] font-semibold tracking-wide transition-colors duration-300 ${isOpen ? 'text-fiona-burgundy' : 'text-fiona-black/80'}`}>
                            {item.title}
                          </h3>
                        </div>
                        {/* Plus/Minus Icon */}
                        <div className="flex-shrink-0 ml-4 relative w-[18px] h-[18px] flex items-center justify-center">
                          <div className={`absolute w-full h-[1.5px] bg-fiona-champagne transition-transform duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}></div>
                          <div className={`absolute w-full h-[1.5px] bg-fiona-champagne transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`}></div>
                        </div>
                      </button>
                      
                      <div 
                        className={`grid transition-all duration-400 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 md:px-6 pb-[20px] md:pb-[22px] text-[14px] md:text-[15px] text-fiona-black/75 leading-[1.6] max-w-[95%] pl-[3.2rem] md:pl-[3.8rem] -mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
