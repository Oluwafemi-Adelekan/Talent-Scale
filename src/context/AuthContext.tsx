import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

// Define the possible steps in the onboarding flow
export type OnboardingStep =
  | 'create-profile'
  | 'preferences'
  | 'culture'
  | 'resume-cv'
  | 'email-verification'
  | 'processing'
  | 'complete'; // 'complete' signifies the end of onboarding

interface AuthContextType {
  completedSteps: Set<OnboardingStep>;
  markStepCompleted: (step: OnboardingStep) => void;
  currentStep: OnboardingStep; // Track the latest completed step or starting point
  setCurrentStep: (step: OnboardingStep) => void; // Allow setting the current step directly if needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize with 'create-profile' as completed if user starts there, or adjust as needed
  const [completedSteps, setCompletedSteps] = useState<Set<OnboardingStep>>(new Set());
  // Assume the flow starts before 'create-profile' or adjust initial state if needed
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('create-profile'); // Default starting point

  const markStepCompleted = useCallback((step: OnboardingStep) => {
    setCompletedSteps((prevSteps) => new Set(prevSteps).add(step));
    // Optionally, update currentStep automatically based on flow logic
    // For now, let pages handle setting the next currentStep or navigating
  }, []);

  const value = {
    completedSteps,
    markStepCompleted,
    currentStep,
    setCurrentStep,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
