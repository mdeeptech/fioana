export default function WhyFiona() {
  const reasons = [
    { title: 'Industry-Oriented Training', desc: 'Curriculum designed to meet the real-world demands of top salons and aesthetic clinics.' },
    { title: 'Hands-On Practical Sessions', desc: 'Emphasis on practical learning to ensure you build confidence and muscle memory.' },
    { title: 'Dedicated Trainers', desc: 'Learn from experienced professionals who are passionate about teaching and mentoring.' },
    { title: 'Professional Mentorship', desc: 'Guidance that goes beyond technical skills to include client management and business.' },
    { title: 'Student Kits', desc: 'Comprehensive, high-quality product kits provided to support your learning journey.' },
    { title: 'Training Materials', desc: 'Detailed theory notes and reference materials to build a strong foundation of knowledge.' },
    { title: 'Industry Exposure', desc: 'Opportunities to participate in workshops, seminars, and real-world events.' },
    { title: 'Career Guidance', desc: 'Support with placements, resume building, and starting your own entrepreneurial journey.' },
    { title: 'Certification', desc: 'Recognized certifications that add professional value and credibility to your profile.' },
    { title: 'Professional Environment', desc: 'A supportive, hygienic, and well-equipped academy that mimics premium salons.' },
  ];

  return (
    <div className="bg-fiona-ivory pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-serif text-fiona-burgundy mb-6">WHY CHOOSE FIONA</h1>
          <p className="text-fiona-black/70 tracking-widest uppercase text-sm font-semibold">The Foundation For Your Success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-white p-8 border border-fiona-champagne/20 hover:border-fiona-champagne transition-colors group">
              <div className="text-3xl font-serif text-fiona-champagne/30 mb-4 group-hover:text-fiona-champagne transition-colors">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-serif text-fiona-burgundy mb-3">{reason.title}</h3>
              <p className="text-fiona-black/70 text-sm font-light leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
