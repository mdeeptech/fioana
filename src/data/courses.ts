export interface Course {
  slug: string;
  title: string;
  category: string;
  duration: string;
  mrp?: number;
  currentPrice: number;
  registration?: number;
  emi?: {
    amount: number;
    months: number;
  };
  savings?: string;
  overview: string;
  curriculum: string[];
  careerOpportunities?: string[];
  image: string;
}

export const courses: Course[] = [
  {
    slug: 'master-diploma-cosmetology',
    title: 'Master Diploma in Cosmetology, Aesthetic Science & Salon Management',
    category: 'Cosmetology',
    duration: '12 months',
    mrp: 148750,
    currentPrice: 119000,
    registration: 20000,
    emi: {
      amount: 9000,
      months: 11
    },
    savings: '10%',
    overview: 'An extensive 12-month program covering all aspects of beauty, hair, makeup, skin, aesthetics, cosmetology, and wellness. Designed to turn passion into a successful career.',
    curriculum: [
      'Hair Styling: Blow-drying, Ironing, Crimping, Tongs, One-length cuts, V cuts, U cuts, Layer cuts, Bob, Quick layering, Blended elevation, Gradation',
      'Hair Chemical: Straightening, Colour, Highlights, Keratin, Botox, Nanoplastia, Rebonding',
      'Makeup: Bridal makeup, Party makeup, High-fashion demonstrations, Product knowledge, Draping, Client handling, Communication, Social media',
      'Skin / Beauty: Anatomy, Physiology, Skin types, Skin disorders, Acne, Pigmentation, Threading, Waxing, Manicure, Pedicure, Cleanups, Basic facials, Skin analysis, Aroma, Advanced facial, Massage',
      'Aesthetics: High frequency, Ultrasonic, RF, LED, Hydra Derma Brassion',
      'Peels: Glycolic / AHA, Salicylic, Kojic, Lactic, Vitamin C',
      'Hair Science / Trichology: Hair anatomy, Hair fall treatments, Scalp therapies'
    ],
    careerOpportunities: [
      'Salon Professional',
      'Aesthetician / Skin Therapist',
      'Hair Stylist & Color Expert',
      'Makeup Artist',
      'Salon Manager',
      'Entrepreneur',
      'Own Salon',
      'Academy'
    ],
    image: '/courses/Cosmetology Training at Fiona Beauty Academy.png'
  },
  {
    slug: 'advance-diploma-skin-hair',
    title: 'Advance Diploma in Skin and Hair (Cosmetology L-1)',
    category: 'Cosmetology',
    duration: '7 months',
    mrp: 72000,
    currentPrice: 54000,
    registration: 9900,
    emi: {
      amount: 6300,
      months: 7
    },
    savings: '10%',
    overview: 'A comprehensive 7-month program focused on advanced skin and hair techniques to elevate your career in beauty.',
    curriculum: [
      'Advanced Skin Care Techniques',
      'Hair Cutting and Styling',
      'Chemical Hair Treatments',
      'Basic Makeup Application',
      'Salon Client Management'
    ],
    image: '/courses/Beauty Academy Skin and Hair Training.png'
  },
  {
    slug: 'diploma-skin-personal-beauty',
    title: 'Diploma in Skin and Personal Beauty (Skin Culture)',
    category: 'Skin & Aesthetics',
    duration: '3 months',
    mrp: 33200,
    currentPrice: 24900,
    registration: 10000,
    emi: {
      amount: 4967,
      months: 3
    },
    savings: '5%',
    overview: 'Specialized 3-month training focused purely on skin care, treatments, and personal beauty enhancements.',
    curriculum: [
      'Skin Anatomy and Physiology',
      'Facials and Cleanups',
      'Skin Treatments',
      'Personal Beauty Enhancement'
    ],
    image: '/courses/Diploma in Skin and Personal Beauty (Skin Culture).png'
  },
  {
    slug: 'diploma-hair-dressing',
    title: 'Diploma in Hair Dressing & Styling',
    category: 'Hair',
    duration: '4 months',
    mrp: 48600,
    currentPrice: 36450,
    registration: 10050,
    emi: {
      amount: 6600,
      months: 4
    },
    savings: '5%',
    overview: 'Master the art of hair styling, cutting, and chemical treatments in this 4-month intensive diploma.',
    curriculum: [
      'Classic and Advanced Haircuts',
      'Blow Drying and Styling',
      'Hair Coloring Techniques',
      'Chemical Treatments'
    ],
    image: '/courses/Diploma in Hair Dressing & Styling.png'
  },
  {
    slug: 'professional-makeup-hair',
    title: 'Professional Course in Make-up Artistry & Hair Styling',
    category: 'Makeup',
    duration: '20 days',
    mrp: 40500,
    currentPrice: 30400,
    overview: 'Fast-track 20-day intensive course focusing on high-demand professional makeup and hair styling techniques.',
    curriculum: [
      'Bridal and Party Makeup',
      'High-Fashion Makeup',
      'Creative Hair Styling',
      'Product Knowledge'
    ],
    image: '/courses/professional course in makeup artistry.png'
  },
  {
    slug: 'beauty-express',
    title: 'Beauty Express',
    category: 'Express Programs',
    duration: '1 month',
    mrp: 8098,
    currentPrice: 6075,
    overview: 'A quick entry into the beauty industry covering essential services in a 1-month focused program.',
    curriculum: [
      'Manicure and Pedicure',
      'Waxing and Threading',
      'Basic Facials',
      'Hygiene and Safety'
    ],
    image: '/courses/Beauty express.png'
  },
  {
    slug: 'basic-tattoo',
    title: 'Basic Tattoo Course',
    category: 'Tattoo',
    duration: '3 months',
    mrp: 50000,
    currentPrice: 38000,
    registration: 22800,
    emi: {
      amount: 7600,
      months: 2
    },
    overview: 'Learn the fundamentals of tattooing, hygiene, and basic design over 3 months.',
    curriculum: [
      'Tattoo Equipment and Setup',
      'Hygiene and Sterilization',
      'Basic Linework and Shading',
      'Stencil Application'
    ],
    image: '/courses/Fiona Academy Basic Tattoo Course.png'
  },
  {
    slug: 'advanced-tattoo',
    title: 'Advanced Tattoo Course',
    category: 'Tattoo',
    duration: '6 months',
    mrp: 110000,
    currentPrice: 72000,
    registration: 30400,
    emi: {
      amount: 9120,
      months: 5
    },
    savings: '10%',
    overview: 'Master complex tattoo artistry, shading, color work, and large-scale designs in 6 months.',
    curriculum: [
      'Advanced Shading and Coloring',
      'Portrait and Realism',
      'Custom Design Creation',
      'Client Consultation'
    ],
    image: '/courses/Advanced Tattoo Course Academy Banner.png'
  }
];
