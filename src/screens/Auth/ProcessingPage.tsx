import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

// Define the steps shown during processing
const processingSteps = [
  'Categories & salary',
  'Experience',
  'Availability',
  'Matching location',
  'Matching preferences',
];

export const ProcessingPage: React.FC = () => {
  const [progress, setProgress] = useState(30); // Start at 30% as per design
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Start checking first item
  const [isComplete, setIsComplete] = useState(false);
  const { markStepCompleted, setCurrentStep } = useAuth(); // Use AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate progress and step completion
    const totalSteps = processingSteps.length;
    const progressIncrement = (100 - 30) / totalSteps; // Progress needed per step
    let step = 0;
    let currentProgress = 30;

    const interval = setInterval(() => {
      currentProgress += progressIncrement / 4; // Increase progress gradually within a step duration
      currentProgress = Math.min(currentProgress, 100); // Cap at 100
      setProgress(currentProgress);

      // Determine which step should be checked based on progress
      const nextStepIndex = Math.floor((currentProgress - 30) / progressIncrement);
      setCurrentStepIndex(Math.min(nextStepIndex, totalSteps -1));


      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsComplete(true);
        setCurrentStepIndex(totalSteps); // Ensure all steps are marked done
        markStepCompleted('processing'); // Mark processing step complete in context
      }
    }, 250); // Adjust interval speed as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleDone = () => {
    console.log('Processing complete, navigating to main app...');
    markStepCompleted('complete'); // Mark the entire onboarding as complete
    setCurrentStep('complete'); // Set final state
    // Navigate to the main application area, e.g., '/jobs' or '/dashboard'
    navigate('/jobs');
  };

  return (
    // Main container with gradient background attempt
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-radial from-teal-100/30 via-white to-white relative overflow-hidden">
       {/* Top-left gradient circle */}
       <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-cyan-200/40 to-transparent blur-3xl opacity-50"></div>
       {/* Bottom-right gradient circle */}
       <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-cyan-200/40 to-transparent blur-3xl opacity-50"></div>

      {/* Content */}
      <div className="text-center z-10 max-w-md w-full px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/Logo.png" alt="Talent Scale" className="h-8" />
        </div>

        {/* Titles */}
        <h1 className="text-3xl font-bold text-[#1b3824] mb-2">Welcome to Talent Scale</h1>
        <p className="text-[#454947] mb-10">Matching you with jobs based on your profile</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-[#32AD5F] h-2 rounded-full transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mb-8 text-right">{Math.round(progress)}%</p>

        {/* Processing Steps */}
        <ul className="space-y-4 text-left mb-12">
          {processingSteps.map((step, index) => (
            <li key={step} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                index <= currentStepIndex ? 'border-[#32AD5F]' : 'border-gray-300'
              }`}>
                {index <= currentStepIndex && (
                  <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index < currentStepIndex || isComplete ? 'bg-[#32AD5F]' : 'bg-gray-300' // Fill when fully completed or isComplete
                  }`}></div>
                )}
              </div>
              <span className={`transition-colors duration-300 ${index <= currentStepIndex ? 'text-[#1b3824]' : 'text-gray-400'}`}>
                {step}
              </span>
            </li>
          ))}
        </ul>

        {/* Done Button */}
        {isComplete && (
          <Button
            onClick={handleDone}
            className="bg-[#2f583f] text-white hover:bg-[#454947] px-8 py-2 rounded-lg" // Corrected hover state
          >
            Done
          </Button>
        )}
      </div>

       {/* Low opacity logo at bottom right */}
       <img src="/Logo low opacity.png" alt="" className="absolute bottom-10 right-10 w-32 opacity-50 z-0" />
    </div>
  );
};
