'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './ui/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    // Create ScrollTrigger animation
    gsap.fromTo(content.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(image,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'Python', 'Firebase', 'MongoDB', 'Langchain', 'HuggingFace',
  ];

  const stats = [
    { number: '10+', label: 'Projects Completed' },
    { number: '3+', label: 'Projects Ongoing' },
    
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 sm:h-screen h-full flex w-screen justify-center items-center bg-[#010101] relative overflow-hidden"
    >
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #111111 25%, transparent 25%), linear-gradient(-45deg, #111111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111111 75%), linear-gradient(-45deg, transparent 75%, #111111 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}></div>
      </div> */}

      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center  justify-center max-w-screen-2xl ">
          
          {/* Content */}
          <div ref={contentRef} className="space-y-10 flex flex-col justify-center items-center">
            <div className='text-base rounded-full font-sulpr font-bold text-[#111111] p-2 px-4 bg-[#ffffe5]'>
              About Me
            </div>

            <div className="space-y-4 md:space-y-6 text-3xl md:text-4xl text-white/70 leading-3 font-satoshi font-light">
              <TextReveal
                words="I specialize in full-stack development and AI/ML engineering, with a drive to realize intelligent applications capable of changing lives. I exist in a state of perpetual excitement, at the smack-dab intersection of slick interface-building experiences and ML power. Seeing a complex idea distilled to an elegant solution that just works gives me extreme kicks. Great products are built on clean, efficient code on the foundation of value in the long run that interestingly adds to innovation. In fact, I'm waiting eagerly for the next challenge, ready to bring to reality yet another idea worth impacting."
                className="block"
                duration={0.4}
                delay={500}
                staggerDelay={30}
              />
              
            </div>

            {/* Skills */}
            {/* <div className="pt-4">
              {/* <TextReveal
                words="Technologies I Love"
                className="text-xl md:text-2xl text-white mb-3 md:mb-4 font-hattonem"
                duration={0.5}
                delay={1200}
                staggerDelay={60}
              /> */}
              {/* <div className="flex flex-wrap gap-2 md:gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[#555555] border border-[#111111]/20  font-satoshi rounded-full text-xs md:text-sm font-medium text-white hover:bg-[#111111] hover:text-white transition-all duration-300 cursor-default opacity-0"
                    style={{ 
                      animationDelay: `${1.5 + index * 0.05}s`,
                      animation: 'fadeInUp 0.4s ease-out forwards'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div> */}

            {/* CTA Button */}
            {/* <div className="pt-6 md:pt-8">
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-hover px-6 py-3 md:px-8 md:py-4 font-satoshi font-medium bg-[#555555] text-white rounded-full text-base md:text-lg transition-all duration-300 hover:bg-[#333333] hover:scale-105 shadow-lg hover:shadow-xl opacity-0 w-full sm:w-auto"
                style={{ 
                  animation: 'fadeInUp 0.6s ease-out forwards 2.0s'
                }}
              >
                Let's Work Together
              </button>
            </div>
          </div>

          {/* Image/Visual Side */}
          {/* <div ref={imageRef} className="relative">
            {/* Profile Card */}
            {/* <div className="card-hover bg-[#555555] p-8 rounded-3xl shadow-xl border border-[#111111]/10"> */}
              {/* Profile Image Placeholder */}
              {/* <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] rounded-full flex items-center justify-center border-4 border-[#111111]/10">
                <div className="w-32 h-32 bg-gradient-to-br from-[#111111]/20 to-[#111111]/10 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-satoshi">Abhijith J Nair</h3>
                <p className="text-white font-hattoneu">Intermediate AI/ML & Full Stack Developer</p>
              </div> */}

              {/* Stats */}
              {/* <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white font-monojb">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/60 font-satoshi font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Decorative Elements */}
            {/* <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#111111]/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-[#111111]/5 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>  */}
      </div>
      </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
