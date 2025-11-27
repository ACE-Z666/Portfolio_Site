'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';
import { ArrowRight, ExternalLink, ArrowLeft } from 'lucide-react';
import { db } from '@/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define the Project type
interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
}

const AllProjectsPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch ALL projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const q = query(projectsCollection, orderBy('order', 'asc'));
        const projectsSnapshot = await getDocs(q);
        const projectsList = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Project));
        setProjectsData(projectsList);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Animate cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const isEven = index % 2 === 0;
          
          gsap.fromTo(card, 
            {
              opacity: 0,
              x: isEven ? -100 : 100,
              rotationY: isEven ? -15 : 15,
              transformPerspective: 1000
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.1
            }
          );

          // Hover animations
          const image = card.querySelector('.project-image');
          const overlay = card.querySelector('.project-overlay');
          
          if (image && overlay) {
            card.addEventListener('mouseenter', () => {
              gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" });
              gsap.to(overlay, { opacity: 1, duration: 0.4 });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
              gsap.to(overlay, { opacity: 0, duration: 0.4 });
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#010101] w-screen flex justify-center items-center">
        <div className="text-white text-2xl font-satoshi">Loading Projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010101] w-screen">
      <section 
        ref={sectionRef}
        className="relative overflow-hidden w-screen py-20 lg:py-32"
      >

        {/* Header Section */}
        <div className="relative z-20 mb-20">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <TextReveal
                words="All Projects"
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#fff] mb-6 font-sulpr"
                duration={0.6}
                delay={100}
                staggerDelay={80}
              />
              <TextReveal
                words="Showcasing of all my work so far, and more to arrive to this list."
                className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed font-satoshi font-light"
                duration={0.5}
                delay={500}
                staggerDelay={40}
              />
             
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="relative z-10">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {projectsData.map((project, index) => (
                <div 
                  key={index}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div className="relative bg-gradient-to-br from-zinc-900/50 via-zinc-800/30 to-zinc-900/80 backdrop-blur-xl border border-zinc-700/30 rounded-3xl overflow-hidden transform-gpu transition-all duration-700 hover:border-[#ffffe5]/20 hover:shadow-2xl hover:shadow-[#ffffe5]/10">
                    
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#333333] via-[#222222] to-[#111111] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-image w-full h-full sm:grayscale sm:group-hover:grayscale-0 grayscale-0 transition-all object-cover"
                      />
                      
                      {/* Image Overlay */}
                      <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-400"></div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-8">
                      {/* Title with animated underline */}
                      <div className="relative mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-[#ffffff] font-sulpr group-hover:text-[#ffffe5] transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="text-zinc-400 font-satoshi text-base leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors duration-300">
                        {project.description}  
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 font-satoshi mb-8">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-4 py-2 text-sm font-medium bg-zinc-800/60 text-white rounded-full border border-zinc-600/40 backdrop-blur-sm group-hover:bg-[#212121] group-hover:border-[#444444] group-hover:text-[#ffffe5] transition-all duration-400"
                            style={{ 
                              transitionDelay: `${techIndex * 50}ms` 
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r font-satoshi font-extralight from-zinc-800 to-zinc-700 hover:from-[#111111] hover:to-[#121212] text-[#ffffe5] hover:text-white rounded-xl border border-zinc-600/40 hover:border-[#ffffe5]/50 transition-all duration-400 hover:shadow-lg hover:shadow-[#ffffe5]/5 group/btn"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-3xl transform rotate-45 translate-x-16 -translate-y-16 group-hover:from-orange-500/20 transition-all duration-700"></div>
                  </div>

                  {/* Floating shadow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-purple-500/0 group-hover:from-orange-500/10 group-hover:to-purple-500/5 rounded-3xl blur-xl transition-all duration-700 -z-10 transform scale-95 group-hover:scale-100"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProjectsPage;
