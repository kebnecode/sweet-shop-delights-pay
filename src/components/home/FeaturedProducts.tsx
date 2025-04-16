
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import { getFeaturedProducts } from '@/data/products';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12 bg-sweet-purple bg-opacity-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-quicksand font-bold text-sweet-darkPurple">
            Featured Delights
          </h2>
          <Link 
            to="/shop" 
            className="text-sweet-purple hover:text-sweet-darkPurple font-medium flex items-center gap-1 text-sm transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
