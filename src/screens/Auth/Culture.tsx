import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Search, ChevronDown, X as CloseIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { Textarea } from '../../components/ui/textarea';

// Define state for the Culture form
export const CulturePage: React.FC = () => {
  const [jobSearchStatus, setJobSearchStatus] = useState<string | null>(null);
  const [mostImportant, setMostImportant] = useState<string[]>([]); // Allow multiple selections (up to 2)
  const [quietWorkImportance, setQuietWorkImportance] = useState<string | null>(null); // 'very', 'important', 'not'
  const [nextJobDescription, setNextJobDescription] = useState<string>('');
  const [showMaxItemsAlert, setShowMaxItemsAlert] = useState<boolean>(false); // State for alert

  const { markStepCompleted, setCurrentStep } = useAuth(); // Use AuthContext
  const navigate = useNavigate();

  // Handler for multi-select buttons (limit to 2) with alert
  const handleMostImportantToggle = (value: string) => {
    setMostImportant(prev => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter(item => item !== value);
      } else if (prev.length < 2) {
        return [...prev, value];
      } else {
        // Trying to select a third item
        setShowMaxItemsAlert(true);
        // Hide alert after 3 seconds
        setTimeout(() => setShowMaxItemsAlert(false), 3000);
        return prev; // Don't add the third item
      }
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct formData from state before logging
    const formData = {
      jobSearchStatusCulture: jobSearchStatus, // Use the state variable name
      mostImportant,
      quietWorkImportance,
      nextJobDescription
     };
     console.log('Culture data submitted:', formData);
     // Mark step as completed, set next step, and navigate
     markStepCompleted('culture');
     setCurrentStep('resume-cv');
     navigate('/resume-cv');
   };

   // Placeholder RadioOption component (can be refined or removed if not needed)
  const RadioOption = ({ value, label, description, name, checked, onChange }: any) => (
     <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${ checked ? 'bg-[#F0FDF4] border-[#32AD5F]' : 'bg-white border-[#e8eaea] hover:bg-gray-50' }`}>
       <div className="flex items-center justify-between">
         <span className={`font-medium ${checked ? 'text-[#1b3824]' : 'text-[#454947]'}`}>{label}</span>
         <div className={`w-5 h-5 rounded-full flex items-center justify-center ${checked ? 'bg-[#32AD5F]' : 'border-2 border-gray-300 bg-white'}`}>
           {checked && (
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           )}
         </div>
         <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
       </div>
       {description && <p className="text-sm text-[#454947] mt-2">{description}</p>}
     </label>
   );

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left sidebar - fixed */}
      <div className="hidden lg:block lg:w-[37.5%] bg-[#f5f7f7] fixed top-0 bottom-0 left-0 min-h-screen overflow-hidden">
        <div className="p-6 flex flex-col items-center h-full">
          <div className="w-full max-w-md">
            <div className="flex items-center mt-6">
              <img src="/Logo.png" alt="Talent Scale" className="h-6" />
            </div>

            {/* Navigation Steps - TODO: Update active/completed states */}
            <div className="mt-[112px]">
              <ul className="space-y-8">
                {/* Profile Step - Completed & Clickable */}
                <li className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <Link to="/create-profile" className="w-10 h-10 bg-[#E0F2E7] border border-[#A3D7B4] rounded-full flex items-center justify-center text-[#454947] hover:border-[#32AD5F] transition-colors">
                      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 7.5L6.5 12.5L16.5 1.5" stroke="#454947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
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
                       <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M1.5 7.5L6.5 12.5L16.5 1.5" stroke="#454947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       </svg>
                     </Link>
                     <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                   </div>
                   <Link to="/preferences" className="flex-1 pt-1.5 group">
                    <h3 className="font-medium text-[#1b3824] group-hover:text-[#2f583f]">Preferences</h3>
                    <p className="text-sm text-[#454947]">Select your ideal roles, work settings, and compensation expectations.</p>
                  </Link>
                </li>
                {/* Culture Step - Active */}
                <li className="flex items-start gap-4">
                  <div>
                    <div className="w-10 h-10 bg-[#2f583f] rounded-full flex items-center justify-center text-white"> {/* Active Style */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-medium text-[#1b3824]">Culture</h3>
                    <p className="text-sm text-[#454947]">Find companies that align with your values and preferred work style.</p>
                  </div>
                </li>
                {/* Resume/CV Step */}
                <li className="flex items-start gap-4">
                  <div>
                    <div className="w-10 h-10 bg-[#e8eaea] rounded-full flex items-center justify-center text-[#1b3824]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                         <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                         <path d="M10 9H8"></path>
                         <path d="M16 13H8"></path>
                         <path d="M16 17H8"></path>
                      </svg>
                    </div>
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-medium text-[#1b3824]">Resume/CV</h3>
                    <p className="text-sm text-[#454947]">Showcase your experience and skills to stand out to employers.</p>
                  </div>
                </li>
                {/* Email Verification Step */}
                <li className="flex items-start gap-4">
                  <div>
                    <div className="w-10 h-10 bg-[#e8eaea] rounded-full flex items-center justify-center text-[#1b3824]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
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
            <h1 className="text-3xl font-bold text-[#1b3824] mb-1 text-center">Find your culture fit</h1>
            <p className="text-[#454947] text-center">
              Find companies that align with your values and preferred work style.
            </p>
          </div>

          {/* Form Content - TODO: Implement Culture form elements */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-8 pb-12">
            {/* Job Search Status - Use Custom Button/Chip Style */}
            <div>
              <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">Where are you in your job search?</h2>
              <div className="space-y-3">
                {[
                  { value: 'clear_role', label: 'Clear role and set of responsibilities. Consistent feedback from management' },
                  { value: 'many_hats', label: 'Employees wear many hats and often must figure out assignments on their own.' },
                ].map(option => {
                  const isSelected = jobSearchStatus === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#F0FDF4] border-[#32AD5F]' : 'bg-white border-[#e8eaea] hover:bg-gray-50'
                      }`}
                    >
                      <span className={`text-sm ${isSelected ? 'text-[#1b3824] font-medium' : 'text-[#454947]'}`}>{option.label}</span>
                      {/* Apply the correct custom checkmark style */}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-[#32AD5F]' : 'border-2 border-gray-300 bg-white'}`}>
                        {isSelected && (
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <input
                        type="radio"
                        name="jobSearchStatusCulture" // Use a unique name
                        value={option.value}
                        checked={isSelected}
                        onChange={(e) => setJobSearchStatus(e.target.value)}
                        className="sr-only"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* What's Most Important (Multi-select Chips/Buttons) */}
            <div>
              <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">What's most important to you in your next job? (Max 2)</h2>
              {/* Alert Message with Smooth Slide/Fade Transition */}
              {/* Apply transitions directly to the paragraph */}
              <p className={`text-sm text-red-600 overflow-hidden transition-all duration-300 ease-in-out ${showMaxItemsAlert ? 'max-h-5 opacity-100 mt-1 mb-1.5' : 'max-h-0 opacity-0 mt-0 mb-0'}`}>
                You can only select up to 2 items.
              </p>
              {/* Adjust margin if needed, but max-h-0 should collapse space */}
              <div className="flex flex-wrap gap-3">
                {[
                  'Having a say in what I work on and how I work',
                  'Ample opportunities for continuous learning and growth.',
                  'A culture that values diversity and fosters belonging.',
                  'Transparent leadership with open, honest communication.',
                  'Flexible schedules or remote options for better work-life balance.',
                  'Frequent recognition and constructive feedback.',
                ].map(item => {
                  const isSelected = mostImportant.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleMostImportantToggle(item)}
                      className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                        isSelected
                          ? 'bg-[#F0FDF4] border-[#32AD5F] text-[#1b3824] font-medium'
                          : 'bg-white border-[#e8eaea] text-[#454947] hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

             {/* How Important is Quiet Work */}
             <div>
               <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">How important is it that you work in a quiet office?</h2>
               <div className="flex flex-wrap gap-3">
                 {(['very', 'important', 'not'] as const).map(level => {
                   const isSelected = quietWorkImportance === level;
                   return (
                     <label
                       key={level}
                       className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-colors ${
                         isSelected ? 'bg-[#F0FDF4] border-[#32AD5F]' : 'bg-white border-[#e8eaea] hover:bg-gray-50'
                       }`}
                     >
                       <span className={`text-sm font-medium ${isSelected ? 'text-[#1b3824]' : 'text-[#454947]'}`}>
                         {level === 'very' ? 'Very Important' : level === 'important' ? 'Important' : 'Not Important'}
                       </span>
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-[#32AD5F]' : 'border-2 border-gray-300 bg-white'}`}>
                         {isSelected && (
                           <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         )}
                       </div>
                       <input
                         type="radio"
                         name="quietWorkImportance"
                         value={level}
                         checked={isSelected}
                         onChange={(e) => setQuietWorkImportance(e.target.value)}
                         className="sr-only"
                       />
                     </label>
                   );
                 })}
               </div>
             </div>

             {/* Describe What You're Looking For */}
             <div>
                <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">Describe what you are looking for in your next job</h2>
                <p className="text-sm text-[#454947] mb-1.5">Startups tell us this is one of the first things they look at in a profile</p>
                <Textarea
                  value={nextJobDescription}
                  onChange={(e) => setNextJobDescription(e.target.value)}
                  placeholder="Share what you're looking for in your next role culture, growth, responsibilities..."
                  maxLength={300}
                  className="min-h-[120px] border-[#d1d4d3]"
                />
                <p className="text-xs text-right text-gray-400 mt-1">{nextJobDescription.length}/300</p>
             </div>

             {/* Almost Done Message */}
             <div className="flex items-center justify-center gap-2 text-sm text-[#454947]">
                <Check className="w-4 h-4 text-[#32AD5F]" />
                <span>You're almost done! Wrap up your profile to begin searching for your dream job.</span>
             </div>


            {/* Buttons: Back and Save */}
            <div className="flex justify-end items-center pt-4 gap-1.5">
               <Button
                 type="button"
                 variant="outline"
                 onClick={() => navigate('/preferences')} // Go back to Preferences
                 className="border-[#d1d4d3] text-[#454947] hover:bg-gray-100 px-4 py-2 rounded-xl"
               >
                 Back
               </Button>
              <Button
                type="submit"
                className="bg-[#2f583f] text-white hover:bg-[#454947] px-4 py-2 rounded-xl" // Corrected hover state
              >
                Save and continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
