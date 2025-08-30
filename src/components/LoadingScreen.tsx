'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: "Welcome", language: "English" },
  { text: "स्वागत", language: "Hindi" },
  { text: "أهلاً وسهلاً", language: "Arabic" },
  { text: "欢迎", language: "Chinese" },
  { text: "Bienvenue", language: "French" },
  // { text: "Bienvenido", language: "Spanish" },
  { text: "Willkommen", language: "German" },
  { text: "ようこそ", language: "Japanese" },
  { text: "환영합니다", language: "Korean" },
  { text: "Benvenuto", language: "Italian" },
  { text: "пожаловать", language: "Russian" },
  // { text: "Bem-vindo", language: "Portuguese" },
];

const DynamicWelcome = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(true);
  const [showFinal, setShowFinal] = React.useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          // // Show final "Welcome" after animation completes
          // setTimeout(() => setShowFinal(true), 300);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 350); // Slower for smoother transitions

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative h-8 w-1/2 flex items-center justify-center overflow-hidden min-w-[200px]">
      {showFinal ? (
        <div className="flex items-center gap-2 text-2xl font-medium text-[#111111]/80 animate-fade-in">
          <div className="h-2 w-2 rounded-full bg-[#111111]/0" />
          Welcome
        </div>
      ) : isAnimating ? (
        <div 
          key={currentIndex}
          className="absolute flex w-full items-center gap-2 text-2xl font-medium text-[#111111]/80 animate-slide-up"
          style={{
            animation: 'slideUp 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards'
          }}
        >
          <div className="h-2 w-2 rounded-full bg-[#111111]/0" />
          {greetings[currentIndex]?.text || 'Welcome'}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-2xl font-medium text-[#111111]/80">
          <div className="h-2 w-2 rounded-full bg-[#111111]/0" />
          Welcome
        </div>
      )}
    </div>
  );
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([logoRef.current, progressRef.current, textRef.current], {
      opacity: 0,
      y: 30
    });

    // Logo animation
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Progress bar animation
    tl.to(progressRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.5);

    // Text animation (Dynamic Welcome)
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.8);

    // Progress bar fill - extended for dynamic text animation
    tl.to('.progress-fill', {
      width: '100%',
      duration: 3, // Increased duration to accommodate greeting animations
      ease: 'power2.inOut'
    }, 1.2);

    // Complete loading
    tl.to(loadingRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => {
        // Small delay before calling completion callback
        gsap.delayedCall(0.2, onLoadingComplete);
      }
    }, 4.2); // Adjusted timing for longer animation

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div 
      ref={loadingRef}
      className="loading-screen fixed inset-0 bg-[#fefefe] z-50 flex items-center justify-center"
    >
      <div className="text-center max-w-md mx-auto px-6">
        
        {/* Logo */}
        <div ref={logoRef} className="mb-12">
        </div>
         {/* Dynamic Welcome Text */}
        <div ref={textRef} className="space-y-4">
          <DynamicWelcome />
        </div>
        {/* Progress Bar
        <div ref={progressRef} className="mb-8">
          <div className="w-64 h-2 bg-[#111111]/20 rounded-full overflow-hidden mx-auto">
            <div className="progress-fill h-full bg-[#111111] rounded-full w-0"></div>
          </div>
        </div> */}

       
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #111111 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          60% {
            transform: translateY(-3px);
            opacity: 0.9;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
