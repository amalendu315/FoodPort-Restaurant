"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { MenuItem, MenuVariant } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatINR } from '@/lib/currency';

interface MenuItemCardProps {
    item: MenuItem;
    onAddToCart: (item: MenuItem, variant: MenuVariant, quantity: number) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedVariantName, setSelectedVariantName] = useState(item.variants[0].name);

    const selectedVariant = item.variants.find(v => v.name === selectedVariantName) || item.variants[0];

    const handleAddToCart = () => {
        if (quantity > 0) {
            onAddToCart(item, selectedVariant, quantity);
        }
    };

    return (
        <Card className={cn("flex flex-col transition-all hover:shadow-lg", !item.is_available ? 'opacity-60 bg-muted' : '')}>
            <CardHeader className="p-0">
                <div className="aspect-video relative">
                    <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="rounded-top-lg object-cover" // or "rounded-t-lg object-cover"
                        data-ai-hint="food dish"
                    />
                    {item.is_veg ? (
                        <div title="Veg" className="absolute top-2 left-2 border-2 border-green-600 bg-white h-5 w-5 flex items-center justify-center rounded-sm">
                            <div className="bg-green-600 h-3 w-3 rounded-full"></div>
                        </div>
                    ) : (
                        <div title="Non-Veg" className="absolute top-2 left-2 border-2 border-red-600 bg-white h-5 w-5 flex items-center justify-center rounded-sm">
                            <div className="bg-red-600 h-3 w-3 rounded-full"></div>
                        </div>
                    )}
                </div>
                <div className="p-4 pb-2">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="mt-1 text-sm h-10 overflow-hidden">{item.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-2 space-y-4">
                {item.variants.length > 1 && (
                    <div>
                        <Label className="text-xs text-muted-foreground">Size</Label>
                        <RadioGroup
                            value={selectedVariantName}
                            onValueChange={setSelectedVariantName}
                            className="flex gap-2 mt-1"
                            disabled={!item.is_available}
                        >
                            {item.variants.map((variant) => (
                                <div key={variant.name}>
                                    <RadioGroupItem value={variant.name} id={`${item.id}-${variant.name}`} className="sr-only"/>
                                    <Label
                                        htmlFor={`${item.id}-${variant.name}`}
                                        className={cn(
                                            "cursor-pointer rounded-md border px-3 py-1.5 text-sm transition-colors",
                                            selectedVariantName === variant.name
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "border-input hover:bg-accent hover:text-accent-foreground"
                                        )}
                                    >
                                        {variant.name} ({formatINR(variant.price)})
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <Label className="text-xs text-muted-foreground">Quantity</Label>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            disabled={!item.is_available}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-bold">{quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setQuantity(q => Math.min(10, q + 1))}
                            disabled={!item.is_available}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                {item.is_available ? (
                    <Button className="w-full" onClick={handleAddToCart}>
                        Add for {formatINR(selectedVariant.price * quantity)}
                    </Button>
                ) : (
                    <Button className="w-full" disabled variant="secondary">
                        Unavailable
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
