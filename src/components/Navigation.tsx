'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import CardNav from './CardNav';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

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

  const scrollToSection = (href: string) => {
    // Check if it's an internal anchor link
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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
  const navItems = [
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
      label: "Work", 
      bgColor: "#2c2c2c",
      textColor: "#fff",
      links: [
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
