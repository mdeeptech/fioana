import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { courses } from '../data/courses';
import { services } from '../data/services';

interface BookingProps {
  isModal?: boolean;
  onClose?: () => void;
  initialType?: 'Course' | 'Service';
  lockType?: boolean;
}

export default function Booking({ isModal = false, onClose, initialType = 'Course', lockType = false }: BookingProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: initialType,
    interest: '',
    branch: 'Guwahati',
    date: '',
    time: '',
    message: ''
  });

  useEffect(() => {
    if (!isModal) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModal, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `Hello Fiona Beauty Academy,\n\nI would like to ${formData.type === 'Course' ? 'enquire about' : 'book'}:\n${formData.type}: ${formData.interest || 'Not specified'}\nBranch: ${formData.branch}\n\nName: ${formData.name}\nPhone: ${formData.phone}\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\n\nMessage: ${formData.message}`;
    
    window.open(`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
    if (isModal) onClose?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, ...(name === 'type' ? { interest: '' } : {}) }));
  };

  return (
    <div
      className={isModal ? 'fixed inset-0 z-[70] overflow-y-auto bg-fiona-burgundy/65 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-8' : 'min-h-screen bg-gradient-to-b from-fiona-cream to-fiona-ivory px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36'}
      onClick={isModal ? onClose : undefined}
      role={isModal ? 'dialog' : undefined}
      aria-modal={isModal ? true : undefined}
      aria-labelledby={isModal ? 'booking-title' : undefined}
    >
      <div className={`${isModal ? 'mx-auto flex min-h-full max-w-xl items-start justify-center sm:items-center' : 'mx-auto max-w-4xl'}`}>
        <div className={isModal ? 'relative my-auto w-full rounded-2xl bg-fiona-ivory px-4 pb-5 pt-12 shadow-2xl sm:px-7 sm:py-7' : 'w-full'} onClick={isModal ? (event) => event.stopPropagation() : undefined}>
          {isModal && (
            <button type="button" onClick={onClose} aria-label="Close booking form" className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-fiona-cream text-xl text-fiona-burgundy shadow hover:bg-fiona-champagne sm:right-4 sm:top-4">
              <X size={18} />
            </button>
          )}
        <div className={isModal ? 'mb-4 text-center sm:mb-5' : 'mb-9 text-center sm:mb-12'}>
          <p className={isModal ? 'hidden' : 'mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-fiona-champagne'}>Your next chapter starts here</p>
          <h1 id={isModal ? 'booking-title' : undefined} className={isModal ? 'mb-1 font-serif text-xl leading-tight text-fiona-burgundy sm:text-2xl' : 'mb-4 font-serif text-4xl leading-tight text-fiona-burgundy sm:text-5xl md:text-6xl'}>{isModal ? 'BOOK A CONSULTATION' : 'BOOK A CONSULTATION'}</h1>
          <div className={isModal ? 'hidden' : 'gold-line mx-auto mb-5 w-20'} />
          <p className={`${isModal ? 'hidden' : 'mx-auto max-w-xl text-sm leading-relaxed text-fiona-black/70 sm:text-base'}`}>
            Fill out the form below and we'll connect with you via WhatsApp.
          </p>
        </div>

        <div className={isModal ? 'overflow-hidden rounded-xl border-t-2 border-fiona-champagne/70 bg-white/70' : 'overflow-hidden rounded-2xl border border-fiona-champagne/25 bg-white shadow-[0_24px_70px_-35px_rgba(46,8,25,0.35)]'}>
          {!isModal && <div className="h-1.5 bg-gradient-to-r from-fiona-burgundy via-fiona-champagne to-fiona-burgundy" />}
          <form onSubmit={handleSubmit} className={isModal ? 'space-y-3 p-3 sm:space-y-4 sm:p-5' : 'space-y-5 p-4 sm:space-y-8 sm:p-8 md:p-12'}>
            <div className={isModal ? 'hidden' : undefined}>
              <h2 className="font-serif text-lg text-fiona-burgundy sm:text-2xl">Tell us about yourself</h2>
              <p className="mt-1 text-xs text-fiona-black/55 sm:text-sm">Fields marked * are required.</p>
            </div>

            <div className={isModal ? 'grid grid-cols-1 gap-x-4 gap-y-2 min-[380px]:grid-cols-2' : 'grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-y-6'}>
              <div className="min-w-0">
                <label htmlFor="booking-name" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">FULL NAME *</label>
                <input id="booking-name" required name="name" value={formData.name} onChange={handleChange} type="text" autoComplete="name" placeholder="Your full name" className="w-full rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base text-fiona-black outline-none transition placeholder:text-fiona-black/35 focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20" />
              </div>
              <div className="min-w-0">
                <label htmlFor="booking-phone" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">PHONE NUMBER *</label>
                <input id="booking-phone" required name="phone" value={formData.phone} onChange={handleChange} type="tel" inputMode="tel" autoComplete="tel" placeholder="Your phone number" className="w-full rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base text-fiona-black outline-none transition placeholder:text-fiona-black/35 focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20" />
              </div>
              <div className={isModal ? 'hidden' : 'min-w-0'}>
                <label htmlFor="booking-email" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">EMAIL ADDRESS</label>
                <input id="booking-email" name="email" value={formData.email} onChange={handleChange} type="email" autoComplete="email" placeholder="you@example.com" className="w-full rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base text-fiona-black outline-none transition placeholder:text-fiona-black/35 focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20" />
              </div>
              <div className={isModal && lockType ? 'hidden' : 'min-w-0'}>
                <label htmlFor="booking-type" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">INTERESTED IN *</label>
                <select id="booking-type" required name="type" value={formData.type} onChange={handleChange} className="w-full appearance-none rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base text-fiona-black outline-none transition focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20">
                  <option value="Course">Course Enquiry</option>
                  <option value="Service">Service Appointment</option>
                </select>
              </div>
            </div>

            <div className={isModal ? 'grid grid-cols-1 gap-x-4 gap-y-2 min-[380px]:grid-cols-2' : 'grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-y-6'}>
              <div className="min-w-0">
                <label htmlFor="booking-interest" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">SPECIFIC {formData.type.toUpperCase()}</label>
                <select id="booking-interest" required name="interest" value={formData.interest} onChange={handleChange} className="w-full appearance-none rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm text-fiona-black outline-none transition focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20 sm:px-4 sm:py-3 sm:text-base">
                  <option value="" disabled>Select a {formData.type === 'Course' ? 'course' : 'service'}</option>
                  {formData.type === 'Course' ? (
                    courses.map(course => <option key={course.slug} value={course.title}>{course.title}</option>)
                  ) : (
                    [...new Set(services.map(service => service.category))].map(category => (
                      <optgroup key={category} label={category}>
                        {services.filter(service => service.category === category).map(service => (
                          <option key={service.slug} value={`${service.name} (${service.category})`}>{service.name}</option>
                        ))}
                      </optgroup>
                    ))
                  )}
                </select>
              </div>
              <div className="min-w-0">
                <label htmlFor="booking-branch" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">PREFERRED BRANCH *</label>
                <select id="booking-branch" required name="branch" value={formData.branch} onChange={handleChange} className="w-full appearance-none rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base text-fiona-black outline-none transition focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20">
                  <option value="Guwahati">Guwahati</option>
                  <option value="Tinsukia">Tinsukia</option>
                </select>
              </div>
            </div>

            <div className={isModal ? 'hidden' : 'grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-y-6'}>
              <div className="min-w-0">
                <label htmlFor="booking-date" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">PREFERRED DATE</label>
                <input id="booking-date" name="date" value={formData.date} onChange={handleChange} type="date" className="w-full rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base text-fiona-black outline-none transition focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20" />
              </div>
              <div className="min-w-0">
                <label htmlFor="booking-time" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">PREFERRED TIME</label>
                <input id="booking-time" name="time" value={formData.time} onChange={handleChange} type="time" className="w-full rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base text-fiona-black outline-none transition focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20" />
              </div>
            </div>

            <div className={isModal ? 'hidden' : undefined}>
              <label htmlFor="booking-message" className="mb-1.5 block text-[10px] sm:mb-2 sm:text-[11px] font-bold tracking-[0.15em] text-fiona-burgundy">MESSAGE</label>
              <textarea id="booking-message" name="message" value={formData.message} onChange={handleChange} rows={isModal ? 2 : 3} placeholder="Anything you'd like us to know?" className="w-full resize-y rounded-lg border border-fiona-taupe/30 bg-fiona-ivory/40 px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base text-fiona-black outline-none transition placeholder:text-fiona-black/35 focus:border-fiona-champagne focus:bg-white focus:ring-2 focus:ring-fiona-champagne/20" />
            </div>

            <button type="submit" className={`mt-1 flex w-full items-center justify-center rounded-lg bg-fiona-burgundy px-5 text-center text-xs font-bold tracking-[0.16em] text-fiona-ivory shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-fiona-champagne hover:text-fiona-burgundy hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fiona-burgundy sm:text-sm ${isModal ? 'min-h-11 py-3' : 'min-h-14 py-4'}`}>
              CONTINUE TO WHATSAPP <span className="ml-2" aria-hidden="true">→</span>
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
