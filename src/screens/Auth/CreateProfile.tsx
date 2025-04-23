import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom'; // Removed unused Link
import { useAuth } from '../../context/AuthContext'; // Import useAuth

export const CreateProfilePage: React.FC = () => {
  const { markStepCompleted, setCurrentStep } = useAuth(); // Use AuthContext
  const navigate = useNavigate(); // Use navigate function
  const [isStudent, setIsStudent] = useState(false);
  // Reverted state, removed dropdown-specific fields
  const [formData, setFormData] = useState({
    location: '',
    // role: '', // Reverted
    // yearsOfExperience: '', // Reverted
    currentJobTitle: '',
    currentCompany: '',
    linkedInProfile: '',
    portfolio: '',
    schoolName: '',
    fieldOfStudy: '',
    // graduationYear: '', // Reverted
    workTypes: {
      internship: false,
      entryLevel: false,
      coOp: false,
      partTime: false,
      fullTime: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Removed handleDropdownSelect

  const handleWorkTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      workTypes: {
        ...prev.workTypes,
        [name]: checked
      }
    }));
  };

  const handleToggleChange = () => {
    setIsStudent(!isStudent);
  };

  // Removed redundant navigate declaration

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data submitted:', formData);
    // Mark step as completed and navigate to the next step
    markStepCompleted('create-profile');
    setCurrentStep('preferences'); // Set next step in context
    navigate('/preferences'); // Navigate to preferences page
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

            {/* Navigation Steps */}
            <div className="mt-[112px]">
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div>
                    {/* Profile Icon (User) */}
                    <div className="w-10 h-10 bg-[#2f583f] rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    {/* Remove mt-2 from line */}
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-medium text-[#1b3824]">Profile</h3>
                    <p className="text-sm text-[#454947]">Apply privately to thousands of tech companies & startups with one profile.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div>
                    {/* Preferences Icon (Settings/Cog) */}
                    <div className="w-10 h-10 bg-[#e8eaea] rounded-full flex items-center justify-center text-[#1b3824]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    {/* Remove mt-2 from line */}
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-medium text-[#1b3824]">Preferences</h3>
                    <p className="text-sm text-[#454947]">Select your ideal roles, work settings, and compensation expectations.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div>
                    {/* Culture Icon (Users) */}
                    <div className="w-10 h-10 bg-[#e8eaea] rounded-full flex items-center justify-center text-[#1b3824]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    {/* Remove mt-2 from line */}
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-medium text-[#1b3824]">Culture</h3>
                    <p className="text-sm text-[#454947]">Find companies that align with your values and preferred work style.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div>
                    {/* Resume/CV Icon (FileText) */}
                    <div className="w-10 h-10 bg-[#e8eaea] rounded-full flex items-center justify-center text-[#1b3824]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                         <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                         <path d="M10 9H8"></path>
                         <path d="M16 13H8"></path>
                         <path d="M16 17H8"></path>
                      </svg>
                    </div>
                    {/* Remove mt-2 from line */}
                    <div className="w-[1px] h-[40px] bg-[#e8eaea] mx-auto"></div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-medium text-[#1b3824]">Resume/CV</h3>
                    <p className="text-sm text-[#454947]">Showcase your experience and skills to stand out to employers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div>
                    {/* Email Verification Icon (Mail) */}
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
      {/* Remove py-12 from here */}
      <div className="w-full lg:ml-[37.5%] lg:w-[62.5%] px-6 lg:px-16 overflow-y-auto max-h-screen">
        <div className="max-w-2xl mx-auto w-full">
          {/* Sticky Header Wrapper */}
          <div className="sticky top-0 z-10 bg-white pt-12 pb-8">
            <h1 className="text-3xl font-bold text-[#1b3824] mb-1 text-center">Create your profile</h1>
            <p className="text-[#454947] text-center"> {/* Removed mb-8 */}
              Apply privately to thousands of<br />
              tech companies & startups with one profile.
            </p>
          </div>

          {/* Add padding top and bottom to form, adjust vertical spacing */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-8 pb-12"> {/* Changed space-y-8 to space-y-5 */}
            {/* Location and role */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                {/* Adjusted label margin */}
                <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                  Where are you based?
                </label>
                <div className="relative">
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Type to search for a location"
                    className="border-[#d1d4d3] pr-10"
                  />
                  <svg
                    className="absolute right-3 top-3 w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
              <div>
                 {/* Adjusted label margin */}
                <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                  What best describes your current role?
                </label>
                 {/* Reverted to static placeholder */}
                <div className="relative">
                  <div className="border border-[#d1d4d3] rounded-md flex items-center justify-between px-3 py-2 cursor-pointer">
                    <span className="text-[#454947]">Select a role</span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Years of experience */}
            <div>
               {/* Adjusted label margin */}
              <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                How many years of experience do you have in your current role?
              </label>
               {/* Reverted to static placeholder */}
               <div className="relative">
                <div className="border border-[#d1d4d3] rounded-md flex items-center justify-between px-3 py-2 cursor-pointer">
                  <span className="text-[#454947]">Select years of experience</span>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Student toggle */}
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${isStudent ? 'bg-[#2f583f]' : 'bg-gray-300'}`}
                onClick={handleToggleChange}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isStudent ? 'translate-x-6' : ''}`}
                ></div>
              </div>
              <span className="text-[#1b3824] font-medium">Are you student?</span>
            </div>

            {/* Conditional rendering based on student status */}
            {isStudent ? (
              <div className="space-y-5"> {/* Changed space-y-8 to space-y-5 */}
                <div className="bg-[#f5f7f7] p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-[#1b3824] mb-1">Education information</h3>
                  <p className="text-sm text-[#454947] mb-6">Companies looking for entry-level talent will see this information</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                       {/* Adjusted label margin */}
                      <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                        School name
                      </label>
                      <Input
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleInputChange}
                        placeholder="Enter your school name"
                        className="border-[#d1d4d3]"
                      />
                    </div>
                    <div>
                       {/* Adjusted label margin */}
                      <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                        Field of study
                      </label>
                      <Input
                        name="fieldOfStudy"
                        value={formData.fieldOfStudy}
                        onChange={handleInputChange}
                        placeholder="E.g Computer science, design"
                        className="border-[#d1d4d3]"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                     {/* Adjusted label margin */}
                    <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                      Expected graduation year
                    </label>
                     {/* Reverted to static placeholder */}
                     <div className="relative">
                      <div className="border border-[#d1d4d3] rounded-md flex items-center justify-between px-3 py-2 cursor-pointer">
                        <span className="text-[#454947]">Select graduation year</span>
                        <svg
                          className="w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                     {/* Adjusted label margin */}
                    <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                      What type of work are you looking for?
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="internship"
                          checked={formData.workTypes.internship}
                          onChange={handleWorkTypeChange}
                          className="rounded border-[#d1d4d3]"
                        />
                        <span className="text-[#454947]">Internship</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="entryLevel"
                          checked={formData.workTypes.entryLevel}
                          onChange={handleWorkTypeChange}
                          className="rounded border-[#d1d4d3]"
                        />
                        <span className="text-[#454947]">Entry-level</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="coOp"
                          checked={formData.workTypes.coOp}
                          onChange={handleWorkTypeChange}
                          className="rounded border-[#d1d4d3]"
                        />
                        <span className="text-[#454947]">Co-op</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="partTime"
                          checked={formData.workTypes.partTime}
                          onChange={handleWorkTypeChange}
                          className="rounded border-[#d1d4d3]"
                        />
                        <span className="text-[#454947]">Part-time</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="fullTime"
                          checked={formData.workTypes.fullTime}
                          onChange={handleWorkTypeChange}
                          className="rounded border-[#d1d4d3]"
                        />
                        <span className="text-[#454947]">Full-time</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <> {/* Show current job section only if not a student */}
                {/* Current job section */}
                <div>
                  {/* Adjust margin below heading */}
                  <h3 className="text-lg font-medium text-[#1b3824] mb-1.5">Where do you currently work?</h3>
                  <p className="text-sm text-[#454947] mb-6">Your company will never see that you're looking for a job</p>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                       {/* Adjusted label margin */}
                      <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                        Job title
                      </label>
                      <Input
                        name="currentJobTitle"
                        value={formData.currentJobTitle}
                        onChange={handleInputChange}
                        placeholder="Enter your current job title"
                        className="border-[#d1d4d3]"
                      />
                    </div>
                    <div>
                       {/* Adjusted label margin */}
                      <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                        Company
                      </label>
                      <Input
                        name="currentCompany"
                        value={formData.currentCompany}
                        onChange={handleInputChange}
                        placeholder="Enter your company name"
                        className="border-[#d1d4d3]"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="notCurrentlyEmployed"
                      className="rounded border-[#d1d4d3]"
                    />
                    <span className="text-[#454947]">I'm not currently employed</span>
                  </label>
                </div>

                {/* Social links */}
                <div className="bg-[#f5f7f7] p-6 rounded-lg space-y-5"> {/* Changed space-y-6 to space-y-5 */}
                  <div>
                     {/* Adjusted label margin */}
                    <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                      LinkedIn profile
                    </label>
                    <Input
                      name="linkedInProfile"
                      value={formData.linkedInProfile}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/"
                      className="border-[#d1d4d3]"
                    />
                  </div>
                  <div>
                     {/* Adjusted label margin */}
                    <label className="block text-sm font-medium text-[#1b3824] mb-1.5">
                      Portfolio
                    </label>
                    <Input
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://portfolio.com"
                      className="border-[#d1d4d3]"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end pt-4"> {/* Added pt-4 */}
              <Button
                type="submit"
                className="bg-[#2f583f] text-white hover:bg-[#454947] px-4 py-2 rounded-xl" /* Applied correct hover color */
              >
                Create your profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
