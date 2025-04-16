
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, Package, Calendar, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import { CartItem, OrderDetails } from '@/types';

interface OrderConfirmationState {
  orderReference: string;
  orderDetails: OrderDetails;
  orderItems: CartItem[];
  orderTotal: number;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as OrderConfirmationState;
  
  // Redirect if accessed directly without state
  if (!state) {
    return <Navigate to="/" replace />;
  }
  
  const { orderReference, orderDetails, orderItems, orderTotal } = state;
  
  // Calculate estimated delivery date (5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  
  // Format delivery date
  const formattedDeliveryDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(deliveryDate);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Success banner */}
          <div className="bg-green-50 p-6 flex items-center">
            <CheckCircle className="text-green-500 h-8 w-8 mr-4" />
            <div>
              <h1 className="text-xl md:text-2xl font-quicksand font-bold text-green-800">
                Order Confirmed!
              </h1>
              <p className="text-green-700 font-poppins mt-1">
                Thank you for your purchase. We've received your order and are preparing it now.
              </p>
            </div>
          </div>
          
          {/* Order details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div>
                <h2 className="font-quicksand font-bold text-sweet-darkPurple text-lg mb-4">
                  Order Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm font-poppins">Order Number</p>
                    <p className="font-poppins font-medium">{orderReference}</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="text-sweet-purple h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-poppins font-medium">Estimated Delivery</p>
                      <p className="text-gray-600 text-sm font-poppins">{formattedDeliveryDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Home className="text-sweet-purple h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-poppins font-medium">Shipping Address</p>
                      <p className="text-gray-600 text-sm font-poppins">
                        {orderDetails.firstName} {orderDetails.lastName}<br />
                        {orderDetails.address}<br />
                        {orderDetails.city}, {orderDetails.state} {orderDetails.zipCode}<br />
                        {countries.find(c => c.code === orderDetails.country)?.name || orderDetails.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column - Order summary */}
              <div>
                <h2 className="font-quicksand font-bold text-sweet-darkPurple text-lg mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-poppins font-medium">{item.product.name}</p>
                          <p className="text-gray-500 text-sm font-poppins">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-poppins font-medium text-sweet-darkPurple">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-poppins font-bold text-sweet-darkPurple">
                  <span>Total</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <p className="text-sm text-gray-500 font-poppins">
                    Payment Method
                  </p>
                  <p className="text-sm font-medium font-poppins">
                    PayStack Payment
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="bg-gray-50 p-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <Package className="text-sweet-purple h-5 w-5 mr-2" />
              <p className="text-sm font-poppins">
                You will receive shipping updates at {orderDetails.email}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="border-sweet-purple text-sweet-darkPurple hover:bg-sweet-purple hover:text-white"
                asChild
              >
                <Link to="/account">View Order</Link>
              </Button>
              <Button
                className="bg-sweet-purple hover:bg-sweet-darkPurple"
                asChild
              >
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Country data for displaying country names
const countries = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'GH', name: 'Ghana' },
  { code: 'KE', name: 'Kenya' },
  { code: 'ZA', name: 'South Africa' }
];

export default OrderConfirmation;
