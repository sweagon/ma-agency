// src/components/OptimizedImage.tsx
import { useState } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    width?: number;
    height?: number;
}

export function OptimizedImage({
    src,
    alt,
    className,
    priority = false,
    width,
    height
}: OptimizedImageProps) {
    const [error, setError] = useState(false);

    // If image fails to load, don't try srcset
    if (error) {
        return (
            <img
                src={src}
                alt={alt}
                className={className}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                width={width}
                height={height}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            width={width}
            height={height}
            onError={() => setError(true)}
        />
    );
}