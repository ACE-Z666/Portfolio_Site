"use client";

import './globals.css';
import { ReactNode, useState, useEffect } from 'react';
import FaultyTerminal from '../components/animatedComps/FaultyTerminal';
import LoadingScreen from '../components/LoadingScreen';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  // THIS IS THE CORRECTED FUNCTION
  // It is now the single source of truth for animating the main content in.
  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      
      // Animate BOTH the background and the main content to visible
      gsap.to([".faulty-terminal", ".main-content"], {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        onComplete: () => {
          ScrollTrigger.refresh(true); // Force a hard refresh
        }
      });
    });
  };

  useEffect(() => {
    // This initial setup is correct - it hides content before animations run.
    if (typeof window !== 'undefined') {
      gsap.set([".main-content", ".faulty-terminal"], {
        opacity: 0
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <html lang="en" className="dark">
      <body className="relative bg-[#030303] text-gray-100 overflow-x-hidden">
        {isLoading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <>
            <div className="fixed inset-0 z-0 w-full h-full faulty-terminal">
              <FaultyTerminal
                scale={2}
                gridMul={[2, 1]}
                digitSize={1.4}
                timeScale={2}
                pause={false}
                scanlineIntensity={1}
                glitchAmount={1}
                flickerAmount={1}
                noiseAmp={1}
                chromaticAberration={0}
                dither={4}
                curvature={0}
                tint="#A6C954"
                mouseReact={true}
                mouseStrength={4}
                pageLoadAnimation={true}
                brightness={0.2}
              />
            </div>
            <div className="relative z-10 w-full main-content">
              <main className="min-h-screen flex flex-col items-center justify-center">
                {children}
              </main>
              <footer className="w-full py-6 sm:px-48 px-8 sm:text-left flex sm:flex-row flex-col text-center justify-between font-satoshi text-md text-gray-300 border-t border-gray-900">
                &copy; {new Date().getFullYear()} Abhijith J Nair. All rights reserved.
                <p>Bye Bee!!</p>
              </footer>
            </div>
          </>
        )}
      </body>
    </html>
  );
}