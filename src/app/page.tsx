import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Stats from '@/components/Stats';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Education from '@/components/Education';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Stats />
        <Projects />
        <Timeline />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
