"use client";

import { useState } from 'react';
import type { CartItem, MenuItem, MenuVariant } from '@/types';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { MenuDisplay } from '@/components/menu-display';
import { CartDrawer } from '@/components/cart-drawer';
import { AuthModal } from '@/components/auth-modal';
import { Footer } from '@/components/footer';
import { useToast } from '@/hooks/use-toast';
import { menuItems as allItems, menuCategories } from '@/lib/data';
import { CategoryGallery } from '@/components/category-gallery';

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingCartAction, setPendingCartAction] = useState<(() => void) | null>(null);

  const { toast } = useToast();

  const handleAddToCart = (item: MenuItem, variant: MenuVariant, quantity: number) => {
    const action = () => {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
            (cartItem) => cartItem.itemId === item.id && cartItem.variantName === variant.name
        );

        if (existingItemIndex > -1) {
          const newCart = [...prevCart];
          newCart[existingItemIndex].quantity += quantity;
          return newCart;
        } else {
          const newItem: CartItem = {
            id: `${item.id}-${variant.name}`,
            itemId: item.id,
            itemName: item.name,
            variantName: variant.name,
            unitPrice: variant.price,
            quantity: quantity,
            isVeg: item.is_veg,
          };
          return [...prevCart, newItem];
        }
      });
      toast({
        title: "Added to cart",
        description: `${quantity} x ${item.name} (${variant.name})`,
      });
      setCartOpen(true);
      setPendingCartAction(null);
    };

    if (!isAuthenticated) {
      setPendingCartAction(() => action);
      setAuthModalOpen(true);
      return;
    }

    action();
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.id !== cartItemId);
      }
      return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    toast({
      title: "Login Successful",
      description: "You can now add items to your cart.",
    });
    if (pendingCartAction) {
      pendingCartAction();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCart([]);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header
            cartItemCount={cartItemCount}
            onCartClick={() => setCartOpen(true)}
            isAuthenticated={isAuthenticated}
            onLoginClick={() => setAuthModalOpen(true)}
            onLogoutClick={handleLogout}
        />
        <main className="flex-1">
          <Hero />
          <CategoryGallery menuCategories={menuCategories} />
          <MenuDisplay
              menuItems={allItems}
              menuCategories={menuCategories}
              onAddToCart={handleAddToCart}
          />
        </main>
        <Footer />
        <CartDrawer
            isOpen={isCartOpen}
            onOpenChange={setCartOpen}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
        />
        <AuthModal
            isOpen={isAuthModalOpen}
            onOpenChange={setAuthModalOpen}
            onLoginSuccess={handleLoginSuccess}
        />
      </div>
  );
}
