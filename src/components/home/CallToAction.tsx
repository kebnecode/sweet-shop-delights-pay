
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-sweet-purple text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-quicksand font-bold">
              Ready to Satisfy Your Sweet Tooth?
            </h2>
            <p className="mt-2 text-white/90 font-poppins max-w-lg">
              Browse our delicious selection and place your order now for same-day delivery.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button
              asChild
              className="bg-white text-sweet-purple hover:bg-sweet-pink hover:text-sweet-darkPurple font-poppins px-8 py-6 rounded-full"
              size="lg"
            >
              <Link to="/shop">Order Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-sweet-purple font-poppins px-8 py-6 rounded-full"
              size="lg"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
