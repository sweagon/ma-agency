import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface TextScrambleProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
    trigger?: boolean;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export function TextScramble({ text, className, duration = 2000, delay = 800, trigger = true }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!trigger || isAnimating) return;

        let timeoutId: NodeJS.Timeout;
        let intervalId: NodeJS.Timeout;

        const startAnimation = () => {
            setIsAnimating(true);
            let iteration = 0;
            const totalIterations = text.length * 3;
            const intervalDuration = duration / totalIterations;

            intervalId = setInterval(() => {
                setDisplayText((prev) =>
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iteration / 3) {
                                return text[index];
                            }
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join("")
                );

                if (iteration >= totalIterations) {
                    clearInterval(intervalId);
                    setIsAnimating(false);
                    setDisplayText(text);
                }

                iteration += 1;
            }, intervalDuration);
        };

        timeoutId = setTimeout(startAnimation, delay);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, duration, delay, trigger]);

    return <span className={cn("inline-block", className)}>{displayText}</span>;
}
