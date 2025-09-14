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
    // Set initial states for elements animated directly with GSAP
    // gsap.set([buttonRef.current, scrollIndicatorRef.current], {
    //   opacity: 0,
    //   y: 30
    // });

    gsap.set(heroRef.current, { opacity: 1 });

    const startAnimations = () => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      // Text animations are handled by the TextReveal component.
      // We only animate the buttons and scroll indicator here.

      tl.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 1.1); // Stagger start time after text animations

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
      className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-[#010101]"
    >
      {/* LiquidEther Animated Background */}
    
      {/* Main container for two-column layout */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* ====== Left Column: Text Content ====== */}
          <div className="w-full lg:w-3/5 text-center bottom-0 lg:text-left">
            {/* Name */}
            <h1 ref={nameRef}>
              <TextReveal
                words="Hey I'm"
                className="text-xl sm:text-xl md:text-xl mb-1 lg:text-xl font-extralight text-white font-satoshi leading-tight"
                duration={0.6}
                delay={300}
                staggerDelay={60}
                filter={true}
              />
            </h1>

            <TextReveal
                words="Abhijith J Nair"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-extralight text-white mb-16 font-sulpr leading-tight"
                duration={0.6}
                delay={300}
                staggerDelay={60}
                filter={true}
              />

            {/* Designation */}
            <div ref={designationRef} className="mb-8 text-center lg:text-left">
              <TextReveal
                words="Intermediate AI/ML & Full Stack"
                className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-satoshi mb-2 text-white/75 font-medium"
                duration={0.5}
                delay={800}
                staggerDelay={50}
                filter={true}
              />
              <TextReveal
                words="Developer."
                className="text-5xl sm:text-6xl md:text-7xl uppercase lg:text-[130px] font-sulpr text-white font-medium"
                duration={0.5}
                delay={800}
                staggerDelay={50}
                filter={true}
              />
            </div>
            
            {/* Description
            <div ref={descriptionRef} className="mb-12">
              <TextReveal
                words="Passionate about creating digital experiences that make a difference. Building intelligent applications with modern technologies and clean, efficient code."
                className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                duration={0.5}
                delay={1200}
                staggerDelay={40}
                filter={true}
              />
            </div> */}

            {/* Buttons
            <div 
              ref={buttonRef}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              <button 
                onClick={() => scrollToSection('#projects')}
                className="btn-hover px-8 py-4 bg-[#555555] text-white rounded-full font-light font-satoshi text-lg transition-all duration-300 hover:bg-[#333333] hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              
              <button 
                onClick={() => scrollToSection('#contact')}
                className="btn-hover px-8 py-4 border-2 border-[#555555] text-white rounded-full font-normal font-satoshi text-lg transition-all duration-300 hover:bg-[#555555] hover:text-white hover:scale-105"
              >
                Get In Touch
              </button>
            </div> */}
          </div>

          {/* ====== Right Column: Image/Visual Placeholder ====== */}
          <div className="w-full lg:w-2/5 flex items-center justify-center  lg:justify-end">
            {/* This div is for your image. Add a background image using the 'bgimg' class in your CSS or use an <img> tag inside. */}
            <div className='w-full max-w-sm h-80 sm:h-96 lg:max-w-md lg:h-[28rem]  rounded-xl bgimg opacity-50'>
              {/* Example: <img src="/path/to/your/image.jpg" alt="Abhijith J Nair" className="w-full h-full object-cover rounded-xl" /> */}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator (Positioned absolutely relative to the section)
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('#about')}
      >
        <div className="flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-colors">
          <span className="text-sm font-medium">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div> */}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#111111]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#111111]/5 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;