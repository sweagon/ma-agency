import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // React plugin with optimizations
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-runtime', {
            regenerator: false,
            useESModules: true,
          }],
        ],
      },
      exclude: [/\.stories\.tsx?$/, /\.test\.tsx?$/], // Exclude test files
    }),

    // Tailwind CSS
    tailwindcss(),

    // Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Compress files > 10kb
      deleteOriginFile: false,
    }),

    // Brotli compression (better than gzip)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),

    // PWA support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        '*.webp',
        'robots.txt',
      ],
      manifest: false, // Using your existing /public/site.webmanifest
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        globIgnores: ['**/node_modules/**/*', 'stats.html'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/kxptt4m9j4\.ufs\.sh\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
    }),

    // Bundle analyzer (only in analyze mode)
    process.env.ANALYZE && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // 'sunburst' or 'treemap'
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@root': path.resolve(__dirname, './'),
    },
  },

  server: {
    port: 3000,
    host: true,
    hmr: true,
    open: false, // Don't open browser automatically
    headers: {
      'Cache-Control': 'no-store',
    },
  },

  build: {
    // Target modern browsers for smaller bundles
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],

    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3, // Multiple compression passes
        unsafe_math: true,
        unsafe_methods: true,
        hoist_funs: true,
        hoist_vars: true,
        reduce_vars: true,
        reduce_funcs: true,
        collapse_vars: true,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
      mangle: {
        safari10: true, // Safe for older Safari
        properties: false, // Don't mangle property names
      },
    },

    // CSS optimization
    cssCodeSplit: true,
    cssMinify: 'lightningcss', // LightningCSS is faster and smaller

    // Source maps only in dev
    sourcemap: false,

    // Chunk size warnings
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Granular chunk splitting
        manualChunks: {
          // Core React
          'react-core': ['react', 'react-dom'],

          // Animation libraries
          'framer-motion': ['framer-motion'],
          'react-spring': ['react-spring'],

          // Three.js ecosystem
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber'],
          'three-drei': ['@react-three/drei'],

          // UI libraries
          'ui-icons': ['lucide-react'],
          'ui-radix': ['@radix-ui/react-hover-card', '@radix-ui/react-slot'],
          'ui-ark': ['@ark-ui/react'],

          // Email/API
          'email-services': ['resend', 'nodemailer'],

          // Utility libraries
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },

        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        // Compact output
        compact: true,

        // Minimize re-exports
        generatedCode: {
          preset: 'es2015',
          symbols: true,
          constBindings: true,
        },

        // Optimize for tree-shaking
        hoistTransitiveImports: true,
      },

      // Aggressive tree-shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        unknownGlobalSideEffects: false,
      },

      // External dependencies that shouldn't be bundled
      external: [],
    },

    // Improve asset compression
    assetsInlineLimit: 4096, // Inline assets < 4kb

    // Module preload
    modulePreload: {
      polyfill: false, // Modern browsers don't need polyfill
    },

    // Improve build performance
    reportCompressedSize: false,

    // Empty outDir before build
    emptyOutDir: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
    exclude: [
      '@tailwindcss/vite',
      'vite-plugin-compression',
      'vite-plugin-pwa',
    ],
    esbuildOptions: {
      target: 'es2020',
      treeShaking: true,
      minify: true,
      legalComments: 'none',
    },
  },

  // Add esbuild optimizations
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
    target: 'es2020',
    supported: {
      'dynamic-import': true,
    },
  },

  // Preview server config
  preview: {
    port: 3000,
    strictPort: true,
    host: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },

  // Define environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
});