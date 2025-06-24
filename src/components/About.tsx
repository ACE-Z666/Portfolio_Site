"use client";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
      <div
        className="flex-1"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me</h2>
        <p className="text-gray-300 mb-4">
          I am Abhijith J Nair, passionate about Artificial Intelligence and Machine Learning, with hands-on experience in building intelligent systems and web applications. As a student, I love exploring new technologies and contributing to open-source projects. I am also active in volunteering and community-driven tech events.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>AI/ML enthusiast & lifelong learner</li>
          <li>Intermediate Full Stack Developer</li>
          <li>Open-source contributor</li>
          <li>Volunteer in tech communities</li>
        </ul>
      </div>
      <div
        className="flex-1 flex justify-center"
      >
        <img
          src="https://avatars.githubusercontent.com/u/100000000?v=4"
          alt="Abhijith J Nair"
          className="w-48 h-48 rounded-2xl object-cover shadow-lg border-4 border-gray-800"
        />
      </div>
    </div>
  );
} 