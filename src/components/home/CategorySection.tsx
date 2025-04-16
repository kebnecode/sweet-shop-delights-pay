
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategorySection: React.FC = () => {
  // Removing the "all" category for this section
  const displayCategories = categories.filter(cat => cat.id !== 'all');
  
  // Category images
  const categoryImages = {
    cakes: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    cupcakes: "https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    cookies: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    pastries: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
  };
  
  // Background colors for each category card
  const categoryColors = {
    cakes: "bg-sweet-pink",
    cupcakes: "bg-sweet-blue",
    cookies: "bg-sweet-yellow",
    pastries: "bg-sweet-green"
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-quicksand font-bold text-sweet-darkPurple text-center mb-12">
          Explore Our Categories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="group block"
            >
              <div className={`rounded-xl overflow-hidden ${categoryColors[category.id as keyof typeof categoryColors]} h-full transition-transform duration-300 group-hover:-translate-y-2`}>
                <div className="aspect-square relative">
                  <img 
                    src={categoryImages[category.id as keyof typeof categoryImages]} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-white font-quicksand font-bold text-xl sm:text-2xl">
                        {category.name}
                      </h3>
                      <div className="mt-2 w-12 h-1 bg-sweet-purple rounded transition-all duration-300 group-hover:w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
