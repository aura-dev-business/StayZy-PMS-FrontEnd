import React from 'react';
import { Search, Home, Newspaper } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-800 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Buy a New Home",
      description: "Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignisim purus."
    },
    {
      icon: <Home className="w-8 h-8 text-white" />,
      title: "Sell a House",
      description: "Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignisim purus."
    },
    {
      icon: <Newspaper className="w-8 h-8 text-white" />,
      title: "Rent a House",
      description: "Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignisim purus."
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            OUR SERVICES
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Your one-stop platform for seamless booking, hosting, and guest experiences
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;