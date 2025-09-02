'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './ui/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const projects = projectsRef.current;

    if (!section || !title || !projects) return;

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

    // Projects animation
    gsap.fromTo(projects.children,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: projects,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with Next.js, Stripe, and Firebase. Features include user authentication, product management, shopping cart, and secure payment processing.',
      technologies: ['Next.js', 'Firebase', 'Stripe', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Socket.io.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Web App'
    },
    {
      id: 3,
      title: 'AI Content Generator',
      description: 'An AI-powered content generation tool that helps users create blog posts, social media content, and marketing copy using OpenAI\'s API.',
      technologies: ['Python', 'FastAPI', 'OpenAI API', 'React'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'AI/ML'
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that provides real-time weather data, forecasts, and interactive maps. Features geolocation and favorite locations.',
      technologies: ['Vue.js', 'Weather API', 'Chart.js', 'PWA'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Dashboard'
    },
    {
      id: 5,
      title: 'Cryptocurrency Tracker',
      description: 'A real-time cryptocurrency tracking application with portfolio management, price alerts, and detailed analytics. Built with React Native for mobile.',
      technologies: ['React Native', 'Redux', 'CoinGecko API', 'Firebase'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Mobile App'
    },
    {
      id: 6,
      title: 'Social Media Platform',
      description: 'A modern social media platform with real-time messaging, post sharing, story features, and user engagement analytics.',
      technologies: ['Next.js', 'PostgreSQL', 'Redis', 'AWS S3'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Social Platform'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 md:py-32 bg-[#f9f9d3] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111111' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <TextReveal
            words="My Works"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6 font-hattonem"
            duration={0.6}
            delay={100}
            staggerDelay={80}
          />
          <div className="w-20 h-1 bg-[#111111] mx-auto mb-8"></div>
          <TextReveal
            words="Some of my recent projects focussing on web development, mobile applications, and AI integration."
            className="text-xl text-[#111111]/70 max-w-3xl mx-auto leading-relaxed font-satoshi font-medium"
            duration={0.5}
            delay={500}
            staggerDelay={40}
          />
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card-hover group bg-[#f8f8f8] rounded-2xl p-6 shadow-lg border border-[#111111]/10 hover:shadow-2xl transition-all duration-500"
            >
              {/* Project Header */}
              <div className="flex items-center justify-between mb-4 font-satoshi font-extralight">
                <span className="px-3 py-1 bg-[#111111]/0 border-2 border-[#222222]/50 text-[#111111] rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <div className="flex space-x-2">
                  <a
                    href={project.liveUrl}
                    className="p-2 text-[#111111]/60 hover:text-[#111111] transition-colors hover:scale-110 transform"
                    aria-label="View Live Project"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-2 text-[#111111]/60 hover:text-[#111111] transition-colors hover:scale-110 transform"
                    aria-label="View GitHub Repository"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-xl  text-[#111111] font-hattonem group-hover:text-[#333333] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-[#111111]/70 text-sm leading-relaxed font-satoshi font-medium">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#F7E6CA]/60 text-[#111111] rounded-full text-xs font-medium font-satoshi border border-[#111111]/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button className="btn-hover px-8 py-4 border-2 border-[#111111] text-[#111111] font-satoshi rounded-full font-medium text-lg transition-all duration-300 hover:bg-[#111111] hover:text-white hover:scale-105">
            <TextReveal
              words="View All Projects"
              className="inline-block"
              duration={0.4}
              delay={900}
              staggerDelay={60}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
