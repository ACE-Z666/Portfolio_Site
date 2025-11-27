'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import TextReveal from './ui/TextReveal';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin, ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const [showTextAnimations, setShowTextAnimations] = useState(false);

  // Social links array (same as Footer)
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abhijith-j-nair/', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
    { name: 'GitHub', url: 'https://github.com/ACE-Z666', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
    { name: 'X', url: 'https://x.com/AbhijithJN001?t=LWpqRrKUQ-apSJHZHTRLwg&s=09', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
    { name: 'Email', url: 'mailto:abhijithjnair4321@gmail.com', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
  ];

  useEffect(() => {
    // Initially hide the hero section
    gsap.set(heroRef.current, { opacity: 0 });

    const startAnimations = () => {
      const tl = gsap.timeline();
      
      // First, make the hero section visible
      tl.to(heroRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          // Enable TextReveal animations after hero section is visible
          setShowTextAnimations(true);
        }
      });

      // Then animate other elements with longer delays to allow TextReveal to complete
      tl.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 2.5); // Increased delay

      tl.to(scrollIndicatorRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 2.8); // Increased delay

      tl.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      }, 3.5);

      return tl;
    };

    // Check if main content is visible and loading is complete
    let checkInterval: NodeJS.Timeout;
    const checkIfReady = () => {
      const loadingScreen = document.querySelector('.loading-screen');
      const mainContent = document.querySelector('.main-content') as HTMLElement;
      
      // Wait for loading screen to be gone AND main content to be visible
      if (!loadingScreen && mainContent) {
        const opacity = window.getComputedStyle(mainContent).opacity;
        if (parseFloat(opacity) > 0.9) { // Increased threshold
          clearInterval(checkInterval);
          // Add a small delay to ensure loading screen fade is complete
          setTimeout(() => {
            startAnimations();
          }, 200);
        }
      }
    };

    // Start checking after a longer delay
    const startCheckingDelay = setTimeout(() => {
      checkInterval = setInterval(checkIfReady, 50); // More frequent checks
    }, 500); // Longer initial delay

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
      className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-[#010101]"
    >
      {/* Main container for two-column layout */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* ====== Left Column: Text Content ====== */}
          <div className="w-full lg:w-2/5 text-center bottom-0 lg:text-left">
            {/* Name */}
            <h1 ref={nameRef}>
              {showTextAnimations && (
                <TextReveal
                  words="Hey I'm"
                  className="text-xl sm:text-xl md:text-xl mb-1 sm:ml-2 ml-0 lg:text-xl font-extralight text-white font-satoshi leading-tight"
                  duration={0.6}
                  delay={300}
                  staggerDelay={60}
                  filter={true}
                />
              )}
            </h1>

            {showTextAnimations && (
              <TextReveal
                words="Abhijith J Nair,"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-extralight text-[#fff] mb-16 font-sulpr leading-tight"
                duration={0.6}
                delay={600} // Increased delay
                staggerDelay={60}
                filter={true}
              />
            )}

            {/* Designation */}
            <div ref={designationRef} className="mb-8 text-center lg:text-left">
              {showTextAnimations && (
                <>
                  <TextReveal
                    words="Intermediate AI/ML & Full Stack"
                    className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-sulpr mb-2 text-white/75 font-medium"
                    duration={0.5}
                    delay={1200} // Increased delay
                    staggerDelay={50}
                    filter={true}
                  />
                  <TextReveal
                    words="Developer."
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[150px] px-0 uppercase font-sulpr text-[#fff] font-medium"
                    duration={0.5}
                    delay={1600} // Increased delay
                    staggerDelay={50}
                    filter={true}
                  />

                  {/* Social Links - Added below Developer */}
                  <div className="flex justify-center lg:justify-start space-x-4 sm:mt-2 mt-6 ">
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="p-2 bg-transparent rounded-full text-white/70 hover:text-white transition-all duration-300 hover:scale-125 backdrop-blur-sm opacity-0"
                        aria-label={social.name}
                        style={{
                          animation: `fadeIn 0.5s ease-out ${2000 + (index * 100)}ms forwards`
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>

                  <a href="https://drive.google.com/file/d/1n7lSQIZdmQQDd0Xw2h0kV8J_5d8Ec_Ji/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <TextReveal
                      words="Resumé"
                      className="text-xl sm:text-2xl md:text-3xl sm:text-left text-center uppercase lg:text-3xl font-satoshi mt-12 text-white/75 hover:text-white transition-all cursor-pointer font-medium"
                      duration={0.5}
                      delay={2400}
                      staggerDelay={50}
                      filter={true}
                    />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* ====== Right Column: Image/Visual Placeholder ====== */}
          <div className="w-full lg:w-3/5 flex items-center justify-center gap-0 sm:h-screen h-80 lg:justify-end">
            <div className='w-full max-w-sm h-80 sm:h-96 lg:max-w-xl lg:h-screen lg:w-1/2 border-r-2 border-l-2 border-[#222222] bgimg opacity-75'>
              {/* Add your image here */}
            </div>
          </div>

        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#111111]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#111111]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export default Hero;