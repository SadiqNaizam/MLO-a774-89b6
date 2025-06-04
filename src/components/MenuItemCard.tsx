import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react'; // For cart variant

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart?: (id: string | number) => void;
  // Props for cart variant
  variant?: 'menu' | 'cart';
  quantity?: number;
  onQuantityChange?: (id: string | number, newQuantity: number) => void;
  onRemoveFromCart?: (id: string | number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  variant = 'menu',
  quantity,
  onQuantityChange,
  onRemoveFromCart,
}) => {
  console.log("Rendering MenuItemCard:", name, "Variant:", variant);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id);
      console.log("Add to cart clicked for:", name, id);
    }
  };

  const handleIncreaseQuantity = () => {
    if (onQuantityChange && quantity !== undefined) {
      onQuantityChange(id, quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (onQuantityChange && quantity !== undefined && quantity > 1) {
      onQuantityChange(id, quantity - 1);
    } else if (onQuantityChange && quantity === 1 && onRemoveFromCart) {
      // Optionally remove if quantity becomes 0, or handle min quantity logic
      onRemoveFromCart(id);
    }
  };

  const handleRemove = () => {
    if (onRemoveFromCart) {
      onRemoveFromCart(id);
    }
  };

  if (variant === 'cart') {
    return (
      <Card className="w-full flex items-center p-3 gap-3">
        {imageUrl && (
          <div className="w-16 h-16 flex-shrink-0">
            <AspectRatio ratio={1}>
              <img
                src={imageUrl || '/placeholder.svg'}
                alt={name}
                className="object-cover w-full h-full rounded-md"
                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
              />
            </AspectRatio>
          </div>
        )}
        <div className="flex-grow space-y-1">
          <h4 className="text-sm font-semibold truncate">{name}</h4>
          <p className="text-sm font-bold text-primary">${price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={handleDecreaseQuantity} aria-label="Decrease quantity">
            <MinusCircle className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium w-6 text-center">{quantity}</span>
          <Button variant="ghost" size="icon" onClick={handleIncreaseQuantity} aria-label="Increase quantity">
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleRemove} aria-label="Remove item" className="text-red-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  // Default 'menu' variant
  return (
    <Card className="w-full overflow-hidden">
      {imageUrl && (
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
      )}
      <CardContent className={`p-4 space-y-1 ${!imageUrl ? 'pt-4' : ''}`}>
        <h3 className="text-md font-semibold truncate">{name}</h3>
        {description && <p className="text-xs text-gray-600 line-clamp-2">{description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
        {onAddToCart && (
          <Button size="sm" onClick={handleAddToCart}>
            Add
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;