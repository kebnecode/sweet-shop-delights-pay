
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Minus, Plus, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Swal from 'sweetalert2';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Get product data
  const product = productId ? getProductById(parseInt(productId)) : undefined;
  
  // Quantity state
  const [quantity, setQuantity] = useState(1);
  
  // If product doesn't exist, show not found
  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl md:text-3xl font-quicksand font-bold text-sweet-darkPurple mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            asChild
            className="bg-sweet-purple hover:bg-sweet-darkPurple"
          >
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      Swal.fire({
        title: 'Maximum Stock Reached',
        text: `Sorry, we only have ${product.stock} units in stock.`,
        icon: 'info',
        confirmButtonColor: '#9b87f5'
      });
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-sweet-purple">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/shop" className="hover:text-sweet-purple">Shop</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={`/category/${product.category}`} className="hover:text-sweet-purple capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product image */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="aspect-square w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Product details */}
          <div>
            {/* Product info */}
            <div>
              {product.featured && (
                <Badge className="bg-sweet-purple text-white mb-2">
                  Featured
                </Badge>
              )}
              
              <h1 className="text-2xl md:text-3xl font-quicksand font-bold text-sweet-darkPurple">
                {product.name}
              </h1>
              
              <div className="mt-4">
                <span className="text-2xl font-poppins font-bold text-sweet-purple">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-quicksand font-bold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 font-poppins">
                  {product.description}
                </p>
              </div>
              
              {/* Stock info */}
              <div className="mt-6">
                <p className="font-poppins text-sm">
                  {product.stock > 0 ? (
                    <span className="text-green-600">
                      In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
              </div>
              
              {/* Quantity selector */}
              <div className="mt-6">
                <h3 className="text-sm font-poppins font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="p-2 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-16 text-center border-t border-b border-gray-300 py-2 font-poppins">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    className="p-2 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-8 space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-sweet-purple hover:bg-sweet-darkPurple font-poppins h-12"
                  disabled={product.stock === 0}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleBuyNow}
                  className="w-full bg-sweet-darkPurple hover:bg-sweet-purple font-poppins h-12"
                  disabled={product.stock === 0}
                >
                  Buy Now
                </Button>
              </div>
              
              {/* Wishlist and share */}
              <div className="mt-6 flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-sweet-purple"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-sweet-purple"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
              
              {/* Additional info */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1 font-poppins">Category</p>
                    <p className="font-medium capitalize font-poppins">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1 font-poppins">Delivery</p>
                    <p className="font-medium font-poppins">1-3 Business Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
