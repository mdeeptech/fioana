import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { src: '/classes/WhatsApp Image 2026-10-06 at 11.38.00 PM.jpeg', category: 'Classes' },
  { src: '/classes/WhatsApp Image 2026-10-06 at 11.38.01 PM.jpeg', category: 'Classes' },
  { src: '/classes/WhatsApp Image 2026-10-06 at 11.38.02 PM.jpeg', category: 'Classes' },
  { src: '/classes/WhatsApp Image 2026-10-06 at 9.48.24 PM.jpeg', category: 'Training' },
  { src: '/classes/WhatsApp Image 2026-10-06 at 9.48.26 PM.jpeg', category: 'Training' },
  { src: '/classes/WhatsApp Image 2026-10-06 at 9.48.27 PM.jpeg', category: 'Training' },
  { src: '/guwahati-interior/WhatsApp Image 2026-10-06 at 9.48.42 PM.jpeg', category: 'Campus' },
  { src: '/guwahati-interior/WhatsApp Image 2026-10-06 at 9.48.43 PM.jpeg', category: 'Campus' },
  { src: '/guwahati-interior/WhatsApp Image 2026-10-06 at 9.48.44 PM.jpeg', category: 'Campus' },
  { src: '/guwahati-interior/WhatsApp Image 2026-10-06 at 9.48.45 PM.jpeg', category: 'Campus' },
  { src: '/workshops/WhatsApp Image 2026-10-06 at 9.48.31 PM.jpeg', category: 'Workshops' },
  { src: '/workshops/WhatsApp Image 2026-10-06 at 9.48.32 PM.jpeg', category: 'Workshops' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', 'Classes', 'Training', 'Campus', 'Workshops'];
  const filtered = filter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filter);

  return (
    <div className="bg-fiona-ivory pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-fiona-burgundy mb-6">OUR GALLERY</h1>
          <p className="text-fiona-black/70 max-w-2xl mx-auto tracking-wide">
            Glimpses of our academy, training sessions, and the vibrant life at Fiona.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-xs tracking-widest font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-fiona-burgundy text-fiona-ivory shadow-lg' 
                  : 'bg-white text-fiona-burgundy hover:bg-fiona-champagne/20 border border-fiona-champagne/30'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((img, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={idx}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-fiona-cream"
              onClick={() => setSelectedImage(img.src)}
            >
              <img src={img.src} alt={`Gallery ${idx}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-fiona-burgundy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-fiona-ivory font-serif tracking-widest text-lg border border-fiona-ivory px-6 py-2">VIEW</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-fiona-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-fiona-ivory/50 hover:text-fiona-ivory transition-colors text-4xl font-light"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage} 
              alt="Expanded" 
              className="max-w-full max-h-full object-contain shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
