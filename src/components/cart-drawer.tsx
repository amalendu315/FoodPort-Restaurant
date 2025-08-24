"use client";

import type { CartItem } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { formatINR } from '@/lib/currency';

interface CartDrawerProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    cartItems: CartItem[];
    onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
}

export function CartDrawer({ isOpen, onOpenChange, cartItems, onUpdateQuantity }: CartDrawerProps) {
    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const deliveryFee = subtotal > 0 && subtotal < 499 ? 30 : 0;
    const total = subtotal + deliveryFee;

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <Separator />
                {cartItems.length > 0 ? (
                    <>
                        <ScrollArea className="flex-1 pr-4 -mr-6">
                            <div className="divide-y">
                                {cartItems.map(item => (
                                    <div key={item.id} className="py-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold">{item.itemName}</p>
                                                <p className="text-sm text-muted-foreground">{item.variantName}</p>
                                                <p className="text-sm font-medium">{formatINR(item.unitPrice)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span>{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-destructive"
                                                    onClick={() => onUpdateQuantity(item.id, 0)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <Separator />
                        <SheetFooter className="mt-auto">
                            <div className="w-full space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatINR(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>{formatINR(deliveryFee)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{formatINR(total)}</span>
                                </div>
                                <SheetClose asChild>
                                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Proceed to Checkout</Button>
                                </SheetClose>
                            </div>
                        </SheetFooter>
                    </>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                        <p className="text-lg font-semibold">Your cart is empty</p>
                        <p className="text-muted-foreground">Add some delicious food to get started!</p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
