

"use client";

import { useState, useMemo } from 'react';
import type { MenuItem as MenuItemType, MenuVariant, MenuCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Search, X, Filter } from 'lucide-react';
import { MenuItemCard } from './menu-item-card';
import Paginator from './paginator';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { formatINR } from '@/lib/currency';

const PAGE_SIZE = 12;

interface MenuDisplayProps {
    menuItems: MenuItemType[];
    menuCategories: MenuCategory[];
    onAddToCart: (item: MenuItemType, variant: MenuVariant, quantity: number) => void;
}

export function MenuDisplay({ menuItems, menuCategories, onAddToCart }: MenuDisplayProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('popularity');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        vegTypes: [] as string[],
        categories: [] as string[],
        priceRange: [0, 1000],
        inStockOnly: true,
    });

    const handleFilterChange = (filterType: keyof typeof filters, value: any) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({
            vegTypes: [],
            categories: [],
            priceRange: [0, 1000],
            inStockOnly: true,
        });
        setCurrentPage(1);
    };

    const sortedItems = useMemo(() => {
        const filteredItems = menuItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStock = !filters.inStockOnly || item.is_available;
            const matchesPrice = item.base_price >= filters.priceRange[0] && item.base_price <= filters.priceRange[1];
            const matchesCategory = filters.categories.length === 0 || filters.categories.includes(item.category_slug);
            const matchesVegType = filters.vegTypes.length === 0 || filters.vegTypes.includes(item.veg_type);

            return matchesSearch && matchesStock && matchesPrice && matchesCategory && matchesVegType;
        });

        return [...filteredItems].sort((a, b) => {
            switch (sortOrder) {
                case 'price_asc':
                    return a.base_price - b.base_price;
                case 'price_desc':
                    return b.base_price - a.base_price;
                case 'name_asc':
                    return a.name_lc.localeCompare(b.name_lc);
                default: // popularity
                    return (b.popularity_score ?? 0) - (a.popularity_score ?? 0);
            }
        });
    }, [menuItems, searchTerm, filters, sortOrder]);


    const totalPages = Math.ceil(sortedItems.length / PAGE_SIZE);
    const paginatedItems = sortedItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const activeFilterCount =
        filters.vegTypes.length +
        filters.categories.length +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0);


    const FilterSidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Filters</h3>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    <Accordion type="multiple" defaultValue={['food-type', 'categories', 'price']} className="w-full">
                        <AccordionItem value="food-type">
                            <AccordionTrigger>Food Type</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                {['veg', 'egg', 'chicken', 'fish'].map(type => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`veg-type-${type}`}
                                            checked={filters.vegTypes.includes(type)}
                                            onCheckedChange={(checked) => {
                                                const newVegTypes = checked
                                                    ? [...filters.vegTypes, type]
                                                    : filters.vegTypes.filter(t => t !== type);
                                                handleFilterChange('vegTypes', newVegTypes);
                                            }}
                                        />
                                        <Label htmlFor={`veg-type-${type}`} className="capitalize">{type}</Label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="categories">
                            <AccordionTrigger>Categories</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                {menuCategories.map(cat => (
                                    <div key={cat.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`cat-${cat.id}`}
                                            checked={filters.categories.includes(cat.id)}
                                            onCheckedChange={(checked) => {
                                                const newCats = checked
                                                    ? [...filters.categories, cat.id]
                                                    : filters.categories.filter(c => c !== cat.id);
                                                handleFilterChange('categories', newCats);
                                            }}
                                        />
                                        <Label htmlFor={`cat-${cat.id}`}>{cat.name}</Label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="price">
                            <AccordionTrigger>Price Range</AccordionTrigger>
                            <AccordionContent className="pt-4">
                                <Slider
                                    min={0}
                                    max={1000}
                                    step={10}
                                    value={filters.priceRange}
                                    onValueChange={(value) => handleFilterChange('priceRange', value)}
                                />
                                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                    <span>{formatINR(filters.priceRange[0])}</span>
                                    <span>{formatINR(filters.priceRange[1])}</span>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="in-stock"
                            checked={filters.inStockOnly}
                            onCheckedChange={(checked) => handleFilterChange('inStockOnly', checked)}
                        />
                        <Label htmlFor="in-stock">In Stock Only</Label>
                    </div>
                </div>
            </ScrollArea>
            <div className="p-4 border-t mt-auto">
                <Button onClick={clearFilters} className="w-full" variant="secondary">Clear All Filters</Button>
            </div>
        </div>
    );

    return (
        <section id="menu" className="py-12 md:py-16 lg:py-20">
            <div className="container">
                <div className="flex">
                    {/* Desktop Filter Sidebar */}
                    <aside className="hidden lg:block w-64 xl:w-72 pr-8">
                        <div className="sticky top-24">
                            <FilterSidebarContent />
                        </div>
                    </aside>

                    {/* Main content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center sticky top-16 z-10 bg-background/95 py-4">
                            <h2 className="text-2xl font-bold font-headline">{paginatedItems.length} Dishes</h2>

                            {/* Mobile Filter Trigger */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="lg:hidden w-full relative">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                        {activeFilterCount > 0 && (
                                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                                        {activeFilterCount}
                                    </span>
                                        )}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-full max-w-sm p-0">
                                    <FilterSidebarContent />
                                </SheetContent>
                            </Sheet>

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

                        {/* Results Grid */}
                        {paginatedItems.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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
                            <div className="text-center py-16">
                                <p className="text-lg font-semibold mb-2">No dishes found</p>
                                <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
                                <Button onClick={clearFilters}>Clear Filters</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
