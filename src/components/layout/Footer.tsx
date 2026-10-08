import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-fiona-burgundy text-fiona-ivory border-t border-fiona-champagne/20 pt-10 pb-6 md:pt-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-12 mb-10 md:mb-16">
          
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4">
              <img src="/logo.jpeg" alt="Fiona Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-contain" />
              <div>
                <h3 className="font-serif text-xl tracking-widest">FIONA</h3>
                <p className="text-xs tracking-[0.2em] text-fiona-champagne">BEAUTY ACADEMY</p>
              </div>
            </div>
            <p className="text-fiona-ivory/70 italic font-serif text-base md:text-lg">
              "{siteConfig.tagline}"
            </p>
            <div className="flex gap-3 md:gap-4 md:mt-2">
              <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-fiona-champagne/30 flex items-center justify-center hover:bg-fiona-champagne hover:text-fiona-burgundy transition-all">
                <Instagram size={18} />
              </a>
              <a href={siteConfig.socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-fiona-champagne/30 flex items-center justify-center hover:bg-fiona-champagne hover:text-fiona-burgundy transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base md:text-lg tracking-widest mb-3 md:mb-6 gold-text">EXPLORE</h4>
            <ul className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm tracking-wider text-fiona-ivory/70">
              <li><Link to="/about" className="hover:text-fiona-champagne transition-colors">Academy</Link></li>
              <li><Link to="/courses" className="hover:text-fiona-champagne transition-colors">Courses</Link></li>
              <li><Link to="/career-events" className="hover:text-fiona-champagne transition-colors">Career &amp; Events</Link></li>
              <li><Link to="/services" className="hover:text-fiona-champagne transition-colors">Services</Link></li>
              <li><Link to="/branches" className="hover:text-fiona-champagne transition-colors">Branches</Link></li>
              <li><Link to="/gallery" className="hover:text-fiona-champagne transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base md:text-lg tracking-widest mb-3 md:mb-6 gold-text">PROGRAMS</h4>
            <ul className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm tracking-wider text-fiona-ivory/70">
              <li><Link to="/courses" className="hover:text-fiona-champagne transition-colors">Master Diploma</Link></li>
              <li><Link to="/courses" className="hover:text-fiona-champagne transition-colors">Skin & Aesthetics</Link></li>
              <li><Link to="/courses" className="hover:text-fiona-champagne transition-colors">Hair Dressing</Link></li>
              <li><Link to="/courses" className="hover:text-fiona-champagne transition-colors">Professional Makeup</Link></li>
              <li><Link to="/courses" className="hover:text-fiona-champagne transition-colors">Beauty Express</Link></li>
              <li><Link to="/courses" className="hover:text-fiona-champagne transition-colors">Tattoo Artistry</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-serif text-base md:text-lg tracking-widest mb-3 md:mb-6 gold-text">CONTACT</h4>
            <ul className="flex flex-col gap-3 md:gap-4 text-xs md:text-sm text-fiona-ivory/70">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-fiona-champagne shrink-0" />
                <span>Guwahati & Tinsukia Branches</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-fiona-champagne shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-fiona-champagne transition-colors">{siteConfig.phone}</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-fiona-champagne shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-fiona-champagne transition-colors">{siteConfig.email}</a>
              </li>
            </ul>
            <div className="mt-4 md:mt-8">
              <a 
                href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block border border-fiona-champagne px-6 py-2 text-xs tracking-widest hover:bg-fiona-champagne hover:text-fiona-burgundy transition-all duration-300"
              >
                WHATSAPP US
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-5 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-[10px] md:text-xs text-fiona-ivory/50 tracking-wider">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-fiona-ivory">Privacy Policy</Link>
            <Link to="#" className="hover:text-fiona-ivory">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
