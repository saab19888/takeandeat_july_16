import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Heart, Pencil, Trash2, MapPin, Phone, Calendar, Package } from 'lucide-react';
import { countries, countryToCities } from '../lib/countries';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { format } from 'date-fns';
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
  isTaken: boolean;
  createdAt: string;
}

export default function GiveFood() {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [foodType, setFoodType] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [myListings, setMyListings] = useState<FoodListing[]>([]);
  const [editingListing, setEditingListing] = useState<FoodListing | null>(null);
  const [showForm, setShowForm] = useState(true);

  // Get available cities based on selected country
  const availableCities = country ? countryToCities[country] : [];

  // Reset city when country changes
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
    setCity('');
  };

  const validatePhone = (phoneNumber: string): boolean => {
    try {
      const formattedNumber = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `+${phoneNumber}`;
      
      return isValidPhoneNumber(formattedNumber);
    } catch (error) {
      return false;
    }
  };

  // Fetch user's listings
  const fetchMyListings = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, 'givefood'),
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      const listings: FoodListing[] = [];
      querySnapshot.forEach((doc) => {
        listings.push({ id: doc.id, ...doc.data() } as FoodListing);
      });

      setMyListings(listings.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Failed to fetch your listings');
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const resetForm = () => {
    setCountry('');
    setCity('');
    setAddress('');
    setFoodType('');
    setAvailableDate('');
    setQuantity('');
    setPhone('');
    setEditingListing(null);
    setError('');
  };

  const handleEdit = (listing: FoodListing) => {
    setEditingListing(listing);
    setCountry(listing.country);
    setCity(listing.city);
    setAddress(listing.address);
    setFoodType(listing.foodType);
    setAvailableDate(listing.availableDate);
    setQuantity(listing.quantity.toString());
    setPhone(listing.phone);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (listingId: string) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await deleteDoc(doc(db, 'givefood', listingId));
      await fetchMyListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      setError('Failed to delete listing');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      if (!validatePhone(phone)) {
        throw new Error('Please enter a valid phone number with country code (e.g., +1234567890)');
      }

      const data = {
        userId: user.uid,
        country,
        city,
        address,
        foodType,
        availableDate,
        quantity: parseInt(quantity, 10),
        phone,
        isTaken: false,
        ...(editingListing ? {} : { createdAt: new Date().toISOString() })
      };

      if (editingListing) {
        await updateDoc(doc(db, 'givefood', editingListing.id), data);
      } else {
        await addDoc(collection(db, 'givefood'), data);
      }

      resetForm();
      await fetchMyListings();
      setShowForm(false);
    } catch (error: any) {
      console.error('Error saving food data:', error);
      setError(error.message || 'Failed to save food data. Please try again.');
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
              Share Your Food
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Help reduce food waste and support your community by sharing surplus food with those in need.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition duration-200"
            >
              {showForm ? 'View My Listings' : 'Add New Listing'}
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {showForm ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingListing ? 'Edit Food Listing' : 'Create Food Listing'}
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                  required
                  placeholder="Enter the pickup address"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Type of Food
                </label>
                <input
                  type="text"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  placeholder="e.g., Fresh vegetables, Cooked meals, Canned goods"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Available Date
                  </label>
                  <input
                    type="date"
                    value={availableDate}
                    onChange={(e) => setAvailableDate(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    min="1"
                    placeholder="Number of items or portions"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  placeholder="+1234567890"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Include country code (e.g., +1234567890)
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-200 disabled:bg-red-300"
                >
                  {loading ? 'Saving...' : (editingListing ? 'Update Listing' : 'Create Listing')}
                </button>
                {editingListing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Food Listings</h2>
            
            {myListings.length === 0 ? (
              <div className="text-center bg-white rounded-lg shadow-lg p-8">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">You haven't shared any food yet.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 text-red-500 hover:text-red-600"
                >
                  Create your first listing
                </button>
              </div>
            ) : (
              myListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {listing.foodType}
                      </h3>
                      <div className="space-y-2 text-gray-600">
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(listing)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}