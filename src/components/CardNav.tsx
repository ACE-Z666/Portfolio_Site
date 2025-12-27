'use client';

import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useRouter, usePathname } from 'next/navigation';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  onNavClick?: (href: string) => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Portfolio Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fefefe",
  menuColor = "#111111",
  buttonBgColor = "#111111",
  buttonTextColor = "#ffffff",
  onNavClick,
  onMenuToggle
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 280;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        // Temporarily show content to measure
        const originalStyles = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height
        };

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        // Force reflow
        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 20;
        const contentHeight = contentEl.scrollHeight;
        const calculatedHeight = topBar + contentHeight + padding;

        // Restore original styles
        Object.assign(contentEl.style, originalStyles);

        return Math.min(calculatedHeight, window.innerHeight * 0.8); // Max 80% of viewport
      }
    }
    return 280;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Kill existing timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current.filter(Boolean), { y: 30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease,
    });

    tl.to(
      cardsRef.current.filter(Boolean),
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.1 },
      "-=0.2"
    );

    return tl;
  }, [ease, calculateHeight]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [createTimeline]);

  useLayoutEffect(() => {
    const handleResize = () => {
      // Clear existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Debounce resize handling
      resizeTimeoutRef.current = setTimeout(() => {
        if (!tlRef.current) return;

        if (isExpanded) {
          const newHeight = calculateHeight();
          gsap.set(navRef.current, { height: newHeight });

          // Recreate timeline with current state
          const newTl = createTimeline();
          if (newTl) {
            newTl.progress(1);
            tlRef.current = newTl;
          }
        } else {
          // Recreate timeline for collapsed state
          const newTl = createTimeline();
          if (newTl) {
            tlRef.current = newTl;
          }
        }
      }, 150); // 150ms debounce
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [isExpanded, createTimeline, calculateHeight]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      onMenuToggle?.(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      onMenuToggle?.(false);
      tl.eventCallback("onReverseComplete", () => {
        setIsExpanded(false);
        tl.eventCallback("onReverseComplete", null); // Clear callback
      });
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardsRef.current[i] = el;
    }
  };

  const handleNavClick = (href: string) => {
    if (onNavClick) {
      onNavClick(href);
    }
    // Close menu after navigation with small delay for better UX
    if (isExpanded) {
      setTimeout(() => {
        toggleMenu();
      }, 100);
    }
  };

  const handleLogoClick = () => {
    // If on home page, scroll to top
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      router.push('/');
    }
  };

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-screen-xl z-50 top-0 md:top-0 ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[60px] p-0 rounded-b-2xl px-4 py-2 shadow-lg backdrop-blur-xl border-b border-[#eeeeee]/10 relative overflow-hidden will-change-[height] transition-shadow duration-300`}
        style={{ backgroundColor: `${baseColor}f0` }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-6 z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer gap-[5px] order-2 md:order-none p-2 rounded-lg hover:bg-black/5 transition-colors duration-200`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
            style={{ color: menuColor }}
          >
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-origin:50%_50%] ${
                isHamburgerOpen ? "translate-y-[3.5px] rotate-45" : ""
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-origin:50%_50%] ${
                isHamburgerOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <div 
              className="font-agraham text-xl font-medium text-[#ffffe5] cursor-pointer hover:opacity-75 transition-opacity duration-200" 
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLogoClick();
                }
              }}
            >
              {logo}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('https://drive.google.com/file/d/11mPnrdjd3jf7T64n-jXGk3zF2j_u4QAw/view?usp=sharing')}
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-xl px-6 py-2 font-medium font-satoshi cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
          >
            Résumé
          </button>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-4 flex flex-col items-stretch gap-3 justify-start z-[1] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-4`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-3 p-5 rounded-xl font-satoshi min-w-0 flex-[1_1_auto] h-auto min-h-[80px] md:h-full md:min-h-0 md:flex-[1_1_0%] hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-satoshi font-medium tracking-[-0.5px] text-lg md:text-xl">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-1">
                {item.links?.map((lnk, i) => (
                  <button
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex font-satoshi items-center gap-2 no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-sm md:text-base text-left p-0 border-0 bg-transparent focus:outline-none focus:opacity-75"
                    onClick={() => handleNavClick(lnk.href)}
                    aria-label={lnk.ariaLabel}
                    style={{ color: item.textColor }}
                  >
                    <svg 
                      className="nav-card-link-icon shrink-0 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 17l9.2-9.2M17 17V7H7" 
                      />
                    </svg>
                    {lnk.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;