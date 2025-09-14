"use client";

import './globals.css';
import { ReactNode, useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    // First, remove the loading state
    setIsLoading(false);
    
    // Then animate in the main content with a slight delay
    requestAnimationFrame(() => {
      gsap.to(".main-content", {
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        onComplete: () => {
          // Refresh ScrollTrigger after content is visible
          ScrollTrigger.refresh(true);
        }
      });
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Hide main content initially
      gsap.set(".main-content", {
        opacity: 0
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Animation frame function
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Abhijith J Nair - AI/ML & Full Stack Developer</title>
        <meta name="description" content="Intermediate AI/ML & Full Stack Developer passionate about creating digital experiences that make a difference." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="relative text-[#111111] w-full h-full overflow-x-hidden ">
        {/* Loading Screen */}
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        
        {/* Fixed Navigation - Outside main content */}
        <Navigation />
        
        {/* Main Content - Always rendered but hidden during loading */}
        <div className="main-content">
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}