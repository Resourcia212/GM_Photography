"use client";

import React, { useState, useEffect, useCallback } from "react";
import { siteConfig } from "@/data/site-config";
import { 
  CheckCircle2, 
  Instagram, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  ChevronDown,
  X,
  MessageCircle,
  User,
  Package,
  FileText,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { PackageItem } from "@/data/packages";
import { LuxurySelect, SelectOption } from "./ui/luxury-select";
import { cn } from "@/lib/utils";

interface BookingProps {
  selectedPackage?: PackageItem | null;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  message?: string;
}

const eventTypeOptions: SelectOption[] = [
  { value: "Full Wedding Ceremony", label: "Full Wedding Ceremony (Multi-Day)", badge: "Popular" },
  { value: "Pre-Wedding & Couple Story", label: "Pre-Wedding & Couple Story" },
  { value: "Bridal & Groom Portraiture", label: "Bridal & Groom Portraiture" },
  { value: "Haldi, Sangeet & Mehendi", label: "Haldi, Sangeet & Mehendi Rituals" },
  { value: "Grand Reception Gala", label: "Grand Reception Gala" },
  { value: "Maternity & Baby Shower", label: "Maternity & Baby Shower" },
  { value: "Birthday & Family Celebration", label: "Birthday & Family Celebration" },
  { value: "Cinematic Fashion & Editorial", label: "Cinematic Fashion & Editorial" },
  { value: "Destination Photography", label: "Destination Photography" },
];

const packageChoiceOptions: SelectOption[] = [
  { value: "02 SIGNATURE Package", label: "02 SIGNATURE Package (Demo)", badge: "Recommended" },
  { value: "01 ESSENTIAL Package", label: "01 ESSENTIAL Package (Demo)" },
  { value: "03 PREMIUM Package", label: "03 PREMIUM Package (Demo)" },
  { value: "Custom Tailored Package", label: "Custom Tailored Package / Consultation" },
];

const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const minuteOptions = ["00", "10", "20", "30", "40", "50"];

// Email Validation Helper
const validateEmail = (email: string): string | null => {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) {
    return "Email address is required.";
  }
  
  // RFC Standard Email Regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address (e.g. name@example.com).";
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return "Invalid email format.";
  }
  const [local, domain] = parts;

  if (local.length < 2) {
    return "Email username must have at least 2 characters.";
  }

  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return "Please enter a valid domain extension (e.g. .com, .in, .org).";
  }

  const domainName = domainParts[0];
  if (domainName.length < 2) {
    return "Please enter a valid domain name.";
  }

  // Reject obvious repeated garbage
  if (/([a-z])\1{5,}/.test(local) || /([a-z])\1{5,}/.test(domainName)) {
    return "Please enter a legitimate, active email address.";
  }

  return null;
};

// Phone Validation Helper
const validatePhone = (phone: string): string | null => {
  const trimmed = phone.trim();
  if (!trimmed) {
    return "Phone or WhatsApp number is required.";
  }
  
  const digitsOnly = trimmed.replace(/\D/g, "");
  
  if (digitsOnly.length < 10) {
    return "Phone number must contain at least 10 digits.";
  }
  if (digitsOnly.length > 15) {
    return "Phone number is too long (max 15 digits).";
  }

  // Reject dummy repeating sequences (0000000000, 1111111111)
  if (/^(\d)\1{9,}$/.test(digitsOnly)) {
    return "Please enter a valid, active phone number.";
  }

  return null;
};

// Name Validation Helper
const validateName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) {
    return "Your full name is required.";
  }
  if (trimmed.length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!/^[a-zA-Z\s'.-]+$/.test(trimmed)) {
    return "Name must contain letters only (no numbers or symbols).";
  }
  return null;
};

// Date Validation Helper
const validateDate = (date: string): string | null => {
  if (!date) return null;
  const selected = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(selected.getTime())) {
    return "Invalid date selected.";
  }
  if (selected < today) {
    return "Preferred date cannot be in the past.";
  }
  return null;
};

