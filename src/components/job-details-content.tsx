import React, { useState } from 'react';
import { Building2, MapPin, Briefcase, Calendar, BarChart, Bookmark } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { Tab } from './ui/tab';
import { Button } from './ui/button';
import { RequirementsCard } from './requirements-card';
import { ApplicationForm } from './application-form';
// Import JobListing type from static data
import { JobListing } from '../data/job-listings';

interface JobDetailsContentProps {
  job: JobListing | null; // Use JobListing type
  onApplicationSubmit: (data: any) => void;
}

export const JobDetailsContent = ({
  job,
  onApplicationSubmit,
}: JobDetailsContentProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState('details');
  const { isJobSaved, saveJob, unsaveJob } = useJobs();

  // Handle null job case early
  if (!job) {
    return (
      <div className="flex items-center justify-center h-full py-8">
        <p>Select a job to see details.</p>
      </div>
    );
  }

  const isSaved = isJobSaved(job.id); // job is guaranteed non-null here

  const handleSaveToggle = () => {
    // job is guaranteed non-null here
    if (isSaved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  return (
    <div className="bg-white h-full flex flex-col"> {/* Main container */}
      {/* Sticky Header - Removed border-b */}
      <div className="sticky top-0 left-0 right-0 bg-white z-10 pb-0"> {/* Sticky Header Container */}
        <div className="max-w-[1122px] mx-auto px-8"> {/* Header Content Max Width */}
          <div className="flex flex-col items-center text-center pt-4 pb-4"> {/* Header Text Content */}
            {/* Remove Match percentage badge */}
            {/* <div className="mb-1">...</div> */}

            <h1 className="text-2xl font-semibold text-[#1b3824] mb-2">{job.title}</h1>

            {/* Company Name and Logo - Use JobListing fields */}
            <div className="flex items-center gap-2 mb-4">
              {job.companyLogoSrc ? (
                <img src={job.companyLogoSrc} alt={`${job.company} logo`} className="h-8 w-8 rounded-full object-contain bg-gray-100" />
              ) : (
                <div className={`h-8 w-8 rounded-full ${job.companyLogoBg || 'bg-gray-200'} text-white flex items-center justify-center font-bold text-sm`}>
                  {job.company?.charAt(0) || '?'}
                </div>
              )}
              <span className="text-lg">{job.company}</span>
            </div>

            {/* Location Info - Use JobListing fields */}
            <div className="flex items-center gap-2 text-sm text-[#454947] mb-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            {/* Add Level, Employment Type, Location Type */}
            <div className="flex items-center gap-2 text-sm text-[#454947]">
              <Briefcase className="w-4 h-4" />
              <span>{job.level}</span>
              <span className="text-gray-300">•</span>
              <span>{job.employmentType}</span>
              <span className="text-gray-300">•</span>
              <span>{job.locationType}</span>
            </div>
          </div> {/* End Header Text Content div */}

          {/* Tabs */}
          <div className="w-full"> {/* Tabs Container */}
            <div className="flex justify-center"> {/* Center Tabs */}
              <div className="inline-flex rounded-md shadow-sm bg-gray-100 p-1" role="group"> {/* Tab Group */}
                <Tab
                  isActive={activeTab === 'details'}
                    onClick={() => setActiveTab('details')}
                  isFirst={true}
                >
                  Job details
                </Tab>
                <Tab
                  isActive={activeTab === 'application'}
                  onClick={() => setActiveTab('application')}
                  isLast={true}
                >
                  Apply for this role
                  </Tab>
                </div> {/* End Tab Group div */}
              </div> {/* End Center Tabs div */}
            </div> {/* End Tabs Container div */}
          </div> {/* End Header Content Max Width div */}
        </div> {/* End Sticky Header Container div */}

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto pt-6"> {/* Scrollable Area */}
          <div className="max-w-[1122px] mx-auto px-8"> {/* Content Max Width */}
            <div className="flex gap-8"> {/* Columns Container */}
              {/* Left Column */}
              <div style={{ width: '700px', minWidth: '0' }}> {/* Left Column Content */}
              {activeTab === 'details' ? (
                  <div className="space-y-6"> {/* Details View Container */}
                    {/* Use full description from JobListing */}
                    <section>
                  <h2 className="text-lg font-semibold text-[#1b3824] mb-3">Job Description</h2>
                  <p className="text-sm text-[#454947] leading-relaxed break-words whitespace-pre-line">
                    {job.description || "No description available."}
                  </p>
                  {/* Link to full job posting is not in static data */}
                </section>

                {/* Add About Company section */}
                {job.aboutCompany && (
                  <section>
                    <h2 className="text-lg font-semibold text-[#1b3824] mb-3">About {job.company}</h2>
                    <p className="text-sm text-[#454947] leading-relaxed break-words whitespace-pre-line">
                      {job.aboutCompany}
                    </p>
                  </section>
                )}

                {/* Add Responsibilities section */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold text-[#1b3824] mb-3">What you'll be doing</h2>
                    <ul className="list-disc list-outside pl-5 space-y-2 text-sm text-[#454947]">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Add Requirements section */}
                {job.requirements && (job.requirements.essential?.length > 0 || job.requirements.niceToHave?.length > 0) && (
                  <section>
                    <h2 className="text-lg font-semibold text-[#1b3824] mb-3">Requirements</h2>
                    {job.requirements.essential?.length > 0 && (
                      <>
                        <h3 className="text-base font-medium text-[#1b3824] mb-2">Essential</h3>
                        <ul className="list-disc list-outside pl-5 space-y-2 text-sm text-[#454947] mb-4">
                          {job.requirements.essential.map((item, index) => (
                            <li key={`essential-${index}`}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {job.requirements.niceToHave?.length > 0 && (
                      <>
                        <h3 className="text-base font-medium text-[#1b3824] mb-2">Nice to have</h3>
                        <ul className="list-disc list-outside pl-5 space-y-2 text-sm text-[#454947]">
                          {job.requirements.niceToHave.map((item, index) => (
                            <li key={`nice-${index}`}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </section>
                )}

                {/* Add Benefits section */}
                {job.benefits && (job.benefits.salary || job.benefits.perks?.length > 0) && (
                  <section>
                    <h2 className="text-lg font-semibold text-[#1b3824] mb-3">Benefits</h2>
                    {job.benefits.salary && (
                      <p className="text-sm text-[#454947] mb-2"><strong>Salary:</strong> {job.benefits.salary}</p>
                    )}
                    {job.benefits.perks?.length > 0 && (
                      <ul className="list-disc list-outside pl-5 space-y-2 text-sm text-[#454947]">
                        {job.benefits.perks.map((item, index) => (
                          <li key={`perk-${index}`}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                )}

                {/* Add Tech Stack section */}
                {job.techStack && job.techStack.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold text-[#1b3824] mb-3">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.techStack.map((tech, index) => (
                        <span key={`tech-${index}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                </div> /* End space-y-6 div */
              ) : (
                <div> {/* Application Form Container */}
                  <ApplicationForm job={job} onSubmit={onApplicationSubmit} />
                </div> /* End Application Form Container */
              )}
            </div> {/* End Left Column Content div */}

            {/* Right Column */}
            <div style={{ width: '390px', flexShrink: 0 }}> {/* Right Column Content */}
              {/* Removed sticky wrapper */}
              <RequirementsCard
                job={job}
                showCompanyOverview={true} // Already updated to use JobListing
                showActions={true}
                showApplyButton={activeTab === 'details'}
                  setActiveTab={setActiveTab}
                />
            </div> {/* End Right Column Content */}
          </div> {/* End Columns Container */}
        </div> {/* End Content Max Width */}
      </div> {/* End Scrollable Area */}
    </div> // End Main container
  );
};
