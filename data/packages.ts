export interface PackageItem {
  id: string;
  number: string;
  title: string;
  badge?: string;
  isPopular?: boolean;
  price: string;
  priceSubtitle: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

export const packagesData: PackageItem[] = [
  {
    id: "essential",
    number: "01",
    title: "ESSENTIAL",
    badge: "Demo Package",
    price: "₹XX,XXX",
    priceSubtitle: "Demo pricing — customizable",
    description:
      "A tailored coverage package designed for intimate ceremonies, portraits, and single-session occasions.",
    features: [
      "Demo single-day coverage",
      "Demo high-resolution edited photographs",
      "Demo digital delivery gallery",
      "Demo pre-event visual consultation",
    ],
    ctaLabel: "Book This Package",
  },
  {
    id: "signature",
    number: "02",
    title: "SIGNATURE",
    badge: "Recommended Demo",
    isPopular: true,
    price: "₹XX,XXX",
    priceSubtitle: "Demo pricing — customizable",
    description:
      "Comprehensive multi-session photography capturing grand events, rituals, and artistic portraiture.",
    features: [
      "Demo multi-session extended coverage",
      "Demo full color-graded edited collection",
      "Demo handcrafted fine-art photo album",
      "Demo creative direction & planning session",
      "Demo high-resolution print-ready files",
    ],
    ctaLabel: "Book This Package",
  },
  {
    id: "premium",
    number: "03",
    title: "PREMIUM",
    badge: "Demo Package",
    price: "₹XX,XXX",
    priceSubtitle: "Demo pricing — customizable",
    description:
      "The all-inclusive bespoke documentation experience with prime coverage, dedicated deliverables, and cinematic moments.",
    features: [
      "Demo complete multi-day celebration coverage",
      "Demo priority editing & master archive",
      "Demo luxury keepsake heirloom album",
      "Demo cinematic teaser / highlight reels",
      "Demo dedicated visual director & assistance",
    ],
    ctaLabel: "Book This Package",
  },
];
