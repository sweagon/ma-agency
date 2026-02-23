// Create a new component: src/components/OptimizedImage.tsx
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    sizes?: string;
    priority?: boolean;
}

export function OptimizedImage({ src, alt, className, sizes = "(max-width: 768px) 100vw, 50vw", priority = false }: OptimizedImageProps) {
    const [imageSrc, setImageSrc] = useState(src);

    // Check if WebP is supported
    useEffect(() => {
        const checkWebPSupport = async () => {
            const webpSupported = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
            if (webpSupported && src.endsWith('.webp')) {
                setImageSrc(src.replace(/\.(jpg|jpeg|png)$/, '.webp'));
            }
        };
        checkWebPSupport();
    }, [src]);

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            sizes={sizes}
            srcSet={`
        ${src.replace(/\.(webp|jpg|png)$/, '-small.webp')} 480w,
        ${src.replace(/\.(webp|jpg|png)$/, '-medium.webp')} 768w,
        ${src} 1200w
      `}
        />
    );
}