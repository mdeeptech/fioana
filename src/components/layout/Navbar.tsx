import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { siteConfig } from '../../data/siteConfig';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'COURSES', path: '/courses' },
  { name: 'CAREER & EVENTS', path: '/career-events' },
  { name: 'SERVICES', path: '/services' },
  { name: 'BRANCHES', path: '/branches' },
  { name: 'GALLERY', path: '/gallery' },
  { name: 'CONTACT', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navClass = cn(
    'fixed top-0 w-full z-50 transition-all duration-500',
    isScrolled || !isHome
      ? 'bg-fiona-burgundy/90 backdrop-blur-md border-b border-fiona-champagne/20 py-3'
      : 'bg-transparent py-5'
  );

  return (
    <>
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 group">
            <img 
              src="/logo.jpeg" 
              alt="Fiona Beauty Academy Logo" 
              className="w-[42px] h-[42px] md:w-[54px] md:h-[54px] rounded-full object-contain group-hover:shadow-[0_0_15px_rgba(212,175,98,0.5)] transition-all duration-500"
            />
            <span className={cn(
              "font-serif tracking-widest text-xs 2xl:text-sm font-medium hidden 2xl:block",
              isScrolled || !isHome ? "text-fiona-ivory" : "text-fiona-ivory drop-shadow-md"
            )}>
              FIONA BEAUTY ACADEMY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-3 2xl:gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={cn(
                  "whitespace-nowrap text-[10px] 2xl:text-[11px] tracking-[0.12em] relative group font-medium",
                  isScrolled || !isHome ? "text-fiona-ivory/80 hover:text-fiona-champagne" : "text-fiona-ivory/90 hover:text-fiona-champagne drop-shadow-sm"
                )}
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-fiona-champagne group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
            ))}
            <Link 
              to="/book-counselling"
              className="whitespace-nowrap bg-gold-gradient text-fiona-burgundy px-3 2xl:px-4 py-2.5 text-[10px] 2xl:text-[11px] tracking-widest font-semibold hover:-translate-y-[2px] hover:shadow-[0_4px_15px_rgba(212,175,98,0.4)] transition-all duration-300"
            >
              ENQUIRE NOW
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="xl:hidden text-fiona-ivory"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-0 z-[60] bg-fiona-burgundy transition-transform duration-500 xl:hidden flex flex-col",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <img src="/logo.jpeg" alt="Logo" className="w-[42px] h-[42px] rounded-full" />
          <button onClick={() => setMobileMenuOpen(false)} className="text-fiona-ivory p-2">
            <X className="w-8 h-8" />
          </button>
        </div>
        
        <div className="flex flex-col px-8 py-10 gap-6 overflow-y-auto flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-fiona-ivory text-xl font-serif tracking-widest border-b border-white/5 pb-4"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <Link 
              to="/book-counselling"
              className="bg-gold-gradient text-fiona-burgundy text-center py-4 tracking-widest font-semibold"
            >
              ENQUIRE NOW
            </Link>
            <a 
              href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="border border-fiona-champagne text-fiona-champagne text-center py-4 tracking-widest font-semibold"
            >
              WHATSAPP US
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
