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
      className="w-screen  h-full bg-transparent text-white py-20 px-6 md:px-48 flex flex-col lg:flex-row justify-between items-start gap-16"
    >
      {/* Left Side – Info & Social */}
      <div className="flex flex-col gap-6 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-satoshi font-semibold text-[#f18f01] mb-2">
          Let's Get in Touch.
        </h2>
        <p className="text-gray-300 sm:text-2xl text-xl font-satoshi font-light leading-relaxed">
          Whether you want to collaborate, have a question, or just want to say hi I'm always open to connecting. Drop a message and I’ll try my best to respond soon!
        </p>
        <div className="text-gray-400 font-satoshi font-light mt-4 space-y-2">
          <p>
            <strong>Email: </strong>{""}
            <a
              href="mailto:www.abhijithjnair4321@gmail.com"
              className="text-[#f18f01] font-monojb hover:underline"
            >
              www.abhijithjnair4321@gmail.com
            </a>
          </p>
          <p>
            {" "}
            <a
              href="/Abhijith_Resume.pdf"
              download
              className="text-[#f18f01] hover:underline"
            >
              Resume
            </a>
          </p>
        </div>
        <div className="flex gap-4 mt-6">
          <a href="https://github.com/AbhijithJNair" target="_blank">
            <img src="https://img.icons8.com/?size=100&id=106562&format=png&color=FFFFFF" alt="GitHub" className="w-10 h-10" />
          </a>
          <a href="https://www.linkedin.com/in/abhijithnair23" target="_blank">
            <img src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF" alt="LinkedIn" className="w-10 h-10" />
          </a>
        </div>
      </div>

      {/* Right Side – Contact Form */}
      <div className="flex flex-col w-full max-w-xl">
        <h2 className="text-2xl md:text-4xl font-satoshi mb-8 text-center text-gray-100">
          Connect with Me 
        </h2>
        <form
          className="bg-transparent rounded-2xl py-8 shadow-xl flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <input type="name" name="text" className="input py-4" placeholder="Name" />

          <input
            type="email"
            placeholder="Email Address"
            required
            className="input"          />
          <textarea
            placeholder="Your Message"
            required
            rows={5}
            className="input"          />
          <button>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text"> {submitted ? "Thank you! Will respond to it Soon" : "Send Message"}
            </span>
          </button>
         </form>
      </div>
    </div>
  );
}
