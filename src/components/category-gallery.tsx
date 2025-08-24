
"use client";

import type { MenuCategory } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface CategoryGalleryProps {
    menuCategories: MenuCategory[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

export function CategoryGallery({ menuCategories }: CategoryGalleryProps) {
    return (
        <section className="bg-secondary/50 py-12 md:py-16">
            <div className="container">
                <h2 className="text-3xl font-bold font-headline text-center mb-8">
                    Explore Our Menu
                </h2>
                <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                    <motion.div
                        className="flex w-max space-x-4 pb-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {menuCategories.map((category) => (
                            <motion.div key={category.id} variants={itemVariants} className="shrink-0">
                                <Link href={`#menu?category=${category.id}`} passHref>
                                    <Card className="group w-40 overflow-hidden text-center transition-all hover:shadow-lg hover:-translate-y-1">
                                        <CardContent className="p-0">
                                            <div className="aspect-square relative flex items-center justify-center">
                                                <Image
                                                    src={`https://placehold.co/200x200.png`}
                                                    alt={category.name}
                                                    width={200}
                                                    height={200}
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    data-ai-hint="food category"
                                                />
                                            </div>
                                            <p className="font-semibold py-3 px-2 text-sm truncate">
                                                {category.name}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </section>
    );
}
