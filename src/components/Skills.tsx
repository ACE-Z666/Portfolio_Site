'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './ui/TextReveal';
import SkillsActivityCard from './ui/SkillsActivityCard';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Add state for fetched data
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [technicalSkills, setTechnicalSkills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Fetch skillCategories
        const catQuery = query(collection(db, 'skillcategories'), orderBy('order', 'asc'));
        const catSnap = await getDocs(catQuery);
        setSkillCategories(catSnap.docs.map(doc => doc.data()));

        // Fetch technicalSkills
        const techQuery = query(collection(db, 'technicalskills'), orderBy('order', 'asc'));
        const techSnap = await getDocs(techQuery);
        setTechnicalSkills(techSnap.docs.map(doc => doc.data()));
      } catch (e) {
        console.error('Error fetching skills:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const skills = skillsRef.current;
    const activity = activityRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !skills || !activity || !cards) return;

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

    // Cards fade reveal animation
    gsap.fromTo(cards.children,
      { y: 40, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: cards,
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
    return <div className="text-white text-center py-20">Loading skills...</div>;
  }

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-20 md:py-32 bg-[#010101] relative overflow-hidden w-screen"
    >
      {/* Background Pattern
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23111111' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-1 0c0 10.493-8.507 19-19 19s-19-8.507-19-19 8.507-19 19-19 19 8.507 19 19z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div> */}

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <TextReveal
            words="My Cooking Tools"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ffffe5] mb-6 font-sulpr"
            duration={0.6}
            delay={100}
            staggerDelay={80}
          />
            <TextReveal
              words="A showcase of my latest work in web development, mobile applications, and AI integration."
              className="text-xl text-white/70 max-w-screen-2xl mx-auto leading-relaxed font-satoshi font-light"
              duration={0.5}
              delay={500}
              staggerDelay={40}
            />
         
        </div>
        

        <div className='flex flex-col-reverse'>

        {/* Skills Categories */}
        <div ref={skillsRef} className="w-full h-[60vh] md:h-[50vh] sm:h-[40vh] overflow-hidden relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 w-16 md:w-12 sm:w-8 h-full bg-gradient-to-r from-[#010101] to-transparent z-10 pointer-events-none"></div>
          {/* Right fade */}
          <div className="absolute right-0 top-0 w-16 md:w-12 sm:w-8 h-full bg-gradient-to-l from-[#010101] to-transparent z-10 pointer-events-none"></div>
          
          <nav className="flex flex-col h-full m-0 p-0">
            {skillCategories.map((category, idx) => (
              <SkillMenuItem key={idx} category={category} />
            ))}
          </nav>
        </div>

        {/* Technical Skills Activity Card */}
        <div className="sm:flex max-w-screen-2xl justify-center items-center">
          
        <div ref={activityRef} className="mb-16">
          <SkillsActivityCard
            title=""
            skills={technicalSkills}
            className="mx-auto bg-transparent"
          />
        </div>
        <div ref={cardsRef} className='sm:flex sm:flex-col flex justify-center items-center sm:px-24 px-4 py-4 mb-16 sm:py-0 sm:gap-4 gap-4'>
          {/* My Certifications Card */}
          <a 
            href="/certifications" 
            className="group w-36 sm:h-48 h-36 bg-transparent border border-white text-white font-sulpr rounded-2xl relative flex flex-col justify-center items-center hover:border-white/60 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="text-center">
              <span className="text-xl font-medium">My</span>
              <br />
              <span className="text-xl font-medium">Certifications</span>
            </div>
            {/* Arrow Icon */}
            <div className="absolute bottom-3 right-3 text-white/70 scale-150 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>

          {/* Projects Showcase Card */}
          <a 
            href="/projects" 
            className="group w-36 h-36 sm:h-48 bg-transparent border border-white text-white font-sulpr rounded-2xl relative flex flex-col justify-center items-center hover:border-white/60 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="text-center">
              <span className="text-xl font-medium">Projects</span>
              <br />
              <span className="text-xl font-medium">Showcase</span>
            </div>
            {/* Arrow Icon */}
            <div className="absolute bottom-3 right-3 text-white/70 scale-150 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>
        </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          {/* <p className="text-lg text-white/70 mb-6 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how my skills can help 
            transform your vision into reality.
          </p>
           */}
          <button 
            onClick={() => {
              const element = document.querySelector('#contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-hover px-8 py-4 bg-[#111111] text-white rounded-full font-light font-satoshi text-lg transition-all duration-300 hover:bg-[#333333] hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View My Certifications
          </button>
        </div>
      </div>
    </section>
  );
};

interface SkillMenuItemProps {
  category: {
    title: string;
    icon: string;
    skills: string[];
  };
}

const SkillMenuItem: React.FC<SkillMenuItemProps> = ({ category }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 8 }).map((_, idx) => (
      <React.Fragment key={idx}>
        {category.skills.map((skill, skillIdx) => (
          <React.Fragment key={skillIdx}>
            <span className="text-[#060010] uppercase font-normal text-xl md:text-lg sm:text-base leading-[1.2] px-4 md:px-3 sm:px-2 whitespace-nowrap">
              {skill}
            </span>
            {skillIdx < category.skills.length - 1 && (
              <span className="text-[#060010] text-xl md:text-lg sm:text-base px-2">✦</span>
            )}
          </React.Fragment>
        ))}
        <span className="text-[#060010] text-xl md:text-lg sm:text-base px-4 md:px-3 sm:px-2">✦</span>
      </React.Fragment>
    ));
  }, [category]);

  return (
    <div className="flex-1 relative overflow-hidden text-center max-w-screen-2xl shadow-[0_-1px_0_0_#333]" ref={itemRef}>
      <div
        className="flex items-center justify-center h-full relative cursor-pointer font-sulpr uppercase no-underline font-light text-white text-[vh] md:text-[4vh] sm:text-[5vh] hover:text-[#060010] transition-colors duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <TextReveal
          words={category.title}
          className="font-sulpr uppercase font-light text-white text-[3vh] md:text-[4vh] sm:text-[3vh]"
          duration={0.4}
          delay={50}
          staggerDelay={60}
        />
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-[#ffffe3] translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;