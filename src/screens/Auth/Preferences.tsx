import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Search, ChevronDown, X as CloseIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
// Import Dropdown components (assuming they are available)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";


// Define currency options
const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  // Add more currencies as needed
];

// Define state for the preferences form
export const PreferencesPage: React.FC = () => {
  const [jobSearchStatus, setJobSearchStatus] = useState<string>('ready'); // 'ready', 'considering', 'open', 'notLooking'
  const [jobType, setJobType] = useState<string>('fullTime'); // 'fullTime', 'contractor', 'entryLevel', 'intern'
  const [desiredSalaryCurrency, setDesiredSalaryCurrency] = useState<string>('USD');
  const [desiredSalaryAmount, setDesiredSalaryAmount] = useState<string>('');
  // Initialize workLocations as empty, remove hardcoded value
  const [workLocations, setWorkLocations] = useState<string[]>([]);
  const [locationSearch, setLocationSearch] = useState<string>('');
  const [openToRemote, setOpenToRemote] = useState<boolean>(false);
  const [usAuthorized, setUsAuthorized] = useState<boolean | null>(null); // null, true, false
  const [requireSponsorship, setRequireSponsorship] = useState<boolean | null>(null); // null, true, false

  // State for company size preferences (example structure)
  const [companySizePrefs, setCompanySizePrefs] = useState<Record<string, 'ideal' | 'yes' | 'no' | null>>({
    seed: null, early: null, mid: null, large: null, veryLarge: null, massive: null
  });

  const { markStepCompleted, setCurrentStep } = useAuth(); // Use AuthContext
  const navigate = useNavigate(); // Get navigate function

  const handleCompanySizeChange = (sizeKey: string, value: 'ideal' | 'yes' | 'no' | null) => {
    setCompanySizePrefs(prev => ({ ...prev, [sizeKey]: value }));
  };

  // Handler for currency selection
  const handleCurrencySelect = (code: string) => {
    setDesiredSalaryCurrency(code);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      jobSearchStatus,
      jobType,
      desiredSalary: { currency: desiredSalaryCurrency, amount: desiredSalaryAmount },
      workLocations, // This needs refinement based on how locations are actually handled
      openToRemote,
      usAuthorized,
      requireSponsorship,
      companySizePrefs
     };
     console.log('Preferences data submitted:', formData);
     // Mark step as completed, set next step, and navigate
     markStepCompleted('preferences');
     setCurrentStep('culture');
     navigate('/culture');
   };

   // Helper component for custom radio buttons (optional, can be done inline)
  const RadioOption = ({ value, label, description, name, checked, onChange }: any) => (
    <label
      className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
        checked ? 'bg-[#F0FDF4] border-[#32AD5F]' : 'bg-white border-[#e8eaea] hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-medium ${checked ? 'text-[#1b3824]' : 'text-[#454947]'}`}>{label}</span>
        {/* Updated Checkmark Style */}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${checked ? 'bg-[#32AD5F]' : 'border-2 border-gray-300 bg-white'}`}>
          {checked && (
             <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          )}
        </div>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only" // Hide actual radio button
        />
      </div>
      {description && <p className="text-sm text-[#454947] mt-2">{description}</p>}
    </label>
  );

  const companySizes = [
    { key: 'seed', label: 'Seed (1-10 employees)' },
    { key: 'early', label: 'Early (11-50 employees)' },
    { key: 'mid', label: 'Mid-size (51-200 employees)' },
    { key: 'large', label: 'Large (201-500 employees)' },
    { key: 'veryLarge', label: 'Very large (501-1000 employees)' },
    { key: 'massive', label: 'Massive (1001+ employees)' },
  ];


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
                  {/* Wrap icon and line in a div for structure */}
                  <div className="flex flex-col items-center">
                     {/* Make icon clickable & update style */}
                    <Link to="/create-profile" className="w-10 h-10 bg-[#E0F2E7] border border-[#A3D7B4] rounded-full flex items-center justify-center text-[#454947] hover:border-[#32AD5F] transition-colors">
                       {/* Final Corrected Completed Checkmark SVG */}
                       <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M1.5 7.5L6.5 12.5L16.5 1.5" stroke="#454947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       </svg>
                    </Link>
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                   {/* Make text clickable */}
                  <Link to="/create-profile" className="flex-1 pt-1.5 group">
                    <h3 className="font-medium text-[#1b3824] group-hover:text-[#2f583f]">Profile</h3>
                    <p className="text-sm text-[#454947]">Apply privately to thousands of tech companies & startups with one profile.</p>
                  </Link> {/* Close the Link tag here */}
                </li>
                {/* Preferences Step - Active */}
                <li className="flex items-start gap-4">
                  <div>
                    {/* Active state: dark green background, white icon */}
                    <div className="w-10 h-10 bg-[#2f583f] rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-medium text-[#1b3824]">Preferences</h3>
                    <p className="text-sm text-[#454947]">Select your ideal roles, work settings, and compensation expectations.</p>
                  </div>
                </li>
                {/* Culture Step */}
                <li className="flex items-start gap-4">
                  <div>
                    <div className="w-10 h-10 bg-[#e8eaea] rounded-full flex items-center justify-center text-[#1b3824]">
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

        {/* Logo at bottom */}
        <div className="absolute bottom-10 right-0 pr-12">
          <img src="/Logo low opacity.png" alt="Talent Scale" className="w-48" />
        </div>
      </div>

      {/* Main content - scrollable */}
      <div className="w-full lg:ml-[37.5%] lg:w-[62.5%] px-6 lg:px-16 overflow-y-auto max-h-screen">
        <div className="max-w-2xl mx-auto w-full">
          {/* Sticky Header Wrapper - TODO: Update text */}
          <div className="sticky top-0 z-10 bg-white pt-12 pb-8">
            <h1 className="text-3xl font-bold text-[#1b3824] mb-1 text-center">Set your job search preferences</h1>
            <p className="text-[#454947] text-center">
              Select your ideal roles, work settings, and compensation expectations.
            </p>
          </div>

            {/* Form Content - Adjust vertical spacing */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-8 pb-12">

            {/* Job Search Status */}
            <div>
               {/* Adjusted label margin */}
              <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">Where are you in your job search?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RadioOption
                  value="ready"
                  label="Ready to interview"
                  description="This means: You're actively looking for new work and ready to interview"
                  name="jobSearchStatus"
                  checked={jobSearchStatus === 'ready'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobSearchStatus(e.target.value)}
                />
                <RadioOption
                  value="open"
                  label="Open to opportunities"
                  description="This means: You're not actively searching, but open to hearing about interesting roles."
                  name="jobSearchStatus"
                  checked={jobSearchStatus === 'open'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobSearchStatus(e.target.value)}
                />
                 <RadioOption
                  value="considering"
                  label="Considering new roles"
                  description="This means: You have a job but are starting to look around."
                  name="jobSearchStatus"
                  checked={jobSearchStatus === 'considering'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobSearchStatus(e.target.value)}
                />
                <RadioOption
                  value="notLooking"
                  label="Not looking"
                  description="This means: You're not interested in new opportunities at this time."
                  name="jobSearchStatus"
                  checked={jobSearchStatus === 'notLooking'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobSearchStatus(e.target.value)}
                />
              </div>
            </div>

            {/* Job Type Interest */}
            <div>
               {/* Adjusted label margin */}
              <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">What type of job are you interested in?</h2>
              <p className="text-sm text-[#454947] mb-1.5">Choose just one for now. You can change this or add more types later</p>
              <div className="flex flex-wrap gap-3">
                {(['fullTime', 'contractor', 'entryLevel', 'intern'] as const).map((type) => (
                  <label
                    key={type}
                    className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-colors ${
                      jobType === type ? 'bg-[#F0FDF4] border-[#32AD5F]' : 'bg-white border-[#e8eaea] hover:bg-gray-50'
                    }`}
                  >
                    <span className={`text-sm font-medium ${jobType === type ? 'text-[#1b3824]' : 'text-[#454947]'}`}>
                      {/* Simple label mapping */}
                      {type === 'fullTime' ? 'Full-time employee' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                     {/* Updated Checkmark Style */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${jobType === type ? 'bg-[#32AD5F]' : 'border-2 border-gray-300 bg-white'}`}>
                       {jobType === type && (
                         <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                       )}
                    </div>
                    <input
                      type="radio"
                      name="jobType"
                      value={type}
                      checked={jobType === type}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobType(e.target.value)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Desired Salary */}
            <div>
               {/* Adjusted label margin */}
              <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">What is your desired salary?</h2>
              <div className="flex items-center gap-3">
                {/* Currency Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-40 justify-between border-[#d1d4d3] text-left font-normal">
                      {currencies.find(c => c.code === desiredSalaryCurrency)?.name || 'Select Currency'} ({currencies.find(c => c.code === desiredSalaryCurrency)?.symbol})
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    {currencies.map((currency) => (
                      <DropdownMenuItem key={currency.code} onClick={() => handleCurrencySelect(currency.code)}>
                        {currency.name} ({currency.symbol})
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative flex-1">
                   {/* Display selected currency symbol */}
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {currencies.find(c => c.code === desiredSalaryCurrency)?.symbol || '$'}
                  </span>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={desiredSalaryAmount}
                    onChange={(e) => setDesiredSalaryAmount(e.target.value)}
                    className="border-[#d1d4d3] pl-7"
                  />
                </div>
              </div>
            </div>

            {/* Work Locations */}
            <div>
               {/* Adjusted label margin */}
              <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">What locations do you want to work in?</h2>
              <div className="relative mb-1.5">
                <Input
                  placeholder="Search for a location"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="border-[#d1d4d3] pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              {/* Display selected locations - Only show if locations exist */}
              {workLocations.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-1.5"> {/* Adjusted margin */}
                  {workLocations.map(loc => (
                      <div key={loc} className="inline-flex items-center gap-1 pl-3 pr-1 py-1 border border-[#32AD5F] bg-[#F0FDF4] rounded-full text-sm text-[#1b3824]">
                        {loc}
                        {/* Add a remove button 'X' */}
                        <button type="button" onClick={() => setWorkLocations(prev => prev.filter(l => l !== loc))} className="ml-1 p-0.5 rounded-full hover:bg-red-100 text-red-500">
                           <CloseIcon className="w-3 h-3" />
                        </button>
                      </div>
                  ))}
                </div>
              )}
              {/* Remove hardcoded text about current location */}
              {/* <p className="text-xs text-[#454947] mb-3">Your current location can't be removed</p> */}
              <label className="flex items-center gap-2 cursor-pointer mt-1.5"> {/* Adjusted margin */}
                <input
                  type="checkbox"
                  checked={openToRemote}
                  onChange={(e) => setOpenToRemote(e.target.checked)}
                  className="rounded border-[#d1d4d3] accent-[#2f583f]" // Add accent color
                />
                <span className="text-sm text-[#454947]">I'm open to working remotely</span>
              </label>
            </div>

            {/* US Work Authorization */}
            <div className="bg-[#f5f7f7] p-6 rounded-lg">
               {/* Adjusted label margin */}
              <h3 className="text-lg font-medium text-[#1b3824] mb-1.5">US work authorization</h3>
              <p className="text-sm text-[#454947] mb-6">Your work authorization details help match you with eligible positions. This information remains private until needed in the hiring process.</p>
              <div className="space-y-5">
                <div>
                   {/* Adjusted label margin */}
                  <p className="text-sm font-medium text-[#1b3824] mb-1.5">Are you legally authorized to work in the United States?</p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="usAuthorized" value="yes" checked={usAuthorized === true} onChange={() => setUsAuthorized(true)} className="form-radio accent-[#2f583f]" />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="usAuthorized" value="no" checked={usAuthorized === false} onChange={() => setUsAuthorized(false)} className="form-radio accent-[#2f583f]" /> {/* Add accent color */}
                      No
                    </label>
                  </div>
                </div>
                <div>
                   {/* Adjusted label margin */}
                  <p className="text-sm font-medium text-[#1b3824] mb-1.5">Do you or will you require sponsorship for a US employment visa (H-1B)?</p>
                   <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="requireSponsorship" value="yes" checked={requireSponsorship === true} onChange={() => setRequireSponsorship(true)} className="form-radio accent-[#2f583f]" />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="requireSponsorship" value="no" checked={requireSponsorship === false} onChange={() => setRequireSponsorship(false)} className="form-radio accent-[#2f583f]" /> {/* Add accent color */}
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Size Preferences */}
            <div>
                {/* Adjusted label margin */}
               <h2 className="text-lg font-medium text-[#1b3824] mb-1.5">Would you like to work at companies of these sizes?</h2>
               <div className="border border-[#e8eaea] rounded-lg overflow-hidden">
                 <table className="w-full text-sm">
                   <thead className="bg-[#f5f7f7]">
                     <tr>
                       <th className="py-3 px-4 text-left font-medium text-[#454947]">Date</th> {/* Label seems incorrect in design? Using 'Size' */}
                       <th className="py-3 px-4 text-center font-medium text-[#454947]">Ideal</th>
                       <th className="py-3 px-4 text-center font-medium text-[#454947]">Yes</th>
                       <th className="py-3 px-4 text-center font-medium text-[#454947]">No</th>
                     </tr>
                   </thead>
                   <tbody>
                     {companySizes.map((size, index) => (
                       <tr key={size.key} className={`${index < companySizes.length - 1 ? 'border-b border-[#e8eaea]' : ''}`}>
                         <td className="py-3 px-4 text-[#1b3824]">{size.label}</td>
                         {(['ideal', 'yes', 'no'] as const).map(pref => (
                           <td key={pref} className="py-3 px-4 text-center">
                             <input
                               type="radio"
                               name={`companySize-${size.key}`}
                                value={pref}
                                checked={companySizePrefs[size.key] === pref}
                                onChange={() => handleCompanySizeChange(size.key, pref)}
                                className="form-radio h-4 w-4 accent-[#2f583f]" // Add accent color
                              />
                            </td>
                          ))}
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>


            {/* Buttons: Back and Save - Adjust padding and gap */}
            <div className="flex justify-end items-center pt-4 gap-1.5">
               <Button
                 type="button"
                 variant="outline" // Use outline style for back button
                 onClick={() => navigate('/create-profile')} // Navigate back
                 className="border-[#d1d4d3] text-[#454947] hover:bg-gray-100 px-4 py-2 rounded-xl"
               >
                 Back
               </Button>
              <Button
                type="submit"
                className="bg-[#2f583f] text-white hover:bg-[#454947] px-4 py-2 rounded-xl" /* Applied correct hover color */
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
