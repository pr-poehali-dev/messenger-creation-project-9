import HomeHeader from '@/components/home/HomeHeader';
import HomeHero from '@/components/home/HomeHero';
import HomeSections from '@/components/home/HomeSections';
import HomeFooter from '@/components/home/HomeFooter';

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader scrollToSection={scrollToSection} />
      <main>
        <HomeHero scrollToSection={scrollToSection} />
        <HomeSections />
      </main>
      <HomeFooter />
    </div>
  );
}
