import { FC, useState } from 'react';
import ImageModal from './ImageModal';
import { IMAGES } from '../config/images';

const FeaturedStyles: FC = () => {
  const [selectedImage, setSelectedImage] = useState<{url: string; alt: string} | null>(null);

  const featuredStyles = [
    {
      id: 1,
      name: 'Elegant Hair Styling',
      description: 'Professional cuts and styling for all occasions',
      image: IMAGES.services.hairCuts.women,
      alt: 'Professional women\'s haircut'
    },
    {
      id: 2,
      name: 'Special Occasions',
      description: 'Beautiful styles for your special moments',
      image: IMAGES.services.specialOccasions.main,
      alt: 'Special occasion hairstyle'
    },
    {
      id: 3,
      name: 'Creative Braiding',
      description: 'Intricate braiding patterns with modern edge',
      image: IMAGES.services.braids.main,
      alt: 'Creative braiding design'
    },
    {
      id: 4,
      name: 'Balayage & Color',
      description: 'Expert color treatments and balayage',
      image: IMAGES.services.balayage.main,
      alt: 'Professional balayage'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredStyles.map((style) => (
          <div 
            key={style.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-duration-300 cursor-pointer"
            onClick={() => setSelectedImage({ url: style.image, alt: style.alt })}
          >
            <div className="relative h-80">
              <img
                src={style.image}
                alt={style.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{style.name}</h3>
                  <p className="text-sm">{style.description}</p>
                </div>
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
    </>
  );
};

export default FeaturedStyles;