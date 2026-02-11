import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full absolute top-0 bg-base-200 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        {/* Visual Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-error/10 rounded-full text-error">
            <AlertCircle size={64} strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-9xl font-black text-base-content/20">404</h1>
        
        <div className="relative -mt-12">
          <h2 className="text-3xl font-bold md:text-4xl mb-2">Oops! Page not found.</h2>
          <p className="text-base-content/70 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-secondary rounded-full px-8 gap-2">
            <Home size={18} />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline btn-secondary rounded-full"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}