"use client"
import React, { useState } from 'react';

function LoginSignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, password });
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 xl:w-1/2 p-3">
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-gray-600">To keep connected with us please login with your personal info</p>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">SIGN IN</button>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/2 p-3">
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>
          <div className="flex justify-center mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">f</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">G+</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">in</button>
          </div>
          <p className="text-gray-600">or use your email for registration</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSignupForm;
