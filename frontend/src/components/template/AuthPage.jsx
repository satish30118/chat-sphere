"use client"
import Button from '../atoms/Button';
// Organisms/AuthPage.js
import SocialIcons from '../molecules/SocialMediaLinks';
import AuthForm from '../organisms/AuthForm';
import { useState } from 'react';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex w-full max-w-4xl overflow-hidden bg-white shadow-lg rounded-lg">
        {/* SignIn and SignUp Section */}
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
            isSignIn ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="grid grid-cols-2">
            {/* Left: SignIn Section */}
            <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-r from-orange-400 to-red-500 text-white">
              <h2 className="mb-4 text-3xl font-bold">Hello, Friend!</h2>
              <p className="text-center">Enter your personal details and start journey with us</p>
              <Button label="Sign Up" onClick={toggleForm} variant="secondary" />
            </div>
            {/* Right: SignIn Form */}
            <div className="flex flex-col items-center justify-center p-10">
              <h2 className="text-3xl font-bold">Sign in</h2>
              <SocialIcons />
              <AuthForm isSignIn={isSignIn} toggleForm={toggleForm} />
            </div>
          </div>
        </div>

        {/* SignUp Form */}
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
            isSignIn ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="grid grid-cols-2">
            {/* Left: SignUp Section */}
            <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-r from-red-500 to-orange-400 text-white">
              <h2 className="mb-4 text-3xl font-bold">Welcome Back!</h2>
              <p className="text-center">To keep connected with us please login with your personal info</p>
              <Button label="Sign In" onClick={toggleForm} variant="secondary" />
            </div>
            {/* Right: SignUp Form */}
            <div className="flex flex-col items-center justify-center p-10">
              <h2 className="text-3xl font-bold">Create Account</h2>
              <SocialIcons />
              <AuthForm isSignIn={!isSignIn} toggleForm={toggleForm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
