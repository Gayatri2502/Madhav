'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Heritage', href: '/about#heritage' },
    { label: 'Leadership Team', href: '/about#leadership' },
    { label: 'Certifications', href: '/quality-certifications' },
    { label: 'Careers', href: '/careers' },
  ],
  services: [
    { label: 'Offset Printing', href: '/services#offset-printing' },
    { label: 'Digital Printing', href: '/services#digital-printing' },
    { label: 'Packaging Solutions', href: '/services#packaging' },
    { label: 'Large Format', href: '/services#large-format' },
    { label: 'Pre-Press & Design', href: '/services#prepress-design' },
    { label: 'Finishing & Binding', href: '/services#finishing-binding' },
  ],
  products: [
    { label: 'Folding Cartons', href: '/products#cartons' },
    { label: 'Corrugated Boxes', href: '/products#boxes' },
    { label: 'Rigid Boxes', href: '/products#rigid-boxes' },
    { label: 'Labels & Sleeves', href: '/products#labels' },
    { label: 'Flexible Packaging', href: '/products#flexible' },
    { label: 'Custom Products', href: '/products#custom' },
  ],
  resources: [
    { label: 'Catalogs & Guides', href: '/catalogs' },
    { label: 'Case Studies', href: '/portfolio' },
    { label: 'Quality Certifications', href: '/quality-certifications' },
    { label: 'Infrastructure', href: '/infrastructure' },
    { label: 'FAQ', href: '/contact#faq' },
    { label: 'Request a Quote', href: '/contact' },
  ],
};

const contactInfo = {
  address: 'Plot No. 45, MIDC Industrial Area, Andheri East, Mumbai - 400093, Maharashtra, India',
  phones: ['+91 22 2837 4567', '+91 22 2837 4568'],
  emails: ['info@madhavprint.com', 'sales@madhavprint.com', 'support@madhavprint.com'],
  hours: 'Mon–Fri: 8:00 AM – 7:00 PM | Sat: 9:00 AM – 3:00 PM',
};

const socialLinks = [
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com/company/madhavoft', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'hover:text-blue-600'
  },
  { 
    name: 'Twitter', 
    href: 'https://twitter.com/madhavoft', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    ),
    color: 'hover:text-blue-400'
  },
  { 
    name: 'Facebook', 
    href: 'https://facebook.com/madhavoft', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
    color: 'hover:text-blue-700'
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com/madhavoft', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    color: 'hover:text-pink-600'
  },
  { 
    name: 'YouTube', 
    href: 'https://youtube.com/@madhavoprinters', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M23.498 6.186a3.167 3.167 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.167 3.167 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.167 3.167 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.167 3.167 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: 'hover:text-red-600'
  },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Sitemap', href: '/sitemap' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300" role="contentinfo">
      <div className="container-fluid mx-auto">
        {/* Main Grid */}
        <div className="py-12 sm:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8 xl:gap-12">
          {/* Company Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-base sm:text-lg">M</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">Madhav Offset Printers</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs sm:max-w-sm">
              88 years of printing excellence. From a single letterpress in 1936 to a state-of-the-art
              packaging facility serving India's most trusted brands.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="https://maps.google.com/?q=Plot+No.+45,+MIDC+Industrial+Area,+Andheri+East,+Mumbai+400093"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Mumbai HQ</span>
              </a>
              <a
                href="tel:+912228374567"
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>+91 22 2837 4567</span>
              </a>
              <a
                href="mailto:sales@madhavprint.com"
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>sales@madhavprint.com</span>
              </a>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 transition-all duration-300 group touch-target"
                >
                  <span className={`text-slate-400 transition-colors ${social.color}`}>
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <nav aria-label="Company" className="space-y-3">
            <h3 className="text-white font-semibold uppercase tracking-wider text-xs sm:text-sm">Company</h3>
            <ul className="space-y-2" role="list">
              {navigation.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {item.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="space-y-3">
            <h3 className="text-white font-semibold uppercase tracking-wider text-xs sm:text-sm">Services</h3>
            <ul className="space-y-2" role="list">
              {navigation.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {item.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products" className="space-y-3">
            <h3 className="text-white font-semibold uppercase tracking-wider text-xs sm:text-sm">Products</h3>
            <ul className="space-y-2" role="list">
              {navigation.products.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {item.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources" className="space-y-3">
            <h3 className="text-white font-semibold uppercase tracking-wider text-xs sm:text-sm">Resources</h3>
            <ul className="space-y-2" role="list">
              {navigation.resources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {item.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-6 sm:my-8" />

        {/* Bottom Section - Contact & Legal */}
        <div className="py-6 sm:py-8 lg:py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Contact Quick Access */}
          <div className="space-y-2 sm:space-y-3 text-center md:text-left">
            <h4 className="text-white font-medium text-sm">Quick Contact</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400">
              <a href="tel:+912228374567" className="hover:text-white transition-colors flex items-center gap-1">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                +91 22 2837 4567
              </a>
              <a href="mailto:sales@madhavprint.com" className="hover:text-white transition-colors flex items-center gap-1">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                sales@madhavprint.com
              </a>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500">{contactInfo.hours}</p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button asChild variant="primary" size="large" className="w-full sm:w-auto min-w-[200px]">
              <Link href="/contact">
                Request a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-2 sm:mt-3">Response within 2–4 business hours</p>
          </div>

          {/* Legal Links */}
          <div className="space-y-2 sm:space-y-3 text-center md:text-right">
            <h4 className="text-white font-medium text-sm">Legal</h4>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400">
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-4 sm:pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
            <p>
              © {currentYear} Madhav Offset Printers Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 text-[10px] sm:text-xs">
              <span>CIN: U22219MH1936PTC002547</span>
              <span>GSTIN: 27AAACM1234Z1Z5</span>
              <span className="text-amber-500/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse" />
                ISO 9001:2015 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;