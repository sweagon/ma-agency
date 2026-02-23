import React, { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence, MotionStyle } from 'framer-motion'
import { cn } from "@/lib/utils"

interface TextItem {
    text: string;
    image: string;
}

interface CircularRevealHeadingProps {
    items: TextItem[];
    centerText: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

// Update the sizeConfig to use responsive classes
const sizeConfig = {
    sm: {
        container: 'h-[200px] w-[200px] md:h-[300px] md:w-[300px]', // Smaller on mobile
        fontSize: 'text-[8px] md:text-xs',
        tracking: 'tracking-[0.2em] md:tracking-[0.25em]',
        radius: 100, // Base radius for calculations
        gap: 30,
        imageSize: 'w-[70%] h-[70%] md:w-[75%] md:h-[75%]',
        textStyle: 'font-medium'
    },
    md: {
        container: 'h-[300px] w-[300px] md:h-[400px] md:w-[400px]',
        fontSize: 'text-[10px] md:text-sm',
        tracking: 'tracking-[0.25em] md:tracking-[0.3em]',
        radius: 130,
        gap: 25,
        imageSize: 'w-[70%] h-[70%] md:w-[75%] md:h-[75%]',
        textStyle: 'font-medium',
    },
    lg: {
        container: 'h-[350px] w-[350px] md:h-[500px] md:w-[500px]', // Responsive!
        fontSize: 'text-xs md:text-base',
        tracking: 'tracking-[0.3em] md:tracking-[0.35em]',
        radius: 150, // Will scale with container
        gap: 20,
        imageSize: 'w-[70%] h-[70%] md:w-[75%] md:h-[75%]',
        textStyle: 'font-medium'
    }
};

// Use CSS classes instead of style objects for box shadows
const ImageOverlay = ({ image, size = 'lg' }: { image: string, size?: 'sm' | 'md' | 'lg' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
        <motion.img
            src={image}
            alt=""
            className={cn(
                sizeConfig[size].imageSize,
                "object-cover rounded-full brightness-90"
            )}
            loading="lazy"
        />
    </motion.div>
);

export const CircularRevealHeading = ({
    items,
    centerText,
    className,
    size = 'md'
}: CircularRevealHeadingProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const config = sizeConfig[size];

    const handleHover = (image: string) => {
        const img = new Image();
        img.src = image;
        setActiveImage(image);
    };

    const createTextSegments = () => {
        const totalItems = items.length;
        const totalGapDegrees = config.gap * totalItems;
        const availableDegrees = 360 - totalGapDegrees;
        const segmentDegrees = availableDegrees / totalItems;

        return items.map((item, index) => {
            const startPosition = index * (segmentDegrees + config.gap);
            const startOffset = `${(startPosition / 360) * 100}%`;

            return (
                <g key={index}>
                    <text
                        className={cn(
                            config.fontSize,
                            config.tracking,
                            config.textStyle,
                            "uppercase cursor-pointer transition-all duration-300 fill-[url(#textGradient)] hover:fill-[#2d3436]"
                        )}
                        onMouseEnter={() => handleHover(item.image)}
                        onMouseLeave={() => setActiveImage(null)}
                    >
                        <textPath
                            href="#curve"
                            startOffset={startOffset}
                            textLength={`${segmentDegrees * 1.8}`}
                            lengthAdjust="spacingAndGlyphs"
                        >
                            {item.text}
                        </textPath>
                    </text>
                </g>
            );
        });
    };

    return (
        <motion.div
            whileHover={{
                scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={cn(
                "relative overflow-hidden",
                config.container,
                "rounded-full bg-[#e6e6e6]",
                "shadow-[16px_16px_32px_#bebebe,_-16px_-16px_32px_#ffffff]",
                "transition-all duration-500 ease-out",
                className
            )}
        >
            <AnimatePresence>
                {activeImage && (
                    <Suspense fallback={null}>
                        <ImageOverlay image={activeImage} size={size} />
                    </Suspense>
                )}
            </AnimatePresence>

            {/* Inner circles with inset shadows */}
            <div className="absolute inset-0.5 rounded-full bg-[#e6e6e6] shadow-[inset_6px_6px_12px_#d1d1d1,_inset_-6px_-6px_12px_#ffffff]" />

            <div className="absolute inset-3 rounded-full bg-[#e6e6e6] shadow-[inset_4px_4px_8px_#d1d1d1,_inset_-4px_-4px_8px_#ffffff]" />

            <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence>
                    {!activeImage && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 p-6 rounded-3xl bg-[#e6e6e6] hover:shadow-[inset_3px_3px_6px_#d1d1d1,_inset_-3px_-3px_6px_#ffffff] transition-shadow"
                        >
                            {centerText}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

// Inside the component, update the SVG path to scale
            <motion.div
                className="absolute inset-0"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#666666" />
                            <stop offset="100%" stopColor="#444444" />
                        </linearGradient>
                    </defs>
                    <path
                        id="curve"
                        fill="none"
                        d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
                    />
                    {createTextSegments()}
                </svg>
            </motion.div>
        </motion.div>
    );
};