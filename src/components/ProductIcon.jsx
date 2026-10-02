import React from 'react';
import { 
  Coffee, 
  CupSoda, 
  Milk, 
  Sandwich, 
  Package, 
  Cookie, 
  Apple, 
  Layers 
} from 'lucide-react';

export default function ProductIcon({ iconType, size = 18 }) {
  switch (iconType) {
    case 'coffee':
      return <Coffee size={size} />;
    case 'beverage':
      return <CupSoda size={size} />;
    case 'milk':
      return <Milk size={size} />;
    case 'egg':
      return <Package size={size} />;
    case 'bread':
      return <Sandwich size={size} />;
    case 'snack':
      return <Cookie size={size} />;
    case 'produce':
      return <Apple size={size} />;
    case 'staple':
      return <Layers size={size} />;
    default:
      return <Package size={size} />;
  }
}
