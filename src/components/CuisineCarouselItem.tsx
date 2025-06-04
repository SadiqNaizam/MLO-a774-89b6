import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface CuisineCarouselItemProps {
  id: string | number;
  name: string;
  imageUrl: string;
  onClick?: (id: string | number) => void;
}

const CuisineCarouselItem: React.FC<CuisineCarouselItemProps> = ({ id, name, imageUrl, onClick }) => {
  console.log("Rendering CuisineCarouselItem:", name);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
    console.log("CuisineCarouselItem clicked:", name, id);
  };

  return (
    <Card
      className="w-full overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={handleClick}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={name}
          className="object-cover w-full h-full"
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
        />
      </AspectRatio>
      <CardContent className="p-3">
        <h3 className="text-sm font-semibold text-center truncate">{name}</h3>
      </CardContent>
    </Card>
  );
};

export default CuisineCarouselItem;