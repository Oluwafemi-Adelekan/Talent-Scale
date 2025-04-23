import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Check, UploadCloud, FileText, X as CloseIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

// Define state for the Resume/CV page
export const ResumeCVPage: React.FC = () => {
  // Simulate file upload state
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; progress: number } | null>(null);
  // Simulate upload progress
  const [isUploading, setIsUploading] = useState(false);

  const { markStepCompleted, setCurrentStep } = useAuth(); // Use AuthContext
  const navigate = useNavigate();

  // Simulate file upload handler
  const handleFileUpload = () => {
    // In a real app, this would handle the actual file selection and upload process
    setIsUploading(true);
    setUploadedFile({ name: 'Resume.pdf', size: '140 kb', progress: 0 });

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress <= 100) {
        setUploadedFile(prev => prev ? { ...prev, progress } : null);
      } else {
        clearInterval(interval);
        setIsUploading(false);
         // Set progress to 80% as shown in the design after "upload"
         setUploadedFile(prev => prev ? { ...prev, progress: 80 } : null);
      }
    }, 300);
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploading(false); // Reset uploading state if needed
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Resume/CV step submitted. File:', uploadedFile);
    // Mark step as completed, set next step, and navigate
    markStepCompleted('resume-cv');
    setCurrentStep('email-verification');
    navigate('/email-verification');
  };

  const handleSkip = () => {
     console.log('Skipped Resume/CV step.');
     // Mark step as completed (even if skipped), set next step, and navigate
     markStepCompleted('resume-cv');
     setCurrentStep('email-verification');
     navigate('/email-verification');
  }

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
                {/* Resume/CV Step - Active */}
                <li className="flex items-start gap-4">
                  <div>
                    <div className="w-10 h-10 bg-[#2f583f] rounded-full flex items-center justify-center text-white"> {/* Active Style */}
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
            <h1 className="text-3xl font-bold text-[#1b3824] mb-1 text-center">Upload a recent resume or CV</h1>
            <p className="text-[#454947] text-center">
              Showcase your experience and skills to stand out to employers.
            </p>
          </div>

          {/* Form Content - Apply consistent spacing */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-8 pb-12">

            {/* File Upload Area - Always visible */}
            <div
              onClick={!uploadedFile ? handleFileUpload : undefined} // Only trigger upload if no file exists
              className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-colors ${!uploadedFile ? 'border-gray-300 hover:border-gray-400 cursor-pointer' : 'border-gray-200 bg-gray-50 cursor-default'}`} // Adjust style when file is present
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <UploadCloud className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm font-medium text-[#2f583f] mb-1">
                Click to upload resume <span className="text-[#454947] font-normal">or drag and drop</span>
              </p>
              <p className="text-xs text-gray-500">
                .pdf, .doc, .docx, .rtf, .wp or .txt file
              </p>
            </div>

            {/* Uploaded File Display - Render below dropzone */}
            {uploadedFile && (
              <div className="border border-[#e8eaea] rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-100 flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1b3824] truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-[#454947] mb-1">{uploadedFile.size}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-[#32AD5F] h-1.5 rounded-full transition-all duration-300 ease-linear"
                      style={{ width: `${uploadedFile.progress}%` }}
                    ></div>
                  </div>
                </div>
                {/* Show checkmark when progress is "complete" (simulated as 80% here) */}
                {uploadedFile.progress >= 80 && !isUploading ? (
                   <Check className="w-5 h-5 text-[#32AD5F] flex-shrink-0" />
                ) : (
                   <span className="text-xs text-gray-500 flex-shrink-0">{uploadedFile.progress}%</span>
                )}
                <button type="button" onClick={handleRemoveFile} className="p-1 text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Buttons: Back, Skip and Save - Adjust layout */}
            <div className="flex justify-between items-center pt-4"> {/* Changed justify-end to justify-between */}
               {/* Back Button */}
               <Button
                 type="button"
                 variant="outline"
                 onClick={() => navigate('/culture')} // Navigate back to Culture
                 className="border-[#d1d4d3] text-[#454947] hover:bg-gray-100 px-4 py-2 rounded-xl"
               >
                 Back
               </Button>
               {/* Skip and Save/Continue Group */}
               <div className="flex items-center gap-1.5">
                 <Button
                   type="button"
                   variant="outline"
                   onClick={handleSkip}
                   className="border-[#d1d4d3] text-[#454947] hover:bg-gray-100 px-4 py-2 rounded-xl"
                 >
                   Skip for now
                 </Button>
                <Button
                  type="submit"
                  className="bg-[#2f583f] text-white hover:bg-[#454947] px-4 py-2 rounded-xl" // Corrected hover state
                  disabled={!uploadedFile || isUploading} // Disable if no file or uploading
                >
                  Save and continue
                </Button>
               </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
