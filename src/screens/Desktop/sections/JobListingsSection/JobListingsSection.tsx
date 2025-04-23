import {
  ArrowUpDownIcon,
  BookmarkPlusIcon,
  BookmarkMinus, // Import BookmarkMinus
  MapPinIcon,
  SearchIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { JobDetailsOverlay } from "../../../../components/ui/job-details-overlay";
// Assuming JobDetailsContent is used within JobDetailsOverlay and doesn't need direct import here
// import { JobDetailsContent } from "../../../../components/job-details-content";
// Import static data and its type
import { JobListing, jobListings as initialJobListings } from "../../../../data/job-listings";
import { useJobs } from '../../../../context/JobsContext'; // Keep useJobs for context functions


export const JobListingsSection = (): JSX.Element => {
  // Get functions and state from context, but ignore jobs, isLoading, error for list rendering
  const {
    // jobs, // Don't use jobs from context for the list
    // isLoading, // Don't use isLoading from context
    // error, // Don't use error from context
    activeTab,
    setActiveTab,
    isJobSaved,
    markJobAsApplied,
    unsaveJob,
    saveJob,
    savedJobs
  } = useJobs();

  // Use static data for the list, explicitly typed with the imported JobListing
  const [jobListings] = useState<JobListing[]>(initialJobListings);

  // State for active filters
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  // Update selectedJob state to use the imported JobListing type
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  // Function to handle filter selection
  const handleFilterSelect = (filterId: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  // Function to reset filters
  const handleResetFilters = () => {
    setActiveFilters({});
  };

  // Function to handle job card click (parameter uses imported JobListing)
  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job);
  };

  // Function to close job details
  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  // Filter jobs based on active filters and active tab (parameter uses imported JobListing)
  const filterJobs = (jobsToFilter: JobListing[]) => {
    let filteredJobs = jobsToFilter.filter(job => {
      // Filtering based on static data fields
      if (activeFilters.seniority && job.level !== activeFilters.seniority) return false;
      if (activeFilters.employment && job.employmentType !== activeFilters.employment) return false;
      if (activeFilters.location && job.locationType !== activeFilters.location) return false;

      // Example: Basic text search in title or company (if search input were connected)
      // const searchTerm = activeFilters.search?.toLowerCase() || '';
      // if (searchTerm && !(job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm))) {
      //   return false;
      // }

      return true; // Return true if passes all filters
    });

    // Filter based on active tab (using context's savedJobs list of IDs)
    if (activeTab === 'saved') {
      // Create a Set of saved job IDs for efficient lookup
      const savedJobIds = new Set(savedJobs);
      // Filter the static jobListings array - Ensure ID types match (number vs string/number)
      // The context uses (string | number), static data uses number. Convert for comparison.
      filteredJobs = filteredJobs.filter(job => savedJobIds.has(job.id));
    }

    return filteredJobs;
  };

  // Filter options with their dropdown items (Keep UI, but filtering logic needs adjustment)
  const filterOptions = [
    {
      id: "date",
      label: "Date posted",
      icon: <ArrowUpDownIcon className="w-4 h-4" />,
      items: ["Last 24 hours", "Last week", "Last month", "Any time"],
    },
    {
      id: "location",
      label: "Location type",
      icon: <ArrowUpDownIcon className="w-4 h-4" />,
      items: ["Remote", "On-site", "Hybrid"],
    },
    {
      id: "seniority",
      label: "Seniority",
      icon: <ArrowUpDownIcon className="w-4 h-4" />,
      items: ["Entry Level", "Mid Level", "Senior Level", "Lead", "Executive"],
    },
    {
      id: "employment",
      label: "Employment type",
      icon: <ArrowUpDownIcon className="w-4 h-4" />,
      items: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
    },
    {
      id: "company",
      label: "Company",
      icon: <ArrowUpDownIcon className="w-4 h-4" />,
      items: ["Startups", "Mid-size", "Enterprise", "Fortune 500"],
    },
  ];

  const handleApplicationSubmit = (data: any) => {
    if (selectedJob) {
      markJobAsApplied(selectedJob.id);
      // Here you would typically send the application data to your backend
      console.log('Application submitted:', data);
    }
  };

  // Keep useEffect for context-related actions if needed, but not for setting jobListings

  return (
    <section className="flex flex-col h-full">
      {/* Fixed header section */}
      <div className="flex-none">
        {/* Header */}
        <header className="flex items-start gap-1.5 p-6 bg-white">
          <div className="flex flex-col items-start gap-1.5 flex-1">
            <h2 className="font-card-title font-[number:var(--card-title-font-weight)] text-[#1b3824] text-[length:var(--card-title-font-size)] tracking-[var(--card-title-letter-spacing)] leading-[var(--card-title-line-height)] [font-style:var(--card-title-font-style)]">
              Jobs
            </h2>
            <p className="font-subtle font-[number:var(--subtle-font-weight)] text-[#454947] text-[length:var(--subtle-font-size)] tracking-[var(--subtle-letter-spacing)] leading-[var(--subtle-line-height)] [font-style:var(--subtle-font-style)]">
              Discover opportunities tailored to your skills and preferences.
            </p>
          </div>
        </header>

        {/* Tab navigation */}
        <div className="flex items-center gap-2.5 px-6 py-1 bg-white">
          <ToggleGroup
            type="single"
            value={activeTab}
            onValueChange={(value) => {
              if (value) setActiveTab(value as 'for-you' | 'browse' | 'saved');
            }}
            className="h-auto bg-[#E5E7EB] rounded-md p-[5px]"
          >
            <ToggleGroupItem
              value="for-you"
              className="px-2 py-1 rounded-[4px] text-xs font-medium data-[state=on]:bg-white data-[state=on]:text-[#2f583f] data-[state=off]:text-[#454947] hover:bg-white/90 data-[state=off]:hover:text-gray-900 transition-colors data-[state=on]:shadow-sm"
            >
              For you
            </ToggleGroupItem>
            <ToggleGroupItem
              value="browse"
              className="px-2 py-1 rounded-[4px] text-xs font-medium data-[state=on]:bg-white data-[state=on]:text-[#2f583f] data-[state=off]:text-[#454947] hover:bg-white/90 data-[state=off]:hover:text-gray-900 transition-colors data-[state=on]:shadow-sm"
            >
              Browse all
            </ToggleGroupItem>
            <ToggleGroupItem
              value="saved"
              className="px-2 py-1 rounded-[4px] text-xs font-medium data-[state=on]:bg-white data-[state=on]:text-[#2f583f] data-[state=off]:text-[#454947] hover:bg-white/90 data-[state=off]:hover:text-gray-900 transition-colors data-[state=on]:shadow-sm"
            >
              Saved ({savedJobs.length})
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col items-start gap-2.5 px-6 py-4 bg-white">
          {/* Search row */}
          <div className="flex items-start gap-4 self-stretch w-full">
            <div className="flex flex-col items-start gap-1.5 flex-1">
              <div className="flex items-center gap-2 self-stretch w-full">
                <div className="flex flex-col items-start gap-1.5 flex-1">
                  <div className="self-stretch w-full flex items-center px-3 py-2 rounded-md border border-solid border-[#d1d4d3] focus-within:border-[#d1d4d3]">
                    <Input
                      className="border-0 shadow-none p-0 h-auto font-p-ui font-[number:var(--p-ui-font-weight)] text-[#454947] text-[length:var(--p-ui-font-size)] tracking-[var(--p-ui-letter-spacing)] leading-[var(--p-ui-line-height)] [font-style:var(--p-ui-font-style)] focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Job title, skills or company"
                    />
                    <SearchIcon className="w-4 h-4 text-[#454947]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1.5">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-start gap-1.5">
                  <div className="w-[276px] flex items-center px-3 py-2 rounded-md border border-solid border-[#d1d4d3] focus-within:border-[#d1d4d3]">
                    <Input
                      className="border-0 shadow-none p-0 h-auto font-p-ui font-[number:var(--p-ui-font-weight)] text-[#454947] text-[length:var(--p-ui-font-size)] tracking-[var(--p-ui-letter-spacing)] leading-[var(--p-ui-line-height)] [font-style:var(--p-ui-font-style)] focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Location"
                    />
                    <MapPinIcon className="w-4 h-4 text-[#454947]" />
                  </div>
                </div>
              </div>
            </div>

            <Button className="px-4 py-2 bg-[#2f583f] rounded-xl text-[#f5f7f6] font-body-medium hover:bg-[#454947] h-10">
              Search
            </Button>
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-3 self-stretch w-full flex-wrap">
            {filterOptions.map((option) => (
              <div
                key={option.id}
                className="flex flex-col items-start gap-1.5"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md border border-solid ${
                        activeFilters[option.id] 
                          ? 'border-[#2f583f] bg-[#2f583f]/10' 
                          : 'border-[#d1d4d3]'
                      } h-auto hover:bg-[#2f583f]/5 transition-colors`}
                    >
                      <span className={`font-p-ui font-[number:var(--p-ui-font-weight)] ${
                        activeFilters[option.id] 
                          ? 'text-[#2f583f]' 
                          : 'text-[#454947]'
                      } text-[length:var(--p-ui-font-size)] tracking-[var(--p-ui-letter-spacing)] leading-[var(--p-ui-line-height)] [font-style:var(--p-ui-font-style)]`}>
                        {activeFilters[option.id] || option.label}
                      </span>
                      {option.icon}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[200px]">
                    {option.items.map((item) => (
                      <DropdownMenuItem 
                        key={item}
                        onClick={() => handleFilterSelect(option.id, item)}
                        className="cursor-pointer hover:bg-[#2f583f]/5 focus:bg-[#2f583f]/10"
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            <Button
              variant="ghost"
              onClick={handleResetFilters}
              className="font-body-medium font-[number:var(--body-medium-font-weight)] text-slate-900 text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] [font-style:var(--body-medium-font-style)] hover:bg-[#2f583f]/5 transition-colors"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable job listings */}
      <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
        {/* Remove Loading and Error States related to context */}
        <div className="flex flex-col items-start gap-5 min-h-full">
          {/* --- Iterate over static jobListings --- */}
          {filterJobs(jobListings).map((job) => (
            <Card
              key={job.id}
              className="flex flex-col items-start gap-4 p-4 self-stretch w-full bg-[#f5f7f6] rounded-xl border-none cursor-pointer hover:bg-[#f5f7f6]/80 transition-colors"
              onClick={() => handleJobClick(job)}
            >
              <CardContent className="p-0 space-y-4 w-full">
                {/* Header with company info - Use JobListing fields */}
                <div className="flex items-start gap-2 self-stretch w-full">
                  {/* Logo: Use correct property names from JobListing type */}
                  <div
                    className={`flex w-16 h-16 items-center justify-center p-1 ${job.companyLogoBg} rounded-full overflow-hidden flex-shrink-0`} // Use companyLogoBg
                  >
                    <img
                      className="w-full h-full object-contain"
                      alt={`${job.company} logo`}
                      src={job.companyLogoSrc} // Use companyLogoSrc
                    />
                  </div>

                  <div className="flex flex-col items-start gap-0.5 flex-1">
                    <div className="inline-flex items-center gap-1 flex-wrap">
                      <h3 className="font-h-4 font-[number:var(--h-4-font-weight)] text-[#1b3824] text-[length:var(--h-4-font-size)] tracking-[var(--h-4-letter-spacing)] leading-[var(--h-4-line-height)] [font-style:var(--h-4-font-style)]">
                        {job.title} {/* Use job.title */}
                      </h3>
                      {/* Restore postedTime from static data */}
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#454947] text-xs leading-4"> • </span>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#454947] text-xs leading-4"> {job.postedTime} </span>
                    </div>

                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#1b3824] text-xs leading-4">
                      {job.company} {/* Use job.company */}
                    </span>

                    {/* Restore Level, Employment Type, Location Type from static data */}
                    <div className="inline-flex items-center gap-1">
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#454947] text-xs leading-4">
                        {job.level}
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#454947] text-xs leading-4"> • </span>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#454947] text-xs leading-4">
                        {job.employmentType}
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#454947] text-xs leading-4"> • </span>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#454947] text-xs leading-4">
                        {job.locationType}
                      </span>
                    </div>
                  </div>

                  {/* Restore Match Percentage Badge from static data */}
                  <div className="inline-flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-[#e8eaea] rounded-full border-transparent px-2.5 py-0.5 flex items-center gap-2"
                    >
                      <img
                        className="w-[5.07px] h-[5.07px]"
                        alt="Match indicator"
                        src="/vector.svg"
                      />
                      <span className="font-badge font-[number:var(--badge-font-weight)] text-green-600 text-[length:var(--badge-font-size)] tracking-[var(--badge-letter-spacing)] leading-[var(--badge-line-height)] [font-style:var(--badge-font-style)]">
                        {job.matchPercentage}
                      </span>
                    </Badge>
                  </div>
                </div>

                {/* Job description - Use description from static data */}
                <p className="font-detail font-[number:var(--detail-font-weight)] text-[#1b3824] text-[length:var(--detail-font-size)] tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] [font-style:var(--detail-font-style)]">
                  {job.description} {/* Use job.description */}
                </p>

                {/* Restore Skills Badges from static data */}
                <div className="flex flex-wrap items-center gap-[8px_8px]">
                  {job.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-[#e8eaea] text-[#2f583f] px-2.5 py-1 rounded [font-family:'Inter',Helvetica] font-normal text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Footer with location and actions - Use JobListing fields */}
                <div className="flex items-end justify-between self-stretch w-full">
                  {/* Location */}
                  <div className="inline-flex items-center gap-1">
                    <MapPinIcon className="w-5 h-5 text-[#454947]" />
                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#454947] text-xs leading-4">
                      {job.location} {/* Use job.location */}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="inline-flex items-center gap-3">
                    {/* Save Button - Use context functions */}
                    <Button
                      variant="outline"
                      className={`px-4 py-2 rounded-xl border flex items-center gap-2 transition-colors ${
                        isJobSaved(job.id)
                          ? 'bg-[#fef6ee] text-[#f1a656] border-[#f1a656] hover:bg-[#fef6ee]/90' // Saved state
                          : 'bg-white border-[#d1d4d3] text-[#454947] hover:bg-[#e8eaea]' // Default state
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isJobSaved(job.id)) {
                          unsaveJob(job.id);
                        } else {
                          // Need to convert JobListing to Job for saving, or adjust context
                          // For now, let's assume saveJob can handle just the ID or needs adjustment
                          saveJob(job.id);
                        }
                      }}
                    >
                      {isJobSaved(job.id) ? <BookmarkMinus className="w-4 h-4" /> : <BookmarkPlusIcon className="w-4 h-4" />}
                      <span className="font-body-medium font-[number:var(--body-medium-font-weight)] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] [font-style:var(--body-medium-font-style)]">
                        {isJobSaved(job.id) ? 'Remove' : 'Save'}
                      </span>
                    </Button>
                    {/* Apply Button */}
                    <Button
                      className="px-4 py-2 bg-[#2f583f] rounded-xl text-[#f5f7f6] hover:bg-[#454947] font-body-medium font-[number:var(--body-medium-font-weight)] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] [font-style:var(--body-medium-font-style)]" // Corrected hover
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobClick(job);
                      }}
                    >
                      Apply now
                    </Button>
                  </div>
                </div> {/* End Footer */}
              </CardContent> {/* End CardContent */}
            </Card> // End Card
          ))} {/* End Map */}
        </div> {/* End inner div */}
      </div> {/* End Scrollable Area */}

      {/* Job details overlay - Pass selectedJob (imported JobListing | null) */}
      <JobDetailsOverlay
        isOpen={selectedJob !== null}
        onClose={handleCloseJobDetails}
        job={selectedJob} // Pass the JobListing object or null
        onApplicationSubmit={handleApplicationSubmit}
      />
    </section> // End Section
  );
};
