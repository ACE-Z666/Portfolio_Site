"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contactRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, []);

  return ( 
    <div
      ref={contactRef}
      className="w-screen  h-full bg-transparent text-white py-20 px-6 md:px-24 flex flex-col lg:flex-row justify-between items-start gap-16"
    >
      {/* Left Side – Info & Social */}
      <div className="flex flex-col gap-6 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-monojb text-[#f18f01] mb-2">
          Let's Get in Touch
        </h2>
        <p className="text-gray-300 text-2xl font-monojb leading-relaxed">
          Whether you want to collaborate, have a question, or just want to say hi—I'm always open to connecting. Drop a message and I’ll try my best to respond soon!
        </p>
        <div className="text-gray-400 font-monojb mt-4 space-y-2">
          <p>
            📧 <strong>Email: </strong>{""}
            <a
              href="mailto:www.abhijithjnair4321@gmail.com"
              className="text-[#f18f01] font-monojb hover:underline"
            >
              www.abhijithjnair4321@gmail.com
            </a>
          </p>
          <p>
            📄{" "}
            <a
              href="/Abhijith_Resume.pdf"
              download
              className="text-[#f18f01] hover:underline"
            >
              Download Resume
            </a>
          </p>
        </div>
        <div className="flex gap-4 mt-6">
          <a href="https://github.com/AbhijithJNair" target="_blank">
            <img src="/logos/github.png" alt="GitHub" className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com/in/abhijithnair23" target="_blank">
            <img src="/logos/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
          </a>
        </div>
      </div>

      {/* Right Side – Contact Form */}
      <div className="flex flex-col w-full max-w-xl">
        <h2 className="text-2xl md:text-4xl font-monojb mb-8 text-center text-gray-100">
          Connect with me 
        </h2>
        <form
          className="bg-transparent rounded-2xl p-8 shadow-xl flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <input
            type="text"
            placeholder="Name"
            required
            className="px-6 py-3 rounded-xl bg-transparent text-gray-100 border-b-2 border-gray-700 focus:outline-none focus:border-b-2 focus:border-[#f18f01] transition-colors"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="px-6 py-3 rounded-xl bg-transparent text-gray-100 border-b-2 border-gray-700 focus:outline-none focus:border-b-2 focus:border-[#f18f01] transition-colors"
          />
          <textarea
            placeholder="Your Message"
            required
            rows={5}
            className="px-6 py-3 rounded-xl bg-transparent text-gray-100 border-b-2 border-gray-700 focus:outline-none focus:border-b-2 focus:border-[#f18f01] transition-colors"
          />
          <button
            className="w-full py-3 rounded-2xl bg-transparent border-2 border-[#444] hover:border-[#f18f01] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {submitted ? "Thank you! Will respond to it Soon" : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
