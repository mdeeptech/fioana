import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Branches = lazy(() => import('./pages/Branches'));
const BranchDetail = lazy(() => import('./pages/BranchDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const CareerEvents = lazy(() => import('./pages/CareerEvents'));
const Founder = lazy(() => import('./pages/Founder'));
const Contact = lazy(() => import('./pages/Contact'));
const Booking = lazy(() => import('./pages/Booking'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen bg-fiona-burgundy flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-fiona-wine border-t-fiona-champagne rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:slug" element={<CourseDetail />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="branches" element={<Branches />} />
            <Route path="branches/:slug" element={<BranchDetail />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="career-events" element={<CareerEvents />} />
            <Route path="founder" element={<Founder />} />
            <Route path="contact" element={<Contact />} />
            <Route path="book-counselling" element={<Booking />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
