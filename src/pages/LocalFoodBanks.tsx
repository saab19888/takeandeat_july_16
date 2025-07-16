import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Globe, Clock, Users, Scale, Truck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { countries } from '../lib/countries';

const allFoodBanks = [
  {
    name: "City Central Food Bank",
    country: "United States",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Serving the community for over 20 years with emergency food assistance and nutrition education programs.",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    website: "https://cityfoodbank.org",
    hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
    services: [
      "Emergency food boxes",
      "Fresh produce distribution",
      "Senior food program",
      "Children's weekend meal program"
    ]
  },
  {
    name: "Neighborhood Food Pantry",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "A community-driven food pantry focused on providing fresh, nutritious food to local families in need.",
    address: "456 Park Avenue, Westside",
    phone: "(555) 234-5678",
    website: "https://neighborhoodpantry.org",
    hours: "Tue-Sat: 10AM-6PM",
    services: [
      "Weekly food distribution",
      "Home delivery for seniors",
      "Nutrition workshops",
      "Community garden program"
    ]
  },
  {
    name: "Regional Food Distribution Center",
    country: "France",
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Large-scale food distribution center supporting multiple counties with comprehensive food assistance programs.",
    address: "789 Industrial Way, Eastside",
    phone: "(555) 345-6789",
    website: "https://regionalfoodcenter.org",
    hours: "Mon-Sat: 8AM-7PM",
    services: [
      "Bulk food distribution",
      "Agency partner support",
      "Mobile food pantry",
      "Disaster relief assistance"
    ]
  }
];

export default function LocalFoodBanks() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredBanks, setFilteredBanks] = useState(allFoodBanks);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setFilteredBanks(allFoodBanks.filter(bank => bank.country === selectedCountry));
    } else {
      setFilteredBanks(allFoodBanks);
    }
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <Building2 className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Local Food Banks
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Partnering with food banks to maximize our impact and ensure food reaches those who need it most
            </p>

            {/* Country Selection */}
            <div className="max-w-xs mx-auto">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Food Banks Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredBanks.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No food banks found in this country.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filteredBanks.map((bank, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={bank.image}
                        alt={bank.name}
                        className="w-full h-full object-cover"
                        style={{ minHeight: '300px' }}
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{bank.name}</h2>
                      <p className="text-gray-600 mb-6">{bank.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{bank.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{bank.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-red-500 mr-2" />
                          <a
                            href={bank.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-600"
                          >
                            Visit Website
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{bank.hours}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2">Services Offered:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {bank.services.map((service, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <Scale className="w-4 h-4 text-red-500 mr-2" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact Together</h2>
            <p className="text-xl text-gray-600">Working with food banks to create lasting change</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">50,000+</h3>
              <p className="text-gray-600">People Served Monthly</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Truck className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">100,000 lbs</h3>
              <p className="text-gray-600">Food Distributed Weekly</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Scale className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">25+</h3>
              <p className="text-gray-600">Partner Organizations</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}