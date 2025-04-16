
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Swal from 'sweetalert2';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Calculate subtotal, shipping, and total
  const subtotal = getCartTotal();
  const shipping = subtotal > 30 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login or create an account to proceed with checkout',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Continue as Guest',
        confirmButtonColor: '#9b87f5',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } else {
          navigate('/checkout');
        }
      });
    } else {
      navigate('/checkout');
    }
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl md:text-3xl font-quicksand font-bold text-sweet-darkPurple mb-8">
            Your Shopping Cart
          </h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-poppins font-medium text-gray-700 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button 
              asChild
              className="bg-sweet-purple hover:bg-sweet-darkPurple font-poppins"
            >
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl md:text-3xl font-quicksand font-bold text-sweet-darkPurple mb-8">
          Your Shopping Cart
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="font-poppins font-medium">
                  {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                </h2>
              </div>
              
              {/* Items */}
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.product.id} className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      {/* Product image */}
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md mr-6 mb-4 sm:mb-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-grow">
                        <h3 className="font-poppins font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.product.price.toFixed(2)} each
                        </p>
                      </div>
                      
                      {/* Quantity controls */}
                      <div className="flex items-center mt-4 sm:mt-0">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-sweet-purple"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-poppins">{item.quantity}</span>
                          <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-sweet-purple"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        {/* Remove button */}
                        <button
                          type="button"
                          className="ml-4 text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Item total */}
                    <div className="mt-4 text-right">
                      <p className="font-poppins font-medium text-sweet-darkPurple">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Clear cart button */}
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    Swal.fire({
                      title: 'Clear Cart?',
                      text: 'This will remove all items from your cart',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Yes, clear it',
                      cancelButtonText: 'Cancel',
                      confirmButtonColor: '#f43f5e',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        clearCart();
                      }
                    });
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-quicksand font-bold text-sweet-darkPurple mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-poppins">Subtotal</span>
                  <span className="font-poppins font-medium">{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 font-poppins">Shipping</span>
                  <span className="font-poppins font-medium">
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <div className="text-xs text-gray-500 italic">
                    Free shipping on orders over $30
                  </div>
                )}
                
                <Separator className="my-3" />
                
                <div className="flex justify-between font-bold">
                  <span className="font-poppins text-sweet-darkPurple">Total</span>
                  <span className="font-poppins text-sweet-darkPurple">{formatCurrency(total)}</span>
                </div>
              </div>
              
              <Button
                className="w-full mt-6 bg-sweet-purple hover:bg-sweet-darkPurple font-poppins"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6">
                <h3 className="font-poppins font-medium text-gray-700 mb-2">We Accept</h3>
                <div className="flex items-center space-x-3">
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    PayStack
                  </div>
                  <div className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                    Credit Card
                  </div>
                  <div className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                    Bank Transfer
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

export default Cart;
