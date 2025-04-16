
import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckSquare, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { products, categories } from '@/data/products';
import { Product } from '@/types';

const Shop: React.FC = () => {
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortOption, setSortOption] = useState('featured');
  
  // Apply filters whenever any filter changes
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (!selectedCategories.includes('all')) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch(sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // For demo purposes, we'll sort by ID assuming higher IDs are newer
        result.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        // Featured items first, then sort by ID
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.id - a.id;
        });
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategories, priceRange, sortOption]);
  
  // Handle category selection
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(prev => {
      if (categoryId === 'all' && checked) {
        return ['all'];
      } else {
        // Remove 'all' when selecting a specific category
        const newCategories = prev.filter(id => id !== 'all' && id !== categoryId);
        
        if (checked) {
          return [...newCategories, categoryId];
        }
        
        // If no categories selected, default to 'all'
        return newCategories.length ? newCategories : ['all'];
      }
    });
  };
  
  // Handle price range changes
  const handlePriceMinChange = (value: string) => {
    const min = parseInt(value) || 0;
    setPriceRange([min, priceRange[1]]);
  };
  
  const handlePriceMaxChange = (value: string) => {
    const max = parseInt(value) || 100;
    setPriceRange([priceRange[0], max]);
  };
  
  // Get min and max price from products for the range inputs
  const maxProductPrice = Math.ceil(Math.max(...products.map(p => p.price)));
  
  // Calculate the highest possible price based on products
  const productPriceLimit = maxProductPrice + 10;
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-quicksand font-bold text-sweet-darkPurple">
              Our Sweet Collection
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-poppins">
              Browse our selection of handcrafted desserts and sweet treats, made with the finest ingredients.
            </p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Sort Dropdown */}
              <div className="w-full md:w-48">
                <Select
                  value={sortOption}
                  onValueChange={setSortOption}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Mobile Filter Button */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Narrow down products by category and price
                      </SheetDescription>
                    </SheetHeader>
                    
                    {/* Mobile Filters */}
                    <div className="mt-6 space-y-6">
                      {/* Categories */}
                      <div>
                        <h3 className="font-poppins font-medium mb-3">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center">
                              <Checkbox
                                id={`mobile-category-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={(checked) => 
                                  handleCategoryChange(category.id, checked === true)
                                }
                              />
                              <Label
                                htmlFor={`mobile-category-${category.id}`}
                                className="ml-2 font-poppins text-gray-700"
                              >
                                {category.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Price Range */}
                      <div>
                        <h3 className="font-poppins font-medium mb-3">Price Range</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="mobile-price-min">Min</Label>
                            <Input
                              id="mobile-price-min"
                              type="number"
                              placeholder="0"
                              min={0}
                              max={productPriceLimit}
                              value={priceRange[0]}
                              onChange={(e) => handlePriceMinChange(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="mobile-price-max">Max</Label>
                            <Input
                              id="mobile-price-max"
                              type="number"
                              placeholder={productPriceLimit.toString()}
                              min={0}
                              max={productPriceLimit}
                              value={priceRange[1]}
                              onChange={(e) => handlePriceMaxChange(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="font-quicksand font-bold text-sweet-darkPurple text-lg mb-4">
                  Filters
                </h2>
                
                <Accordion type="single" collapsible defaultValue="categories">
                  {/* Categories */}
                  <AccordionItem value="categories">
                    <AccordionTrigger className="font-poppins font-medium">
                      Categories
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={(checked) => 
                                handleCategoryChange(category.id, checked === true)
                              }
                            />
                            <Label
                              htmlFor={`category-${category.id}`}
                              className="ml-2 font-poppins text-gray-700"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Price Range */}
                  <AccordionItem value="price">
                    <AccordionTrigger className="font-poppins font-medium">
                      Price Range
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div>
                          <Label htmlFor="price-min">Min Price ($)</Label>
                          <Input
                            id="price-min"
                            type="number"
                            placeholder="0"
                            min={0}
                            max={productPriceLimit}
                            value={priceRange[0]}
                            onChange={(e) => handlePriceMinChange(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="price-max">Max Price ($)</Label>
                          <Input
                            id="price-max"
                            type="number"
                            placeholder={productPriceLimit.toString()}
                            min={0}
                            max={productPriceLimit}
                            value={priceRange[1]}
                            onChange={(e) => handlePriceMaxChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Reset Filters */}
                <Button
                  variant="outline"
                  className="w-full mt-6 border-gray-300 text-gray-700"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategories(['all']);
                    setPriceRange([0, productPriceLimit]);
                    setSortOption('featured');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <h3 className="text-xl font-quicksand font-bold text-sweet-darkPurple mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No products match your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategories(['all']);
                      setPriceRange([0, productPriceLimit]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
