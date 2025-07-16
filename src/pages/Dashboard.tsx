import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Utensils, Globe, ExternalLink, ChevronDown, Users, BarChart, ArrowRight, Award, Clock, Shield, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { countries } from '../lib/countries';

const foodAidPosts = [
  {
    id: 'france',
    country: 'France',
    title: 'Free Food Resources in France',
    image: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    summary: 'Discover organizations providing free meals and food assistance across France',
    contactInfo: {
      website: 'https://www.restosducoeur.org',
      phone: '+33 1 53 32 23 23',
      locations: ['Paris', 'Lyon', 'Marseille', 'Toulouse']
    }
  },
  {
    id: 'lebanon',
    country: 'Lebanon',
    title: 'Food Assistance Programs in Lebanon',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    summary: 'Essential food aid resources and distribution centers in Lebanon',
    contactInfo: {
      website: 'https://lebanesefoodbank.org',
      phone: '+961 1 613 520',
      locations: ['Beirut', 'Tripoli', 'Sidon']
    }
  },
  {
    id: 'syria',
    country: 'Syria',
    title: 'Emergency Food Aid in Syria',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    summary: 'Critical food assistance and emergency aid locations throughout Syria',
    contactInfo: {
      website: 'https://sarc.sy',
      phone: '+963 11 332 7691',
      locations: ['Damascus', 'Aleppo', 'Homs']
    }
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('');

  const filteredPosts = selectedCountry
    ? foodAidPosts.filter(post => post.country === selectedCountry)
    : foodAidPosts;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Food Aid Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find information about free food assistance programs and organizations across different countries.
            </p>

            {/* Country Selection Dropdown */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Available Resources</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Find food assistance programs and resources in your area
          </p>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No food aid resources found for your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.summary}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-5 h-5" />
                        <a href={post.contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                          Visit Website <ExternalLink className="inline w-4 h-4" />
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-5 h-5" />
                        <span>{post.contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{post.contactInfo.locations.join(', ')}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/resource/${post.id}`)}
                      className="mt-6 w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-2 px-4 rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      View Details
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to share or receive food assistance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up to join our community of food sharers and receivers</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find or Share Food</h3>
              <p className="text-gray-600">Browse available food or list what you can share</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
              <p className="text-gray-600">Help reduce food waste while supporting your community</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Take & Eat</h2>
              <p className="text-lg text-gray-600 mb-6">
                Take & Eat is a community-driven platform dedicated to reducing food waste and ensuring that surplus food reaches those who need it most. Our mission is to create a world where no food goes to waste while building stronger, more connected communities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-red-500 mr-3" />
                  <span className="text-gray-700">Available 24/7 for food sharing</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-red-500 mr-3" />
                  <span className="text-gray-700">Safe and verified community members</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-red-500 mr-3" />
                  <span className="text-gray-700">Award-winning food waste reduction program</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Community Food Sharing"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in communities worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-red-500 mb-2">50K+</div>
              <div className="text-lg text-gray-600">Meals Shared</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-500 mb-2">100+</div>
              <div className="text-lg text-gray-600">Cities Covered</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-500 mb-2">10K+</div>
              <div className="text-lg text-gray-600">Active Members</div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <BarChart className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our growing community continues to make a significant impact in reducing food waste and supporting those in need. Together, we're building a more sustainable and caring world.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600">Working together to make a difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button
              onClick={() => navigate('/local-food-banks')}
              className="w-full bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Local Food Banks"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Local Food Banks</h3>
              <p className="text-gray-600">Partnering with food banks to maximize our impact</p>
            </button>
            <button
              onClick={() => navigate('/restaurants')}
              className="w-full bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Restaurants"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Restaurants</h3>
              <p className="text-gray-600">Collaborating with restaurants to reduce food waste</p>
            </button>
            <button
              onClick={() => navigate('/community-centers')}
              className="w-full bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Community Centers"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Community Centers</h3>
              <p className="text-gray-600">Working with local centers to distribute food</p>
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Utensils className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want to Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our community by sharing food or supporting local food banks.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/give-food')}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-600 transition duration-200"
              >
                Share Food
              </button>
              <button
                onClick={() => navigate('/take-food')}
                className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition duration-200 border border-red-500"
              >
                Find Food
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}