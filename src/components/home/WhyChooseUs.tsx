import React from 'react';
import { Sparkles, Heart, Calendar, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Star,
      title: 'Expert Stylists',
      description: 'Our team of certified professionals brings years of experience',
      link: '/team'
    },
    {
      icon: Sparkles,
      title: 'Premium Products',
      description: 'We use only the highest quality beauty products',
      link: '/products'
    },
    {
      icon: Award,
      title: 'Satisfaction Guaranteed',
      description: 'Your happiness is our priority',
      link: '/services'
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Customized treatments for your unique style',
      link: '/services'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Easy online booking and convenient hours',
      link: '/booking'
    },
    {
      icon: Heart,
      title: 'Client Care',
      description: 'Dedicated to your comfort and satisfaction',
      link: '/about'
    }
  ];

  return (
    <section className="py-16 bg-white rounded-2xl shadow-glamour">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-glamour-dark mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our premium services and dedicated team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="group p-6 bg-gradient-to-br from-white to-glamour-light rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-gradient-to-br from-glamour-gold to-glamour-pink rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-glamour-dark mb-2 group-hover:text-glamour-gold transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;