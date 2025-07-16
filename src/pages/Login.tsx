import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Utensils, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LocationState {
  message?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.message) {
      setSuccess(state.message);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setShowResendVerification(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        setError('Please verify your email address before logging in.');
        setShowResendVerification(true);
        return;
      }

      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        default:
          setError('Failed to log in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!email) {
        throw new Error('Please enter your email address');
      }

      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent. Please check your inbox.');
      setShowResetPassword(false);
    } catch (error: any) {
      console.error('Password reset error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setSuccess('Verification email sent. Please check your inbox.');
      await auth.signOut();
    } catch (error: any) {
      console.error('Resend verification error:', error);
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-red-600 p-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Take & Eat</h1>
              <p className="text-red-100">Share food, reduce waste, help others</p>
            </div>

            <div className="p-8">
              {success && (
                <div className="flex items-center bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>{success}</p>
                </div>
              )}
              
              {error && (
                <div className="flex items-center bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <div>
                    <p>{error}</p>
                    {showResendVerification && (
                      <button
                        onClick={handleResendVerification}
                        className="mt-2 text-red-700 underline hover:no-underline"
                      >
                        Resend verification email
                      </button>
                    )}
                  </div>
                </div>
              )}

              {showResetPassword ? (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowResetPassword(false)}
                    className="w-full text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    Back to Login
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </form>
              )}

              <div className="mt-6 space-y-4">
                <p className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-red-600 hover:text-red-800 font-medium">
                    Register
                  </Link>
                </p>
                {!showResetPassword && (
                  <button
                    onClick={() => setShowResetPassword(true)}
                    className="w-full text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}