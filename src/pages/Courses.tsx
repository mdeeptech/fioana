import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { motion } from 'framer-motion';

export default function Courses() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(courses.map(c => c.category))];
  
  const filteredCourses = filter === 'All' 
    ? courses 
    : courses.filter(c => c.category === filter);

  return (
    <div className="bg-fiona-ivory pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-fiona-burgundy mb-6">OUR COURSES</h1>
          <p className="text-fiona-black/70 max-w-2xl mx-auto tracking-wide">
            Discover comprehensive professional training programs designed to launch your career in the beauty industry.
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

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={course.slug}
            >
              <Link to={`/courses/${course.slug}`} className="group block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-transparent hover:border-fiona-champagne/30">
                <div className="relative h-64 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1 tracking-widest text-fiona-burgundy">
                    {course.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-fiona-champagne text-sm font-semibold tracking-widest mb-3">{course.duration}</div>
                  <h3 className="font-serif text-2xl text-fiona-burgundy mb-4">{course.title}</h3>
                  <div className="gold-line w-0 group-hover:w-full transition-all duration-500 mb-4"></div>
                  <p className="text-fiona-black/60 text-sm line-clamp-3 mb-8 flex-1">
                    {course.overview}
                  </p>
                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-fiona-taupe/20">
                    <div>
                      {course.mrp && <div className="text-xs text-fiona-black/40 line-through mb-1">MRP: ₹{course.mrp.toLocaleString('en-IN')}</div>}
                      <div className="font-bold text-lg text-fiona-burgundy">₹{course.currentPrice.toLocaleString('en-IN')}</div>
                    </div>
                    <span className="bg-fiona-burgundy text-fiona-ivory px-4 py-2 text-xs tracking-widest hover:bg-fiona-champagne transition-colors duration-300">
                      VIEW DETAILS
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
