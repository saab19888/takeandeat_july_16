import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Heart } from 'lucide-react';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export default function PhoneAuth() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    // Cleanup function to handle component unmount
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (error) {
          console.error('Error clearing reCAPTCHA:', error);
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  useEffect(() => {
    // Initialize reCAPTCHA only when needed and not already initialized
    if (step === 'phone' && !window.recaptchaVerifier && !recaptchaReady) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
          size: 'invisible',
          callback: () => {
            setRecaptchaReady(true);
          },
          'expired-callback': () => {
            setRecaptchaReady(false);
            setError('reCAPTCHA expired. Please try again.');
          }
        });
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
        setError('Failed to initialize security check. Please refresh the page.');
      }
    }
  }, [step]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
        throw new Error('Please enter a valid phone number');
      }

      const parsedNumber = parsePhoneNumber(phoneNumber);
      if (!parsedNumber) {
        throw new Error('Invalid phone number format');
      }

      if (!window.recaptchaVerifier) {
        throw new Error('Security check not initialized. Please refresh the page.');
      }

      const formattedNumber = parsedNumber.format('E.164');
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        window.recaptchaVerifier
      );
      
      window.confirmationResult = confirmationResult;
      setStep('code');
    } catch (error: any) {
      console.error('Phone verification error:', error);
      setError(error.message || 'Failed to send verification code');
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
          setRecaptchaReady(false);
        } catch (clearError) {
          console.error('Error clearing reCAPTCHA:', clearError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!verificationCode) {
        throw new Error('Please enter the verification code');
      }

      if (!window.confirmationResult) {
        throw new Error('Something went wrong. Please try again');
      }

      await window.confirmationResult.confirm(verificationCode);
      navigate('/');
    } catch (error: any) {
      console.error('Code verification error:', error);
      setError('Invalid verification code');
    } finally {
      setLoading(false);
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

        {step === 'phone' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="+1234567890"
                required
                disabled={loading}
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter your phone number with country code
              </p>
            </div>

            <button
              type="submit"
              id="sign-in-button"
              disabled={loading || !recaptchaReady}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 disabled:bg-red-300"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter 6-digit code"
                required
                disabled={loading}
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 disabled:bg-red-300"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setError('');
                setVerificationCode('');
                // Reset reCAPTCHA when going back
                if (window.recaptchaVerifier) {
                  try {
                    window.recaptchaVerifier.clear();
                    window.recaptchaVerifier = null;
                    setRecaptchaReady(false);
                  } catch (error) {
                    console.error('Error clearing reCAPTCHA:', error);
                  }
                }
              }}
              className="w-full mt-2 text-gray-600 hover:text-gray-900"
            >
              Back to Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}