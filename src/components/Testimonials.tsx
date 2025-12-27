'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './ui/TextReveal';
import AnimatedTestimonials from './ui/AnimatedTestimonials';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch testimonials from Firebase
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsCollection = collection(db, 'testimonials');
        const q = query(testimonialsCollection, orderBy('order', 'asc'));
        const testimonialsSnapshot = await getDocs(q);
        const testimonialsList = testimonialsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTestimonials(testimonialsList);
      } catch (error) {
        console.error("Error fetching testimonials: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const testimonials = testimonialsRef.current;

    if (!section || !title || !testimonials) return;

    // Title animation
    gsap.fromTo(title.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Testimonials animation
    gsap.fromTo(testimonials.children,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonials,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-[#010101] flex justify-center items-center">
        <div className="text-white">Loading Testimonials...</div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-20 md:py-32 bg-[#010101] relative overflow-hidden"
    >
      {/* Background Pattern
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111111' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div> */}

      <div className="max-w-screen-2xl mx-auto px-4  sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-24 sm:mb-32"> {/* Increased bottom margin */}
          <TextReveal
            words="Hear From Others"
            className="text-4xl md:text-6xl lg:text-7xl sm:text-left text-center font-bold text-[#fff] mb-6 font-sulpr"
            duration={0.6}
            delay={100}
            staggerDelay={80}
          />

          <TextReveal
            words="Here is what others have to speak about me!"
            className="text-xl text-white/70 w-full sm:text-left text-center  mx-auto font-light font-satoshi leading-relaxed"
            duration={0.5}
            delay={500}
            staggerDelay={50}
          />
        </div>

        {/* All Testimonials Grid */}
        <div ref={testimonialsRef} className='sm:scale-125 scale-100 sm:mt-16'> {/* Added top margin for scaled version */}
          <AnimatedTestimonials 
            testimonials={testimonials}
            autoplay={true}
            duration={70000}
            className="bg-[#010101]"
          />
        </div>
       
      </div>
    </section>
  );
};

export default Testimonials;
