import { FC, useState } from 'react';
import ImageModal from './ImageModal';
import { Star, Award } from 'lucide-react';

const MeetTheTeam: FC = () => {
  const [selectedImage, setSelectedImage] = useState<{url: string; alt: string} | null>(null);

  const stylists = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Master Stylist',
      specialties: ['Color Specialist', 'Precision Cuts', 'Wedding Styles'],
      image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=80',
      experience: '12'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Stylist',
      specialties: ['Asian Hair Specialist', 'Creative Color', 'Men\'s Styling'],
      image: 'https://images.unsplash.com/photo-1612257460810-e4f31e98d88d?auto=format&fit=crop&w=800&q=80',
      experience: '8'
    },
    {
      id: 3,
      name: 'Isabella Rodriguez',
      role: 'Texture Specialist',
      specialties: ['Curly Hair', 'Natural Hair', 'Extensions'],
      image: 'https://images.unsplash.com/photo-1601931935821-5fbe71157695?auto=format&fit=crop&w=800&q=80',
      experience: '10'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-glamour-dark mb-4">Meet Our Expert Team</h1>
        <p className="text-xl text-gray-600">Our skilled professionals bring years of experience and passion to every service.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stylists.map((stylist) => (
          <div key={stylist.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              className="relative h-80 cursor-pointer"
              onClick={() => setSelectedImage({ url: stylist.image, alt: stylist.name })}
            >
              <img
                src={stylist.image}
                alt={stylist.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-semibold">Click to view larger image</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-glamour-dark mb-2">{stylist.name}</h3>
              <p className="text-glamour-gold font-medium mb-4">{stylist.role}</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-glamour-gold mr-2" />
                  <p className="text-gray-600">Experience: {stylist.experience} years</p>
                </div>
                <div className="flex items-start">
                  <Award className="w-5 h-5 text-glamour-gold mr-2 mt-1" />
                  <div>
                    <p className="text-gray-600">Specialties:</p>
                    <ul className="list-disc list-inside ml-4 text-gray-600">
                      {stylist.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
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
    </div>
  );
};

export default MeetTheTeam;