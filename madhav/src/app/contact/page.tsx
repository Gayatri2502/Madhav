"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Icon } from "@/components/ui";
import { Reveal, StaggerContainer } from "@/components/animations";
import { SpatialZoom, DepthLayer, ParallaxElement } from "@/components/animations";

const whatsappNumber = "912228374567";
const phoneNumber = "+912228374567";

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Madhav%20Print%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;
const callUrl = `tel:${phoneNumber}`;

const whatsappIcon = (
  <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.472.099-.174.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.672zm-3.635-1.256c-.074-.223-.174-.447-.299-.646-.105-.181-.338-.556-.65-.837-.312-.28-.65-.626-.749-.752-.098-.125-.172-.198-.298-.371-.149-.223-.472-.792-.472-1.668 0-.843.313-1.612.748-1.972.435-.36.964-.792 1.376-1.037.413-.246.874-.47 1.244-.57.466-.124.791-.173 1.072-.173.254 0 .57.074.769.272.199.199.346.473.447.748.098.249.099.473.074.694-.025.223-.223.398-.52.993-.298.597-.623 1.164-.846 1.542-.223.378-.346.679-.446.873-.099.174-.223.371-.348.547-.124.199-.299.298-.547.298-.172 0-.347-.05-.52-.125-.173-.074-.572-.397-.792-.768-.22-.374-.346-.693-.471-.966-.125-.273-.173-.52-.148-.793.025-.273.198-.52.472-.867.434-.466 1.468-1.308 1.792-1.44.199-.085.397-.099.57-.099.199 0 .423.074.646.223.223.15.472.524.693 1.016.223.492.298 1.037.298 1.462 0 .473-.1.873-.298 1.164-.198.373-.546.678-.846.897-.3.224-.67.324-.993.273-.312-.05-.749-.174-1.072-.323-.323-.149-.622-.373-.87-.623z" />
  </svg>
);

const phoneIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default function ContactPage() {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Spatial Effects */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        {/* Background depth layers */}
        <DepthLayer layer="bg" className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.02,transparent_60%)] blur-[80px]" aria-hidden="true" />
        </DepthLayer>

        <DepthLayer layer="mid" className="absolute inset-0 -z-10">
          <ParallaxElement speed={0.15} direction="up" className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%230ea5e9%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 h-full w-full" aria-hidden="true" />
          </ParallaxElement>
        </DepthLayer>

        <DepthLayer layer="fg" className="relative z-10">
          <Reveal variant="fade-up" className="relative container-fluid mx-auto py-16 sm:py-20 text-center">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6 spatial-zoom">Get in Touch</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 px-2">Have a project in mind? Our print specialists are ready to help bring your vision to life.</p>

            {/* Contact Buttons */}
            <StaggerContainer stagger={100} className="contact-buttons flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
              <Reveal variant="scale-in">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-large font-medium text-base sm:text-lg hover:bg-green-700 active:scale-[0.98] transition-snappy shadow-lg shadow-green-600/25 w-full sm:w-auto touch-target interactive spatial-zoom"
                  aria-label="Contact us on WhatsApp"
                >
                  <Icon size="large" aria-hidden="true">{whatsappIcon}</Icon>
                  <span>Chat on WhatsApp</span>
                </a>
              </Reveal>

              <Reveal variant="scale-in">
                <a
                  href={callUrl}
                  className="btn-magnetic inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-large font-medium text-base sm:text-lg hover:bg-primary/90 active:scale-[0.98] transition-snappy border border-border shadow-lg shadow-primary/25 w-full sm:w-auto touch-target interactive spatial-zoom"
                  aria-label="Call us"
                >
                  <Icon size="large" aria-hidden="true">{phoneIcon}</Icon>
                  <span>Call Us</span>
                </a>
              </Reveal>
            </StaggerContainer>

            <Reveal variant="fade-up" delay={200} className="mt-6 sm:mt-8 text-sm text-muted-foreground">
              Available Mon–Fri: 8:00 AM – 7:00 PM | Sat: 9:00 AM – 3:00 PM
            </Reveal>
          </Reveal>
        </DepthLayer>

        {/* Floating decorative elements */}
        <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-5">
          <ParallaxElement speed={0.12} direction="up" className="absolute top-20 left-10 w-24 h-24 opacity-15">
            <div className="w-full h-full rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
          <ParallaxElement speed={0.08} direction="down" className="absolute bottom-20 right-10 w-32 h-32 opacity-10">
            <div className="w-full h-full rounded-full bg-accent-primary/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
          <ParallaxElement speed={0.1} direction="left" className="absolute top-1/2 left-0 w-16 h-16 opacity-8 -translate-y-1/2">
            <div className="w-full h-full rounded-full bg-green-500/10 blur-xl" aria-hidden="true" />
          </ParallaxElement>
        </DepthLayer>

        <div className="absolute bottom-0 left-0 right-0 h-[150px] sm:h-[200px] bg-gradient-to-t from-background via-background/50 to-transparent" aria-hidden="true" />
      </section>
    </div>
  );
}