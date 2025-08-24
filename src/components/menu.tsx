"use client";

import { useState } from 'react';
import { menuCategories, menuItems as allItems } from '@/lib/data';
import type { MenuItem as MenuItemType, MenuVariant } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MenuItemCard } from './menu-item-card';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from './ui/input';
import { Search, X } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import  Paginator  from './paginator';
import { Button } from './ui/button';


interface MenuProps {
    onAddToCart: (item: MenuItemType, variant: MenuVariant, quantity: number) => void;
}

const PAGE_SIZE = 12;

export function Menu({ onAddToCart }: MenuProps) {
    const allItemsCategory = { id: 'all', name: 'All Items', sort_order: -1 };
    const categories = [allItemsCategory, ...menuCategories.sort((a, b) => a.sort_order - b.sort_order)];

    const [activeTab, setActiveTab] = useState(categories[0].id);
    const [showVegOnly, setShowVegOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('popularity');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = allItems.filter(item => {
        const matchesCategory = activeTab === 'all' ? true : item.category_id === activeTab;
        const matchesVeg = !showVegOnly || item.is_veg;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesVeg && matchesSearch;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortOrder) {
            case 'price_asc':
                return a.variants[0].price - b.variants[0].price;
            case 'price_desc':
                return b.variants[0].price - a.variants[0].price;
            case 'name_asc':
                return a.name.localeCompare(b.name);
            default: // popularity
                return (b.popularity_score ?? 0) - (a.popularity_score ?? 0);
        }
    });

    const totalPages = Math.ceil(sortedItems.length / PAGE_SIZE);
    const paginatedItems = sortedItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <section id="menu" className="py-12 md:py-16 lg:py-20">
            <div className="container">
                <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
                    <div className="flex-grow flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search menu..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            {searchTerm && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                            <Switch
                                id="veg-only"
                                checked={showVegOnly}
                                onCheckedChange={(checked) => {
                                    setShowVegOnly(checked);
                                    setCurrentPage(1);
                                }}
                            />
                            <Label htmlFor="veg-only" className="flex items-center">
                                <div className="mr-2 border-2 border-green-600 bg-white h-4 w-4 flex items-center justify-center">
                                    <div className="bg-green-600 h-2 w-2 rounded-full"></div>
                                </div>
                                Veg Only
                            </Label>
                        </div>
                    </div>
                    <div className="w-full sm:w-48">
                        <Select value={sortOrder} onValueChange={setSortOrder}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popularity">Popularity</SelectItem>
                                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                <SelectItem value="name_asc">Alphabetical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setCurrentPage(1); }} className="w-full">
                    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 -mx-4 px-4 border-b">
                        <ScrollArea className="w-full whitespace-nowrap">
                            <TabsList>
                                {categories.map((category) => (
                                    <TabsTrigger key={category.id} value={category.id}>
                                        {category.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    <div className="mt-8">
                        {paginatedItems.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {paginatedItems.map(item => (
                                        <MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
                                    ))}
                                </div>
                                <Paginator
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                    className="mt-12"
                                />
                            </>
                        ) : (
                            <p className="text-center text-muted-foreground mt-12 py-8">No items match your filters. Try adjusting your search or category.</p>
                        )}
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
