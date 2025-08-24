import { Fraunces, Inter } from 'next/font/google';

export const display = Fraunces({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
    weight: ['700', '800', '900'],
});

export const ui = Inter({
    subsets: ['latin'],
    variable: '--font-ui',
    display: 'swap',
});
