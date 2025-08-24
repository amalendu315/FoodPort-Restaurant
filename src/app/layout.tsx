import type { Metadata } from 'next';
import { display, ui } from './fonts';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'FoodPort Restaurant — Jamshedpur Home-Delivery',
    description: 'Order delicious Chinese, Mughlai & Indian food from FoodPort Restaurant online. Fast delivery in Jamshedpur.',
    manifest: '/manifest.webmanifest',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(display.variable, ui.variable)}>
        <head>
            <meta name="theme-color" content="#FFB703" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="FoodPort" />
            <link rel="apple-touch-icon" href="/icons/maskable-192.png" />
        </head>
        <body className={cn('font-ui antialiased')}>
        {children}
        <Toaster />
        </body>
        </html>
    );
}
