
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        {/* Product image */}
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-sweet-purple text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </div>
          )}
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <h3 className="text-base font-medium text-gray-800 font-poppins mb-1">{product.name}</h3>
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-sweet-darkPurple font-bold font-poppins">${product.price.toFixed(2)}</span>
            
            <Button 
              size="sm" 
              className="bg-sweet-purple hover:bg-sweet-darkPurple text-white rounded-full p-0 w-9 h-9 flex items-center justify-center"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
