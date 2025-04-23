import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { JobDetailsContent } from '../job-details-content';
import { ApplicationSuccess } from '../application-success';
// Import the JobListing type from the static data file instead of Job from context
import { JobListing } from '../../data/job-listings';

interface JobDetailsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobListing | null; // Use the JobListing type from static data
  onApplicationSubmit: (data: any) => void;
}

export const JobDetailsOverlay = ({
  isOpen,
  onClose,
  job,
  onApplicationSubmit,
}: JobDetailsOverlayProps): JSX.Element | null => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState({
    id: 'MOD-UX-78542',
    date: 'February 18, 2025'
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      document.body.style.position = 'fixed';
      document.body.style.height = '100%';
    } else {
      // Re-enable scrolling when overlay is closed
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.style.position = '';
      document.body.style.height = '';
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.style.position = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setShowSuccess(false);
      onClose();
    }, 300);
  };

  const handleApplicationSubmit = (data: any) => {
    onApplicationSubmit(data);
    setShowSuccess(true);
  };

  const handleExploreMore = () => {
    handleClose();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end transition-opacity duration-300 ${
      isClosing ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300" onClick={handleClose} />
      <div className={`relative w-full h-[90vh] bg-white rounded-t-[24px] border-t border-x border-gray-200 shadow-lg transform transition-all duration-300 ease-linear overflow-hidden ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-20"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <div className="h-full overflow-y-auto no-scrollbar">
          <div className="max-w-[1200px] mx-auto">
            {showSuccess ? (
              <ApplicationSuccess
                job={job}
                applicationId={applicationDetails.id}
                submittedDate={applicationDetails.date}
                onExploreMore={handleExploreMore}
              />
            ) : (
              <JobDetailsContent
                job={job}
                onApplicationSubmit={handleApplicationSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
