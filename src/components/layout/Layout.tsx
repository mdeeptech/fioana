import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../ScrollToTop';
import CallbackPopup from '../CallbackPopup';
import FloatingContact from './FloatingContact';
import Booking from '../../pages/Booking';

export default function Layout() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      onClickCapture={(event) => {
        if (!(event.target instanceof Element)) return;
        const link = event.target.closest('a[href]');
        if (!link) return;
        const targetUrl = new URL(link.getAttribute('href') || '', window.location.href);
        if (targetUrl.pathname.replace(/\/$/, '') !== '/book-counselling') return;
        event.preventDefault();
        setBookingOpen(true);
      }}
    >
      <ScrollToTop />
      <div className="texture-overlay"></div>
      <Navbar />
      <CallbackPopup />
      <FloatingContact />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {bookingOpen && <Booking isModal onClose={closeBooking} />}
    </div>
  );
}
