import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Heart } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'verify'>('details');
  const [tempUserData, setTempUserData] = useState<any>(null);

  const validateEmail = async (email: string) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length === 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleInitialRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password || !fullName || !phoneNumber) {
        throw new Error('Please fill in all fields');
      }

      // Check if email is available
      const isEmailAvailable = await validateEmail(email);
      if (!isEmailAvailable) {
        setError('This email is already registered. Please use a different email or try logging in.');
        return;
      }

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send verification email
      await sendEmailVerification(userCredential.user);

      // Create user profile in Firestore immediately after user creation
      await setDoc(doc(db, 'profiles', userCredential.user.uid), {
        email,
        fullName,
        phoneNumber,
        createdAt: new Date().toISOString(),
        emailVerified: false
      });

      // Store temporary data
      setTempUserData({
        user: userCredential.user
      });

      // Move to verification step
      setStep('verify');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Registration failed. Please try again.');
      }

      // Clean up if error occurs
      if (tempUserData?.user) {
        try {
          await tempUserData.user.delete();
        } catch (deleteError) {
          console.error('Error deleting incomplete user:', deleteError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      // Sign out the user so they can sign in after verification
      await auth.signOut();

      // Navigate to login with success message
      navigate('/login', {
        state: {
          message: 'Registration successful! Please check your email to verify your account before logging in.'
        },
        replace: true
      });
    } catch (error: any) {
      console.error('Error during sign out:', error);
      setError('Failed to complete registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-red-500" />
          <h1 className="text-2xl font-bold ml-2">Take & Eat</h1>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {step === 'details' ? (
          <form onSubmit={handleInitialRegistration} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                disabled={loading}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(''); // Clear error when email changes
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                disabled={loading}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                minLength={6}
                disabled={loading}
                placeholder="Enter your password"
              />
              <p className="mt-1 text-sm text-gray-500">
                Password must be at least 6 characters long
              </p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                disabled={loading}
                placeholder="+1234567890"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter your phone number with country code
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 disabled:bg-red-300"
            >
              {loading ? 'Sending Verification...' : 'Register'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
              A verification link has been sent to your email address. Please check your email and click the verification link to complete your registration.
            </div>

            <button
              onClick={handleVerifyEmail}
              disabled={loading}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 disabled:bg-red-300"
            >
              {loading ? 'Completing Registration...' : 'Continue to Login'}
            </button>
          </div>
        )}
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:text-red-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}