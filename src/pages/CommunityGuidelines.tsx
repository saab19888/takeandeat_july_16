import React from 'react';
import { Users, Heart, MessageCircle, ShieldCheck, Scale, HandHeart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CommunityGuidelines() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <Users className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Community Guidelines
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Building a safe and supportive food sharing community together
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Core Values */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Core Values</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• Respect for all community members</li>
              <li>• Commitment to reducing food waste</li>
              <li>• Support for those in need</li>
              <li>• Transparency in all interactions</li>
            </ul>
          </div>

          {/* Communication */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Communication</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• Be clear and honest in your listings</li>
              <li>• Respond to messages promptly</li>
              <li>• Use respectful language</li>
              <li>• Report any concerns to moderators</li>
            </ul>
          </div>

          {/* Safety & Trust */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <ShieldCheck className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Safety & Trust</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• Verify your identity</li>
              <li>• Meet in safe, public locations</li>
              <li>• Follow food safety guidelines</li>
              <li>• Report suspicious behavior</li>
            </ul>
          </div>

          {/* Fair Practices */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Scale className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Fair Practices</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• First come, first served basis</li>
              <li>• No reselling of donated food</li>
              <li>• Equal opportunity for all members</li>
              <li>• Transparent distribution process</li>
            </ul>
          </div>

          {/* Giving Guidelines */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <HandHeart className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Giving Guidelines</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>• Only share food that you would eat yourself</li>
              <li>• Provide accurate descriptions</li>
              <li>• Include allergen information</li>
              <li>• Be reliable with pickup times</li>
              <li>• Package food safely</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}