'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      id="about" 
      className="py-20 md:py-32 bg-gradient-to-br from-[#f8f8f8] to-[#fefefe] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #111111 25%, transparent 25%), linear-gradient(-45deg, #111111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111111 75%), linear-gradient(-45deg, transparent 75%, #111111 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6 font-satoshi">
                About Me
              </h2>
              <div className="w-20 h-1 bg-[#111111] mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-[#111111]/80 leading-relaxed">
              <p>
               I'm an emerging Full Stack and AI/ML Engineer driven by a passion for building intelligent, impactful applications. My journey started with a curiosity for how technology can solve real-world problems, which has grown into a commitment to developing solutions that are both scalable and meaningful.
              </p>
              
              <p>
                I specialize in modern web and AI technologies including React, Node.js, LangChain, and Hugging Face, with experience that extends beyond coding into strategic planning, team leadership, and managing complex initiatives. 
              </p>

              <p>
               I believe in writing clean, efficient code while ensuring that every solution delivers long-term value and innovation.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold text-[#111111] mb-4 font-satoshi">
                Technologies I Love
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white border border-[#111111]/20 rounded-full text-sm font-medium text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-hover px-8 py-4 bg-[#111111] text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#333333] hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Let's Work Together
              </button>
            </div>
          </div>

          {/* Image/Visual Side */}
          <div ref={imageRef} className="relative">
            {/* Profile Card */}
            <div className="card-hover bg-white p-8 rounded-3xl shadow-xl border border-[#111111]/10">
              {/* Profile Image Placeholder */}
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] rounded-full flex items-center justify-center border-4 border-[#111111]/10">
                <div className="w-32 h-32 bg-gradient-to-br from-[#111111]/20 to-[#111111]/10 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#111111]/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#111111] mb-2 font-satoshi">Abhijith J Nair</h3>
                <p className="text-[#111111]/60">Intermediate AI/ML & Full Stack Developer</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-[#111111] font-monojb">
                      {stat.number}
                    </div>
                    <div className="text-sm text-[#111111]/60 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#111111]/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-[#111111]/5 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
