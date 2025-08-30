'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO, TechStart Inc.',
      avatar: '👩‍💼',
      text: 'Working with John was an absolute pleasure. He delivered a stunning website that exceeded our expectations. His attention to detail and technical expertise is remarkable.',
      project: 'E-commerce Platform'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager, InnovateCorp',
      avatar: '👨‍💻',
      text: 'John transformed our complex requirements into a beautiful, user-friendly application. His communication throughout the project was excellent and delivery was on time.',
      project: 'Task Management App'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Marketing Director, GrowthLab',
      avatar: '👩‍🎨',
      text: 'The AI content generator John built for us has revolutionized our content creation process. It\'s intuitive, powerful, and has saved us countless hours.',
      project: 'AI Content Generator'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Founder, WeatherTech',
      avatar: '👨‍🔬',
      text: 'John\'s expertise in both frontend and backend development is impressive. He created a comprehensive weather dashboard that our users absolutely love.',
      project: 'Weather Dashboard'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      position: 'Startup Founder',
      avatar: '👩‍🚀',
      text: 'From concept to deployment, John guided us through every step. His full-stack skills and problem-solving abilities are top-notch. Highly recommended!',
      project: 'Social Media Platform'
    },
    {
      id: 6,
      name: 'Alex Kumar',
      position: 'CTO, FinanceFlow',
      avatar: '👨‍💼',
      text: 'John delivered a robust cryptocurrency tracker with real-time data and beautiful visualizations. His code quality and architecture decisions were excellent.',
      project: 'Crypto Tracker'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-20 md:py-32 bg-[#fefefe] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111111' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6 font-satoshi">
            Others Opinion About Me!
          </h2>
          <div className="w-20 h-1 bg-[#111111] mx-auto mb-8"></div>
          <p className="text-xl text-[#111111]/70 max-w-3xl mx-auto leading-relaxed">
            Here is what others have to speak about me and my work!
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="card-hover bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-[#111111]/10 relative overflow-hidden">
            
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-6xl text-[#111111]/10 font-serif">
              "
            </div>
            
            <div className="relative z-10">
              
              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <p className="text-xl md:text-2xl text-[#111111]/80 leading-relaxed font-light mb-6">
                  {testimonials[currentTestimonial].text}
                </p>
                
                {/* Stars */}
                {/* <div className="flex justify-center mb-6">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div> */}
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] rounded-full flex items-center justify-center text-2xl border-2 border-[#111111]/10">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-[#111111] font-satoshi text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-[#111111]/60 font-medium">
                    {testimonials[currentTestimonial].position}
                  </p>
                  <p className="text-[#111111]/50 text-sm font-monojb">
                    Project: {testimonials[currentTestimonial].project}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-[#111111]/60 hover:text-[#111111] transition-colors hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-[#111111]/60 hover:text-[#111111] transition-colors hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-[#111111] scale-125' 
                    : 'bg-[#111111]/30 hover:bg-[#111111]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
       
      </div>
    </section>
  );
};

export default Testimonials;
