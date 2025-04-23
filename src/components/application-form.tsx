import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Download, CheckCircle2, Sparkles, FileText, Circle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
// Import JobListing type from static data
import { JobListing } from '../data/job-listings';

interface Resume {
  name: string;
  size: string;
}

interface ApplicationFormProps {
  onSubmit: (data: any) => void;
  job?: JobListing | null; // Use JobListing type
}

export const ApplicationForm = ({ onSubmit, job }: ApplicationFormProps) => {
  const [selectedResume, setSelectedResume] = useState<string | null>('Resume.pdf');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    coverLetter: '',
    saveCoverLetter: false
  });

  const sampleResumes: Resume[] = [
    { name: 'Resume.pdf', size: '140 kb' },
    { name: 'Resume 2.pdf', size: '120 kb' }
  ];

  const handleResumeSelect = (resumeName: string) => {
    setSelectedResume(resumeName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, resume: selectedResume });
  };

  return (
    <div className="w-full max-w-[700px]">
      {/* Resume Section - Restore background and align buttons */}
      <div className="bg-[#f7f7f7] rounded-xl p-6 mb-8">
        <h2 className="text-lg font-medium text-[#1b3824] mb-4">Select resume</h2>
        <div className="space-y-3">
          {sampleResumes.map((resume) => {
            const isActive = selectedResume === resume.name;
            return (
              <div
                key={resume.name}
                className={`p-4 border rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#F0FDF4] border-[#32AD5F]'
                    : 'bg-white border-[#e8eaea] hover:bg-gray-50'
                }`}
                onClick={() => handleResumeSelect(resume.name)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${isActive ? 'bg-[#DCFCE7]' : 'bg-gray-100'}`}>
                    <FileText className={`w-5 h-5 ${isActive ? 'text-[#32AD5F]' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1b3824]">{resume.name}</p>
                    <p className="text-xs text-[#454947]">{resume.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isActive ? 'border-[#32AD5F] bg-[#32AD5F]' : 'border-gray-300 bg-white'}`}>
                    {isActive ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-4 h-4 text-transparent" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Align buttons horizontally - ensure top alignment */}
        <div className="mt-4 flex items-start justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-[#1b3824] border-[#d1d4d3] bg-white"
          >
            <Sparkles className="w-4 h-4" />
            Generate a customized resume with AI
          </Button>
          <div className="flex flex-col items-end">
            <Button
              className="text-white bg-[#2f583f] hover:bg-[#2f583f]/90"
            >
              Upload resume
            </Button>
            <span className="text-xs text-gray-500 mt-1">.pdf, .doc, .docx, .rtf, .wp or .txt file</span>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="pb-16">
        <h2 className="text-lg font-medium text-[#1b3824] mb-6">Application form</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#1b3824] mb-2">
              Full name
            </label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="border-[#d1d4d3]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1b3824] mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="border-[#d1d4d3]"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#1b3824] mb-2">
              Phone Number
            </label>
            <div className="flex gap-3">
              <div className="w-[120px]">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-[#d1d4d3] justify-start relative"
                >
                  <div className="flex items-center w-full">
                    <img
                      src="/us-flag.png"
                      alt="US flag"
                      className="w-5 h-5 mr-2"
                    />
                    <span>+1</span>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="absolute right-2"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </Button>
              </div>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="flex-1 h-10 border-[#d1d4d3]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-[#1b3824] mb-2">
              Cover letter
            </label>
            <div className="relative">
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder={`Write a note to ${job?.company || 'the company'} to let them know why you think you'd be a good fit.`} // Use job.company
                className="min-h-[160px] border-[#d1d4d3] pb-[24px]"
              />
              <Button
                type="button"
                variant="outline"
                className="absolute bottom-[8px] left-3 text-xs border-[#d1d4d3] py-1 h-7 z-50 bg-white"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Generate with AI
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveCoverLetter"
              name="saveCoverLetter"
              checked={formData.saveCoverLetter}
              onChange={handleCheckboxChange}
              className="rounded border-[#d1d4d3]"
            />
            <label htmlFor="saveCoverLetter" className="text-sm text-[#454947]">
              Save cover letter as template
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2f583f] text-white hover:bg-[#2f583f]/90 rounded-xl py-2"
          >
            Submit application
          </Button>
        </div>
      </form>
    </div>
  );
};
