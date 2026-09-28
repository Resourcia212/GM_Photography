export interface SiteConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  founder: {
    name: string;
    role: string;
    handle: string;
    url: string;
  };
  brandInstagram: {
    handle: string;
    url: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  association: {
    name: string;
    description: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    email: string;
    locationNote: string;
  };
  navLinks: { label: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  brandName: "Gaurav More Photography",
  shortName: "GM Photography",
  tagline: "Capture Your Best Moments 📸",
  heroHeadline: "Capturing your best moments,\none frame at a time.",
  heroSubheadline:
    "Photography that turns real moments into timeless memories worth keeping.",
  founder: {
    name: "Gaurav More",
    role: "Founder & Lead Photographer",
    handle: "@gauravmore_xd",
    url: "https://instagram.com/gauravmore_xd",
  },
  brandInstagram: {
    handle: "@gm_photography_5501",
    url: "https://instagram.com/gm_photography_5501",
  },
  socials: {
    instagram: "https://instagram.com/gm_photography_5501",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
  association: {
    name: "Shirpur Photographer Association",
    description: "Proud member representing professional visual craftsmanship.",
  },
  contact: {
    phone: "+918625015012",
    phoneFormatted: "+91 86250 15012",
    email: "gauravmore5501@gmail.com",
    locationNote: "Available for destination and regional bookings",
  },
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Packages", href: "#packages" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
};
