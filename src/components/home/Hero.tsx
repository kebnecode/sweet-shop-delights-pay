
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-sweet-pink to-sweet-blue bg-opacity-30 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 bg-pattern-dots"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero content */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-quicksand font-bold text-sweet-darkPurple leading-tight">
              Sweet Delights<br /> 
              <span className="text-sweet-purple">Delivered to You</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 font-poppins max-w-lg mx-auto md:mx-0">
              Indulge in our handcrafted desserts, made with the finest ingredients and delivered right to your doorstep.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                asChild
                className="bg-sweet-purple hover:bg-sweet-darkPurple text-white font-poppins px-8 py-6 rounded-full"
                size="lg"
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-sweet-purple text-sweet-darkPurple hover:bg-sweet-purple hover:text-white font-poppins px-8 py-6 rounded-full"
                size="lg"
              >
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551785876-ce9f6b3baba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Assorted pastries and desserts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sweet-yellow rounded-full flex items-center justify-center p-4 shadow-lg border-4 border-white">
                <div className="text-center">
                  <p className="font-quicksand font-bold text-sweet-darkPurple text-sm">FREE DELIVERY</p>
                  <p className="text-xs mt-1">On orders over $30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
