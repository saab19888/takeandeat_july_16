import React from 'react';
import { Shield, Clock, ThermometerSun, Refrigerator, Trash2, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FoodSafety() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Food Safety Guidelines
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ensuring safe food handling and distribution in our community
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Temperature Control */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <ThermometerSun className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Temperature Control</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• Keep hot foods at 60°C (140°F) or above</li>
              <li>• Keep cold foods at 4°C (40°F) or below</li>
              <li>• Never leave perishable food at room temperature for more than 2 hours</li>
              <li>• Use insulated containers for transportation</li>
            </ul>
          </div>

          {/* Storage Guidelines */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Refrigerator className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Storage Guidelines</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• Store raw meat on the bottom shelf</li>
              <li>• Keep different types of food separate</li>
              <li>• Use airtight containers for storage</li>
              <li>• Label all items with dates</li>
            </ul>
          </div>

          {/* Time Management */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Clock className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Time Management</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• Follow "first in, first out" principle</li>
              <li>• Check expiration dates regularly</li>
              <li>• Plan distribution within safe timeframes</li>
              <li>• Monitor food quality throughout storage</li>
            </ul>
          </div>

          {/* Food Disposal */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Trash2 className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Safe Food Disposal</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• Dispose of expired or spoiled food immediately</li>
              <li>• Use designated waste bins</li>
              <li>• Follow local disposal regulations</li>
              <li>• Document disposed items</li>
            </ul>
          </div>

          {/* Warning Signs */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Warning Signs</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>Do not accept or distribute food if you notice:</p>
              <ul className="space-y-2 ml-4">
                <li>• Unusual odors</li>
                <li>• Mold or discoloration</li>
                <li>• Damaged packaging</li>
                <li>• Temperature abuse signs</li>
                <li>• Past expiration dates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}