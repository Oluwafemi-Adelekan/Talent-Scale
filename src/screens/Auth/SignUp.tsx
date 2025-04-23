import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Redirect to the profile creation page
    navigate('/create-profile');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f5f7f7] flex-col justify-center items-center px-16">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-[#1b3824] mb-4">
            Land<br />where you<br />belong.
          </h1>
          <p className="text-[#454947] mb-8">
            Search opportunities at established giants<br />
            and tomorrow's breakout companies.
          </p>
          <img 
            src="/Onboarding Image.png" 
            alt="People working with resumes" 
            className="w-full max-w-lg"
          />
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md px-6 py-12">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex items-center mb-10">
              <img src="/Logo.png" alt="Talent Scale" className="h-6 mr-2" />
            </div>
            <h2 className="text-2xl font-bold text-[#1b3824] mb-1">Create Account</h2>
            <p className="text-[#454947]">Find your next opportunity!</p>
          </div>

          {/* Google Sign Up Button */}
          <Button 
            variant="outline" 
            className="w-full mb-6 py-6 border-[#d1d4d3] text-[#1b3824] font-medium flex items-center justify-center"
            onClick={() => console.log('Sign up with Google')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 mr-3">
              <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
              <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
              <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
              <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e8eaea]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-[#454947]">Or Sign Up with Email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#1b3824] mb-2">
                Full name
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="border-[#d1d4d3]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1b3824] mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@talentscale.com"
                className="border-[#d1d4d3]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1b3824] mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Provide a strong password"
                className="border-[#d1d4d3]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-[#2f583f] text-white hover:bg-[#454947]"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-center text-sm text-[#454947] mt-6">
            By continuing, you accept our{' '}
            <Link to="/terms" className="text-blue-600 hover:underline">terms and condition</Link> and our{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">privacy policy</Link>.
          </p>

          <div className="text-center mt-8">
            <p className="text-[#454947]">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 