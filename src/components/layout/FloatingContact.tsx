import { Facebook, Instagram, Phone } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const contactActions = [
  {
    label: 'Chat with us on WhatsApp',
    href: `https://wa.me/${siteConfig.phone.replace(/\D/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage.general)}`,
    Icon: WhatsAppIcon,
    className: 'bg-[#25D366] hover:bg-[#1da851]',
    external: true,
  },
  {
    label: 'Call Fiona Beauty Academy',
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    Icon: Phone,
    className: 'bg-fiona-burgundy hover:bg-fiona-wine',
    external: false,
  },
  {
    label: 'Visit our Instagram page',
    href: siteConfig.socials.instagram,
    Icon: Instagram,
    className: 'bg-[#C13584] hover:bg-[#a92d74]',
    external: true,
  },
  {
    label: 'Visit our Facebook page',
    href: siteConfig.socials.facebook,
    Icon: Facebook,
    className: 'bg-[#1877F2] hover:bg-[#1264cf]',
    external: true,
  },
];

function WhatsAppIcon({ size = 21, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2a9.91 9.91 0 0 0-8.46 15.08L2 22l5.1-1.54A9.92 9.92 0 1 0 12.04 2Zm0 18.02a8.08 8.08 0 0 1-4.12-1.13l-.3-.18-3.03.92.94-2.95-.2-.31a8.1 8.1 0 1 1 6.71 3.65Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export default function FloatingContact() {
  return (
    <nav aria-label="Quick contact" className="fixed right-3 bottom-5 z-40 flex flex-col gap-3 sm:right-6 sm:bottom-8 sm:gap-3">
      {contactActions.map(({ label, href, Icon, className, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fiona-champagne sm:h-12 sm:w-12 ${className}`}
        >
          <Icon size={16} aria-hidden="true" className="sm:hidden" />
          <Icon size={21} aria-hidden="true" className="hidden sm:block" />
        </a>
      ))}
    </nav>
  );
}
