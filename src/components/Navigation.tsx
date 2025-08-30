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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      label: "About",
      bgColor: "#111111",
      textColor: "#fff",
      links: [
        { label: "My Story", href: "#about", ariaLabel: "Learn about my background" },
        { label: "Experience", href: "#about", ariaLabel: "View my experience" }
      ]
    },
    {
      label: "Work", 
      bgColor: "#2a2a2a",
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
        { label: "Contact", href: "#contact", ariaLabel: "Get in touch" },
        { label: "LinkedIn", href: "https://linkedin.com", ariaLabel: "LinkedIn Profile" },
        { label: "GitHub", href: "https://github.com", ariaLabel: "GitHub Profile" }
      ]
    }
  ];

  return (
    <CardNav
      logo="AJN"
      logoAlt="Abhijith J Nair Portfolio"
      items={navItems}
      baseColor={scrolled ? "#fefefe" : "#fefefe"}
      menuColor="#111111"
      buttonBgColor="#111111"
      buttonTextColor="#ffffff"
      ease="power3.out"
      onNavClick={scrollToSection}
      className={scrolled ? "shadow-xl" : ""}
    />
  );
};

export default Navigation;
