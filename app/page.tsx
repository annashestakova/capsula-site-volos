import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import CalculatorTeaser from "@/components/sections/CalculatorTeaser";
import AboutTeaser from "@/components/sections/AboutTeaser";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingCTA from "@/components/sections/BookingCTA";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import BookingShowcase from "@/components/sections/BookingShowcase";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <BookingShowcase />
        <ServicesPreview />
        <CalculatorTeaser />
        <AboutTeaser />
        <TestimonialsSection />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
