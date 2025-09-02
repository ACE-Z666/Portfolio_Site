'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './ui/TextReveal';
import SkillsActivityCard from './ui/SkillsActivityCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const skills = skillsRef.current;
    const activity = activityRef.current;

    if (!section || !title || !skills || !activity) return;

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

    // Skills cards animation
    gsap.fromTo(skills.children,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: skills,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Activity card animation
    gsap.fromTo(activity,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: activity,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'SASS']
      
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      skills: ['Node.js', 'Python', 'Express.js', 'FastAPI', 'GraphQL', 'REST APIs']
    
    },
    {
      title: 'Database & Cloud',
      icon: '☁️',
      skills: ['Firebase', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Redis']
      
    },
    {
      title: 'Tools & DevOps',
      icon: '🛠️',
      skills: ['Git', 'GitHub Actions', 'Webpack', 'Vite', 'Jest', 'Cypress']
     
    }
  ];

  const technicalSkills = [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'React/Next.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Database Design', level: 85 },
    { name: 'Cloud Platforms', level: 75 },
    { name: 'UI/UX Design', level: 70 },
    { name: 'DevOps', level: 65 }
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-20 md:py-32 bg-[#f9f9d3] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23111111' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-1 0c0 10.493-8.507 19-19 19s-19-8.507-19-19 8.507-19 19-19 19 8.507 19 19z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <TextReveal
            words="Skills & Expertise"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6 font-satoshi"
            duration={0.6}
            delay={100}
            staggerDelay={80}
          />
          <div className="w-20 h-1 bg-[#111111] mx-auto mb-8"></div>
          <TextReveal
            words="A comprehensive overview of my technical skills and areas of expertise in modern web development and software engineering."
            className="text-xl text-[#111111]/70 max-w-3xl mx-auto leading-relaxed"
            duration={0.5}
            delay={500}
            staggerDelay={40}
          />
        </div>

        {/* Skills Categories */}
        <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="card-hover group bg-white rounded-2xl p-6 shadow-lg border border-[#111111]/10 hover:shadow-xl transition-all duration-500 text-center"
            >
              
              <h3 className="text-xl font-bold text-[#111111] mb-3 font-satoshi">
                {category.title}
              </h3>
              
              
              <div className="flex flex-wrap justify-center gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-[#f8f8f8] text-[#111111] rounded text-xs font-medium border border-[#111111]/10 hover:bg-[#111111] hover:text-white transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Technical Skills Activity Card */}
        <div ref={activityRef} className="mb-16">
          <SkillsActivityCard
            title="Technical Proficiency"
            skills={technicalSkills}
            className="mx-auto bg-transparent"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-[#111111]/70 mb-6 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how my skills can help 
            transform your vision into reality.
          </p>
          
          <button 
            onClick={() => {
              const element = document.querySelector('#contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-hover px-8 py-4 bg-[#111111] text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#333333] hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start a Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;