import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeroWithSkeleton({ children }: { children: React.ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate loading time or wait for actual load
        const timer = setTimeout(() => setIsLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Skeleton/Placeholder */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 z-20 bg-[#111111] flex items-center justify-center"
                    >
                        <div className="text-center space-y-6">
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                                    <span className="block font-light text-white/60 mb-3">We help</span>
                                    <span className="block text-white">Innovate</span>
                                </h1>
                            </motion.div>

                            {/* Progress bar */}
                            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="h-full bg-red-600 rounded-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual content - fades in when ready */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="relative z-10"
            >
                {children}
            </motion.div>
        </div>
    );
}