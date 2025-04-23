import React from 'react';
import { useJobs } from '../context/JobsContext';

export const NavigationTabs = () => {
  const { activeTab, setActiveTab, savedJobs, appliedJobs } = useJobs();

  const tabs = [
    { id: 'for-you', label: 'For you' },
    { id: 'browse', label: 'Browse all' },
    { id: 'saved', label: `Saved (${savedJobs.length})` },
  ] as const;

  return (
    <div className="border-b border-[#e8eaea] p-1">
      <nav className="max-w-[1200px] mx-auto px-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative ${
                activeTab === tab.id
                  ? 'text-[#1b3824] font-medium'
                  : 'text-[#454947] hover:text-[#1b3824]'
              }`}
            >
              <span className={`${activeTab === tab.id ? 'px-2 py-1' : 'py-4'}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2f583f]" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}; 