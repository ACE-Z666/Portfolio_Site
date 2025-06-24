"use client";
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'AI Chatbot',
    description: 'Conversational AI chatbot using NLP and deep learning.',
    tech: ['Python', 'TensorFlow', 'React'],
  },
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio built with Next.js and Tailwind CSS.',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce app with authentication and payments.',
    tech: ['Node.js', 'Express', 'MongoDB', 'React'],
  },
];

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Projects</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            whileHover={{ y: -8, scale: 1.03, boxShadow: '0 8px 32px #0004' }}
            className="bg-black rounded-xl p-6 shadow-md border border-gray-700 transition-all flex flex-col gap-4"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-400">{project.title}</h3>
            <p className="text-gray-300 flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-900/70 rounded-full text-xs text-gray-300 border border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 