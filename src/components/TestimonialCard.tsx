import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  image: string;
  text: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, image, text, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <div className="flex">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">{text}</p>
    </div>
  );
};

export default TestimonialCard;