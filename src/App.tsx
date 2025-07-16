import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import PhoneAuth from './pages/PhoneAuth';
import Dashboard from './pages/Dashboard';
import GiveFood from './pages/GiveFood';
import TakeFood from './pages/TakeFood';
import ResourceDetails from './pages/ResourceDetails';
import FoodSafety from './pages/FoodSafety';
import CommunityGuidelines from './pages/CommunityGuidelines';
import FAQ from './pages/FAQ';
import ContactSupport from './pages/ContactSupport';
import LocalFoodBanks from './pages/LocalFoodBanks';
import Restaurants from './pages/Restaurants';
import CommunityCenters from './pages/CommunityCenters';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/phone-auth" element={<PhoneAuth />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/resource/:id" element={<ResourceDetails />} />
      <Route path="/food-safety" element={<FoodSafety />} />
      <Route path="/community-guidelines" element={<CommunityGuidelines />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact-support" element={<ContactSupport />} />
      <Route path="/local-food-banks" element={<LocalFoodBanks />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/community-centers" element={<CommunityCenters />} />
      <Route
        path="/give-food"
        element={
          <PrivateRoute>
            <GiveFood />
          </PrivateRoute>
        }
      />
      <Route
        path="/take-food"
        element={
          <PrivateRoute>
            <TakeFood />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;