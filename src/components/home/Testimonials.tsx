
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    role: "Dessert Enthusiast",
    content: "The chocolate cake was absolutely divine! It was moist, rich, and perfectly balanced. Every bite was a heavenly experience. Will definitely be ordering again!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    role: "Birthday Celebration",
    content: "I ordered cupcakes for my daughter's birthday and they were a huge hit! Everyone loved them and they looked exactly as pictured. Great taste and beautiful presentation.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    role: "Regular Customer",
    content: "I've been ordering from Sweet Shop Delights for all my special occasions. Their pastries are consistently excellent, and the delivery is always prompt. Highly recommended!",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-sweet-purple bg-opacity-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-quicksand font-bold text-sweet-darkPurple">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-poppins">
            We take pride in delivering delicious treats and exceptional experiences to our valued customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              
              {/* Testimonial content */}
              <p className="text-gray-700 mb-6 font-poppins">
                "{testimonial.content}"
              </p>
              
              {/* Customer info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-poppins font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
