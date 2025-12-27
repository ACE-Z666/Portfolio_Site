'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  image: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  duration?: number;
  className?: string;
  isVisible?: boolean; // Add this prop
}

const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials,
  autoplay = false,
  duration = 5000,
  className = '',
  isVisible = true // Add default value
}) => {
  const [active, setActive] = useState(0);

  const randomRotateY = useCallback(() => {
    return Math.floor(Math.random() * 21) - 10;
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = useCallback((index: number) => {
    return active === index;
  }, [active]);

  useEffect(() => {
    if (!autoplay || !isVisible) return; // Check isVisible here

    const interval = setInterval(handleNext, duration);
    return () => clearInterval(interval);
  }, [autoplay, duration, handleNext, isVisible]); // Add isVisible to dependencies

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const activeTestimonialQuote = testimonials[active]?.quote.split(" ") || [];

  return (
    <div className={`mx-auto max-w-sm px-4 py-12 md:py-20 font-sans antialiased lg:px-12 md:max-w-4xl md:px-8 xl:max-w-6xl ${className}`}>
      <div className="relative grid grid-cols-1 sm:gap-36 gap-12 md:grid-cols-2">
        {/* Image Stack with Navigation Below */}
        <div className="order-1 flex flex-col">
          <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-80">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.image}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -20, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-2xl md:rounded-3xl object-cover object-center"
                    draggable={false}
                    priority={isActive(index)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Fixed below images */}
          <motion.div 
            className="flex justify-center gap-4 mt-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              onClick={handlePrev}
              className="group/button flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#343434] hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover/button:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#343434] hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover/button:-rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>

          {/* Dots Indicator - Below arrows */}
          <motion.div 
            className="flex gap-2 justify-center mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  isActive(index) 
                    ? 'bg-[#ffffe5] w-6' 
                    : 'bg-[#343434] hover:bg-[#353535]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col py-4 order-1 md:order-2 relative h-full">
          {/* Content Area - Flexible height */}
          <div className="flex-1 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                {/* Name with slide animation */}
                <motion.h3 
                  className="text-xl sm:text-3xl font-sulpr font-bold text-[#ffffe5] mb-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {testimonials[active]?.name}
                </motion.h3>
                
                {/* Designation with fade animation */}
                <motion.p 
                  className="text-md font-satoshi text-[#787878] mb-6 md:mb-8"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {testimonials[active]?.designation}
                </motion.p>
                
                {/* Enhanced Quote Animation */}
                <motion.div
                  className="relative" // Add padding-top here
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {/* Animated quotation marks */}
                  <motion.span
                    className="absolute -top-2 left-0 italic text-5xl sm:text-6xl text-[#555555] font-serif" // Adjusted positioning
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.4 }}
                  >
                    "
                  </motion.span>
                  
                  <motion.p className="text-base sm:text-lg text-[#fff]/80 italic font-satoshi leading-relaxed relative z-10 pl-6 sm:pl-8"> {/* Increased left padding */}
                    {activeTestimonialQuote.map((word, index) => (
                      <motion.span
                        key={`${active}-${index}`}
                        initial={{
                          filter: 'blur(10px)',
                          opacity: 0,
                          y: 20,
                          scale: 0.8,
                          rotateX: -90,
                        }}
                        animate={{
                          filter: 'blur(0px)',
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          rotateX: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: 0.5 + (0.03 * index),
                          type: "spring",
                          stiffness: 100,
                          damping: 10,
                        }}
                        className="inline-block mr-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;