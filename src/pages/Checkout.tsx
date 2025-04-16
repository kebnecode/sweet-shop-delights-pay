
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { OrderDetails } from '@/types';
import Swal from 'sweetalert2';

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

// You would replace this with your actual PayStack public key
const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx";

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Order details state
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'NG',
    phoneNumber: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Calculate costs
  const subtotal = getCartTotal();
  const shipping = subtotal > 30 ? 0 : 5.99;
  const tax = subtotal * 0.05; // 5% tax rate
  const total = subtotal + shipping + tax;

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Validate form before submission
  const validateForm = () => {
    const requiredFields: (keyof OrderDetails)[] = [
      'firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'country', 'phoneNumber'
    ];
    
    for (const field of requiredFields) {
      if (!orderDetails[field]) {
        Swal.fire({
          title: 'Missing Information',
          text: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          icon: 'error',
        });
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderDetails.email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        icon: 'error',
      });
      return false;
    }
    
    return true;
  };

  // PayStack config
  const paystackConfig = {
    email: orderDetails.email,
    amount: Math.round(total * 100), // Amount in kobo, naira, pesewas, etc.
    publicKey: PAYSTACK_PUBLIC_KEY,
    label: 'Sweet Shop Delights Order',
    onSuccess: (reference: any) => handlePaymentSuccess(reference),
    onClose: () => console.log('Payment window closed')
  };

  // Handle successful payment
  const handlePaymentSuccess = (reference: any) => {
    console.log('Payment successful:', reference);
    
    // Here you would normally send the order to your backend
    // For this demo, we'll just show a success message
    
    Swal.fire({
      title: 'Order Placed!',
      text: 'Your order has been successfully placed. Thank you for shopping with us!',
      icon: 'success',
      confirmButtonColor: '#9b87f5',
    }).then(() => {
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderReference: reference.reference,
          orderDetails,
          orderItems: cart,
          orderTotal: total
        } 
      });
    });
  };

  // Handle direct checkout without PayStack for demo
  const handleDemoCheckout = () => {
    if (!validateForm()) return;
    
    // Generate a mock reference number
    const mockReference = {
      reference: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    
    handlePaymentSuccess(mockReference);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl md:text-3xl font-quicksand font-bold text-sweet-darkPurple mb-8">
          Checkout
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-quicksand font-bold text-sweet-darkPurple mb-6">
                Shipping Information
              </h2>
              
              <form className="space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={orderDetails.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={orderDetails.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Contact information */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={orderDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number*</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={orderDetails.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address*</Label>
                  <Input
                    id="address"
                    name="address"
                    value={orderDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                {/* City, State, Zip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      name="city"
                      value={orderDetails.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province*</Label>
                    <Input
                      id="state"
                      name="state"
                      value={orderDetails.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Postal Code*</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={orderDetails.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country">Country*</Label>
                  <Select 
                    value={orderDetails.country} 
                    onValueChange={(value) => handleSelectChange('country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="text-sm text-gray-500">
                  * Required fields
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-quicksand font-bold text-sweet-darkPurple mb-4">
                Order Summary
              </h2>
              
              {/* Order items */}
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="font-poppins">
                      {item.quantity} × {item.product.name}
                    </span>
                    <span className="font-poppins font-medium">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Cost breakdown */}
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
                
                <div className="flex justify-between">
                  <span className="text-gray-600 font-poppins">Tax (5%)</span>
                  <span className="font-poppins font-medium">{formatCurrency(tax)}</span>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex justify-between font-bold">
                  <span className="font-poppins text-sweet-darkPurple">Total</span>
                  <span className="font-poppins text-sweet-darkPurple">{formatCurrency(total)}</span>
                </div>
              </div>
              
              {/* Payment buttons */}
              <div className="mt-6 space-y-3">
                {validateForm() && (
                  <PaystackButton
                    {...paystackConfig}
                    className="w-full bg-sweet-purple hover:bg-sweet-darkPurple text-white font-poppins font-medium py-2 px-4 rounded-md transition duration-200"
                    text="Pay with PayStack"
                  />
                )}
                
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 font-poppins"
                  onClick={handleDemoCheckout}
                >
                  Demo Checkout (No Payment)
                </Button>
              </div>
              
              <div className="mt-6">
                <h3 className="font-poppins font-medium text-gray-700 mb-2">Secure Checkout</h3>
                <p className="text-sm text-gray-500">
                  Your payment information is encrypted and secure. We never store your credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
