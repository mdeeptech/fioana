import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-fiona-ivory pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-serif text-fiona-burgundy mb-6">ABOUT FIONA</h1>
          <div className="gold-line mx-auto w-24"></div>
        </div>

        <div className="space-y-24 text-fiona-black/80 font-light text-lg leading-relaxed">
          <motion.section
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2 className="text-2xl font-serif text-fiona-burgundy mb-6 font-medium" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}>WHO WE ARE</motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.22 }}>
              Fiona Beauty Academy was established in 2021. We focus on creating skilled beauty professionals through industry-oriented training, practical exposure, professional mentorship, and dedicated trainers.
            </motion.p>
          </motion.section>

          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <motion.section
              className="bg-white p-10 border border-fiona-champagne/30 shadow-sm"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h2 className="text-2xl font-serif text-fiona-burgundy mb-6 font-medium" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.18 }}>OUR MISSION</motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.28 }}>
                To transform passion into successful careers through internationally inspired beauty education in Hair, Makeup, Skin, Aesthetics, and Cosmetology.
              </motion.p>
            </motion.section>

            <motion.section
              className="bg-white p-10 border border-fiona-champagne/30 shadow-sm"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h2 className="text-2xl font-serif text-fiona-burgundy mb-6 font-medium" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>OUR VISION</motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                To empower individuals with professional beauty, hair, makeup and wellness skills through expert guidance, hands-on training, innovative learning, excellence, integrity, and lifelong learning.
              </motion.p>
            </motion.section>
          </div>

          <section className="text-center bg-fiona-burgundy text-fiona-ivory p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 border border-white/10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 border border-white/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h2 className="text-3xl font-serif mb-8 text-fiona-champagne font-medium relative z-10">TRAINING PHILOSOPHY</h2>
            <p className="max-w-2xl mx-auto mb-10 relative z-10">
              We believe in hands-on practical learning backed by strong theoretical foundations. Our approach ensures every student receives professional mentorship, industry exposure, and holistic development to succeed in the beauty industry.
            </p>
            <Link to="/courses" className="inline-block bg-fiona-ivory text-fiona-burgundy px-8 py-3 text-xs tracking-widest font-bold hover:bg-fiona-champagne transition-colors relative z-10">
              EXPLORE OUR COURSES
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
