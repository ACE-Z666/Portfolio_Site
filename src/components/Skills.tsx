"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const skillCategories = [
	{
		label: "PROGRAMMING LANGUAGES",
		skills: [
			{ name: "Python", logo: "/logos/python.svg" },
			{ name: "JavaScript", logo: "/logos/javascript.svg" },
			{ name: "TypeScript", logo: "/logos/typescript.svg" },
			{ name: "C++", logo: "/logos/cpp.svg" },
			{ name: "Java", logo: "/logos/java.svg" },
		],
	},
	{
		label: "FRAMEWORKS & LIBRARIES",
		skills: [
			{ name: "React", logo: "/logos/react.svg" },
			{ name: "Next.js", logo: "/logos/nextjs.svg" },
			{ name: "Node.js", logo: "/logos/nodejs.svg" },
			{ name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
			{ name: "Express", logo: "/logos/express.svg" },
		],
	},
	{
		label: "AI & Machine Learning",
		skills: [
			{ name: "TensorFlow", logo: "/logos/tensorflow.svg" },
			{ name: "PyTorch", logo: "/logos/pytorch.svg" },
			{ name: "Langchain", logo: "/logos/langchain.svg" },
			{ name: "Huggingface", logo: "/logos/huggingface.svg" },
			{ name: "scikit-learn", logo: "/logos/scikit-learn.svg" },
		],
	},
	{
		label: "Databases",
		skills: [
			{ name: "MongoDB", logo: "/logos/mongodb.svg" },
			{ name: "Firebase", logo: "/logos/firebase.svg" },
			{ name: "PostgreSQL", logo: "/logos/postgresql.svg" },
			{ name: "PineconeDB", logo: "/logos/pinecone.svg" },
		],
	},
	{
		label: "Soft Skills",
		skills: [
			{ name: "Team Leadership", logo: "/logos/leadership.svg" },
			{ name: "Event Planning", logo: "/logos/planning.svg" },
			{ name: "Communication", logo: "/logos/communication.svg" },
			{ name: "Problem Solving", logo: "/logos/problem-solving.svg" },
		],
	},
];

export default function Skills() {
	const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
	const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		categoryRefs.current.forEach((ref, idx) => {
			const content = contentRefs.current[idx];
			if (!ref || !content) return;

			gsap.set(ref, {
				maxHeight: 64,
				backgroundColor: "transperant",
			});
			gsap.set(content, { opacity: 0, y: 20, pointerEvents: "none" });
		});
	}, []);

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-start py-16 px-4 md:px-28 bg-transparent">
			<h1 className="text-2xl md:text-7xl font-monojb font-semibold mb-12 text-left w-screen px-8">
				Levels Unlocked!
			</h1>
			<div className="w-screen py-4 flex flex-col gap-20">
				{skillCategories.map((cat, idx) => (
					<div
						key={cat.label}
						ref={(el) => (categoryRefs.current[idx] = el)}
						onMouseEnter={() => {
							const ref = categoryRefs.current[idx];
							const content = contentRefs.current[idx];
							if (!ref || !content) return;

							const expandedHeight = 64 + content.scrollHeight + 32;
							gsap.to(ref, {
								maxHeight: expandedHeight,
								duration: 0.2,
							});
							gsap.to(content, {
								opacity: 1,
								y: 0,
								pointerEvents: "auto",
								duration: 0.4,
							});
						}}
						onMouseLeave={() => {
							const ref = categoryRefs.current[idx];
							const content = contentRefs.current[idx];
							if (!ref || !content) return;

							gsap.to(ref, {
								maxHeight: 64,
								duration: 0.4,
							});
							gsap.to(content, {
								opacity: 0,
								y: 20,
								pointerEvents: "none",
								duration: 0.3,
							});
						}}
						className="group relative overflow-hidden rounded-xl bg-transparent shadow-md cursor-pointer transition-all"
						style={{
							maxHeight: 64,
							minHeight: 64,
							transition: "max-height 0.2s",
						}}
					>
						<div className="flex items-center px-8 py-4 text-lg md:text-4xl font-satoshi uppercase font-bold text-[#f18f01] font-satoshi tracking-wide">
							{cat.label}
						</div>
						<div
							ref={(el) => (contentRefs.current[idx] = el)}
							className="skills-list opacity-0 pointer-events-none translate-y-5 hover:scale-105 transition-all px-8 pb-6 flex flex-wrap gap-6"
							style={{
								transition: "opacity 0.3s, transform 0.3s",
							}}
						>
							{cat.skills.map((skill) => (
								<span
									key={skill.name}
									className="inline-flex items-center gap-4 bg-[#222] text-gray-200 text-base md:text-lg rounded-md px-4 py-2 font-monojb shadow-sm border border-[#f18f01]/30"
								>
									<img
										src={skill.logo}
										alt={skill.name + " logo"}
										className="w-5 h-5 object-contain"
									/>
									{skill.name}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
