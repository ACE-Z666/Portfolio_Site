'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import TextReveal from './ui/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only hide/animate elements that are NOT using TextReveal
    // gsap.set([buttonRef.current, scrollIndicatorRef.current], {
    //   opacity: 0,
    //   y: 30
    // });

    gsap.set(heroRef.current, { opacity: 1 });

    const startAnimations = () => {
      const tl = gsap.timeline({ delay: 0.3 });

      // REMOVE: tl.to(nameRef.current, { ... });
      // REMOVE: tl.to(designationRef.current, { ... });
      // REMOVE: tl.to(descriptionRef.current, { ... });

      // Animate buttons and scroll indicator as before
      tl.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 1.1);

      tl.to(scrollIndicatorRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 1.4);

      tl.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      }, 2);

      return tl;
    };

    // Check if main content is visible (loading completed)
    let checkInterval: NodeJS.Timeout;
    const checkIfReady = () => {
      const mainContent = document.querySelector('.main-content') as HTMLElement;
      if (mainContent) {
        const opacity = window.getComputedStyle(mainContent).opacity;
        if (parseFloat(opacity) > 0.5) {
          clearInterval(checkInterval);
          return startAnimations();
        }
      }
    };

    const startCheckingDelay = setTimeout(() => {
      checkInterval = setInterval(checkIfReady, 100);
    }, 100);

    return () => {
      clearTimeout(startCheckingDelay);
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden h-screen bg-[#111111]"
    >
      {/* Background Pattern
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #111111 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div> */}

      <div className="md:w-screen max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 flex z-10 bg-[#111111]">
        <div className=" mx-auto md:mx-0 text-center md:text-center">
          {/* Name */}
          <h1 ref={nameRef} >
            <TextReveal
              words="Hey I'm Abhijith J Nair"
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extralight text-white mb-6 font-maghfirea leading-tight"
              duration={0.6}
              delay={300}
              staggerDelay={60}
              filter={true}
            />
          </h1>

       <div>
        {/* Designation */}
          <div ref={designationRef} className="mb-8 text-center">
            <TextReveal
              words="Intermediate AI/ML & Full Stack"
              className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-satoshi text-center mb-2 text-white/75 font-medium"
              duration={0.5}
              delay={800}
              staggerDelay={50}
              filter={true}
            />
             <TextReveal
              words="Developer."
              className="text-5xl sm:text-6xl md:text-7xl uppercase lg:text-8xl scale-125 text-center font-satoshi text-white font-medium"
              duration={0.5}
              delay={800}
              staggerDelay={50}
              filter={true}
            />
          </div>

       </div>
          
          {/* Description */}
          {/* <div ref={descriptionRef} className="mb-12">
            <TextReveal
              words="Passionate about creating digital experiences that make a difference. Building intelligent applications with modern technologies and clean, efficient code."
              className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light"
              duration={0.5}
              delay={1200}
              staggerDelay={40}
              filter={true}
            />
          </div> */}
          {/* Buttons */}
          {/* <div 
            ref={buttonRef}
            className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center mb-16"
          >
            <button 
              onClick={() => scrollToSection('#projects')}
              className="btn-hover px-8 py-4 bg-[#555555] text-white rounded-full font-light font-satoshi text-lg transition-all duration-300 hover:bg-[#333333] hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-hover px-8 py-4 border-2 border-[#555555] text-white rounded-full font-normal font-satoshi  text-lg transition-all duration-300 hover:bg-[#555555] hover:text-white hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          {/*<div className="flex justify-center md:justify-start space-x-6 mb-12 px-4">
            {[
              { name: 'LinkedIn', url: '#', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
              { name: 'GitHub', url: '#', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
              { name: 'Twitter', url: '#', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' }
            ].map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                aria-label={social.name}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                </svg>
              </a>
            ))}
          </div> */}
        </div>

        <div className='w-screen p-4 broder-l border-[#fefefe] rounded-xl bgimg opacity-50'>

        </div>

        {/* Scroll Indicator
        <div 
          ref={scrollIndicatorRef}
          className="absolute pt-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection('#about')}
        >
          <div className="flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-colors">
            <span className="text-sm font-medium">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#111111]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#111111]/5 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
