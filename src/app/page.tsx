import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TickerBanner from "@/components/TickerBanner";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import SEOSection from "@/components/SEOSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgressLine from "@/components/ScrollProgressLine";

export default function Home() {
  return (
    <>
      <ScrollProgressLine />
      <Navbar />
      <main>
        <HeroSection />
        <TickerBanner />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <SEOSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
