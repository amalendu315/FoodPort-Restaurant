"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Heart, Phone, MessageSquare, Instagram } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-card border-t mt-auto">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="space-y-4">
                        <h3 className="font-bold font-headline text-lg">FoodPort Restaurant</h3>
                        <p className="text-sm text-muted-foreground">Order direct & save.</p>
                        <div className="flex space-x-2">
                            <span className="text-xs font-semibold">UPI</span>
                            <span className="text-xs font-semibold">COD</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-md">Contact & Hours</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="tel:9572729138" className="hover:text-primary">9572729138</a></li>
                            <li>Near Giri Namkeen, Ghorabandha Main Road, Telco, Jamshedpur</li>
                            <li>Open Daily: 11:00 AM – 11:00 PM</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-md">Delivery Areas</h3>
                        <p className="text-sm text-muted-foreground">Serviceable Pincodes: 831001, 831002, 831004</p>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Check your pincode" />
                            <Button type="submit" variant="secondary">Check</Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-md">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground grid grid-cols-2">
                            <li><Link href="#menu" className="hover:text-primary">Menu</Link></li>
                            <li><Link href="#" className="hover:text-primary">My Orders</Link></li>
                            <li><Link href="#" className="hover:text-primary">Track Order</Link></li>
                            <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary">T&C</Link></li>
                            <li><Link href="#" className="hover:text-primary">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-primary">Refund</Link></li>
                            <li><Link href="#" className="hover:text-primary">Delivery</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
                    <div className="md:flex md:justify-between items-center">
                        <p className="mb-4 md:mb-0">&copy; {currentYear} FoodPort Restaurant • Made in Jamshedpur • FSSAI Lic. No. XXXXXXXXXXXXXX</p>
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="hover:text-primary"><MessageSquare className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>
                    <p className="mt-4 text-xs inline-flex items-center gap-1.5">Developed with <Heart className="h-4 w-4 text-red-500 fill-current" /> by Amalendu Pandey</p>
                </div>
            </div>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-accent text-accent-foreground p-2 flex justify-center items-center">
                <a href="tel:9572729138" className="flex items-center gap-2 font-bold">
                    <Phone className="h-5 w-5" />
                    <span>Call to Order</span>
                </a>
            </div>
        </footer>
    );
}
