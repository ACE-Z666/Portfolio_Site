"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SkillData {
    label: string;
    value: number;
    color: string;
    size: number;
    level: number;
    category: string;
}

interface CircleProgressProps {
    data: SkillData;
    index: number;
}

const CircleProgress = ({ data, index, inView }: CircleProgressProps & { inView: boolean }) => {
    const strokeWidth = 12;
    const radius = (data.size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = ((100 - data.value) / 100) * circumference;

    const gradientId = `gradient-${data.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const gradientUrl = `url(#${gradientId})`;

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.6, rotate: -90 }}
            transition={{ 
                duration: 0.8, 
                delay: index * 0.2, 
                ease: [0.25, 0.46, 0.45, 0.94] 
            }}
        >
            <div className="relative">
                <svg
                    width={data.size}
                    height={data.size}
                    viewBox={`0 0 ${data.size} ${data.size}`}
                    className="transform -rotate-90"
                    aria-label={`${data.label} Skill Progress - ${data.value}%`}
                >
                    <title>{`${data.label} Skill Progress - ${data.value}%`}</title>

                    <defs>
                        <linearGradient
                            id={gradientId}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                style={{
                                    stopColor: data.color,
                                    stopOpacity: 1,
                                }}
                            />
                            <stop
                                offset="100%"
                                style={{
                                    stopColor: 
                                        data.color === "#111111"
                                            ? "#333333"
                                            : data.color === "#333333"
                                            ? "#555555"
                                            : data.color === "#555555"
                                            ? "#777777"
                                            : "#FFFFE3",
                                    stopOpacity: 1,
                                }}
                            />
                        </linearGradient>
                    </defs>

                    <circle
                        cx={data.size / 2}
                        cy={data.size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-[#FFFFE3] dark:text-zinc-800/50"
                    />

                    <motion.circle
                        cx={data.size / 2}
                        cy={data.size / 2}
                        r={radius}
                        fill="none"
                        stroke={gradientUrl}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={inView ? { strokeDashoffset: progress } : { strokeDashoffset: circumference }}
                        transition={{
                            duration: 2.0,
                            delay: 0.5 + (index * 0.3),
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        strokeLinecap="round"
                        style={{
                            filter: "drop-shadow(0 0 8px rgba(0,0,0,0.2))",
                        }}
                    />
                </svg>
            </div>
        </motion.div>
    );
};

const DetailedSkillsInfo = ({ skills, inView }: { skills: SkillData[], inView: boolean }) => {
    return (
        <motion.div
            className="flex flex-col gap-6 ml-8"
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 30, y: 10 }}
            transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            {skills.map((skill, index) => (
                <motion.div 
                    key={skill.label} 
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ 
                        duration: 0.6, 
                        delay: 0.6 + (index * 0.15),
                        ease: "easeOut"
                    }}
                >
                    <motion.span 
                        className="text-sm font-medium text-[#111111]/70 font-satoshi"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ 
                            duration: 0.4, 
                            delay: 0.8 + (index * 0.15)
                        }}
                    >
                        {skill.label}
                    </motion.span>
                    <motion.span
                        className="text-2xl font-semibold font-monojb"
                        style={{ color: skill.color }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ 
                            duration: 0.5, 
                            delay: 0.9 + (index * 0.15),
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        {skill.level}%
                        <span className="text-base ml-1 text-[#111111]/50">
                            {skill.category}
                        </span>
                    </motion.span>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default function SkillsActivityCard({
    title = "Technical Proficiency",
    className,
    skills,
}: {
    title?: string;
    className?: string;
    skills: Array<{
        name: string;
        level: number;
    }>;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { 
        once: true,
        amount: 0.3
    });

    // Convert skills data to activity format with different colors and sizes
    const skillsData: SkillData[] = skills.slice(0, 4).map((skill, index) => {
        const colors = ["#111111", "#333333", "#555555", "#777777"];
        const sizes = [180, 150, 120, 90];
        
        return {
            label: skill.name,
            value: skill.level,
            color: colors[index] || "#111111",
            size: sizes[index] || 120,
            level: skill.level,
            category: index < 2 ? "CORE" : "SPEC",
        };
    });

    return (
        <div
            ref={ref}
            className={cn(
                "relative w-full max-w-4xl mx-auto p-8",
                className
            )}
        >
            <div className="flex flex-col items-center gap-8">
                <motion.h3
                    className="text-3xl font-bold text-[#111111] font-satoshi"
                    initial={{ opacity: 0, y: -30, scale: 0.9 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ 
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                >
                    {title}
                </motion.h3>

                <div className="flex items-center justify-center w-full">
                    <div className="relative w-[200px] h-[200px] flex-shrink-0">
                        {skillsData.map((skill, index) => (
                            <CircleProgress
                                key={skill.label}
                                data={skill}
                                index={index}
                                inView={inView}
                            />
                        ))}
                    </div>
                    <DetailedSkillsInfo skills={skillsData} inView={inView} />
                </div>

                {/* Additional Skills Grid */}
                {skills.length > 4 && (
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-8"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 1.2,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        {skills.slice(4).map((skill, index) => (
                            <motion.div 
                                key={skill.name}
                                className="text-center p-4  transition-shadow duration-300"
                                initial={{ opacity: 0, scale: 0.8, y: 20, rotateY: 45 }}
                                animate={inView ? { 
                                    opacity: 1, 
                                    scale: 1, 
                                    y: 0, 
                                    rotateY: 0 
                                } : { 
                                    opacity: 0, 
                                    scale: 0.8, 
                                    y: 20, 
                                    rotateY: 45 
                                }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: 1.4 + (index * 0.1),
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                whileHover={{ 
                                    scale: 1.08,
                                    y: -5,
                                    transition: { duration: 0.2, ease: "easeOut" }
                                }}
                                style={{ perspective: 1000 }}
                            >
                                <motion.div 
                                    className="text-lg font-bold text-[#111111] font-monojb mb-1"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ 
                                        duration: 0.4, 
                                        delay: 1.6 + (index * 0.1)
                                    }}
                                >
                                    {skill.level}%
                                </motion.div>
                                <motion.div 
                                    className="text-sm text-[#111111]/70 font-satoshi"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ 
                                        duration: 0.4, 
                                        delay: 1.7 + (index * 0.1)
                                    }}
                                >
                                    {skill.name}
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
