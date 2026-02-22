import { TextScramble } from "./components/TextScramble";
import { LinkPreview } from "./components/LinkPreview";
import { CustomCursor } from "./components/CustomCursor";
import { DotGlobeHero } from "./components/globe-hero";
import { Component as CelestialOrrery } from "./components/celestial-orrery";
import { motion } from "framer-motion";
import { ArrowRight, Menu, Zap } from "lucide-react";
import { useState } from "react";
import { MorphingText } from "./components/liquid-text";
// Add this import at the top with your other imports
import { CircularRevealHeading } from "./components/circular-reveal-heading";
import { BasicToast, showSuccessToast, showErrorToast } from "./components/basic-toast";

// Add this items array before your App component or inside it
const serviceItems = [
    {
        text: "STRATEGY",
        image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkceCYjHtyWSduj04chzxgP3pt1Dvo8KfCsHnwk"
    },
    {
        text: "DESIGN",
        image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcZY3vRlCe5wpMsRmKntGfIu4E6OSxhgzL3kU1"
    },
    {
        text: "GROWTH",
        image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcz9VsoNLlt5AKuj9HqWQm3NeDUywcLSxB6Yo1"
    },
    {
        text: "INNOVATION",
        image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcypc1wWQBS4VNPtfqkpIhO7M6XUva5TzWomdZ"
    }
];

