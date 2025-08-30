"use client";

import './globals.css';
import { ReactNode, useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  return (
    <html lang="en">
      <head>
        <title>Abhijith J Nair - AI/ML & Full Stack Developer</title>
        <meta name="description" content="Intermediate AI/ML & Full Stack Developer passionate about creating digital experiences that make a difference." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="relative bg-[#fefefe] text-[#111111] overflow-x-hidden">
        {/* Loading Screen */}
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        
        {/* Main Content - Always rendered but hidden during loading */}
        <div className="main-content">
          <Navigation />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}