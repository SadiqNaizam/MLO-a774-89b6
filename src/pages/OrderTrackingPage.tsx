import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import OrderStatusStepper from '@/components/OrderStatusStepper';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Footer from '@/components/layout/Footer';
import { ShoppingCart, User, MessageSquare, Map, Home as HomeIcon, Utensils } from 'lucide-react';

const sampleOrderSteps = [
  { name: 'Order Confirmed', status: 'completed' as const, description: 'We have received your order.' },
  { name: 'Preparing Food', status: 'current' as const, description: 'The restaurant is preparing your meal.' },
  { name: 'Out for Delivery', status: 'pending' as const, description: 'Your order is on its way.' },
  { name: 'Delivered', status: 'pending' as const, description: 'Enjoy your meal!' },
];

// Mock data - in a real app, this would come from an API via useParams orderId
const mockOrderData = {
    'order123': {
        orderId: 'ORDER123XYZ',
        restaurantName: "Luigi's Pizzeria",
        estimatedDelivery: '3:45 PM - 4:00 PM',
        items: [ { name: 'Margherita Pizza', quantity: 1}, { name: 'Garlic Bread', quantity: 2} ],
        totalAmount: 26.99,
        currentStepIndex: 1, // 'Preparing Food'
    }
};

const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderId ? mockOrderData[orderId as keyof typeof mockOrderData] : null;
  
  console.log('OrderTrackingPage loaded for Order ID:', orderId);

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Utensils className="h-24 w-24 text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">Order not found.</p>
        <Link to="/" className="mt-4">
            <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }


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
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">Track Your Order</CardTitle>
            <CardDescription>Order ID: {order.orderId} from {order.restaurantName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="p-6 border rounded-lg bg-white">
                <OrderStatusStepper steps={sampleOrderSteps} currentStepIndex={order.currentStepIndex} />
            </div>

            <div className="text-center">
                <p className="text-lg font-semibold">Estimated Delivery Time</p>
                <p className="text-2xl text-primary font-bold">{order.estimatedDelivery}</p>
            </div>

            <section>
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <ul className="list-disc list-inside text-gray-700 pl-2 space-y-1">
                    {order.items.map(item => (
                        <li key={item.name}>{item.quantity}x {item.name}</li>
                    ))}
                </ul>
                <p className="text-right font-bold mt-2">Total: ${order.totalAmount.toFixed(2)}</p>
            </section>
            
            <section className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-center">Delivery Map</h3>
                {/* Placeholder for map - Skeleton can indicate loading */}
                <div className="h-64 bg-gray-300 rounded flex items-center justify-center">
                    <Map className="h-16 w-16 text-gray-500" />
                    {/* <Skeleton className="h-full w-full" /> */}
                     <p className="text-gray-500 ml-2">Map view coming soon</p>
                </div>
            </section>

            <div className="text-center mt-6">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" /> Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default OrderTrackingPage;