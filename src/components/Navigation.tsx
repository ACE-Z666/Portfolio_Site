'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { useRouter, usePathname } from 'next/navigation';
import CardNav from './CardNav';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navigation on mount with delay for loading screen
    gsap.fromTo('.card-nav-container', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.5 }
    );
  }, []);

  // Handle hash navigation after page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && pathname === '/') {
      // Wait for page to fully render
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname]);

  const scrollToSection = (href: string) => {
    // Check if it's an internal anchor link
    if (href.startsWith('#')) {
      // Check if we're on the home page
      if (pathname === '/') {
        // Same page - just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Different page - navigate to home with hash and scroll after load
        router.push(`/${href}`);
        
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const checkElement = setInterval(() => {
            const element = document.querySelector(href);
            if (element) {
              clearInterval(checkElement);
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
          
          // Clear interval after 3 seconds to avoid infinite loop
          setTimeout(() => clearInterval(checkElement), 3000);
        }, 300);
      }
    } 
    // Check if it's a mailto link
    else if (href.startsWith('mailto:')) {
      window.location.href = href;
    }
    // Otherwise, it's an external link - open in new tab
    else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  // Dynamically create navItems based on current pathname
  const navItems = useMemo(() => {
    const isProjectsPage = pathname === '/projects';

    return [
      {
        label: "About",
        bgColor: "#222222",
        textColor: "#fff",
        links: [
          { label: "My Career", href: "https://www.linkedin.com/in/abhijith-j-nair/", ariaLabel: "Learn about my background" },
          { label: "About Me", href: "#about", ariaLabel: "View my experience" }
        ]
      },
      {
        label: "View", 
        bgColor: "#2c2c2c",
        textColor: "#fff",
        links: isProjectsPage 
          ? [
              { label: "Home", href: "#hero", ariaLabel: "Go to home" },
            ]
          : [
              { label: "Projects", href: "#projects", ariaLabel: "View my projects" },
              { label: "Skills", href: "#skills", ariaLabel: "See my skills" },
              { label: "Testimonials", href: "#testimonials", ariaLabel: "Read testimonials" }
            ]
      },
      {
        label: "Connect",
        bgColor: "#404040", 
        textColor: "#fff",
        links: [
          { label: "Contact", href: "mailto:abhijithjnair4321@gmail.com", ariaLabel: "Get in touch" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/abhijith-j-nair/", ariaLabel: "LinkedIn Profile" },
          { label: "GitHub", href: "https://github.com/ACE-Z666", ariaLabel: "GitHub Profile" }
        ]
      }
    ];
  }, [pathname]);

  return (
    <div className="fixed top-0 sm:left-1/2 right-0 w-full z-50 px-4 sm:px-6 lg:px-8 flex justify-end pointer-events-auto">
      <CardNav
        logo="AJN"
        logoAlt="Abhijith J Nair"
        items={navItems}
        baseColor={scrolled ? "transparent" : "transparent"}
        menuColor="#eeeeee"
        buttonBgColor="transparent"
        buttonTextColor="#ffffff"
        ease="power3.out"
        onNavClick={scrollToSection}
        className={`card-nav-container ${scrolled ? "shadow-2xl " : ""}`}
      />
    </div>
  );
};

export default Navigation;
