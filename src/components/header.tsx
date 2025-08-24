"use client";

import { ShoppingCart, User, LogIn, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
    isAuthenticated: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
}

export function Header({ cartItemCount, onCartClick, isAuthenticated, onLoginClick, onLogoutClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <UtensilsCrossedIcon className="h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-bold font-headline">
                        FoodPort Restaurant
                    </h1>
                </div>

                <div className="hidden md:flex flex-1 max-w-md items-center gap-2">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search 150+ dishes..." className="pl-10" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onCartClick} className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {cartItemCount}
              </span>
                        )}
                        <span className="sr-only">Open Cart</span>
                    </Button>

                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person avatar" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">User Name</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            user@example.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>My Orders</DropdownMenuItem>
                                <DropdownMenuItem>Addresses</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={onLogoutClick}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button onClick={onLoginClick}>
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                    )}

                </div>
            </div>
        </header>
    );
}

function UtensilsCrossedIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
            <path d="m15.2 3.2 6.8 6.8" />
            <path d="m2 16 6 6" />
            <path d="m8 22 1.3-1.3a3 3 0 0 0 0-4.2L7.5 14.7a3 3 0 0 0-4.2 0L2 16" />
        </svg>
    );
}
