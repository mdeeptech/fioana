export interface Service {
  slug: string;
  category: string;
  name: string;
  price: string;
  description?: string;
}

export const services: Service[] = [
  // FACIALS
  { slug: 'facial-anti-aging', category: 'FACIALS', name: 'Anti-aging', price: '₹2,200–₹3,000' },
  { slug: 'facial-tanning', category: 'FACIALS', name: 'Tanning & De-Pigmentation', price: '₹2,000' },
  { slug: 'facial-tightening', category: 'FACIALS', name: 'Face Tightening & Lifting', price: '₹1,600' },
  { slug: 'facial-glow', category: 'FACIALS', name: 'Glow/Brightening', price: '₹1,200–₹1,800' },
  { slug: 'facial-gold', category: 'FACIALS', name: 'Gold', price: '₹2,200' },
  { slug: 'facial-silver', category: 'FACIALS', name: 'Silver', price: '₹2,200' },
  { slug: 'facial-skin-lightening', category: 'FACIALS', name: 'Skin Lightening', price: '₹2,500' },
  { slug: 'facial-sensitive', category: 'FACIALS', name: 'Sensitive Skin Facial', price: '₹3,000' },
  { slug: 'facial-lotus', category: 'FACIALS', name: 'Basic Lotus', price: '₹1,200' },
  { slug: 'facial-herbal', category: 'FACIALS', name: 'Herbal', price: '₹1,000' },
  { slug: 'facial-medi', category: 'FACIALS', name: 'Medi Facial Skin Q', price: '₹1,400' },

  // CLEANUPS / MASSAGES
  { slug: 'massage-herbal', category: 'CLEAN-UPS & MASSAGES', name: 'Herbal Clean-up', price: '₹500' },
  { slug: 'massage-detox', category: 'CLEAN-UPS & MASSAGES', name: 'Detox Clean-up', price: '₹800' },
  { slug: 'massage-aesthetic', category: 'CLEAN-UPS & MASSAGES', name: 'Aesthetic Clean-up', price: '₹1,000' },
  { slug: 'massage-organic', category: 'CLEAN-UPS & MASSAGES', name: 'Organic Clean-up', price: '₹1,500' },
  { slug: 'massage-hydra', category: 'CLEAN-UPS & MASSAGES', name: 'Hydra Clean-up', price: '₹2,000' },
  { slug: 'massage-quinic', category: 'CLEAN-UPS & MASSAGES', name: 'Quinic Massage', price: '₹1,000' },
  { slug: 'massage-detan', category: 'CLEAN-UPS & MASSAGES', name: 'De-Tan Clean-up', price: '₹800' },
  { slug: 'massage-drjacquet', category: 'CLEAN-UPS & MASSAGES', name: 'Dr. Jacquet Massage', price: '₹1,000' },
  { slug: 'massage-lymphatic', category: 'CLEAN-UPS & MASSAGES', name: 'Lymphatic Drainage', price: '₹1,200' },
  { slug: 'massage-emerald', category: 'CLEAN-UPS & MASSAGES', name: 'Emerald Massage', price: '₹1,000' },
  { slug: 'massage-medor', category: 'CLEAN-UPS & MASSAGES', name: 'Medor Massage', price: '₹1,000' },
  { slug: 'massage-basic', category: 'CLEAN-UPS & MASSAGES', name: 'Basic Face Massage', price: '₹800' },
  { slug: 'massage-swedish', category: 'CLEAN-UPS & MASSAGES', name: 'Swedish Massage', price: '₹1,000' },

  // MAKEUP
  { slug: 'makeup-day', category: 'MAKEUP', name: 'Day Makeup Light', price: '₹1,700' },
  { slug: 'makeup-night', category: 'MAKEUP', name: 'Night Makeup Light', price: '₹2,000' },
  { slug: 'makeup-party', category: 'MAKEUP', name: 'Party Look', price: '₹1,700' },
  { slug: 'makeup-wedding', category: 'MAKEUP', name: 'Wedding Party Look', price: '₹3,200' },

  // THREADING
  { slug: 'threading-full', category: 'THREADING', name: 'Full Face', price: '₹150' },
  { slug: 'threading-upper', category: 'THREADING', name: 'Upper Lips', price: '₹20' },
  { slug: 'threading-lower', category: 'THREADING', name: 'Lower Lips', price: '₹20' },

  // MANICURE & PEDICURE
  { slug: 'mani-regular', category: 'MANICURE & PEDICURE', name: 'Regular Manicure', price: '₹1,200' },
  { slug: 'pedi-regular', category: 'MANICURE & PEDICURE', name: 'Regular Pedicure', price: '₹700' },
  { slug: 'mani-premium', category: 'MANICURE & PEDICURE', name: 'Premium Manicure', price: '₹1,700' },
  { slug: 'pedi-premium', category: 'MANICURE & PEDICURE', name: 'Premium Pedicure', price: '₹1,200' },

  // HAIR SERVICES
  { slug: 'hair-shampoo', category: 'HAIR SERVICES', name: 'Shampoo + Conditioning + Blow Dry', price: '₹550' },
  { slug: 'hair-deep-cond', category: 'HAIR SERVICES', name: 'Deep Conditioning', price: '₹650' },
  { slug: 'hair-massage', category: 'HAIR SERVICES', name: 'Head Massage', price: '₹700' },
  { slug: 'hair-blowdry', category: 'HAIR SERVICES', name: 'Blow Dry Setting', price: '₹800' },
  { slug: 'hair-temp-straight', category: 'HAIR SERVICES', name: 'Temporary Straight', price: '₹800' },
  { slug: 'hair-temp-curl', category: 'HAIR SERVICES', name: 'Temporary Curls', price: '₹800' },
  { slug: 'hair-kids', category: 'HAIR SERVICES', name: 'Kids Haircut', price: '₹800' },
  { slug: 'hair-spa', category: 'HAIR SERVICES', name: 'Regular Hair Spa', price: '₹1,500' },
  { slug: 'hair-dandruff', category: 'HAIR SERVICES', name: 'Dandruff Treatment', price: '₹1,800' },
  { slug: 'hair-cut-basic', category: 'HAIR SERVICES', name: 'Basic Haircut', price: '₹450' },
  { slug: 'hair-cut-advanced', category: 'HAIR SERVICES', name: 'Advanced Haircut', price: '₹600' },

  // HAIR TREATMENTS
  { slug: 'treat-keratin', category: 'HAIR TREATMENTS', name: 'Keratin', price: '₹4,499' },
  { slug: 'treat-botox', category: 'HAIR TREATMENTS', name: 'Brazilian Hair Botox', price: '₹5,999' },
  { slug: 'treat-nano', category: 'HAIR TREATMENTS', name: 'Nanoplastia', price: '₹5,499' },
  { slug: 'treat-kera-smooth', category: 'HAIR TREATMENTS', name: 'Kera Smoothing', price: '₹5,999' },
  { slug: 'treat-highlights-streak', category: 'HAIR TREATMENTS', name: 'Highlights Per Streak', price: '₹250' },
  { slug: 'treat-global-color', category: 'HAIR TREATMENTS', name: 'Global Hair Colour', price: '₹5,999' },
  { slug: 'treat-straight-therapy', category: 'HAIR TREATMENTS', name: 'Straight Therapy', price: '₹3,500' },
  { slug: 'treat-boto-smooth', category: 'HAIR TREATMENTS', name: 'Boto Smoothing', price: '₹2,499' },
  { slug: 'treat-highlights', category: 'HAIR TREATMENTS', name: 'Hair Highlights', price: '₹9,999' },
  { slug: 'treat-rebonding', category: 'HAIR TREATMENTS', name: 'Rebonding', price: '₹5,999' },
  { slug: 'treat-straightening', category: 'HAIR TREATMENTS', name: 'Hair Straightening', price: '₹3,499' },
  { slug: 'treat-smoothing', category: 'HAIR TREATMENTS', name: 'Hair Smoothing', price: '₹3,999' },

  // HAIR RITUALS
  { slug: 'ritual-root', category: 'HAIR RITUALS', name: 'Root Touch-up', price: '₹1,200' },
  { slug: 'ritual-wash', category: 'HAIR RITUALS', name: 'Hair Wash', price: '₹350' },
  { slug: 'ritual-bond', category: 'HAIR RITUALS', name: 'Hair Bond Filler Ritual', price: '₹1,800–₹2,000' }
];
