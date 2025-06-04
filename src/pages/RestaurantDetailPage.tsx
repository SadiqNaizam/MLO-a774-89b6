import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import MenuItemCard from '@/components/MenuItemCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Footer from '@/components/layout/Footer';
import { ShoppingCart, User, Star, Clock, MapPin, Phone, Home as HomeIcon, Utensils } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"; // Assuming useToast is available for notifications

// Mock data - in a real app, this would come from an API via useParams id
const mockRestaurantData = {
  'r1': {
    name: "Luigi's Pizzeria",
    logoUrl: 'https://placehold.co/100x100/E91E63/FFFFFF?text=LP',
    coverImageUrl: 'https://placehold.co/1200x400/E91E63/FFFFFF?text=Luigi%27s+Pizzeria',
    rating: 4.5,
    reviewsCount: 250,
    deliveryTime: '25-35 min',
    address: '123 Pizza St, Flavor Town',
    phone: '555-123-4567',
    cuisineTypes: ['Pizza', 'Italian'],
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 12.99, imageUrl: 'https://placehold.co/300x200/E91E63/FFFFFF?text=Margherita', options: { size: ['Small', 'Medium', 'Large'] } },
      { id: 'm2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni.', price: 14.99, imageUrl: 'https://placehold.co/300x200/E91E63/FFFFFF?text=Pepperoni' },
      { id: 'm3', name: 'Garlic Bread', description: 'With mozzarella cheese.', price: 6.50, imageUrl: 'https://placehold.co/300x200/E91E63/FFFFFF?text=Garlic+Bread' },
    ],
    reviews: [ {id: 'rev1', user: 'FoodieFan', rating: 5, comment: 'Best pizza in town!'} ],
    info: 'Open daily 11am - 11pm. Family friendly.'
  },
  // Add more mock restaurants if needed
};

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = id ? mockRestaurantData[id as keyof typeof mockRestaurantData] : null;
  const { toast } = useToast();

  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null);
  // Example customization states
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  console.log('RestaurantDetailPage loaded for ID:', id);

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Utensils className="h-24 w-24 text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">Restaurant not found.</p>
        <Link to="/restaurants" className="mt-4">
            <Button variant="outline">Back to Restaurants</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = (itemId: string | number) => {
    const item = restaurant.menu.find(m => m.id === itemId);
    if (item) {
      if (item.options) {
        setSelectedMenuItem(item);
        setSelectedSize(item.options.size?.[0]); // Default to first size
        setIsCustomizationDialogOpen(true);
      } else {
        console.log('Added to cart (no customization):', item.name);
        toast({ title: `${item.name} added to cart!`, description: "View your cart to proceed."});
        // Actual cart logic would go here
      }
    }
  };
  
  const handleConfirmCustomization = () => {
    if (selectedMenuItem) {
      console.log(`Added ${selectedMenuItem.name} to cart with size: ${selectedSize}`);
      toast({ title: `${selectedMenuItem.name} added to cart!`, description: `Size: ${selectedSize}`});
      // Actual cart logic
      setIsCustomizationDialogOpen(false);
      setSelectedMenuItem(null);
    }
  };

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
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/restaurants">Restaurants</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{restaurant.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8 p-0">
            <div className="h-48 md:h-64 bg-cover bg-center rounded-t-lg" style={{backgroundImage: `url(${restaurant.coverImageUrl})`}}></div>
            <div className="bg-white p-6 rounded-b-lg shadow-md -mt-12 mx-4 md:mx-8 relative flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                    <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
                    <AvatarFallback>{restaurant.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow mt-4 sm:mt-0 text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-800">{restaurant.name}</h1>
                    <p className="text-sm text-gray-600">{restaurant.cuisineTypes.join(', ')}</p>
                    <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2 text-sm text-gray-700">
                        <span className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" /> {restaurant.rating} ({restaurant.reviewsCount} reviews)</span>
                        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {restaurant.deliveryTime}</span>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 sm:mt-0">Favorite</Button>
            </div>
        </header>

        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 max-w-md mx-auto">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          <TabsContent value="menu">
            <ScrollArea className="h-[500px] p-1"> {/* Adjust height */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurant.menu.map(item => (
                  <MenuItemCard
                    key={item.id}
                    {...item}
                    onAddToCart={() => handleAddToCart(item.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardHeader><CardTitle>Customer Reviews</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {restaurant.reviews.length > 0 ? restaurant.reviews.map(review => (
                    <div key={review.id} className="border-b pb-2">
                        <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                            <span className="ml-2 font-semibold">{review.user}</span>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                )) : <p>No reviews yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="info">
            <Card>
              <CardHeader><CardTitle>Restaurant Information</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary"/>{restaurant.address}</p>
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-primary"/>{restaurant.phone}</p>
                <p className="text-sm text-gray-700">{restaurant.info}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize {selectedMenuItem?.name}</DialogTitle>
            <DialogDescription>
              Select your preferences for {selectedMenuItem?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {selectedMenuItem?.options?.size && (
              <div>
                <Label className="font-semibold">Size</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="mt-2">
                  {selectedMenuItem.options.size.map((s: string) => (
                    <div key={s} className="flex items-center space-x-2">
                      <RadioGroupItem value={s} id={`size-${s}`} />
                      <Label htmlFor={`size-${s}`}>{s}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            {/* Add more customization options here (e.g., toppings with Checkbox) */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizationDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmCustomization}>Add to Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="hidden md:block">
         <Footer />
      </div>
    </div>
  );
};

export default RestaurantDetailPage;