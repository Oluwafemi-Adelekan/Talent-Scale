import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

// Define state for the Email Verification page
export const EmailVerificationPage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const { markStepCompleted, setCurrentStep } = useAuth(); // Use AuthContext
  const navigate = useNavigate();

  const handleSendCode = () => {
    // TODO: Implement logic to send verification code
    console.log('Sending verification code...');
    // Potentially show a confirmation message or disable button briefly
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification code submitted:', verificationCode);
    // TODO: Implement actual verification logic here
    // If verification is successful:
    markStepCompleted('email-verification');
    setCurrentStep('processing');
    navigate('/processing'); // Navigate to processing page
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left sidebar - fixed */}
      <div className="hidden lg:block lg:w-[37.5%] bg-[#f5f7f7] fixed top-0 bottom-0 left-0 min-h-screen overflow-hidden">
        <div className="p-6 flex flex-col items-center h-full">
          <div className="w-full max-w-md">
            <div className="flex items-center mt-6">
              <img src="/Logo.png" alt="Talent Scale" className="h-6" />
            </div>

            {/* Navigation Steps - Update active/completed states */}
            <div className="mt-[112px]">
              <ul className="space-y-8">
                {/* Profile Step - Completed & Clickable */}
                <li className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <Link to="/create-profile" className="w-10 h-10 bg-[#E0F2E7] border border-[#A3D7B4] rounded-full flex items-center justify-center text-[#454947] hover:border-[#32AD5F] transition-colors">
                      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 7.5L6.5 12.5L16.5 1.5" stroke="#454947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                  <Link to="/create-profile" className="flex-1 pt-1.5 group">
                    <h3 className="font-medium text-[#1b3824] group-hover:text-[#2f583f]">Profile</h3>
                    <p className="text-sm text-[#454947]">Apply privately to thousands of tech companies & startups with one profile.</p>
                  </Link>
                </li>
                {/* Preferences Step - Completed & Clickable */}
                <li className="flex items-start gap-4">
                   <div className="flex flex-col items-center">
                     <Link to="/preferences" className="w-10 h-10 bg-[#E0F2E7] border border-[#A3D7B4] rounded-full flex items-center justify-center text-[#454947] hover:border-[#32AD5F] transition-colors">
                       <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 7.5L6.5 12.5L16.5 1.5" stroke="#454947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </Link>
                     <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                   </div>
                   <Link to="/preferences" className="flex-1 pt-1.5 group">
                    <h3 className="font-medium text-[#1b3824] group-hover:text-[#2f583f]">Preferences</h3>
                    <p className="text-sm text-[#454947]">Select your ideal roles, work settings, and compensation expectations.</p>
                  </Link>
                </li>
                {/* Culture Step - Completed & Clickable */}
                 <li className="flex items-start gap-4">
                   <div className="flex flex-col items-center">
                     <Link to="/culture" className="w-10 h-10 bg-[#E0F2E7] border border-[#A3D7B4] rounded-full flex items-center justify-center text-[#454947] hover:border-[#32AD5F] transition-colors">
                       <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 7.5L6.5 12.5L16.5 1.5" stroke="#454947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </Link>
                     <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                   </div>
                   <Link to="/culture" className="flex-1 pt-1.5 group">
                    <h3 className="font-medium text-[#1b3824] group-hover:text-[#2f583f]">Culture</h3>
                    <p className="text-sm text-[#454947]">Find companies that align with your values and preferred work style.</p>
                  </Link>
                </li>
                {/* Resume/CV Step - Completed & Clickable */}
                <li className="flex items-start gap-4">
                   <div className="flex flex-col items-center">
                     <Link to="/resume-cv" className="w-10 h-10 bg-[#E0F2E7] border border-[#A3D7B4] rounded-full flex items-center justify-center text-[#454947] hover:border-[#32AD5F] transition-colors">
                       <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 7.5L6.5 12.5L16.5 1.5" stroke="#454947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </Link>
                     <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                   </div>
                   <Link to="/resume-cv" className="flex-1 pt-1.5 group">
                    <h3 className="font-medium text-[#1b3824] group-hover:text-[#2f583f]">Resume/CV</h3>
                    <p className="text-sm text-[#454947]">Showcase your experience and skills to stand out to employers.</p>
                  </Link>
                </li>
                {/* Email Verification Step - Active */}
                <li className="flex items-start gap-4">
                  <div>
                    <div className="w-10 h-10 bg-[#2f583f] rounded-full flex items-center justify-center text-white"> {/* Active Style */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    {/* No line needed after the last step */}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-medium text-[#1b3824]">Email Verification</h3>
                    <p className="text-sm text-[#454947]">Secure your account and receive matching job opportunities in your inbox.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-0 pr-12">
          <img src="/Logo low opacity.png" alt="Talent Scale" className="w-48" />
        </div>
      </div>

      {/* Main content - scrollable */}
      <div className="w-full lg:ml-[37.5%] lg:w-[62.5%] px-6 lg:px-16 overflow-y-auto max-h-screen">
        <div className="max-w-2xl mx-auto w-full">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white pt-12 pb-8">
            <h1 className="text-3xl font-bold text-[#1b3824] mb-1 text-center">Verify your email</h1>
            <p className="text-[#454947] text-center">
              Secure your account and receive matching job opportunities in your inbox
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-8 pb-12">

            {/* Verification Code Input */}
            <div className="flex items-center gap-3">
               <Input
                 type="text"
                 placeholder="Enter your verification code here"
                 value={verificationCode}
                 onChange={(e) => setVerificationCode(e.target.value)}
                 className="border-[#d1d4d3] flex-1"
                 maxLength={6} // Assuming a 6-digit code
               />
               <Button
                 type="button"
                 variant="outline"
                 onClick={handleSendCode}
                 className="border-[#d1d4d3] text-[#454947] hover:bg-gray-100 px-4 py-2 rounded-xl"
               >
                 Send me a code
               </Button>
            </div>
            {/* Adjust text alignment and margin-top back to mt-1.5 (6px) */}
            <p className="text-xs text-gray-500 text-left mt-1.5">Click the button to receive a verification code by email</p>


            {/* Complete Registration Button */}
            <div className="flex justify-center pt-4"> {/* Centered button */}
              <Button
                type="submit"
                className={`px-4 py-2 rounded-xl text-white transition-colors ${
                  verificationCode.length < 6
                    ? 'bg-[#AFB5B1] hover:bg-[#989e9b] cursor-not-allowed' // Disabled state styles
                    : 'bg-[#2f583f] hover:bg-[#454947]' // Corrected hover state for enabled button
                }`}
                disabled={verificationCode.length < 6}
              >
                Complete registration
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
