import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ServiceDetail() {
  const navigate = useNavigate();
  return (
    <div className="bg-fiona-ivory pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-fiona-burgundy hover:text-fiona-champagne transition-colors mb-12 mx-auto">
          <ArrowLeft size={16} /> Back to Services
        </button>
        <h1 className="text-4xl font-serif text-fiona-burgundy mb-6">Service Details</h1>
        <p className="text-fiona-black/70">Please visit our <a href="/services" className="text-fiona-champagne hover:underline">Services page</a> to explore our full menu.</p>
      </div>
    </div>
  );
}
