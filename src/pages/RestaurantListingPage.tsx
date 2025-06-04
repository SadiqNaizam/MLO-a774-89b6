import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/layout/Sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import RestaurantCard from '@/components/RestaurantCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Footer from '@/components/layout/Footer';
import { Search, ShoppingCart, User, Home as HomeIcon, Utensils, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';


const allRestaurants = [
  { id: 'r1', name: 'Luigi\'s Pizzeria', imageUrl: 'https://placehold.co/400x225/E91E63/FFFFFF?text=Luigi%27s+Pizzeria', rating: 4.5, deliveryTime: '25-35 min', cuisineTypes: ['Pizza', 'Italian'], priceRange: 2, isTopRated: true, offersDelivery: true },
  { id: 'r2', name: 'Sushi Masa', imageUrl: 'https://placehold.co/400x225/3F51B5/FFFFFF?text=Sushi+Masa', rating: 4.8, deliveryTime: '30-40 min', cuisineTypes: ['Sushi', 'Japanese'], priceRange: 3, isTopRated: true, offersDelivery: true },
  { id: 'r3', name: 'Burger Hub', imageUrl: 'https://placehold.co/400x225/FF9800/FFFFFF?text=Burger+Hub', rating: 4.2, deliveryTime: '20-30 min', cuisineTypes: ['Burgers', 'American'], priceRange: 1, isTopRated: false, offersDelivery: true },
  { id: 'r4', name: 'Spice Route', imageUrl: 'https://placehold.co/400x225/4CAF50/FFFFFF?text=Spice+Route', rating: 4.6, deliveryTime: '35-45 min', cuisineTypes: ['Indian', 'Curry'], priceRange: 2, isTopRated: true, offersDelivery: false },
  { id: 'r5', name: 'Noodle House', imageUrl: 'https://placehold.co/400x225/F44336/FFFFFF?text=Noodle+House', rating: 4.3, deliveryTime: '25-35 min', cuisineTypes: ['Chinese', 'Noodles'], priceRange: 1, isTopRated: false, offersDelivery: true },
  { id: 'r6', name: 'Taco Town', imageUrl: 'https://placehold.co/400x225/CDDC39/000000?text=Taco+Town', rating: 4.0, deliveryTime: '15-25 min', cuisineTypes: ['Mexican', 'Tacos'], priceRange: 1, isTopRated: false, offersDelivery: true },
  { id: 'r7', name: 'Vegan Vibes', imageUrl: 'https://placehold.co/400x225/009688/FFFFFF?text=Vegan+Vibes', rating: 4.9, deliveryTime: '30-40 min', cuisineTypes: ['Vegan', 'Healthy'], priceRange: 2, isTopRated: true, offersDelivery: true },
  { id: 'r8', name: 'Steak House Supreme', imageUrl: 'https://placehold.co/400x225/795548/FFFFFF?text=Steak+House', rating: 4.4, deliveryTime: '40-50 min', cuisineTypes: ['Steak', 'American'], priceRange: 4, isTopRated: false, offersDelivery: true },
];

const ITEMS_PER_PAGE = 6;

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');
  const [searchParams] = useSearchParams();
  const cuisineFilter = searchParams.get('cuisine'); // Example: to pre-filter by cuisine from HomePage

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'deliveryTime', 'name'
  const [priceRange, setPriceRange] = useState<[number]>([4]); // Max price $, $$, $$$ or $$$$ (1-4)
  const [topRated, setTopRated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleRestaurantClick = (id: string | number) => {
    console.log('Restaurant clicked:', id);
    // navigate(`/restaurants/${id}`);
  };

  const filteredRestaurants = allRestaurants
    .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.cuisineTypes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())))
    .filter(r => cuisineFilter ? r.cuisineTypes.map(c => c.toLowerCase()).includes(cuisineFilter.toLowerCase()) : true)
    .filter(r => r.priceRange <= priceRange[0])
    .filter(r => topRated ? r.isTopRated : true)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'deliveryTime') { // Assuming deliveryTime is "X-Y min", sort by average
        const timeA = (parseInt(a.deliveryTime.split('-')[0]) + parseInt(a.deliveryTime.split('-')[1])) / 2;
        const timeB = (parseInt(b.deliveryTime.split('-')[0]) + parseInt(b.deliveryTime.split('-')[1])) / 2;
        return timeA - timeB;
      }
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const currentRestaurants = filteredRestaurants.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const FilterControls = () => (
    <div className="space-y-6">
        <div>
            <Label htmlFor="sort-by" className="text-sm font-medium">Sort by</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-by" className="w-full mt-1">
                <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div>
            <Label htmlFor="price-range" className="text-sm font-medium">Max Price Range (${'$'.repeat(priceRange[0])})</Label>
            <Slider
            id="price-range"
            min={1}
            max={4}
            step={1}
            value={priceRange}
            onValueChange={(value: number[]) => setPriceRange([value[0]])}
            className="mt-2"
            />
        </div>
        <div className="flex items-center space-x-2 mt-1">
            <Checkbox id="top-rated" checked={topRated} onCheckedChange={(checked) => setTopRated(Boolean(checked))} />
            <Label htmlFor="top-rated" className="text-sm font-medium">Show Top Rated Only</Label>
        </div>
        {/* Add more filters like delivery fee, dietary options etc. here */}
    </div>
  );

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

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
                <Input
                    type="search"
                    placeholder="Search restaurants or cuisines..."
                    className="pl-10 pr-4 py-2 h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="md:hidden">
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                            <Filter className="h-4 w-4 mr-2" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:max-w-sm">
                        <SheetHeader>
                            <SheetTitle>Filter Options</SheetTitle>
                        </SheetHeader>
                        <div className="p-4">
                           <FilterControls />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
        
        <div className="flex">
          <div className="hidden md:block w-72 lg:w-80 mr-8">
            <Sidebar title="Filter Options">
                <FilterControls />
            </Sidebar>
          </div>
          <main className="flex-1">
            {cuisineFilter && <h2 className="text-xl font-semibold text-gray-700 mb-4">Showing restaurants for: <span className="text-primary">{cuisineFilter}</span></h2>}
            {currentRestaurants.length > 0 ? (
              <>
                <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pr-4">
                    {currentRestaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        {...restaurant}
                        onClick={handleRestaurantClick}
                      />
                    ))}
                  </div>
                </ScrollArea>
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p-1));}} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}/>
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(i+1);}} isActive={currentPage === i+1}>
                            {i+1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      {/* Could add PaginationEllipsis if many pages */}
                      <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p+1));}} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}/>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Utensils className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No restaurants match your criteria.</p>
                <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      <div className="hidden md:block">
         <Footer />
      </div>
    </div>
  );
};

export default RestaurantListingPage;