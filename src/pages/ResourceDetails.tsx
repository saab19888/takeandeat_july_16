import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Globe, ExternalLink, Phone, MapPin, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ResourceDetailsProps {
  id: string;
  country: string;
  title: string;
  image: string;
  summary: string;
  content: string;
  contactInfo: {
    website: string;
    phone: string;
    locations: string[];
  };
}

const foodAidPosts: Record<string, ResourceDetailsProps> = {
  france: {
    id: 'france',
    country: 'France',
    title: 'Free Food Resources in France',
    image: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    summary: 'Discover organizations providing free meals and food assistance across France',
    content: `
      France has a robust network of food aid organizations helping those in need. Here are some key resources:

      Les Restos du Cœur is one of France's largest food aid organizations, serving millions of meals annually. They operate in major cities including Paris, Lyon, and Marseille, providing:
      - Hot meals
      - Food packages
      - Mobile food distribution
      - Special assistance for families with children

      The Banque Alimentaire network collects and distributes food through local associations. They work with:
      - Local grocery stores
      - Farmers
      - Food industry partners
      
      Food aid locations can be found in every major French city, with concentrated efforts in:
      - Paris: Multiple locations in each arrondissement
      - Lyon: Central distribution center and mobile units
      - Marseille: Coastal area coverage
      - Toulouse: Network of neighborhood centers
    `,
    contactInfo: {
      website: 'https://www.restosducoeur.org',
      phone: '+33 1 53 32 23 23',
      locations: ['Paris', 'Lyon', 'Marseille', 'Toulouse']
    }
  },
  lebanon: {
    id: 'lebanon',
    country: 'Lebanon',
    title: 'Food Assistance Programs in Lebanon',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    summary: 'Essential food aid resources and distribution centers in Lebanon',
    content: `
      Lebanon's food assistance network provides critical support through various organizations:

      The Lebanese Food Bank leads efforts in:
      - Emergency food distribution
      - Regular food package delivery
      - Support for local soup kitchens
      - Coordination with international aid organizations

      Key programs include:
      - Monthly food box distribution
      - Hot meal services
      - Special Ramadan food assistance
      - Emergency response programs

      Major distribution centers are located in:
      - Beirut: Multiple neighborhood centers
      - Tripoli: Central distribution hub
      - Sidon: Coastal region support
      - Bekaa Valley: Rural assistance network
    `,
    contactInfo: {
      website: 'https://lebanesefoodbank.org',
      phone: '+961 1 613 520',
      locations: ['Beirut', 'Tripoli', 'Sidon']
    }
  },
  syria: {
    id: 'syria',
    country: 'Syria',
    title: 'Emergency Food Aid in Syria',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    summary: 'Critical food assistance and emergency aid locations throughout Syria',
    content: `
      Emergency food assistance in Syria is coordinated through several humanitarian organizations:

      The Syrian Arab Red Crescent provides:
      - Emergency food distribution
      - Nutrition programs
      - Clean water access
      - Medical assistance alongside food aid

      Key services include:
      - Daily bread distribution
      - Monthly food baskets
      - Special assistance for children
      - Emergency response units

      Main distribution centers operate in:
      - Damascus: Multiple emergency centers
      - Aleppo: Humanitarian aid hubs
      - Homs: Central distribution points
      - Rural areas: Mobile distribution units
    `,
    contactInfo: {
      website: 'https://sarc.sy',
      phone: '+963 11 332 7691',
      locations: ['Damascus', 'Aleppo', 'Homs']
    }
  }
};

export default function ResourceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const resource = id ? foodAidPosts[id] : null;

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Resource not found</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-red-600 hover:text-red-800"
          >
            Return to home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[400px]">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6 max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{resource.title}</h1>
              <p className="text-xl md:text-2xl">{resource.summary}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-red-600 hover:text-red-800 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Resources
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose max-w-none mb-8">
              {resource.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 text-red-500 mr-3" />
                  <a
                    href={resource.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-800 flex items-center"
                  >
                    Visit Official Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-red-500 mr-3" />
                  <span>{resource.contactInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-red-500 mr-3" />
                  <span>{resource.contactInfo.locations.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}