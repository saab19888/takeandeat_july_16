import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Utensils, Facebook, Twitter, Instagram, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      const sectionId = path.substring(1);
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: sectionId } });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Add to newsletter collection
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email,
        subscribedAt: new Date().toISOString(),
        status: 'active'
      });

      setSuccess('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setError(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Utensils className="w-8 h-8 text-red-500" />
              <span className="ml-2 text-xl font-bold">Take & Eat</span>
            </div>
            <p className="text-gray-400">
              Connecting communities through food sharing and reducing waste while helping those in need.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('#how-it-works')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#about')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#impact')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Our Impact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/local-food-banks')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Local Food Banks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/restaurants')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Restaurants
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/community-centers')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Community Centers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation('/food-safety')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Food Safety Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/community-guidelines')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Community Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/faq')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/contact-support')}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label htmlFor="newsletter" className="block text-sm font-medium text-gray-300 mb-2">
                  Subscribe to our newsletter
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="newsletter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-400 disabled:text-gray-500"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {success && (
                <div className="flex items-center text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {success}
                </div>
              )}

              {error && (
                <div className="flex items-center text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Take & Eat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}