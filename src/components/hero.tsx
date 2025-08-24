"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Hero() {
    const reduce = useReducedMotion();
    const initial = reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 };
    const animate = reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 };
    const transition = reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 14, mass: 0.7, delay: 0.05 };

    return (
        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-[linear-gradient(180deg,hsl(var(--color-cream))_0%,hsl(var(--color-mango))_35%,hsl(var(--color-saffron))_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0)_60%)] mix-blend-multiply"></div>
            <div className="container px-4 md:px-6 relative">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <motion.h1
                        className="h1-fluid font-display wordmark font-black tracking-tight"
                        initial={initial}
                        animate={animate}
                        transition={transition}
                        whileHover={reduce ? {} : { scale: 1.02 }}
                        whileTap={reduce ? {} : { scale: 0.985 }}
                    >
                        FoodPort Restaurant
                    </motion.h1>
                    <motion.p
                        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.35 }}
                        className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                    >
                        Chinese, Mughlai & Indian Delight. Order direct and save!
                    </motion.p>
                    <motion.div
                        initial={reduce ? {opacity:1,y:0} : {opacity:0,y:16}}
                        animate={{opacity:1,y:0}}
                        transition={{delay:0.25,duration:0.35}}
                        className="text-sm text-muted-foreground"
                    >
                        Near Giri Namkeen, Ghorabandha Main Road, Telco, Jamshedpur
                    </motion.div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <a href="#menu">View Menu</a>
                        </Button>
                        <Button size="lg" variant="outline">
                            Track Order
                        </Button>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Badge variant="secondary">UPI</Badge>
                        <Badge variant="secondary">Pay on Delivery</Badge>
                        <Badge variant="secondary">Live Tracking</Badge>
                    </div>
                </div>
            </div>
        </section>
    );
}
