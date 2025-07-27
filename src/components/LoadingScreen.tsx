"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

const quotes = [
  "Welcome to My PORTFOLIO!!"
];

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    let currentProgress = 0;
    const tl = gsap.timeline();

    const interval = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += 1;
        setProgress(currentProgress);
      } else {
        clearInterval(interval);

        tl.to(".loading-comps", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(".quote-container", {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        })
        .to(".quote-container", {
          opacity: 0,
          duration: 0.5,
          delay: 1,
          ease: "power2.out"
        })
        .to(".loading-screen", {
          opacity: 0,
          duration: 0.5,
        })
        .set(".loading-screen", { display: "none" })
        .to([".faulty-terminal", ".main-content"], {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          onComplete: onLoadingComplete
        });
      }
    }, 30);

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen fixed inset-0 bg-[#030303] z-10 flex flex-col items-center">
      <div className="loading-comps sm:text-left text-center font-satoshi font-light h-1/3 w-screen px-48 py-32 text-7xl text-gray-300">
        Loading
        <span className="animate-pulse">...</span>
      </div>
      <div className="quote-container opacity-0 w-screen py-32 h-1/3 text-center px-8">
        <p className="font-satoshi font-light text-3xl text-gray-300">
          {quote}
        </p>
      </div>
      <div className="loading-comps h-1/3 sm:text-right text-center w-screen px-48 py-32 font-satoshi font-light text-7xl text-[#f18f01]">
        {progress}%
      </div>
    </div>
  );
};

export default LoadingScreen;