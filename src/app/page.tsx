import HeroSection from '@/components/HeroSection';
import FoundersMessage from '@/components/FoundersMessage';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import BlogsSection from '@/components/BlogsSection';
import AboutSection from '@/components/AboutSection';
import EventScheduleSection from '@/components/EventScheduleSection';
import MarketedBySection from '@/components/MarketedBySection';

export default function Home() {
  return (
    <main>
      {/* <div className="max-w-[1480px] mx-auto"> */}
      <HeroSection />
      <FoundersMessage />
      <AboutSection />
      <ProjectsSection />
      <BlogsSection />
      <ContactSection />
      <EventScheduleSection />
      <MarketedBySection />
    </main>
  );
}
