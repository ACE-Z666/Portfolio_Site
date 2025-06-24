"use client";
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Contact</h2>
      <form
        className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 flex flex-col gap-6"
        onSubmit={e => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <input
          type="text"
          placeholder="Name"
          required
          className="px-4 py-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="px-4 py-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <textarea
          placeholder="Message"
          required
          rows={5}
          className="px-4 py-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          className="w-full py-3 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {submitted ? 'Thank you!' : 'Send Message'}
        </button>
      </form>
      <div className="flex justify-center gap-6 mt-8">
        <a href="https://linkedin.com/in/abhijithnair23" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
        <a href="https://github.com/abhijithnair23" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:underline">GitHub</a>
        <a href="/resume.pdf" download className="text-purple-400 hover:underline">Resume</a>
      </div>
    </div>
  );
} 