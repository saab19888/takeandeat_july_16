import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, MapPin, Phone, Globe, Clock, Award, Leaf, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { countries } from '../lib/countries';

const allRestaurants = [
  {
    name: "Fresh Harvest Kitchen",
    country: "United States",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "A farm-to-table restaurant committed to reducing food waste through innovative cooking techniques and community partnerships.",
    address: "789 Market Street, Downtown",
    phone: "(555) 987-6543",
    website: "https://freshharvestkitchen.com",
    hours: "Tue-Sun: 11AM-10PM",
    initiatives: [
      "Daily food donation program",
      "Composting program",
      "Local farmer partnerships",
      "Zero-waste cooking practices"
    ]
  },
  {
    name: "Green Table Bistro",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Sustainable dining establishment focused on organic ingredients and minimal environmental impact.",
    address: "456 Garden Avenue, Westside",
    phone: "(555) 876-5432",
    website: "https://greentablebistro.com",
    hours: "Mon-Sat: 10AM-9PM",
    initiatives: [
      "Weekly surplus food sharing",
      "Sustainable packaging",
      "Community education programs",
      "Food waste tracking system"
    ]
  },
  {
    name: "Community Kitchen Collective",
    country: "France",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "A cooperative restaurant supporting local food initiatives and providing meals to those in need.",
    address: "123 Unity Way, Eastside",
    phone: "(555) 765-4321",
    website: "https://kitchencollective.org",
    hours: "Wed-Sun: 12PM-8PM",
    initiatives: [
      "Pay-what-you-can meals",
      "Food recovery program",
      "Cooking workshops",
      "Community meal sharing"
    ]
  }
];

export default function Restaurants() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setFilteredRestaurants(allRestaurants.filter(restaurant => restaurant.country === selectedCountry));
    } else {
      setFilteredRestaurants(allRestaurants);
    }
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <UtensilsCrossed className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Restaurant Partners
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Collaborating with restaurants to reduce food waste and support our community
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

      {/* Restaurants Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <UtensilsCrossed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No restaurants found in this country.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filteredRestaurants.map((restaurant, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                        style={{ minHeight: '300px' }}
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{restaurant.name}</h2>
                      <p className="text-gray-600 mb-6">{restaurant.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{restaurant.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{restaurant.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-red-500 mr-2" />
                          <a
                            href={restaurant.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-600"
                          >
                            Visit Website
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{restaurant.hours}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2">Sustainability Initiatives:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {restaurant.initiatives.map((initiative, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <Leaf className="w-4 h-4 text-red-500 mr-2" />
                            {initiative}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Making a Difference Together</h2>
            <p className="text-xl text-gray-600">Our restaurant partners help us create sustainable change</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Award className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">30+</h3>
              <p className="text-gray-600">Partner Restaurants</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Leaf className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">5,000 lbs</h3>
              <p className="text-gray-600">Food Saved Monthly</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">10,000+</h3>
              <p className="text-gray-600">Meals Shared</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}