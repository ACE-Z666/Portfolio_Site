'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  words: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  staggerDelay?: number;
  once?: boolean; // Only animate once when in view
  threshold?: number; // Intersection threshold
}

const TextReveal: React.FC<TextRevealProps> = ({
  words,
  filter = true,
  duration = 0.5,
  delay = 0,
  className = '',
  staggerDelay = 80,
  once = true,
  threshold = 0.1,
}) => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const wordsArray = words.split(' ');

  useEffect(() => {
    const currentElement = scopeRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setIsInView(true);
        } else if (!entry.isIntersecting && !once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [once, hasAnimated, threshold]);

  useEffect(() => {
    if (isInView && scopeRef.current && (!once || !hasAnimated)) {
      const spans = scopeRef.current.querySelectorAll('span');
      
      // Adjust stagger delay for mobile devices
      const isMobile = window.innerWidth < 768;
      const adjustedStaggerDelay = isMobile ? Math.max(staggerDelay * 0.7, 50) : staggerDelay;
      
      const timer = setTimeout(() => {
        spans.forEach((span: HTMLElement, index: number) => {
          setTimeout(() => {
            span.style.opacity = '1';
            span.style.filter = filter ? 'blur(0px)' : 'none';
            span.style.transform = 'translateY(0px)';
          }, index * adjustedStaggerDelay);
        });
        
        if (once) {
          setHasAnimated(true);
        }
      }, delay);

      return () => clearTimeout(timer);
    } else if (!isInView && !once) {
      // Reset animation if not once and not in view
      const spans = scopeRef.current?.querySelectorAll('span');
      spans?.forEach((span: HTMLElement) => {
        span.style.opacity = '0';
        span.style.filter = filter ? 'blur(10px)' : 'none';
        span.style.transform = 'translateY(20px)';
      });
    }
  }, [isInView, delay, staggerDelay, filter, once, hasAnimated]);

  const spanStyle: React.CSSProperties = {
    opacity: 0,
    filter: filter ? 'blur(10px)' : 'none',
    transform: 'translateY(20px)',
    transition: `opacity ${duration}s ease-out, filter ${duration}s ease-out, transform ${duration}s ease-out`,
    display: 'inline-block',
  };

  return (
    <div className={cn('leading-snug tracking-wide', className)}>
      <div ref={scopeRef}>
        {wordsArray.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            className="inline-block"
            style={spanStyle}
          >
            {word}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextReveal;
