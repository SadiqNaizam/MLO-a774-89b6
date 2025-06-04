import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "25-35 min"
  cuisineTypes: string[]; // e.g., ["Pizza", "Italian"]
  onClick?: (id: string | number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  deliveryTime,
  cuisineTypes,
  onClick,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
    console.log("RestaurantCard clicked:", name, id);
  };

  return (
    <Card
      className="w-full overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-lg"
      onClick={handleClick}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{deliveryTime}</span>
          </div>
        </div>
        {cuisineTypes && cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {cuisineTypes.slice(0, 3).map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {/* CardFooter can be used for promotions or quick actions if needed */}
    </Card>
  );
};

export default RestaurantCard;