export function Booking({ selectedPackage }: BookingProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Full Wedding Ceremony",
    date: "",
    packageChoice: "02 SIGNATURE Package",
    message: "",
  });

  const [hour, setHour] = useState("04");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Today's date string for min date in picker
  const todayString = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (selectedPackage) {
      const match = packageChoiceOptions.find((opt) =>
        opt.value.toLowerCase().includes(selectedPackage.title.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({
          ...prev,
          packageChoice: match.value,
        }));
      }
    }
  }, [selectedPackage]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Live validation if field was touched or has error
    if (touched[field] || errors[field as keyof FormErrors]) {
      let err: string | null = null;
      if (field === "name") err = validateName(value);
      if (field === "phone") err = validatePhone(value);
      if (field === "email") err = validateEmail(value);
      if (field === "date") err = validateDate(value);
      
      setErrors((prev) => ({
        ...prev,
        [field]: err || undefined,
      }));
    }
  };

  const handleFieldBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let err: string | null = null;
    if (field === "name") err = validateName(formData.name);
    if (field === "phone") err = validatePhone(formData.phone);
    if (field === "email") err = validateEmail(formData.email);
    if (field === "date") err = validateDate(formData.date);
    
    setErrors((prev) => ({
      ...prev,
      [field]: err || undefined,
    }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const nameErr = validateName(formData.name);
    if (nameErr) newErrors.name = nameErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const dateErr = validateDate(formData.date);
    if (dateErr) newErrors.date = dateErr;

    setErrors(newErrors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      date: true,
      message: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) {
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmAndSendToWhatsApp = useCallback(() => {
    const fullShootTime = `${hour}:${minute} ${period}`;
    const formattedDate = formData.date ? formData.date : "To be decided / Flexible";
    const userMessage = formData.message.trim() ? formData.message.trim() : "Standard consultation & quote requested";

    const text = [
      `*📸 GAURAV MORE PHOTOGRAPHY - APPOINTMENT INQUIRY*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Client Name:* ${formData.name}`,
      `📞 *Phone / WhatsApp:* ${formData.phone}`,
      `✉️ *Email Address:* ${formData.email}`,
      `💍 *Event / Session:* ${formData.eventType}`,
      `📅 *Preferred Date:* ${formattedDate}`,
      `⏰ *Shoot Time:* ${fullShootTime}`,
      `📦 *Package Choice:* ${formData.packageChoice}`,
      `📝 *Vision / Venue Details:* ${userMessage}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📍 _Inquiry sent via GM Photography Portfolio Portal_`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/918625015012?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setIsModalOpen(false);
    setIsSuccess(true);
  }, [formData, hour, minute, period]);

  const handleReset = () => {
    setIsSuccess(false);
    setIsModalOpen(false);
    setErrors({});
    setTouched({});
    setFormData({
      name: "",
      phone: "",
      email: "",
      eventType: "Full Wedding Ceremony",
      date: "",
      packageChoice: "02 SIGNATURE Package",
      message: "",
    });
    setHour("04");
    setMinute("30");
    setPeriod("PM");
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#FAF8F3]/90 to-transparent">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] gradient-orb-warm blur-3xl pointer-events-none -z-10 opacity-40" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] gradient-orb-gold blur-3xl pointer-events-none -z-10 opacity-30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#C9A86A]" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#344031]">
            Inquire &amp; Book
          </span>
          <span className="w-8 h-[1.5px] bg-[#C9A86A]" />
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121811] tracking-tight">
            Let&apos;s capture something <br className="hidden sm:inline" />
            <span className="italic text-[#2D3F28]">
              unforgettable
            </span>.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#464E43] font-normal max-w-lg mx-auto leading-relaxed">
            Share your dates and vision. We will reach out with availability and tailored package details.
          </p>
        </div>

        {/* Equal Height Side-by-Side Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct Connect Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-6 sm:p-8 rounded-3xl luxury-card flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#121811]">
                  Direct Connect
                </h3>
                <p className="text-xs text-[#464E43] mt-1.5 leading-relaxed font-light">
                  Feel free to call, email, or message us directly on WhatsApp &amp; Instagram for immediate bookings.
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-3.5 my-5 sm:my-6">
                {/* Phone / Mobile */}
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex-1 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-white border border-white/80 shadow-xs transition-all duration-300 group hover:shadow-md hover:border-[#C9A86A]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#344031]/10 text-[#344031] flex items-center justify-center flex-shrink-0 group-hover:bg-[#344031] group-hover:text-[#F8F7F2] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-[10px] uppercase tracking-wider text-[#464E43] font-medium">Call / WhatsApp</p>
                      <p className="text-sm font-semibold text-[#121811] tracking-tight">{siteConfig.contact.phoneFormatted}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#464E43] group-hover:text-[#121811] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex-1 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-white border border-white/80 shadow-xs transition-all duration-300 group hover:shadow-md hover:border-[#C9A86A]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#344031]/10 text-[#344031] flex items-center justify-center flex-shrink-0 group-hover:bg-[#344031] group-hover:text-[#F8F7F2] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-[10px] uppercase tracking-wider text-[#464E43] font-medium">Official Gmail</p>
                      <p className="text-sm font-semibold text-[#121811] tracking-tight truncate">{siteConfig.contact.email}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#464E43] group-hover:text-[#121811] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Studio Instagram */}
                <a
                  href={siteConfig.brandInstagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-white border border-white/80 shadow-xs transition-all duration-300 group hover:shadow-md hover:border-[#C9A86A]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#344031]/10 text-[#344031] flex items-center justify-center group-hover:bg-[#344031] group-hover:text-[#F8F7F2] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-[10px] uppercase tracking-wider text-[#464E43] font-medium">Studio Instagram</p>
                      <p className="text-sm font-semibold text-[#121811] tracking-tight truncate">{siteConfig.brandInstagram.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#464E43] group-hover:text-[#121811] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Founder Instagram */}
                <a
                  href={siteConfig.founder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-white border border-white/80 shadow-xs transition-all duration-300 group hover:shadow-md hover:border-[#C9A86A]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#344031]/10 text-[#344031] flex items-center justify-center flex-shrink-0 group-hover:bg-[#344031] group-hover:text-[#F8F7F2] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-[10px] uppercase tracking-wider text-[#464E43] font-medium">Founder Instagram</p>
                      <p className="text-sm font-semibold text-[#121811] tracking-tight truncate">{siteConfig.founder.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#464E43] group-hover:text-[#121811] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>

              {/* Association note */}
              <div className="pt-4 border-t border-[#182017]/8 flex items-center gap-3 text-xs text-[#464E43]">
                <Sparkles className="w-4 h-4 text-[#C9A86A] flex-shrink-0" />
                <span>Affiliated with <strong>{siteConfig.association.name}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-6 sm:p-8 sm:p-10 rounded-3xl luxury-card flex-1 flex flex-col justify-between">
              
              {isSuccess ? (
                <div className="py-12 my-auto text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#344031]/10 text-[#2D3F28] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#C9A86A]" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#121811]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#464E43] font-light max-w-md mx-auto">
                    Thank you for reaching out! Gaurav More will review your dates and reach out on WhatsApp / phone shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 rounded-full luxury-gradient-btn text-[#F8F7F2] text-xs uppercase tracking-wider font-semibold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#121811] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleFieldChange("name", e.target.value)}
                          onBlur={() => handleFieldBlur("name")}
                          placeholder="e.g. Rahul Sharma"
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#121811] placeholder:text-[#464E43]/50 focus:outline-none transition-all shadow-xs",
                            errors.name && touched.name
                              ? "border-red-400 focus:ring-2 focus:ring-red-400/40"
                              : "border-[#182017]/10 focus:ring-2 focus:ring-[#344031] focus:border-transparent"
                          )}
                        />
                        {errors.name && touched.name && (
                          <p className="text-[11px] text-red-600 font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#121811] mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          onBlur={() => handleFieldBlur("phone")}
                          placeholder="+91 86250 15012"
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#121811] placeholder:text-[#464E43]/50 focus:outline-none transition-all shadow-xs",
                            errors.phone && touched.phone
                              ? "border-red-400 focus:ring-2 focus:ring-red-400/40"
                              : "border-[#182017]/10 focus:ring-2 focus:ring-[#344031] focus:border-transparent"
                          )}
                        />
                        {errors.phone && touched.phone && (
                          <p className="text-[11px] text-red-600 font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email & Event Type (Custom Luxury Select) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#121811] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          onBlur={() => handleFieldBlur("email")}
                          placeholder="you@example.com"
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#121811] placeholder:text-[#464E43]/50 focus:outline-none transition-all shadow-xs",
                            errors.email && touched.email
                              ? "border-red-400 focus:ring-2 focus:ring-red-400/40"
                              : "border-[#182017]/10 focus:ring-2 focus:ring-[#344031] focus:border-transparent"
                          )}
                        />
                        {errors.email && touched.email && (
                          <p className="text-[11px] text-red-600 font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <LuxurySelect
                          label="Event / Session Type"
                          options={eventTypeOptions}
                          value={formData.eventType}
                          onChange={(val) => setFormData({ ...formData, eventType: val })}
                          required
                        />
                      </div>
                    </div>

                    {/* Row 3: Preferred Date & 12-Hour Shoot Time Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#121811] mb-1.5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#C9A86A]" />
                          <span>Preferred Date</span>
                        </label>
                        <input
                          type="date"
                          min={todayString}
                          value={formData.date}
                          onChange={(e) => handleFieldChange("date", e.target.value)}
                          onBlur={() => handleFieldBlur("date")}
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#121811] focus:outline-none transition-all shadow-xs",
                            errors.date && touched.date
                              ? "border-red-400 focus:ring-2 focus:ring-red-400/40"
                              : "border-[#182017]/10 focus:ring-2 focus:ring-[#344031] focus:border-transparent"
                          )}
                        />
                        {errors.date && touched.date && (
                          <p className="text-[11px] text-red-600 font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                            <span>{errors.date}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#121811] mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#C9A86A]" />
                            <span>Shoot Time (12-Hour)</span>
                          </span>
                          <span className="text-[11px] font-bold text-[#2D3F28] bg-[#344031]/10 px-2 py-0.5 rounded-full">
                            {hour}:{minute} {period}
                          </span>
                        </label>

                        {/* Standard 12-Hour Time Picker (Hour:Minute AM/PM) */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {/* Hour Select (01 - 12) */}
                          <div className="relative flex-1">
                            <select
                              value={hour}
                              onChange={(e) => setHour(e.target.value)}
                              aria-label="Select Hour"
                              className="w-full pl-3 pr-7 py-3 rounded-2xl bg-white border border-[#182017]/12 text-sm font-semibold text-[#121811] focus:outline-none focus:ring-2 focus:ring-[#344031] shadow-xs cursor-pointer appearance-none text-center"
                            >
                              {hourOptions.map((h) => (
                                <option key={h} value={h}>
                                   {h} hr
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-[#464E43] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 opacity-70" />
                          </div>

                          <span className="font-bold text-[#121811] text-base select-none">:</span>

                          {/* Minute Select (00, 10, 20, 30, 40, 50) */}
                          <div className="relative flex-1">
                            <select
                              value={minute}
                              onChange={(e) => setMinute(e.target.value)}
                              aria-label="Select Minute"
                              className="w-full pl-3 pr-7 py-3 rounded-2xl bg-white border border-[#182017]/12 text-sm font-semibold text-[#121811] focus:outline-none focus:ring-2 focus:ring-[#344031] shadow-xs cursor-pointer appearance-none text-center"
                            >
                              {minuteOptions.map((m) => (
                                <option key={m} value={m}>
                                  {m} min
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-[#464E43] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 opacity-70" />
                          </div>

                          {/* AM / PM Segmented Control */}
                          <div className="flex bg-white p-1 rounded-2xl border border-[#182017]/12 shadow-xs flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => setPeriod("AM")}
                              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                                period === "AM"
                                  ? "bg-[#344031] text-[#F8F7F2] shadow-xs"
                                  : "text-[#464E43] hover:text-[#121811] hover:bg-black/5"
                              }`}
                            >
                              AM
                            </button>
                            <button
                              type="button"
                              onClick={() => setPeriod("PM")}
                              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                                period === "PM"
                                  ? "bg-[#344031] text-[#F8F7F2] shadow-xs"
                                  : "text-[#464E43] hover:text-[#121811] hover:bg-black/5"
                              }`}
                            >
                              PM
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Package Choice Dropdown */}
                    <div>
                      <LuxurySelect
                        label="Package Choice"
                        options={packageChoiceOptions}
                        value={formData.packageChoice}
                        onChange={(val) => setFormData({ ...formData, packageChoice: val })}
                      />
                    </div>

                    {/* Message Details */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#121811] mb-1.5">
                        Your Vision / Location Details
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your event venue, timeline, or any specific moments you wish to capture..."
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#182017]/10 text-sm text-[#121811] placeholder:text-[#464E43]/50 focus:outline-none focus:ring-2 focus:ring-[#344031] focus:border-transparent transition-all resize-none shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full luxury-gradient-btn text-[#F8F7F2] active:scale-98 font-medium text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all group"
                    >
                      <span>Send Inquiry</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Luxury Booking Confirmation & WhatsApp Dispatch Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#121811]/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Modal Container Card */}
          <div 
            className="relative w-full max-w-lg bg-[#FAF8F3] border border-[#C9A86A]/40 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Orbs inside card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#C9A86A]/20 via-[#344031]/5 to-transparent rounded-bl-full pointer-events-none -z-0" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-[#344031]/10 to-transparent rounded-tr-full pointer-events-none -z-0" />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#464E43] hover:text-[#121811] flex items-center justify-center border border-[#182017]/10 transition-colors shadow-xs z-10"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="relative z-10 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#344031]/10 text-[#2D3F28] text-[11px] font-semibold tracking-wider uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Confirm Your Inquiry</span>
              </div>
              <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#121811] tracking-tight">
                Review Appointment Details
              </h3>
              <p className="text-xs sm:text-sm text-[#464E43] mt-1 font-light">
                Your details are pre-filled below. Click &quot;Book Appointment&quot; to send them directly to Gaurav More on WhatsApp.
              </p>
            </div>

            {/* Details Card Summary (Scrollable) */}
            <div className="relative z-10 flex-1 overflow-y-auto pr-1 space-y-3 my-1">
              {/* Client, Phone & Email */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#182017]/8 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121811]">
                    <User className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Client Name</span>
                  </div>
                  <span className="text-sm font-bold text-[#121811]">{formData.name || "—"}</span>
                </div>

                <div className="h-[1px] bg-[#182017]/6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121811]">
                    <Phone className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Phone / WhatsApp</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2D3F28]">{formData.phone || "—"}</span>
                </div>

                <div className="h-[1px] bg-[#182017]/6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121811]">
                    <Mail className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Email Address</span>
                  </div>
                  <span className="text-xs sm:text-sm text-[#464E43] truncate max-w-[200px]">{formData.email || "—"}</span>
                </div>
              </div>

              {/* Event, Date, Time & Package */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#182017]/8 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121811]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Session Type</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#121811] text-right truncate max-w-[200px]">
                    {formData.eventType}
                  </span>
                </div>

                <div className="h-[1px] bg-[#182017]/6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121811]">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Shoot Date</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#121811]">
                    {formData.date || "To be discussed"}
                  </span>
                </div>

                <div className="h-[1px] bg-[#182017]/6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121811]">
                    <Clock className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Shoot Time</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#2D3F28] bg-[#344031]/10 px-2.5 py-0.5 rounded-full">
                    {hour}:{minute} {period}
                  </span>
                </div>

                <div className="h-[1px] bg-[#182017]/6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121811]">
                    <Package className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Package Choice</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#C9A86A] text-right truncate max-w-[200px]">
                    {formData.packageChoice}
                  </span>
                </div>
              </div>

              {/* Message / Venue Notes if provided */}
              {formData.message.trim() && (
                <div className="p-3.5 rounded-2xl bg-white border border-[#182017]/8 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121811] mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Venue / Vision Notes</span>
                  </div>
                  <p className="text-xs text-[#464E43] font-light leading-relaxed italic line-clamp-3">
                    &ldquo;{formData.message.trim()}&rdquo;
                  </p>
                </div>
              )}

              {/* Direct WhatsApp Destination Notice */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#344031]/5 border border-[#344031]/10 text-xs text-[#344031]">
                <ShieldCheck className="w-4 h-4 text-[#C9A86A] flex-shrink-0" />
                <span className="leading-snug">
                  Inquiry connects directly with <strong>Gaurav More</strong> ({siteConfig.contact.phoneFormatted}).
                </span>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="relative z-10 pt-4 mt-2 border-t border-[#182017]/8 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="order-2 sm:order-1 px-5 py-3 rounded-full bg-white hover:bg-[#F3EFE6] text-[#464E43] hover:text-[#121811] text-xs font-semibold uppercase tracking-wider border border-[#182017]/10 transition-colors"
              >
                Edit Details
              </button>
              
              <button
                type="button"
                onClick={handleConfirmAndSendToWhatsApp}
                className="order-1 sm:order-2 flex-1 py-3.5 px-6 rounded-full luxury-gradient-btn text-[#F8F7F2] font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-xl active:scale-98 transition-all group"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
