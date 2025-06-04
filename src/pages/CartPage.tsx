import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import MenuItemCard from '@/components/MenuItemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';
import { ShoppingCart, User, Tag, Home as HomeIcon, Utensils, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Mock cart data
const initialCartItems = [
  { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 12.99, imageUrl: 'https://placehold.co/100x100/E91E63/FFFFFF?text=Pizza', quantity: 1, restaurantId: 'r1' },
  { id: 'm3', name: 'Garlic Bread', description: 'With mozzarella cheese.', price: 6.50, imageUrl: 'https://placehold.co/100x100/E91E63/FFFFFF?text=Garlic', quantity: 2, restaurantId: 'r1' },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const { toast } = useToast();

  const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
    setCartItems(items => items.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveFromCart = (itemId: string | number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
    toast({ title: "Item removed from cart." });
  };
  
  const handleApplyPromo = () => {
    if(promoCode.toUpperCase() === "SAVE10") {
        toast({ title: "Promo code applied!", description: "You get 10% off."});
        // Actual promo logic would adjust totals
    } else {
        toast({ title: "Invalid promo code.", variant: "destructive" });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.08; // Example 8% tax
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu className="border-b sticky top-0 bg-white z-50">
        <NavigationMenuList className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <NavigationMenuItem>
            <Link to="/" className="flex items-center font-bold text-xl text-primary">
              FoodApp
            </Link>
          </NavigationMenuItem>
          <div className="hidden md:flex items-center space-x-1">
              <NavigationMenuItem>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                      <HomeIcon className="h-4 w-4 mr-1" /> Home
                  </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <Link to="/restaurants" className={navigationMenuTriggerStyle()}>
                      <Utensils className="h-4 w-4 mr-1" /> Restaurants
                  </Link>
              </NavigationMenuItem>
          </div>
          <div className="flex items-center space-x-2">
            <NavigationMenuItem>
              <Link to="/cart" className={navigationMenuTriggerStyle()}>
                <ShoppingCart className="h-5 w-5" aria-label="Cart" />
                {cartItems.length > 0 && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">{cartItems.length}</span>}
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/user-account" className={navigationMenuTriggerStyle()}>
                <User className="h-5 w-5" aria-label="User Account" />
              </Link>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
            <div className="text-center py-12">
                <ShoppingCart className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">Your cart is empty.</p>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/restaurants">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Items ({cartItems.length})</h2>
                <ScrollArea className="h-[400px] pr-3"> {/* Adjust height */}
                <div className="space-y-4">
                    {cartItems.map(item => (
                    <MenuItemCard
                        key={item.id}
                        {...item}
                        variant="cart"
                        onQuantityChange={handleQuantityChange}
                        onRemoveFromCart={handleRemoveFromCart}
                    />
                    ))}
                </div>
                </ScrollArea>
            </section>

            <aside className="lg:col-span-1">
                <Card className="sticky top-24"> {/* Sticky summary card */}
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Taxes (8%)</span>
                    <span>${taxes.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                        <Input 
                            type="text" 
                            placeholder="Promo Code" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-grow"
                        />
                        <Button variant="outline" onClick={handleApplyPromo}><Tag className="h-4 w-4 mr-1 sm:mr-2"/> Apply</Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link to="/checkout" className="w-full"> {/* Assuming a /checkout page */}
                        <Button size="lg" className="w-full">Proceed to Checkout</Button>
                    </Link>
                </CardFooter>
                </Card>
            </aside>
            </div>
        )}
      </main>
      <div className="hidden md:block">
         <Footer />
      </div>
    </div>
  );
};

export default CartPage;