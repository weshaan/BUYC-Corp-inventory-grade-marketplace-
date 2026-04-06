import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('DEALER');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signing up as:', role, 'with email:', email);
    // We will connect this to the backend later
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">I am a...</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="DEALER">Car Dealer</option>
              <option value="BUYER">Car Buyer</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="********"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}