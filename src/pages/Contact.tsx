import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Clock } from 'lucide-react';

export default function Contact() {
  const whatsappLink = `https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage.general)}`;

  return (
    <div className="bg-fiona-ivory pt-32 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-fiona-champagne tracking-[0.3em] text-xs font-semibold uppercase mb-4">Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-serif text-fiona-burgundy mb-6">CONTACT US</h1>
          <div className="gold-line mx-auto w-24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Contact Info */}
          <div className="space-y-12">
            {/* Guwahati Branch */}
            <div className="bg-white p-8 border border-fiona-champagne/20 hover:border-fiona-champagne/50 transition-colors group">
              <h2 className="font-serif text-2xl text-fiona-burgundy mb-6 pb-3 border-b border-fiona-champagne/20">Guwahati Branch</h2>
              <div className="space-y-4 text-fiona-black/70">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-fiona-champagne shrink-0 mt-0.5" />
                  <span>Fiona Beauty Academy, Guwahati, Assam</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-fiona-champagne shrink-0" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-fiona-burgundy transition-colors">{siteConfig.phone}</a>
                </div>
                <div className="flex gap-3 items-center">
                  <Clock className="w-5 h-5 text-fiona-champagne shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Tinsukia Branch */}
            <div className="bg-white p-8 border border-fiona-champagne/20 hover:border-fiona-champagne/50 transition-colors group">
              <h2 className="font-serif text-2xl text-fiona-burgundy mb-6 pb-3 border-b border-fiona-champagne/20">Tinsukia Branch</h2>
              <div className="space-y-4 text-fiona-black/70">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-fiona-champagne shrink-0 mt-0.5" />
                  <span>Fiona Beauty Academy, Tinsukia, Assam</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-fiona-champagne shrink-0" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-fiona-burgundy transition-colors">{siteConfig.phone}</a>
                </div>
                <div className="flex gap-3 items-center">
                  <Clock className="w-5 h-5 text-fiona-champagne shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* General Contact */}
            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-fiona-champagne shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-fiona-black/70 hover:text-fiona-burgundy transition-colors">{siteConfig.email}</a>
              </div>
              <div className="flex gap-4 pt-2">
                <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-fiona-champagne/30 flex items-center justify-center text-fiona-burgundy hover:bg-fiona-champagne hover:text-fiona-burgundy transition-all">
                  <Instagram size={18} />
                </a>
                <a href={siteConfig.socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-fiona-champagne/30 flex items-center justify-center text-fiona-burgundy hover:bg-fiona-champagne hover:text-fiona-burgundy transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — Quick contact card */}
          <div className="flex flex-col gap-8">
            <div className="bg-fiona-burgundy text-fiona-ivory p-10 flex flex-col gap-6">
              <h2 className="font-serif text-3xl mb-2">Reach Out Directly</h2>
              <p className="text-fiona-ivory/70 font-light leading-relaxed">
                The quickest way to reach us is via WhatsApp or phone. Our team will get back to you within minutes during working hours.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-8 text-xs font-bold tracking-widest hover:brightness-110 transition-all duration-300"
              >
                <MessageCircle size={18} /> CHAT ON WHATSAPP
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center gap-3 border border-fiona-champagne text-fiona-champagne py-4 px-8 text-xs font-bold tracking-widest hover:bg-fiona-champagne hover:text-fiona-burgundy transition-all duration-300"
              >
                <Phone size={16} /> CALL US NOW
              </a>
            </div>

            <div className="bg-white p-10 border border-fiona-champagne/20">
              <h3 className="font-serif text-xl text-fiona-burgundy mb-6">Book a Free Consultation</h3>
              <p className="text-fiona-black/70 font-light leading-relaxed mb-6">
                Want to discuss which course is right for you? Book a free counselling session with our expert advisors.
              </p>
              <Link
                to="/book-counselling"
                className="inline-block bg-fiona-burgundy text-fiona-ivory px-8 py-4 text-xs tracking-widest font-bold hover:bg-fiona-champagne hover:text-fiona-burgundy transition-all duration-300"
              >
                BOOK COUNSELLING →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
