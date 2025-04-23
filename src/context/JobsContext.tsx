import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure for a single job based on the hypothetical API response
export interface Job {
  id: string | number; // Assuming ID can be string or number
  title: string;
  company_name: string;
  location: string;
  description_snippet: string;
  logo_url?: string; // Optional logo URL
  job_url?: string; // Optional link to the full job posting
  // Add other relevant fields as needed based on the actual API
}

interface JobsContextType {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  savedJobs: (string | number)[];
  appliedJobs: (string | number)[];
  saveJob: (jobId: string | number) => void;
  unsaveJob: (jobId: string | number) => void;
  markJobAsApplied: (jobId: string | number) => void;
  isJobSaved: (jobId: string | number) => boolean;
  isJobApplied: (jobId: string | number) => boolean;
  activeTab: 'for-you' | 'browse' | 'saved';
  setActiveTab: (tab: 'for-you' | 'browse' | 'saved') => void;
  // Optional: Add a function to refetch jobs if needed
  // refetchJobs: () => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for fetched jobs, loading, and errors
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for saved/applied jobs (persisted)
  const [savedJobs, setSavedJobs] = useState<(string | number)[]>(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedJobs, setAppliedJobs] = useState<(string | number)[]>(() => {
    const applied = localStorage.getItem('appliedJobs');
    return applied ? JSON.parse(applied) : [];
  });

  // State for active tab (persisted)
  const [activeTab, setActiveTab] = useState<'for-you' | 'browse' | 'saved'>(() => {
    const tab = localStorage.getItem('activeTab');
    return (tab as 'for-you' | 'browse' | 'saved') || 'for-you';
  });

  // --- Fetching Jobs ---
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace '/api/jobs' with your actual backend endpoint
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (e) {
        console.error("Failed to fetch jobs:", e);
        if (e instanceof Error) {
          setError(`Failed to load jobs: ${e.message}`);
        } else {
          setError("Failed to load jobs due to an unknown error.");
        }
        setJobs([]); // Clear jobs on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
    // Add dependencies if fetching should re-run based on certain state changes (e.g., search filters)
  }, []); // Empty dependency array means this runs once on mount

  // --- Persistence Effects ---
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const saveJob = (jobId: string | number) => {
    setSavedJobs(prev => [...prev, jobId]);
  };

  const unsaveJob = (jobId: string | number) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId));
  };

  const markJobAsApplied = (jobId: string | number) => {
    setAppliedJobs(prev => [...prev, jobId]);
  };

  const isJobSaved = (jobId: string | number) => savedJobs.includes(jobId);
  const isJobApplied = (jobId: string | number) => appliedJobs.includes(jobId);

  const value = {
    jobs, // Provide fetched jobs
    isLoading, // Provide loading state
    error, // Provide error state
    savedJobs,
    appliedJobs,
    saveJob,
    unsaveJob,
    markJobAsApplied,
    isJobSaved,
    isJobApplied,
    activeTab,
    setActiveTab
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