// Then in your JSX, replace the existing services section:

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#111111] text-white selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
            <BasicToast />
            <CustomCursor />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between mix-blend-difference">
                <a href="/" className="text-xl font-bold tracking-tighter uppercase">
                    MA Agency<span className="text-red-600">.</span>
                </a>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
                    <a href="https://wa.me/447311124096?text=Hey%20MA%20Agency%21%20I%20just%20checked%20out%20your%20site%20and%20I%27m%20loving%20the%20vibe.%20Would%20love%20to%20chat%20about%20how%20we%20could%20work%20together%20%E2%9C%A8"
                        target="_blank" className="text-green-400">+44 7311 124096</a>
                    <LinkPreview url="#projects" title="Our Work" description="Explore our latest digital experiences and brand transformations.">Projects</LinkPreview>
                    <LinkPreview url="#services" title="What We Do" description="Discover the core services we offer to elevate your brand.">Services</LinkPreview>
                    <LinkPreview url="#contact" title="Get in Touch" description="Ready to start a project? Let's talk.">Contact</LinkPreview>
                </div>
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </nav>

            {/* Mobile menu panel - add this after your navigation */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-x-0 top-20 z-40 md:hidden"
                >
                    <div className="bg-[#111111]/50 bg-clip-padding backdrop-filter backdrop-blur-sm border-t border-white/10 p-6 shadow-2xl rounded-b-xl">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#projects"
                                className="text-lg font-medium py-2 hover:text-red-500 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Projects
                            </a>
                            <a
                                href="#services"
                                className="text-lg font-medium py-2 hover:text-red-500 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Services
                            </a>
                            <a
                                href="#contact"
                                className="text-lg font-medium py-2 hover:text-red-500 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </a>
                            <div className="pt-4 border-t border-white/10">
                                <a
                                    href="https://wa.me/447311124096?text=Hey%20MA%20Agency%21%20I%20just%20checked%20out%20your%20site%20and%20I%27m%20loving%20the%20vibe.%20Would%20love%20to%20chat%20about%20how%20we%20could%20work%20together%20%E2%9C%A8"
                                    target="_blank"
                                    className="text-green-400 text-sm flex items-center gap-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>WhatsApp:</span>
                                    <span>+44 7311 124096</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Hero Section - Exact Globe Hero Example with Brand Colors */}
            <section className="relative min-h-screen">
                {/* Celestial Orrery Background - Exact as its example */}
                <div className="absolute inset-0 z-0">
                    <CelestialOrrery />
                </div>

                {/* Globe Hero - Exact as its example but with your content */}
                <DotGlobeHero
                    rotationSpeed={0.004}
                    className="bg-gradient-to-tr from-[#111111] via-[#111111]/95 to-red-600/10 relative overflow-hidden min-h-screen"
                >
                    {/* Background effects from the example */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 via-transparent to-[#111111]/30" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/3 rounded-full blur-3xl animate-pulse" />

                    {/* Content - Exactly like the example structure */}
                    <div className="relative z-10 text-center space-y-12 max-w-5xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            {/* Badge - exactly like example but with red */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-600/20 via-red-600/10 to-red-600/20 border border-red-600/30 backdrop-blur-xl shadow-2xl"
                            >
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 animate-pulse" />
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                                <span className="relative z-10 text-sm font-bold text-red-400 tracking-wider uppercase">GLOBAL AGENCY</span>
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-ping animation-delay-500" />
                            </motion.div>

                            {/* Headline - with working MorphingText */}
                            <div className="space-y-6">
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] select-none"
                                >
                                    <span className="block font-light text-white/60 mb-3 text-4xl md:text-6xl lg:text-7xl">
                                        We help
                                    </span>

                                    {/* Morphing text container */}
                                    <span className="block relative min-h-[1em] items-center justify-center">
                                        {/* Main morphing text with gradient */}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-red-600 to-red-500 text-[clamp(3rem,15vw,8rem)] font-black">
                                        </span>
                                        <MorphingText texts={["Innovate", "Scale", "Dominate"]} />

                                        {/* Underline */}
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                                            className="absolute -bottom-6 left-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-transparent rounded-full shadow-lg shadow-red-600/50"
                                        />
                                    </span>
                                </motion.h1>
                            </div>

                            {/* Description - exactly like example */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="max-w-3xl mx-auto space-y-4"
                            >
                                <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
                                    A London-born agency crafting thoughtful brands and{" "}
                                    <TextScramble text="digital experiences" className="text-white font-semibold bg-gradient-to-r from-red-600/30 to-red-600/10 px-3 py-1 rounded-full" />
                                </p>
                                <p className="text-lg text-white/50 leading-relaxed">
                                    We build <TextScramble text="global legacies" className="text-white font-semibold" /> from our studio in London.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Buttons - exactly like example */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)",
                                    y: -2
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 via-red-600 to-red-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-red-600/30 transition-all duration-500 overflow-hidden border border-red-500/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.8 }}
                                />
                                <span className="relative z-10 tracking-wide">Start Your Project</span>
                                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </motion.a>

                            <motion.a
                                href="#projects"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: "rgb(220, 38, 38)",
                                    boxShadow: "0 15px 30px rgba(0,0,0,0.1), 0 0 15px rgba(220, 38, 38, 0.1)",
                                    y: -2
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 rounded-xl font-semibold text-lg hover:border-red-600/40 transition-all duration-500 backdrop-blur-xl bg-black/40 hover:bg-black/60 shadow-lg overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Zap className="relative z-10 w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-red-400" />
                                <span className="relative z-10 tracking-wide text-white/90">View Our Work</span>
                            </motion.a>
                        </motion.div>
                    </div>
                </DotGlobeHero>
            </section>

            {/* Rest of your sections remain exactly the same */}
            <section id="projects" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Selected Work</h2>
                    <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-500 transition-colors">
                        View All <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Project 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 mb-6 rounded-lg">
                            <img src="/1.webp" alt="Project 1" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">Next Wave</h3>
                        <p className="text-gray-400">Brand Identity & Digital Platform</p>
                    </motion.div>

                    {/* Project 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group cursor-pointer md:mt-24"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 mb-6 rounded-lg">
                            <img src="2.webp" alt="Project 2" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">island - Go Cappadocia</h3>
                        <p className="text-gray-400">E-Commerce Experience</p>
                    </motion.div>

                    {/* Project 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 mb-6 rounded-lg">
                            <img src="/4.webp" alt="Project 3" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">MoonTrue</h3>
                        <p className="text-gray-400">Web3 Application Design</p>
                    </motion.div>

                    {/* Project 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group cursor-pointer md:mt-24"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 mb-6 rounded-lg">
                            <img src="/3.webp" alt="Project 4" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">Let's Renoria</h3>
                        <p className="text-gray-400">Global Marketing Campaign</p>
                    </motion.div>
                </div>
            </section>

            {/* Services Section with Split Layout */}
            <section id="services" className="px-4">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                        <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            What We
                        </span>
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent ml-3">
                            Serve
                        </span>
                    </h2>
                </motion.div>

                {/* Main card with white background and rounded corners */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - Circular Plate */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative">
                                {/* Glow effect behind plate */}
                                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl scale-150" />

                                <CircularRevealHeading
                                    items={serviceItems}
                                    centerText={
                                        <motion.div
                                            className="text-xl md:text-2xl font-black text-center"
                                            animate={{
                                                scale: [1, 1.05, 1],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-red-600">
                                                MA
                                            </span>
                                            <span className="block text-gray-400 text-xs md:text-sm mt-1 font-light">
                                                AGENCY
                                            </span>
                                        </motion.div>
                                    }
                                    size="lg"
                                />
                            </div>
                        </motion.div>

                        {/* Right side - Animated Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Main headline with text scramble */}
                            <div className="space-y-4">
                                <motion.h3
                                    className="text-3xl md:text-4xl font-bold text-gray-800"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    We deliver{' '}
                                    <TextScramble
                                        text="exceptional"
                                        className="text-red-500"
                                    />
                                </motion.h3>

                                <motion.p
                                    className="text-lg text-gray-600 leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Through our comprehensive suite of services, we help brands reach their full potential.
                                </motion.p>
                            </div>

                            {/* Service list with hover animations */}
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Data-Driven Strategy",
                                        desc: "Roadmaps built on insights, not assumptions",
                                        icon: "📊"
                                    },
                                    {
                                        title: "Creative Excellence",
                                        desc: "Design that captivates and converts",
                                        icon: "🎨"
                                    },
                                    {
                                        title: "Growth Engineering",
                                        desc: "Scalable systems for sustainable success",
                                        icon: "📈"
                                    },
                                    {
                                        title: "Future-Ready Innovation",
                                        desc: "Staying ahead of tomorrow's trends",
                                        icon: "⚡"
                                    }
                                ].map((service, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 + (index * 0.1) }}
                                        whileHover={{ x: 10 }}
                                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-default"
                                    >
                                        <span className="text-2xl group-hover:scale-110 transition-transform">
                                            {service.icon}
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1 group-hover:text-red-500 transition-colors">
                                                {service.title}
                                            </h4>
                                            <p className="text-gray-500 text-sm">
                                                {service.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA with morphing text */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1 }}
                                className="pt-6"
                            >
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/30 transition-all"
                                >
                                    <span>Start your journey</span>
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.span>
                                </motion.a>

                                <p className="mt-4 text-sm text-gray-400">
                                    <MorphingText
                                        texts={["✨ No long-term contracts", "🚀 Fast turnaround", "💯 Satisfaction guaranteed"]}
                                        className="text-gray-500"
                                        duration={2500}
                                    />
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                    className="flex justify-center gap-4 mt-8"
                >
                    {["STRATEGY", "DESIGN", "GROWTH", "INNOVATION"].map((text, i) => (
                        <motion.span
                            key={text}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.3 + (i * 0.1) }}
                            className="text-xs font-bold text-gray-300 uppercase tracking-wider"
                        >
                            {text}
                        </motion.span>
                    ))}
                </motion.div>

            </section>

            {/* Large Typography Section */}
            <section className="py-32 px-6 overflow-hidden flex items-center justify-center min-h-[60vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center w-full max-w-[1400px] mx-auto"
                >
                    <h2 className="text-[12vw] md:text-[10vw] leading-[0.8] font-serif font-bold text-[#1a1a1a] tracking-tighter text-left md:text-center">
                        Going Primal Means <br />
                        <span className="text-[#222222] md:ml-[20vw]">Returning to</span> <br />
                        <span className="text-[#2a2a2a] md:ml-[10vw]">What's Essential</span>
                    </h2>
                </motion.div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="py-32 px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Let's build <br />something <span className="text-red-600">great.</span></h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-md">
                            Ready to take your brand to the next level? Fill out the form and we'll get back to you within 24 hours.
                        </p>
                        <div className="space-y-4 text-sm uppercase tracking-widest text-gray-500">
                            <p>ma.webagency@outlook.com</p>
                            <p>+44 7311 124096</p>
                            <p>London, UK</p>
                        </div>
                    </div>

                    <div className="bg-[#111111] p-8 md:p-12 rounded-2xl border border-white/5">
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-32 bg-zinc-950 border-t border-white/5">
                <div className="px-6 max-w-[1400px] mx-auto text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                        <div>
                            <h4 className="font-bold mb-6 border-b border-white/20 pb-2 inline-block">Explore</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors underline underline-offset-4">All Projects</a></li>
                                <li><a href="#" className="hover:text-white transition-colors underline underline-offset-4">Creative Exploration</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 border-b border-white/20 pb-2 inline-block">Brand</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li>Brand Identity</li>
                                <li>Brand Guidelines</li>
                                <li>Logo Design</li>
                                <li>Packaging</li>
                                <li>Art Direction</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 border-b border-white/20 pb-2 inline-block">Digital</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li>Web Design</li>
                                <li>UI/UX Design</li>
                                <li>E-Commerce</li>
                                <li>Webflow Dev.</li>
                                <li>Motion</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 border-b border-white/20 pb-2 inline-block">Enquiries</h4>
                            <p className="text-gray-400 mb-6">
                                Want to discuss a project?<br />
                                Would love to hear about your company and how I can help.
                            </p>
                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Reply within 24h — Say Hello</p>
                            <a href="mailto:ma.webagency@outlook.com" className="text-lg font-bold hover:text-red-500 transition-colors underline underline-offset-4">
                                ma.webagency@outlook.com
                            </a>
                        </div>
                    </div>

                    <div className="pb-12 border-b border-white/10 mb-8 overflow-hidden">
                        <h2 className="text-[15vw] leading-none font-bold tracking-tighter text-center whitespace-nowrap opacity-5">MA AGENCY</h2>
                    </div>
                </div>

                <div className="bg-[#facc15] text-black py-4 px-6 flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                    <div className="flex gap-4 sm:gap-6 mb-4 md:mb-0">
                        <a href="#" className="hover:text-black/70 transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-black/70 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-black/70 transition-colors">Arena</a>
                    </div>
                    <div className="flex gap-4 sm:gap-6 mb-4 md:mb-0">
                        <span>09:56 AM CET</span>
                        <span>MA AGENCY</span>
                        <span>&copy; {new Date().getFullYear()}</span>
                    </div>
                    <a href="#" className="hover:text-black/70 transition-colors">Back to Top</a>
                </div>
            </footer>
        </div>
    );
}

