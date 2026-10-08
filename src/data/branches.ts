export interface Branch {
  slug: string;
  name: string;
  image: string;
  address: string;
  contact: string;
  mapsUrl: string;
}

export const branches: Branch[] = [
  {
    slug: 'guwahati',
    name: 'Guwahati Branch',
    image: '/Guwahati.jpeg',
    address: 'Fiona Beauty Academy, Lokhra Chariali, Opposite Hero Showroom, Guwahati-40',
    contact: '+91 93940 93331',
    mapsUrl: 'https://maps.google.com/?q=Lokhra+Chariali+Guwahati'
  },
  {
    slug: 'tinsukia',
    name: 'Tinsukia Branch',
    image: '/tinsukia.avif',
    address: 'Ambika Giri Rai Chowdhury Path, Near Hotel Skyline, Rajendra Nagar, Hijiguri, Tinsukia, Assam 786126',
    contact: '+91 93940 93331',
    mapsUrl: 'https://maps.google.com/?q=Hijiguri+Tinsukia'
  }
];
