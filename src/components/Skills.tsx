"use client";

const skills = [
  { name: 'Python', level: 90 },
  { name: 'TensorFlow', level: 80 },
  { name: 'React', level: 85 },
  { name: 'Next.js', level: 80 },
  { name: 'Node.js', level: 75 },
  { name: 'Tailwind CSS', level: 80 },
  { name: 'Firebase', level: 70 },
];

export default function Skills() {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Skills</h2>
      <div className="space-y-6">
        {skills.map((skill, idx) => (
          <div key={skill.name} className="flex flex-col gap-1">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-200">{skill.name}</span>
              <span className="text-gray-400 text-xs">{skill.level}%</span>
            </div>
            <div
              className="h-3 rounded bg-gradient-to-r from-blue-500 to-purple-500 shadow-inner"
              style={{ maxWidth: '100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 