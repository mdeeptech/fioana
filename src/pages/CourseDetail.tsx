import { useParams, Link, Navigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { siteConfig } from '../data/siteConfig';

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const course = courses.find(c => c.slug === slug);

  if (!course) return <Navigate to="/courses" />;

  const whatsappMsg = encodeURIComponent(
    siteConfig.whatsappMessage.course
      .replace('{course}', course.title)
      .replace('{branch}', 'Any')
  );

  return (
    <div className="bg-fiona-ivory pt-24 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-fiona-burgundy/80 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <p className="text-fiona-champagne tracking-widest text-sm font-semibold mb-4 uppercase">{course.category}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-fiona-ivory mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-fiona-ivory/80 text-lg md:text-xl font-light mb-8 max-w-2xl">
                {course.overview}
              </p>
              <div className="flex flex-wrap gap-4 text-fiona-ivory/90 text-sm tracking-widest">
                <div className="border border-fiona-champagne/30 px-4 py-2">
                  <span className="text-fiona-champagne block text-xs mb-1">DURATION</span>
                  {course.duration}
                </div>
                <div className="border border-fiona-champagne/30 px-4 py-2 bg-fiona-champagne/10">
                  <span className="text-fiona-champagne block text-xs mb-1">FEE</span>
                  ₹{course.currentPrice.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-serif text-fiona-burgundy mb-8">Curriculum</h2>
          <div className="space-y-6 mb-16">
            {course.curriculum.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 bg-white border-l-4 border-fiona-champagne shadow-sm">
                <div className="text-fiona-champagne font-serif text-xl mt-1">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="text-fiona-black/80 font-medium">{item}</div>
              </div>
            ))}
          </div>

          {course.careerOpportunities && (
            <>
              <h2 className="text-3xl font-serif text-fiona-burgundy mb-8">Career Outcomes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
                {course.careerOpportunities.map((career, idx) => (
                  <div key={idx} className="bg-fiona-cream p-4 text-center border border-fiona-taupe/30 text-sm font-medium text-fiona-burgundy">
                    {career}
                  </div>
                ))}
              </div>
            </>
          )}

          <h2 className="text-3xl font-serif text-fiona-burgundy mb-8">Student Benefits</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-fiona-black/70">
            {['Training Material', 'Practical Sessions', 'Student Kits', 'Industry Exposure', 'Uniform & ID Card', 'Career Guidance', 'Theory Notes', 'Certification'].map(benefit => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-fiona-champagne rounded-full"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white p-8 sticky top-32 shadow-xl border border-fiona-taupe/20">
            <h3 className="font-serif text-2xl text-fiona-burgundy mb-6 pb-4 border-b border-fiona-taupe/30">Course Fees</h3>
            
            <div className="space-y-4 mb-8">
              {course.mrp && (
                <div className="flex justify-between items-center text-fiona-black/50 line-through">
                  <span>Regular Price</span>
                  <span>₹{course.mrp.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xl font-bold text-fiona-burgundy">
                <span>Our Price</span>
                <span>₹{course.currentPrice.toLocaleString('en-IN')}</span>
              </div>
              {course.savings && (
                <div className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 font-semibold">
                  Save {course.savings} on Single Payment
                </div>
              )}
            </div>

            {(course.registration || course.emi) && (
              <div className="bg-fiona-cream p-4 mb-8 space-y-3 text-sm border border-fiona-champagne/20">
                {course.registration && (
                  <div className="flex justify-between">
                    <span className="text-fiona-black/70">Registration</span>
                    <span className="font-semibold text-fiona-burgundy">₹{course.registration.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {course.emi && (
                  <div className="flex justify-between">
                    <span className="text-fiona-black/70">EMI Option</span>
                    <span className="font-semibold text-fiona-burgundy">₹{course.emi.amount.toLocaleString('en-IN')} × {course.emi.months}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <a 
                href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center bg-gold-gradient text-fiona-burgundy py-4 text-xs font-bold tracking-widest hover:shadow-[0_4px_15px_rgba(212,175,98,0.4)] transition-shadow"
              >
                ENQUIRE VIA WHATSAPP
              </a>
              <Link 
                to="/book-counselling"
                className="w-full text-center border border-fiona-burgundy text-fiona-burgundy py-4 text-xs font-bold tracking-widest hover:bg-fiona-burgundy hover:text-white transition-colors"
              >
                BOOK COUNSELLING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
