import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
    React.ElementRef<typeof HoverCardPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
            "z-50 w-64 rounded-xl border border-white/10 bg-black/90 p-4 text-white shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

interface LinkPreviewProps {
    children: React.ReactNode;
    url: string;
    className?: string;
    imageSrc?: string;
    title?: string;
    description?: string;
}

export function LinkPreview({
    children,
    url,
    className,
    imageSrc,
    title,
    description,
}: LinkPreviewProps) {
    return (
        <HoverCard openDelay={200} closeDelay={200}>
            <HoverCardTrigger asChild>
                <a
                    href={url}
                    className={cn("relative inline-block text-white hover:text-red-500 transition-colors", className)}
                >
                    {children}
                </a>
            </HoverCardTrigger>
            <HoverCardContent side="top" align="center" className="w-[300px] p-0 overflow-hidden border-white/10 bg-[#111111]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    {imageSrc && (
                        <div className="relative w-full h-[150px] overflow-hidden">
                            <img
                                src={imageSrc}
                                alt={title || "Preview"}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                    <div className="p-4">
                        {title && <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>}
                        {description && <p className="text-xs text-gray-400 line-clamp-2">{description}</p>}
                        <div className="mt-2 text-[10px] text-gray-500 flex items-center">
                            <span className="truncate">{url}</span>
                        </div>
                    </div>
                </motion.div>
            </HoverCardContent>
        </HoverCard>
    );
}
