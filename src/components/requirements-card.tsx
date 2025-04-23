import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { BookmarkPlusIcon, CheckCircle2, BookmarkMinus } from 'lucide-react';
import { useJobs } from '../context/JobsContext'; // Keep useJobs for save/unsave
import { JobListing } from '../data/job-listings'; // Import JobListing type
import { Card, CardContent } from './ui/card';
import { MapPinIcon } from 'lucide-react';

// Remove local Job interface definition

interface RequirementsCardProps {
  job: JobListing | null; // Use JobListing type
  showCompanyOverview?: boolean;
  showActions?: boolean;
  showApplyButton?: boolean;
  setActiveTab?: (tab: string) => void;
}

export function RequirementsCard({
  job,
  showCompanyOverview = true,
  showActions = true,
  showApplyButton = true,
  setActiveTab,
}: RequirementsCardProps) {
  const { isJobSaved, saveJob, unsaveJob } = useJobs();

  // Handle null job case
  if (!job) {
    return (
      <Card className="w-[390px] border border-[#E5E7EB] rounded-lg">
        <CardContent className="p-6">
          <p>Loading requirements...</p>
        </CardContent>
      </Card>
    );
  }

  const isSaved = isJobSaved(job.id);

  return (
    <Card className="w-[390px] border border-[#E5E7EB] rounded-lg">
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-[#1b3824]">Requirements match</h3>
          {showActions && (
            <Button
              variant="outline"
              size="sm"
              // Update classes for default and saved states
              className={`border flex items-center justify-center gap-1.5 transition-colors rounded-md ${ // Added rounded-md for consistency
                isSaved
                  ? 'border-[#f1a656] text-[#f1a656] bg-[#fef6ee] hover:bg-[#fef6ee]/90' // Saved state
                  : 'border-[#d1d4d3] bg-white text-[#454947] hover:bg-[#e8eaea]' // Default state
              }`}
              onClick={() => (isSaved ? unsaveJob(job.id) : saveJob(job.id))}
            >
              {isSaved ? <BookmarkMinus className="w-3.5 h-3.5" /> : <BookmarkPlusIcon className="w-3.5 h-3.5" />}
              <span className="text-xs">{isSaved ? 'Remove' : 'Save'}</span>
            </Button>
          )}
        </div>

        {/* Remove Match Percentage Badge - not available in Job type */}
        {/* <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-[#E8EAEA] text-[#32AD5F] border-0 rounded-[4px]">
            {job.matchPercentage || '100%'} match
          </Badge>
        </div> */}

        {/* Placeholder Requirements - Replace with actual data if available from API */}
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#32AD5F] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#1b3824]">Required knowledge of English</p>
              <p className="text-sm text-[#454947]">Your level: Fluent/Advanced</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#32AD5F] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#1b3824]">Office or remote</p>
              <p className="text-sm text-[#454947]">Your profile: Remote only</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#32AD5F] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#1b3824]">Countries of Europe or North America</p>
              <p className="text-sm text-[#454947]">Your profile: Canada</p>
            </div>
          </div>
        </div>

        {/* Apply button moved below Company Overview */}
        {/* {showApplyButton && (
          <Button
            variant="default"
            className="w-full bg-[#2f583f] text-white hover:bg-[#2f583f]/90"
            onClick={() => setActiveTab?.("application")}
          >
            Apply now
          </Button>
        )} */}

        {showCompanyOverview && (
          <>
            <Separator className="bg-[#E5E7EB]" />
            <div>
              <h3 className="text-lg font-semibold text-[#1b3824] mb-4">Company overview</h3>
              <div className="space-y-4">
            {/* Website - Use a placeholder or construct if needed */}
            <div>
              <p className="text-sm font-medium text-[#1b3824] mb-2">Website</p>
              {/* Static data doesn't have a website URL, add placeholder */}
              <span className="text-sm text-[#454947]">Not provided</span>
              {/* Or construct a guess:
               <a
                 href={`https://www.${job.company.toLowerCase().replace(/[^a-z0-9]/gi, '')}.com`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-sm text-[#2f583f] hover:underline break-all"
               >
                 www.{job.company.toLowerCase().replace(/[^a-z0-9]/gi, '')}.com (guessed)
               </a>
              */}
            </div>
            {/* Location - Use job.location */}
            <div>
              <p className="text-sm font-medium text-[#1b3824] mb-2">Location</p>
              <p className="text-sm text-[#454947]">{job.location}</p>
            </div>
            {/* Office Locations - Use job.officeLocations */}
            {job.officeLocations && job.officeLocations.length > 0 && (
              <div>
                <p className="text-sm font-medium text-[#1b3824] mb-2">Office locations</p>
                <p className="text-sm text-[#454947]">{job.officeLocations.join(', ')}</p>
              </div>
            )}
            {/* Company Size - Use job.teamSize */}
            {job.teamSize && (
              <div>
                <p className="text-sm font-medium text-[#1b3824] mb-2">Company size</p>
                <p className="text-sm text-[#454947]">{job.teamSize}</p>
              </div>
            )}
            {/* Company Type - Placeholder or derive */}
            <div>
              <p className="text-sm font-medium text-[#1b3824] mb-2">Company type</p>
              <div className="flex flex-wrap gap-2">
                {/* Add logic to derive type or use placeholder */}
                <Badge variant="secondary" className="bg-[#E8EAEA] text-[#454947] rounded-[4px] hover:bg-[#E8EAEA]">
                  Technology {/* Placeholder */}
                </Badge>
                <Badge variant="secondary" className="bg-[#E8EAEA] text-[#454947] rounded-[4px] hover:bg-[#E8EAEA]">
                  Software development {/* Placeholder */}
                </Badge>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Apply button rendered at the bottom */}
        {showApplyButton && (
          <Button
            variant="default"
            className="w-full bg-[#2f583f] text-white hover:bg-[#2f583f]/90"
            onClick={() => setActiveTab?.("application")}
          >
            Apply now
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
