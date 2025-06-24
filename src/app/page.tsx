import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import GitHubContributions from '../components/GitHubContributions';
import About from '../components/About';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="projects" className="mt-24">
        <Projects />
      </section>
      <section id="skills" className="mt-24">
        <Skills />
      </section>
      <section id="github" className="mt-24">
        <GitHubContributions />
      </section>
      <section id="about" className="mt-24">
        <About />
      </section>
      <section id="contact" className="mt-24 mb-24">
        <Contact />
      </section>
    </>
  );
}