function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const payload = {
            name: (form.querySelector('#name') as HTMLInputElement).value,
            email: (form.querySelector('#email') as HTMLInputElement).value,
            company: (form.querySelector('#company') as HTMLInputElement).value,
            message: (form.querySelector('#message') as HTMLTextAreaElement).value,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Success toast
                showSuccessToast(
                    "Message Sent! 🎉",
                    "Thank you for reaching out. We'll get back to you within 24 hours."
                );
                form.reset();
                setStatus("success");
                // revert to idle after a short delay so the success state is visible
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                const errData = await response.json();
                // Error toast
                showErrorToast(
                    "Something went wrong",
                    errData.error || 'Failed to send message. Please try again.'
                );
                setStatus("idle");
            }
        } catch (error) {
            console.error('Error:', error);
            // Error toast
            showErrorToast(
                "Connection Error",
                "Unable to send your message. Please check your internet connection and try again."
            );
            setStatus("idle");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full bg-transparent border-b border-white/20 pb-4 text-xl text-white focus:outline-none focus:border-red-600 transition-colors peer placeholder-transparent"
                        placeholder="John Doe"
                    />
                    <label htmlFor="name" className="absolute left-0 -top-6 text-sm font-medium text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">Name</label>
                </div>
                <div className="relative group">
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-transparent border-b border-white/20 pb-4 text-xl text-white focus:outline-none focus:border-red-600 transition-colors peer placeholder-transparent"
                        placeholder="john@example.com"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-6 text-sm font-medium text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">Email</label>
                </div>
            </div>

            <div className="relative group">
                <input
                    type="text"
                    id="company"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-xl text-white focus:outline-none focus:border-red-600 transition-colors peer placeholder-transparent"
                    placeholder="Your Company"
                />
                <label htmlFor="company" className="absolute left-0 -top-6 text-sm font-medium text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">Company (Optional)</label>
            </div>

            <div className="relative group">
                <textarea
                    id="message"
                    required
                    rows={1}
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-xl text-white focus:outline-none focus:border-red-600 transition-colors peer placeholder-transparent resize-none overflow-hidden"
                    placeholder="Tell us about your project..."
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                    }}
                />
                <label htmlFor="message" className="absolute left-0 -top-6 text-sm font-medium text-gray-500 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">Project Details</label>
            </div>

            <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full md:w-auto px-12 py-6 bg-red-600 text-white font-medium uppercase tracking-widest rounded-full hover:bg-red-700 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-4"
            >
                {status === "submitting" ? (
                    <span className="animate-pulse">Sending...</span>
                ) : status === "success" ? (
                    <span>Message Sent!</span>
                ) : (
                    <>Send Message <ArrowRight className="w-5 h-5" /></>
                )}
            </button>
        </form>
    );
}