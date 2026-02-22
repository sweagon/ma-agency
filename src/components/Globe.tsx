import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef({ x: 0, y: 0 });
    const rotationSpeed = useRef({ phi: 0.002, theta: 0.001 }); // Separate speeds for horizontal and vertical

    useEffect(() => {
        let phi = 0;
        let theta = 0.3; // Starting tilt
        let width = 0;
        let height = 0;

        if (!canvasRef.current) return;

        const onResize = () => {
            if (canvasRef.current) {
                const container = canvasRef.current.parentElement;
                if (container) {
                    width = container.clientWidth;
                    height = container.clientHeight;

                    // Update canvas size to match container
                    canvasRef.current.style.width = '100%';
                    canvasRef.current.style.height = '100%';
                }
            }
        };

        window.addEventListener('resize', onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000,
            height: 1000,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 40000,
            mapBrightness: 8,
            baseColor: [0.05, 0.05, 0.05],
            markerColor: [0.95, 0.1, 0.1],
            glowColor: [0.3, 0.05, 0.05],
            markers: [
                { location: [40.7128, -74.006], size: 0.08 },
                { location: [51.5074, -0.1278], size: 0.07 },
                { location: [35.6895, 139.6917], size: 0.07 },
                { location: [48.8566, 2.3522], size: 0.06 },
                { location: [55.7558, 37.6173], size: 0.06 },
                { location: [34.0522, -118.2437], size: 0.07 },
                { location: [19.076, 72.8777], size: 0.06 },
                { location: [-33.8688, 151.2093], size: 0.06 },
            ],
            onRender: (state) => {
                if (!pointerInteracting.current) {
                    // Auto-rotate both phi (horizontal) and theta (vertical)
                    phi += rotationSpeed.current.phi;
                    theta += rotationSpeed.current.theta;

                    // Keep theta within bounds to prevent flipping
                    if (theta > 0.5) theta = 0.5;
                    if (theta < 0.1) theta = 0.1;
                }

                // Apply pointer interaction with smooth mapping
                state.phi = phi + (pointerInteractionMovement.current.x * 0.005);
                state.theta = theta + (pointerInteractionMovement.current.y * 0.005);
            },
        });

        // Fade in
        if (canvasRef.current) {
            canvasRef.current.style.opacity = "0";
            canvasRef.current.style.transition = "opacity 1.5s ease-in-out";
            setTimeout(() => {
                if (canvasRef.current) {
                    canvasRef.current.style.opacity = "1";
                }
            }, 100);
        }

        return () => {
            window.removeEventListener('resize', onResize);
            globe.destroy();
        };
    }, []);

    // Handle pointer interactions
    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        pointerInteracting.current = e.pointerId;
        pointerInteractionMovement.current = { x: 0, y: 0 };
        if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
        }
    };

    const handlePointerUp = () => {
        pointerInteracting.current = null;
        if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (pointerInteracting.current !== null) {
            // Track both X and Y movement for full 3D control
            const dx = e.movementX * 0.5;
            const dy = e.movementY * 0.5;

            pointerInteractionMovement.current = {
                x: pointerInteractionMovement.current.x + dx,
                y: pointerInteractionMovement.current.y + dy
            };
        }
    };

    return (
        <div className={cn(
            "relative flex items-center justify-center w-full h-full",
            "min-h-[400px] md:min-h-[600px]",
            className
        )}>
            {/* Centering container with flexbox */}
            <div className="relative w-full h-full flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full opacity-0 cursor-grab active:cursor-grabbing"
                    style={{
                        contain: "layout paint size",
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block", // Ensures proper rendering
                        margin: "auto" // Centers the canvas
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerOut={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    onPointerCancel={handlePointerUp}
                />
            </div>

            {/* Subtle gradient overlay for better blending */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent to-[#111111] opacity-20" />
        </div>
    );
}