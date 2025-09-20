'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Add this import
import { TextPlugin } from 'gsap/TextPlugin';
import TextReveal from './ui/TextReveal';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin, ScrollTrigger); // Register ScrollTrigger
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Add state to control when TextReveal should start
  const [showTextAnimations, setShowTextAnimations] = useState(false);

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
                  className="text-xl sm:text-xl md:text-xl mb-1 lg:text-xl font-extralight text-white font-satoshi leading-tight"
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-extralight text-[#ffffe5] mb-16 font-sulpr leading-tight"
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
                    className="text-5xl sm:text-6xl md:text-7xl uppercase lg:text-[150px] ml-4 font-sulpr text-[#ffffe5] font-medium"
                    duration={0.5}
                    delay={1600} // Increased delay
                    staggerDelay={50}
                    filter={true}
                  />
                   {/* <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <TextReveal
                      words="Student at College of Engineering Chengannur"
                      className="text-xl sm:text-2xl md:text-2xl text-left uppercase lg:text-2xl font-satoshi mt-12 text-white/75 hover:text-white transition-all cursor-pointer font-medium"
                      duration={0.5}
                      delay={2000} // Increased delay
                      staggerDelay={50}
                      filter={true}
                    />
                  </a>
                   <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <TextReveal
                      words="President of PRODDEC CEC"
                      className="text-xl sm:text-2xl md:text-3xl text-left uppercase lg:text-3xl font-satoshi mt-4 text-white/75 hover:text-white transition-all cursor-pointer font-medium"
                      duration={0.5}
                      delay={2000} // Increased delay
                      staggerDelay={50}
                      filter={true}
                    />
                  </a> */}

                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <TextReveal
                      words="Resumé"
                      className="text-xl sm:text-2xl md:text-3xl sm:text-left text-center uppercase lg:text-3xl font-satoshi mt-12 text-white/75 hover:text-white transition-all cursor-pointer font-medium"
                      duration={0.5}
                      delay={2000} // Increased delay
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
            <div className='w-full max-w-sm h-80 sm:h-96 lg:max-w-xl lg:h-screen lg:w-1/2 bgimg opacity-75'>
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
    </section>
  );
};

export default Hero;