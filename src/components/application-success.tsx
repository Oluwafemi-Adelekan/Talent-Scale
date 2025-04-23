import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { CheckCircle } from 'lucide-react';
import { RequirementsCard } from './requirements-card';
// Import JobListing type from static data
import { JobListing } from '../data/job-listings';

interface ApplicationSuccessProps {
  job: JobListing | null; // Use JobListing type
  applicationId: string;
  submittedDate: string;
  onExploreMore: () => void;
}

export const ApplicationSuccess = ({
  job,
  applicationId,
  submittedDate,
  onExploreMore
}: ApplicationSuccessProps) => {

  // Handle null job case
  if (!job) {
    // Optionally return a loading state or minimal message
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[90vh]">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Use companyLogoSrc and company from JobListing type */}
              <div className={`flex w-16 h-16 items-center justify-center p-1 ${job.companyLogoBg || 'bg-gray-200'} rounded-full overflow-hidden flex-shrink-0`}>
                {job.companyLogoSrc ? (
                  <img
                    src={job.companyLogoSrc}
                    alt={`${job.company} logo`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-500 text-xs">Logo</span> // Fallback if no src
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#1b3824] mb-1">You have applied for the {job.title} role</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-[#fef6ee] text-[#f1a656] border-0">
                    Application sent
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Location info - Use job.location */}
          <div className="flex items-center gap-2 text-sm text-[#454947] mb-6">
            <span>{job.location}</span>
            {/* Remove hardcoded details */}
            {/* <span>Remote • Entry Level • Anywhere in the world</span> */}
          </div>

          {/* Tabs */}
          <div className="border-b border-[#e8eaea]">
            <div className="flex gap-4">
              <button className="px-4 py-2 -mb-px border-b-2 border-[#2f583f] text-[#1b3824] font-medium">
                Job details
              </button>
              <button className="px-4 py-2 -mb-px text-[#454947] hover:text-[#1b3824]">
                Apply for this role
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area with the same grid layout */}
      <div className="flex-1 overflow-y-auto no-scrollbar pt-[220px]">
        <div className="max-w-[1200px] mx-auto w-full px-6">
          <div className="grid grid-cols-[700px_32px_390px]">
            {/* Left Content */}
            <div className="col-span-1 flex flex-col items-center justify-center text-center px-8">
              <div className="w-12 h-12 bg-[#edf8f0] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-[#2f583f]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1b3824] mb-2">
                Your application was successfully submitted!
              </h2>
              <p className="text-[#454947] mb-8">
                Your application for the {job.title} position has been successfully submitted to {job.company}.
                <br />
                We'll notify you when they review your application.
              </p>

              <div className="w-full max-w-xl border border-[#e8eaea] rounded-xl p-6 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  {/* Use companyLogoSrc and company */}
                  <div className={`w-12 h-12 ${job.companyLogoBg || 'bg-gray-200'} rounded-xl flex items-center justify-center flex-shrink-0`}>
                     {job.companyLogoSrc ? (
                       <img
                         src={job.companyLogoSrc}
                         alt={`${job.company} logo`}
                         className="w-8 h-8 object-contain"
                       />
                      ) : (
                        <span className="text-gray-500 text-xs">Logo</span>
                      )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-[#1b3824]">{job.title}</h3>
                    <p className="text-sm text-[#454947]">{job.company}</p>
                  </div>
                </div>

                <div className="flex justify-between text-sm mb-4">
                  <span className="text-[#454947]">Application ID</span>
                  <span className="text-[#1b3824] font-medium">{applicationId}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#454947]">Submitted on</span>
                  <span className="text-[#1b3824] font-medium">{submittedDate}</span>
                </div>

                <Separator className="my-6" />

                <div className="text-left">
                  <h4 className="font-medium text-[#1b3824] mb-4">Next steps:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-[#454947]">
                    <li>{job.company} will review your application</li>
                    <li>You'll receive an email confirmation shortly</li>
                    <li>If selected, you'll be contacted for an initial interview</li>
                  </ol>
                </div>
              </div>

              <Button
                onClick={onExploreMore}
                className="bg-[#2f583f] text-white hover:bg-[#2f583f]/90"
              >
                Explore more jobs
              </Button>
            </div>

            {/* Spacer column */}
            <div className="col-span-1"></div>

            {/* Right Side Card */}
            <div className="col-span-1">
              <div className="pt-0 mt-0">
                {/* Pass the JobListing object to RequirementsCard */}
                <RequirementsCard
                  job={job} // Assuming RequirementsCard is also updated or handles the JobListing type
                  showCompanyOverview={true}
                  showActions={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
