import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      <section id="testimonials">
        <Testimonials />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
      
      <Footer />
    </>
  );
}
