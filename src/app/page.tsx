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
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <ScrollProgressLine />
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider height={80} />
        <TickerBanner />
        <SectionDivider height={120} />
        <AboutSection />
        <SectionDivider height={100} />
        <ServicesSection />
        <SectionDivider height={100} />
        <PortfolioSection />
        <SectionDivider height={100} />
        <SEOSection />
        <SectionDivider height={100} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
