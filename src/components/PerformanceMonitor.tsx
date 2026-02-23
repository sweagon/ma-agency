/// <reference types="vite/client" />

import { useEffect } from 'react';

export function PerformanceMonitor() {
    useEffect(() => {
        // Report Core Web Vitals
        if ('performance' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    // Log to console in dev, could send to analytics in prod
                    if (import.meta.env.DEV) {
                        console.log(`${entry.name}: ${entry.startTime}ms`);
                    }
                }
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
    }, []);

    return null;
}