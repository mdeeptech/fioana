import { branches } from '../data/branches';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Branches() {
  return (
    <div className="bg-fiona-ivory pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-fiona-burgundy mb-6">OUR ACADEMIES</h1>
          <p className="text-fiona-black/70 max-w-2xl mx-auto tracking-wide">
            Visit our state-of-the-art facilities designed to provide the best practical learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {branches.map(branch => (
            <div key={branch.slug} className="bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-fiona-taupe/20">
              <div className="h-64 md:h-80 relative overflow-hidden bg-fiona-burgundy/5">
                <img src={branch.image} alt={`${branch.name} premises`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-serif text-fiona-burgundy mb-6">{branch.name}</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-fiona-champagne shrink-0 mt-0.5" />
                    <p className="text-fiona-black/70 leading-relaxed">{branch.address}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Phone className="w-5 h-5 text-fiona-champagne shrink-0" />
                    <a href={`tel:${branch.contact.replace(/\s/g, '')}`} className="text-fiona-black/70 hover:text-fiona-burgundy">{branch.contact}</a>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-fiona-taupe/20">
                  <a href={branch.mapsUrl} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 border border-fiona-burgundy text-fiona-burgundy py-3 text-xs tracking-widest font-bold hover:bg-fiona-burgundy hover:text-white transition-colors">
                    <MapPin size={16} /> GET DIRECTIONS
                  </a>
                  <a href={`https://wa.me/${branch.contact.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 bg-fiona-burgundy text-fiona-ivory py-3 text-xs tracking-widest font-bold hover:bg-fiona-champagne hover:text-fiona-burgundy transition-colors">
                    <MessageCircle size={16} /> WHATSAPP
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
