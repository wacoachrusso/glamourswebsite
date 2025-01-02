import React from 'react';

const Services: React.FC = () => {
  const serviceCategories = [
    {
      title: 'Hair Styling',
      services: [
        { name: "Women's Wash & Cut", price: "$35.00 & up" },
        { name: "Men's Hair Cut", price: "Call for pricing" },
        { name: "Children's Hair Cut", price: "Call for pricing" },
        { name: "Blow Dry", price: "Call for pricing" },
        { name: "Up Dos for Special Occasions", price: "Call for pricing" },
        { name: "Braids", price: "Call for pricing" },
        { name: "Hair Extensions", price: "Call for pricing" }
      ]
    },
    {
      title: 'Color Services',
      services: [
        { name: "Shadow Roots", price: "Call for pricing" },
        { name: "Single Process", price: "Call for pricing" },
        { name: "Full Color Long", price: "Call for pricing" },
        { name: "Full Color Short", price: "Call for pricing" },
        { name: "Roots Touch Up", price: "Call for pricing" },
        { name: "Lowlights", price: "Call for pricing" },
        { name: "Toners / Glaze", price: "Call for pricing" },
        { name: "Face Frame (Money Piece)", price: "Call for pricing" },
        { name: "Face Frame Sides Foils", price: "Call for pricing" },
        { name: "Color Correction", price: "$200 & up" }
      ]
    },
    {
      title: 'Hair Treatments',
      services: [
        { name: "Keratine Treatment", price: "Call for pricing" },
        { name: "Perms", price: "Call for pricing" },
        { name: "Hair Botox", price: "Call for pricing" },
        { name: "Brazilian Blow Out", price: "Call for pricing" }
      ]
    },
    {
      title: 'Nail Services',
      services: [
        { name: "Manicure", price: "Call for pricing" },
        { name: "Pedicure", price: "Call for pricing" },
        { name: "Manicure in Gel", price: "Call for pricing" },
        { name: "Acrylic Nails", price: "Call for pricing" }
      ]
    },
    {
      title: 'Beauty Services',
      services: [
        { name: "Facials", price: "Call for pricing" },
        { name: "Make Up", price: "Call for pricing" },
        { name: "Waxing", price: "Call for pricing" },
        { name: "Lashes", price: "Call for pricing" }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-glamour-dark mb-6">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience excellence with our comprehensive range of beauty services.
          Consultations are suggested for many services to ensure the best results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-glamour-gold mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.services.map((service, serviceIndex) => (
                  <div 
                    key={serviceIndex}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <span className="text-gray-800">{service.name}</span>
                    <span className="text-glamour-dark font-medium">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-glamour-light rounded-lg text-center">
        <p className="text-gray-600">
          Prices may vary based on hair length, thickness, and service complexity.
          Please call <a href="tel:9733445199" className="text-glamour-gold hover:underline">(973) 344-5199</a> for accurate pricing and to schedule a consultation.
        </p>
      </div>
    </div>
  );
};

export default Services;