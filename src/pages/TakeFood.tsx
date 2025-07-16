import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Heart, Search, MapPin, Phone, Calendar, Package } from 'lucide-react';
import { format } from 'date-fns';
import { countries, countryToCities } from '../lib/countries';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FoodListing {
  id: string;
  country: string;
  city: string;
  address: string;
  foodType: string;
  availableDate: string;
  quantity: number;
  phone: string;
  createdAt: string;
}

export default function TakeFood() {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [foodListings, setFoodListings] = useState<FoodListing[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get available cities based on selected country
  const availableCities = country ? countryToCities[country] : [];

  // Reset city when country changes
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
    setCity('');
  };

  const searchFood = async () => {
    if (!country || !city) {
      setError('Please select both country and city');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const foodRef = collection(db, 'givefood');
      const q = query(
        foodRef,
        where('country', '==', country),
        where('city', '==', city),
        where('isTaken', '==', false)
      );

      const querySnapshot = await getDocs(q);
      const listings: FoodListing[] = [];
      
      querySnapshot.forEach((doc) => {
        listings.push({ id: doc.id, ...doc.data() } as FoodListing);
      });

      setFoodListings(listings);
      
      if (listings.length === 0) {
        setError('No food listings found in this area');
      }
    } catch (error: any) {
      console.error('Error searching food:', error);
      setError('Failed to search for food listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find Available Food
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Search for available food in your area and connect with generous community members.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country
                </label>
                <select
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((countryName) => (
                    <option key={countryName} value={countryName}>
                      {countryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  required
                  disabled={!country}
                >
                  <option value="">Select a city</option>
                  {availableCities.map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={searchFood}
              disabled={loading}
              className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-200 disabled:bg-red-300 flex items-center justify-center"
            >
              {loading ? (
                'Searching...'
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search Available Food
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Results Section */}
          <div className="mt-8 space-y-6">
            {foodListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {listing.foodType}
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-red-500" />
                    Available on: {format(new Date(listing.availableDate), 'MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center">
                    <Package className="w-5 h-5 mr-2 text-red-500" />
                    Quantity: {listing.quantity}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-red-500" />
                    Contact: {listing.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-500" />
                    Location: {listing.address}, {listing.city}, {listing.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Finding food in your community is easy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Your Area</h3>
              <p className="text-gray-600">Select your location to find available food nearby</p>
            </div>
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact Provider</h3>
              <p className="text-gray-600">Get in touch with the food provider directly</p>
            </div>
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collect Food</h3>
              <p className="text-gray-600">Pick up the food at the specified location</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}