import React, { useState, useEffect } from 'react';
import { Users, MapPin, Phone, Globe, Clock, Heart, HandHeart, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { countries } from '../lib/countries';

const allCenters = [
  {
    name: "Unity Community Center",
    country: "United States",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "A vibrant community hub providing food assistance, educational programs, and social services to local residents.",
    address: "321 Unity Street, Downtown",
    phone: "(555) 234-5678",
    website: "https://unitycommunitycenter.org",
    hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-5PM",
    programs: [
      "Food pantry services",
      "Community kitchen",
      "Nutrition education",
      "Senior meal program"
    ]
  },
  {
    name: "Neighborhood Resource Hub",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive resource center offering food assistance alongside employment, housing, and social services.",
    address: "567 Hope Avenue, Westside",
    phone: "(555) 345-6789",
    website: "https://resourcehub.org",
    hours: "Mon-Sat: 9AM-7PM",
    programs: [
      "Emergency food assistance",
      "Job training program",
      "Youth mentoring",
      "Family support services"
    ]
  },
  {
    name: "Eastside Family Center",
    country: "France",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Family-focused center providing comprehensive support services including food assistance and childcare.",
    address: "890 Family Way, Eastside",
    phone: "(555) 456-7890",
    website: "https://eastsidefamily.org",
    hours: "Mon-Fri: 7AM-6PM",
    programs: [
      "Family food program",
      "After-school meals",
      "Parent support groups",
      "Holiday food drives"
    ]
  }
];

export default function CommunityCenters() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredCenters, setFilteredCenters] = useState(allCenters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setFilteredCenters(allCenters.filter(center => center.country === selectedCountry));
    } else {
      setFilteredCenters(allCenters);
    }
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <Home className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Community Centers
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Working with local centers to distribute food and support our communities
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

      {/* Centers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredCenters.length === 0 ? (
            <div className="text-center py-12">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No community centers found in this country.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filteredCenters.map((center, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={center.image}
                        alt={center.name}
                        className="w-full h-full object-cover"
                        style={{ minHeight: '300px' }}
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{center.name}</h2>
                      <p className="text-gray-600 mb-6">{center.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{center.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{center.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-red-500 mr-2" />
                          <a
                            href={center.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-600"
                          >
                            Visit Website
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{center.hours}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2">Programs & Services:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {center.programs.map((program, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <HandHeart className="w-4 h-4 text-red-500 mr-2" />
                            {program}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-xl text-gray-600">Together we're building stronger communities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">15+</h3>
              <p className="text-gray-600">Partner Centers</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">20,000+</h3>
              <p className="text-gray-600">People Served</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <HandHeart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">40+</h3>
              <p className="text-gray-600">Programs Offered</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}