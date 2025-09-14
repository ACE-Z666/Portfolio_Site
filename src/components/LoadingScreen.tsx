'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  // { text: "Welcome", language: "English" },
  { text: "स्वागत", language: "Hindi" },
  { text: "欢迎", language: "Chinese" },
  { text: "Bienvenue", language: "French" },
  { text: "Bienvenido", language: "Spanish" },
  { text: "Willkommen", language: "German" },
  { text: "ようこそ", language: "Japanese" },
  { text: "환영합니다", language: "Korean" },
  { text: "Benvenuto", language: "Italian" },
  { text: "مرحبا", language: "Arabic" },
  { text: "Welcome", language: "English" },
];

const DynamicWelcome = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          // Call completion after final "Welcome" shows for a moment
          setTimeout(() => {
            onAnimationComplete();
          }, 1500);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 350);

    return () => clearInterval(interval);
  }, [isAnimating, onAnimationComplete]);

  // Animation variants for the text
  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -30, opacity: 0 },
  };

  return (
    <div className="flex items-center justify-center gap-1 p-4">
      <div className="relative h-16 w-full max-w-md flex items-center justify-center overflow-visible">
        {isAnimating ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="absolute flex items-center gap-3 text-xl sm:text-xl md:text-xl lg:text-2xl font-medium text-white font-satoshi"
              initial={textVariants.hidden}
              animate={textVariants.visible}
              exit={textVariants.exit}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="h-2 w-2 rounded-full bg-white/0" />
              {greetings[currentIndex].text}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center gap-3 text-xl sm:text-xl md:text-xl lg:text-2xl font-medium text-white font-satoshi">
            <div className="h-2 w-2 rounded-full bg-white/0" />
            {greetings[currentIndex].text}
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const dynamicTextRef = useRef<HTMLDivElement>(null);

  const handleAnimationComplete = () => {
    // Fade out the entire loading screen
    if (loadingRef.current) {
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          onLoadingComplete();
        }
      });
    }
  };

  useEffect(() => {
    // Initial setup - show dynamic text
    gsap.set(dynamicTextRef.current, {
      opacity: 1,
    });

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div 
      ref={loadingRef}
      className="loading-screen fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Welcome Text */}
      <div 
        ref={dynamicTextRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          <DynamicWelcome onAnimationComplete={handleAnimationComplete} />
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Ambient light effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default LoadingScreen;
