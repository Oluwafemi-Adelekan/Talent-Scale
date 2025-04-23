import {
  BellIcon,
  BriefcaseIcon,
  FolderCheckIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MailIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon, // Added for profile steps
  FileTextIcon, // Added for resume
  CheckCircleIcon, // Added for verification/completion
  HeartIcon, // Added for preferences/culture
  LoaderIcon, // Added for processing
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import { useAuth, OnboardingStep } from "../../../../context/AuthContext"; // Import useAuth and OnboardingStep
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";

// Define the onboarding steps relevant for navigation
const onboardingNavSteps: { step: OnboardingStep; path: string; label: string; icon: JSX.Element }[] = [
  { step: 'create-profile', path: '/create-profile', label: 'Create Profile', icon: <UserIcon className="w-4 h-4" /> },
  { step: 'preferences', path: '/preferences', label: 'Preferences', icon: <HeartIcon className="w-4 h-4" /> },
  { step: 'culture', path: '/culture', label: 'Culture Fit', icon: <HeartIcon className="w-4 h-4" /> }, // Assuming same icon for now
  { step: 'resume-cv', path: '/resume-cv', label: 'Resume/CV', icon: <FileTextIcon className="w-4 h-4" /> },
  { step: 'email-verification', path: '/email-verification', label: 'Verification', icon: <CheckCircleIcon className="w-4 h-4" /> },
  // 'processing' might not need a nav link, depends on UX
  // 'complete' signifies end, maybe redirect to dashboard?
];

// Define standard navigation items
const standardNavItems = [
   { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon className="w-4 h-4" /> }, // Assuming a dashboard route exists or will be added
   { path: '/jobs', label: 'Jobs', icon: <BriefcaseIcon className="w-4 h-4" /> }, // Assuming '/jobs' is the main job listing path within Desktop
   { path: '/applied', label: 'Applied', icon: <FolderCheckIcon className="w-4 h-4" /> }, // Assuming an '/applied' route
];


export const NavigationBarSection = (): JSX.Element => {
  const { completedSteps } = useAuth();

  // Determine the highest completed step index to allow navigation up to that point + 1 (the current step)
  // Or simply check if 'create-profile' is done to show any onboarding nav
  const canShowOnboardingNav = completedSteps.has('create-profile'); // Basic check: show onboarding nav once profile starts

  const bottomNavigationItems = [
    { path: '/messages', icon: <MailIcon className="w-4 h-4" />, label: "Messages" }, // Added path
    { path: '/notifications', icon: <BellIcon className="w-4 h-4" />, label: "Notifications" }, // Added path
    { path: '/settings', icon: <SettingsIcon className="w-4 h-4" />, label: "Settings" }, // Added path
  ];

  // Helper function to determine if a step should be navigable
  // Allows navigation to the current step and any previously completed steps.
  const isStepNavigable = (stepToCheck: OnboardingStep): boolean => {
      const stepIndex = onboardingNavSteps.findIndex(s => s.step === stepToCheck);
      if (stepIndex === -1) return false; // Should not happen

      // Find the index of the latest completed step shown in nav
      let latestCompletedIndex = -1;
      onboardingNavSteps.forEach((navStep, index) => {
          if (completedSteps.has(navStep.step)) {
              latestCompletedIndex = Math.max(latestCompletedIndex, index);
          }
      });

      // Allow navigation if the step is the next one after the latest completed, or any before it.
      return stepIndex <= latestCompletedIndex + 1;
  };


  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-solid border-[#e8eaea] p-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <img className="w-6 h-6" alt="Logo" src="/logos---stitches-logo.svg" />
        <span className="font-h-4 font-[number:var(--h-4-font-weight)] text-[#1b3824] text-[length:var(--h-4-font-size)] tracking-[var(--h-4-letter-spacing)] leading-[var(--h-4-line-height)] [font-style:var(--h-4-font-style)]">
          Talent Scale
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center px-3 py-2 rounded-md border border-solid border-[#d1d4d3] mb-6">
        <Input
          className="border-0 shadow-none p-0 h-auto font-p-ui font-[number:var(--p-ui-font-weight)] text-[#454947] text-[length:var(--p-ui-font-size)] tracking-[var(--p-ui-letter-spacing)] leading-[var(--p-ui-line-height)] [font-style:var(--p-ui-font-style)] focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search"
        />
        <SearchIcon className="w-4 h-4 text-[#454947]" />
      </div>

      {/* Main navigation - Standard Links */}
       <nav className="flex flex-col gap-1 mb-6">
         {standardNavItems.map((item) => (
           <NavLink
             key={item.path}
             to={item.path}
             className={({ isActive }) =>
               `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                 isActive
                   ? "bg-[#2f583f] text-white"
                   : "text-[#454947] hover:bg-[#2f583f]/5"
               }`
             }
           >
             {item.icon}
             <span className="font-body-medium font-[number:var(--body-medium-font-weight)] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] [font-style:var(--body-medium-font-style)]">
               {item.label}
             </span>
           </NavLink>
         ))}
       </nav>

       {/* Onboarding Navigation (Conditionally Rendered) */}
       {canShowOnboardingNav && (
         <>
           <Separator className="my-3" />
           <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Onboarding</p>
           <nav className="flex flex-col gap-1 mb-6">
             {onboardingNavSteps.map((item) => (
               isStepNavigable(item.step) && ( // Only render if navigable
                 <NavLink
                   key={item.path}
                   to={item.path}
                   className={({ isActive }) =>
                     `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                       isActive
                         ? "bg-[#2f583f] text-white" // Active style
                         : completedSteps.has(item.step)
                         ? "text-[#1b3824] hover:bg-[#2f583f]/10" // Completed style
                         : "text-[#454947] hover:bg-[#2f583f]/5" // Default style for current/next step
                     } ${!completedSteps.has(item.step) && !isStepNavigable(item.step) ? 'opacity-50 cursor-not-allowed' : ''}` // Optional: Dim/disable future steps visually
                   }
                   // Prevent navigation to future steps if needed (though isStepNavigable handles rendering)
                   onClick={(e) => { if (!isStepNavigable(item.step)) e.preventDefault(); }}
                 >
                   {item.icon}
                   <span className="font-body-medium font-[number:var(--body-medium-font-weight)] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] [font-style:var(--body-medium-font-style)]">
                     {item.label}
                   </span>
                 </NavLink>
               )
             ))}
           </nav>
         </>
       )}


      <div className="flex-1" />

      {/* Bottom navigation - Using NavLink */}
      <div className="flex flex-col gap-1">
         {bottomNavigationItems.map((item) => (
           <NavLink // Changed to NavLink
             key={item.path}
             to={item.path} // Use path for navigation
             className={({ isActive }) => // Use isActive for styling
               `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                 isActive
                   ? "bg-[#2f583f] text-white"
                   : "text-[#454947] hover:bg-[#2f583f]/5"
               }`
             }
           >
             {item.icon}
             <span className="font-body-medium font-[number:var(--body-medium-font-weight)] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] [font-style:var(--body-medium-font-style)]">
               {item.label}
             </span>
           </NavLink> // Changed to NavLink
         ))}

        <Separator className="my-3" />

        {/* Profile */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="font-body-medium font-[number:var(--body-medium-font-weight)] text-[#1b3824] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] [font-style:var(--body-medium-font-style)]">
              Phillip Franci
            </span>
            <span className="font-detail font-[number:var(--detail-font-weight)] text-[#454947] text-[length:var(--detail-font-size)] tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] [font-style:var(--detail-font-style)]">
              phillip@example.com
            </span>
          </div>
          <LogOutIcon className="w-4 h-4 text-[#454947] hover:text-[#2f583f] transition-colors cursor-pointer ml-auto" />
        </div>
      </div>
    </div>
  );
};
