"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const skillCategories = [
	{
		label: "PROGRAMMING LANGUAGES",
		skills: [
			{ name: "Python", logo: "https://img.icons8.com/?size=100&id=Rc0Xn5AtE8kX&format=png&color=000000" },
			{ name: "Java", logo: "https://img.icons8.com/?size=100&id=Pd2x9GWu9ovX&format=png&color=000000" },
			{ name: "JavaScript", logo: "https://img.icons8.com/?size=100&id=tGvHBPJaKqEd&format=png&color=000000" },
			{ name: "C++", logo: "https://img.icons8.com/?size=100&id=40669&format=png&color=000000" },
			{ name: "TypeScript", logo: "https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000" },

		],
	},
	{
		label: "FRAMEWORKS & LIBRARIES",
		skills: [
			{ name: "React", logo: "https://img.icons8.com/?size=100&id=123603&format=png&color=000000" },
			{ name: "Next.js", logo: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000" },
			{ name: "Node.js", logo: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000" },
			{ name: "Tailwind CSS", logo: "https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000" },
			{ name: "Express", logo: "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=FFFFFF" },
		],
	},
	{
		label: "AI & MACHINE LEARNING",
		skills: [
			{ name: "Langchain", logo: "/Skills/langchain.svg" },
			{ name: "Huggingface", logo: "https://img.icons8.com/?size=100&id=BQ1lJP4geUqU&format=png&color=000000" },
			{ name: "TensorFlow", logo: "https://img.icons8.com/?size=100&id=n3QRpDA7KZ7P&format=png&color=000000" },
			{ name: "PyTorch", logo: "https://img.icons8.com/?size=100&id=jH4BpkMnRrU5&format=png&color=000000" },

		],
	},
	{
		label: "DATABASES",
		skills: [
			{ name: "MongoDB", logo: "https://img.icons8.com/?size=100&id=B403GJErHZpx&format=png&color=000000" },
			{ name: "Firebase", logo: "https://img.icons8.com/?size=100&id=ROMfFZ1tMhpk&format=png&color=000000" },
			{ name: "MySQL", logo: "https://img.icons8.com/?size=100&id=9nLaR5KFGjN0&format=png&color=000000" },
			{ name: "PineconeDB", logo: "/Skills/pinecone.png" },
		],
	},
	{
		label: "SOFT SKILLS",
		skills: [
			{ name: "Team Leadership", logo: "https://img.icons8.com/?size=100&id=68179&format=png&color=000000" },
			{ name: "Event Planning & Communication", logo: "https://img.icons8.com/?size=100&id=117509&format=png&color=000000" },
			{ name: "Attention to Detail", logo: "https://img.icons8.com/?size=100&id=67374&format=png&color=000000" },
			{ name: "Problem Solving", logo: "https://img.icons8.com/?size=100&id=LFXbaiQfZuLS&format=png&color=000000" },
		],
	},
];

export default function Skills() {
	const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
	const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

	// Handle category expansion
	const handleCategoryClick = (idx: number) => {
		const ref = categoryRefs.current[idx];
		const content = contentRefs.current[idx];
		if (!ref || !content) return;

		if (activeIndex === idx) {
			// Close if already open
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
			setActiveIndex(null);
		} else {
			// Close previously open category
			if (activeIndex !== null) {
				const prevRef = categoryRefs.current[activeIndex];
				const prevContent = contentRefs.current[activeIndex];
				if (prevRef && prevContent) {
					gsap.to(prevRef, {
						maxHeight: 64,
						duration: 0.4,
					});
					gsap.to(prevContent, {
						opacity: 0,
						y: 20,
						pointerEvents: "none",
						duration: 0.3,
					});
				}
			}

			// Open clicked category
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
			setActiveIndex(idx);
		}
	};

	return (
		<div className="w-screen h-3/4  sm:min-h-screen flex flex-col items-center justify-center sm:justify-start py-8 px-4 md:px-24 bg-transparent">
			<h1 className="text-3xl md:text-7xl font-satoshi font-normal mb-12 text-left text-white w-screen sm:px-48 px-8">
				Skills <span className="text-[#f18f01]">Unlocked!</span>
			</h1>
			<div className="w-full py-4 px-4 flex flex-col sm:gap-10 gap-6">
				{skillCategories.map((cat, idx) => (
					<div
						key={cat.label}
						ref={(el) => (categoryRefs.current[idx] = el)}
						onClick={() => handleCategoryClick(idx)}
						className={`group relative text-left overflow-hidden rounded-2xl sm:my-2 my-0 sm:mx-12 mx-0 shadow-md cursor-pointer transition-all scrollbar-hide ${
							activeIndex === idx ? 'bg-opacity-0 bg-white' : ''
						}`}
						style={{
							maxHeight: 64,
							minHeight: 64,
							transition: "max-height 0.2s",
						}}
					>
						<div className="flex items-left sm:px-8 sm:py-4 text-lg md:text-4xl font-light text-white font-satoshi tracking-wide">
							{cat.label}
						</div>
						<div
							ref={(el) => (contentRefs.current[idx] = el)}
							className="skills-list opacity-0 w-full pointer-events-none translate-y-5 transition-all px-8 pb-6 flex sm:gap-6 gap-8 overflow-x-auto scrollbar-hide"
							style={{
								transition: "opacity 0.3s, transform 0.3s",
							}}
						>
							{cat.skills.map((skill) => (
								<span
									key={skill.name}
									className="inline-flex items-center justify-center gap-4 text-gray-300 text-base md:text-lg rounded-md px-4 sm:py-2 py-4 font-monojb "
								>
									<img
										src={skill.logo}
										alt={skill.name + " logo"}
										className="w-8 h-8 object-contain"
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
