import { FC } from 'react';
import { IMAGES } from '../config/images';

const AboutUs: FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-glamour-dark mb-6">About Glamour's Beauty Salon</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Where Beauty Meets Excellence in Newark's Ironbound
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="bg-white rounded-2xl shadow-glamour overflow-hidden">
          <img 
            src={IMAGES.services.balayage.main}
            alt="Glamour's Beauty Salon Interior" 
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-glamour-dark mb-6">
            Meet Angie Padilla
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>With over 22 years of professional experience, Angelica "Angie" Padilla has dedicated her life to the art of hairstyling. A graduate of New Horizon in West New York, she further enhanced her expertise through specialized courses in hair coloring at Alfapart and Salerm.</p>
            <p>Angie's passion for hair styling began in childhood, where she found joy in styling her family members' and dolls' hair. This early enthusiasm blossomed into a successful career spanning over two decades. Her dedication to education led her to earn a degree in teaching total image from Thomas Edison State University, complementing her extensive styling experience.</p>
            <p>Today, Glamour's Beauty Salon stands as a testament to Angie's commitment to excellence, having served the Newark community for over 20 years. Her expertise in updos and comprehensive styling services ensures that every client receives exceptional care and leaves feeling their absolute best.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;