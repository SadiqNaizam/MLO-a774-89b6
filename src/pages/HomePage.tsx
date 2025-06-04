import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CuisineCarouselItem from '@/components/CuisineCarouselItem';
import RestaurantCard from '@/components/RestaurantCard';
import Footer from '@/components/layout/Footer';
import { Search, ShoppingCart, User, Home as HomeIcon, Utensils } from 'lucide-react';

const sampleCuisines = [
  { id: 'pizza', name: 'Pizza', imageUrl: 'https://placehold.co/300x200/E91E63/FFFFFF?text=Pizza' },
  { id: 'sushi', name: 'Sushi', imageUrl: 'https://placehold.co/300x200/3F51B5/FFFFFF?text=Sushi' },
  { id: 'burgers', name: 'Burgers', imageUrl: 'https://placehold.co/300x200/FF9800/FFFFFF?text=Burgers' },
  { id: 'indian', name: 'Indian', imageUrl: 'https://placehold.co/300x200/4CAF50/FFFFFF?text=Indian' },
  { id: 'chinese', name: 'Chinese', imageUrl: 'https://placehold.co/300x200/F44336/FFFFFF?text=Chinese' },
];

const sampleRestaurants = [
  { id: 'r1', name: 'Luigi\'s Pizzeria', imageUrl: 'https://placehold.co/400x225/E91E63/FFFFFF?text=Luigi%27s+Pizzeria', rating: 4.5, deliveryTime: '25-35 min', cuisineTypes: ['Pizza', 'Italian'] },
  { id: 'r2', name: 'Sushi Masa', imageUrl: 'https://placehold.co/400x225/3F51B5/FFFFFF?text=Sushi+Masa', rating: 4.8, deliveryTime: '30-40 min', cuisineTypes: ['Sushi', 'Japanese'] },
  { id: 'r3', name: 'Burger Hub', imageUrl: 'https://placehold.co/400x225/FF9800/FFFFFF?text=Burger+Hub', rating: 4.2, deliveryTime: '20-30 min', cuisineTypes: ['Burgers', 'American'] },
  { id: 'r4', name: 'Spice Route', imageUrl: 'https://placehold.co/400x225/4CAF50/FFFFFF?text=Spice+Route', rating: 4.6, deliveryTime: '35-45 min', cuisineTypes: ['Indian', 'Curry'] },
];

const HomePage = () => {
  console.log('HomePage loaded');

  const handleCuisineClick = (id: string | number) => {
    console.log('Cuisine clicked:', id);
    // Navigate to RestaurantListingPage with cuisine filter
    // navigate(`/restaurants?cuisine=${id}`);
  };

  const handleRestaurantClick = (id: string | number) => {
    console.log('Restaurant clicked:', id);
    // Navigate to RestaurantDetailPage
    // navigate(`/restaurants/${id}`);
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
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Delicious food, delivered to you</h1>
          <p className="text-lg text-gray-600 mb-6">Find your favorite restaurants and cuisines, all in one place.</p>
          <div className="max-w-2xl mx-auto relative">
            <Input
              type="search"
              placeholder="Search for restaurants or cuisines..."
              className="pl-10 pr-4 py-3 text-base h-12"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Popular Cuisines</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {sampleCuisines.map((cuisine) => (
                <CarouselItem key={cuisine.id} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div className="p-1">
                    <CuisineCarouselItem
                      id={cuisine.id}
                      name={cuisine.name}
                      imageUrl={cuisine.imageUrl}
                      onClick={handleCuisineClick}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 hidden sm:flex" />
            <CarouselNext className="mr-12 hidden sm:flex" />
          </Carousel>
        </section>
        
        <section className="mb-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-700">Featured Promotions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                        autoplayDelay={5000} // Example for auto-play
                    >
                        <CarouselContent>
                            <CarouselItem>
                                <img src="https://placehold.co/1200x400/FE6B8B/FFFFFF?text=Get+20%25+Off+Your+First+Order!" alt="Promotion 1" className="w-full h-auto object-cover rounded-lg" />
                            </CarouselItem>
                            <CarouselItem>
                                <img src="https://placehold.co/1200x400/FF8E53/FFFFFF?text=Free+Delivery+on+Orders+Over+%2450" alt="Promotion 2" className="w-full h-auto object-cover rounded-lg" />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </CardContent>
            </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Nearby Restaurants</h2>
          <ScrollArea className="h-[600px] w-full pr-4"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          </ScrollArea>
        </section>
      </main>
      <div className="hidden md:block">
         <Footer />
      </div>
    </div>
  );
};

export default HomePage;