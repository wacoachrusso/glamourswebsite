import { FC, useState } from 'react';
import ImageModal from './ImageModal';
import { IMAGES } from '../config/images';
import { Sparkles } from 'lucide-react';

const FeaturedStyles: FC = () => {
  const [selectedImage, setSelectedImage] = useState<{url: string; alt: string} | null>(null);

  const featuredStyles = [
    {
      id: 1,
      name: "Elegant Hair Styling",
      description: "Professional cuts and styling for all occasions",
      image: IMAGES.services.hairCuts.women,
      alt: "Professional women's haircut",
      category: "Signature Style"
    },
    {
      id: 2,
      name: "Special Occasions",
      description: "Beautiful styles for your special moments",
      image: IMAGES.services.specialOccasions.main,
      alt: "Special occasion hairstyle",
      category: "Premium Service"
    },
    {
      id: 3,
      name: "Creative Braiding",
      description: "Intricate braiding patterns with modern edge",
      image: IMAGES.services.braids.style2,
      alt: "Creative braiding design",
      category: "Artistic Design"
    },
    {
      id: 4,
      name: "Balayage & Color",
      description: "Expert color treatments and balayage",
      image: IMAGES.services.balayage.main,
      alt: "Professional balayage",
      category: "Color Expert"
    }
  ];

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-glamour-light via-white to-glamour-light/30 -z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glamour-gold/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredStyles.map((style) => (
          <div 
            key={style.id} 
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-xl"
            onClick={() => setSelectedImage({ url: style.image, alt: style.alt })}
          >
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                <Sparkles className="w-4 h-4 text-glamour-gold mr-1" />
                <span className="text-xs font-semibold text-glamour-dark">{style.category}</span>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={style.image}
                alt={style.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-glamour-dark mb-2 group-hover:text-glamour-gold transition-colors">
                  {style.name}
                </h3>
                <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {style.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default FeaturedStyles;