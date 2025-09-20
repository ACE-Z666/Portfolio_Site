'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import TextReveal from './ui/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const [progressValue, setProgressValue] = useState(20); // Default initial value
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [busyMeterText, setBusyMeterText] = useState("I will be busy Right now! But soon will be available.");
  const [newBusyTextInput, setNewBusyTextInput] = useState(""); // State for the new text input

  // Function to get shadow color based on value
  const getShadowColor = (value: number) => {
    if (value > 75) return 'rgba(239, 68, 68, 0.6)';
    if (value >= 25) return 'rgba(255, 255, 227, 0.6)';
    return 'rgba(34, 197, 94, 0.6)';
  };

  // Function to save progress value to Firebase
  const saveProgressToFirebase = async (value: number) => {
    try {
      await addDoc(collection(db, 'progressValues'), {
        value: value,
        timestamp: serverTimestamp(),
        type: 'success_rate'
      });
      console.log('Progress value saved to Firebase:', value);
    } catch (error) {
      console.error('Error saving progress to Firebase:', error);
    }
  };

  // Function to save text content to Firebase
  const saveTextContentToFirebase = async (content: string, section: string) => {
    try {
      await addDoc(collection(db, 'sectionTexts'), {
        content: content,
        section: section,
        timestamp: serverTimestamp(),
        type: 'busy_meter_text'
      });
      console.log('Text content saved to Firebase:', content);
    } catch (error) {
      console.error('Error saving text to Firebase:', error);
    }
  };

  // Function to load the latest data from Firebase on component mount
  useEffect(() => {
    const loadDataFromFirebase = async () => {
      try {
        // Fetch latest progress value
        const progressQuery = query(collection(db, 'progressValues'), orderBy('timestamp', 'desc'), limit(1));
        const progressSnapshot = await getDocs(progressQuery);
        if (!progressSnapshot.empty) {
          const latestProgress = progressSnapshot.docs[0].data().value;
          setProgressValue(latestProgress);
        }

        // Fetch latest busy meter text
        const textQuery = query(collection(db, 'sectionTexts'), orderBy('timestamp', 'desc'), limit(1));
        const textSnapshot = await getDocs(textQuery);
        if (!textSnapshot.empty) {
          const latestText = textSnapshot.docs[0].data().content;
          setBusyMeterText(latestText);
        }
      } catch (error) {
        console.error('Error loading from Firebase:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDataFromFirebase();
  }, []);


  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const ring = ringRef.current;
    const progressCircle = progressRef.current;

    if (!section || !title || !ring || !progressCircle || isLoading) return;

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;

    const ctx = gsap.context(() => {
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

      // Ring container animation
      gsap.fromTo(ring.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ring,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Progressive ring animation
      gsap.to(progressCircle, {
        strokeDashoffset: circumference - (circumference * progressValue) / 100,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ring,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // Number counter animation
      gsap.to({ value: 0 }, {
        value: progressValue,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: function() {
          setAnimatedProgress(Math.round(this.targets()[0].value));
        },
        scrollTrigger: {
          trigger: ring,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, [progressValue, isLoading]);

  // Function to update progress value and save to Firebase
  const updateProgressValue = async (newValue: number) => {
    if (newValue >= 0 && newValue <= 100) {
      setProgressValue(newValue);
      await saveProgressToFirebase(newValue); // Save to Firebase
      
      // Re-trigger animations with new value
      const ring = ringRef.current;
      const progressCircle = progressRef.current;
      
      if (ring && progressCircle) {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        
        gsap.to(progressCircle, {
          strokeDashoffset: circumference - (circumference * newValue) / 100,
          duration: 1.5,
          ease: 'power2.out'
        });
        
        gsap.to({ value: animatedProgress }, {
          value: newValue,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function() {
            setAnimatedProgress(Math.round(this.targets()[0].value));
          }
        });
      }
    }
  };

  // Function to update busy meter text and save to Firebase
  const updateBusyMeterText = async (newText: string) => {
    if (!newText.trim()) return; // Don't save empty text
    setBusyMeterText(newText);
    // This is the line you provided, correctly placed.
    await saveTextContentToFirebase(newText, "busy_meter_description");
  };

  const contactInfo = [
    {
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Email',
      content: 'abhijithjnair0@gmail.com',
      link: 'mailto:abhijithjnair4321@gmail.com'
    },
    {
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      title: 'Phone',
      content: '+91 86069 82351',
      link: 'tel:+918606982351'
    },
    {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Location',
      content: 'PTA, Kerala, India',
      link: '#'
    },
    {
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      title: 'Will Respond within',
      content: '24 hours',
      link: '#'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 md:py-32 bg-[#010101] relative overflow-hidden w-screen"
    >
      {/* Background Pattern
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #111111 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div> */}

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#ffffe5] mb-6 font-sulpr">
            Let's Work Together
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Bring it On!
          </p>
        </div>
        <div className='flex items-center justify-center'>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <TextReveal
                words="Get In Touch"
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-8 font-sulpr"
                duration={0.6}
                delay={100}
                staggerDelay={80}
              />
            </div>
            

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="card-hover bg-gradient-to-br from-[#333333] to-[#222222] p-6 rounded-2xl shadow-xl border border-[#111111]/10 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-tranparent rounded-full mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white font-satoshi">
                        {info.title}
                      </h4>
                      <a 
                        href={info.link}
                        className="text-white/70 hover:text-white transition-colors font-satoshi font-light"
                      >
                        {info.content}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br  from-[#333333] to-[#222222] p-6 rounded-2xl shadow-xl transition-all hover:shadow-2xl border border-[#111111]/10">
              <h4 className="font-semibold text-white mb-4 font-satoshi">
                Current Availability
              </h4>
              <div className="flex items-center space-x-3">
                <span className="text-white/80 font-satoshi font-light">
                  Available for new projects starting January 2025
                </span>
              </div>
            </div>
          </div>

          {/* Progressive Ring */}
          <div ref={ringRef} className="flex flex-col items-center justify-center">
            <div 
              className="bg-transparent p-12 mt-12 rounded-2xl border border-[#111111]/10 flex flex-col items-center transition-all duration-500" >
              
              
              {/* Progressive Ring */}
              <div className="relative w-64 h-64 mb-8">
                {/* Background Ring */}
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#555555"
                    strokeWidth="4"
                    fill="none"
                    className="opacity-20"
                  />
                  {/* Progress Ring */}
                  <circle
                    ref={progressRef}
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out"
                  />
                  
                  {/* Dynamic Gradient Definition based on value */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      {animatedProgress > 75 ? (
                        <>
                          <stop offset="0%" stopColor="#dc2626" />
                          <stop offset="50%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#f87171" />
                        </>
                      ) : animatedProgress >= 25 ? (
                        <>
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ffffe3" />
                        </>
                      ) : (
                        <>
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#059669" />
                          <stop offset="100%" stopColor="#22c55e" />
                        </>
                      )}
                    </linearGradient>
                  </defs>
                </svg>

                

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl font-light text-white mb-2 font-monojb">
                    {animatedProgress}%
                  </div>
                  <div className="text-sm text-white/70 text-center">
                    {animatedProgress > 75 ? 'Peak Busy' : animatedProgress >= 25 ? 'Busily Free' : 'Free'}
                  </div>
                </div>

                {/* Enhanced Glow Effect with conditional colors */}
                <div 
                  className="absolute inset-0 rounded-full opacity-30 blur-xl transition-all duration-500"
                  style={{
                    background: animatedProgress > 0 
                      ? animatedProgress > 75
                        ? `conic-gradient(from 0deg, #dc2626 0deg, #ef4444 ${animatedProgress * 2}deg, #f87171 ${animatedProgress * 3.6}deg, transparent ${animatedProgress * 3.6}deg)`
                        : animatedProgress >= 25
                        ? `conic-gradient(from 0deg, #fbbf24 0deg, #f59e0b ${animatedProgress * 2}deg, #ffffe3 ${animatedProgress * 3.6}deg, transparent ${animatedProgress * 3.6}deg)`
                        : `conic-gradient(from 0deg, #10b981 0deg, #059669 ${animatedProgress * 2}deg, #22c55e ${animatedProgress * 3.6}deg, transparent ${animatedProgress * 3.6}deg)`
                      : 'transparent'
                  }}
                />

                {/* Status Indicator */}
                {/* <div className="absolute -top-2 -right-2">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white animate-pulse"
                    style={{
                      backgroundColor: animatedProgress > 75 ? '#dc2626' : animatedProgress >= 25 ? '#fbbf24' : '#10b981'
                    }}
                  />
                </div> */}
              <div className="mt-4 mb-8">
                <TextReveal
                  words={busyMeterText}
                  className="text-base md:text-lg max-w-7xl font-light font-satoshi text-white mb-4  text-center"
                  duration={0.5}
                  delay={800}
                  staggerDelay={70}
                />
              </div>
              </div>

              {/* Statistics
              <div className="grid grid-cols-3 gap-6 w-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">25+</div>
                  <div className="text-sm text-white/70">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-white/70">On Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">50+</div>
                  <div className="text-sm text-white/70">Happy Clients</div>
                </div>
              </div> */}

              {/* Action Buttons
              <div className="mt-8 flex flex-col gap-4">
                <button 
                  onClick={() => updateProgressValue(progressValue === 20 ? 20 : 20)}
                  className="bg-gradient-to-r from-[#10b981] to-[#3b82f6] hover:from-[#059669] hover:to-[#2563eb] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Start Your Project
                </button>
                
                // {/* Development Controls - Remove in production */}
                {/* // <div className="flex flex-col gap-4 mt-4 p-4 border border-zinc-700 rounded-lg">
                //   <div className="flex gap-2">
                //     <button  */}
                {/* //       onClick={() => updateProgressValue(15)}
                //       className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors w-full"
                //     >
                //       Set 15%
                //     </button>
                //     <button  */}
                {/* //       onClick={() => updateProgressValue(50)}
                //       className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors w-full"
                //     >
                //       Set 50%
                //     </button>
                //     <button  */}
                {/* //       onClick={() => updateProgressValue(85)}
                //       className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors w-full"
                //     >
                //       Set 85%
                //     </button>
                //   </div>
                //   <div className="flex flex-col gap-2">
                //     <input */}
                {/* //       type="text"
                //       value={newBusyTextInput}
                //       onChange={(e) => setNewBusyTextInput(e.target.value)}
                //       placeholder="Enter new busy meter text"
                //       className="px-3 py-2 bg-zinc-800 text-white rounded border border-zinc-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                //     />
                //     <button */}
                {/* //       onClick={() => updateBusyMeterText(newBusyTextInput)}
                //       className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                //     >
                //       Update Busy Text
                //     </button>
                //   </div>
                // </div> */}
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
};

export default Contact;
