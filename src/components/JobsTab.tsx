import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Sparkles, CheckCircle2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { JobListing } from '../types';

interface JobsTabProps {
  jobListings: JobListing[];
  onApplyJob: (job: JobListing) => void;
  appliedJobIds: string[];
}

export const JobsTab: React.FC<JobsTabProps> = ({
  jobListings,
  onApplyJob,
  appliedJobIds
}) => {
  const [selectedJob, setSelectedJob] = useState<JobListing>(jobListings[0]);

  return (
    <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row gap-5">
      {/* Left Column: Job Feed */}
      <div className="w-full md:w-[420px] shrink-0 flex flex-col gap-3">
        <div className="bg-white rounded-lg border border-[#e0dfdc] p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-sm text-slate-900">Recommended Jobs For You</h2>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              100% Match
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Based on your legendary reputation and distributed systems expertise
          </p>
        </div>

        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-xs divide-y divide-slate-100 overflow-hidden">
          {jobListings.map((job) => {
            const isSelected = selectedJob.id === job.id;
            const isApplied = appliedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-4 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#edf3f8] border-l-4 border-l-[#0a66c2]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-sm text-slate-900 hover:text-[#0a66c2] leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      {job.company} · {job.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {job.salaryRange}
                      </span>
                      <span className="text-slate-400 text-[11px]">{job.postedAgo}</span>
                    </div>
                  </div>
                  <span className="text-xl shrink-0 p-1 bg-slate-50 rounded-md border border-slate-200">
                    {job.companyLogo}
                  </span>
                </div>

                {isApplied && (
                  <div className="mt-2 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Applied · Offer Pre-Approved!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Detailed Job View */}
      {selectedJob && (
        <div className="flex-1 bg-white rounded-lg border border-[#e0dfdc] shadow-xs p-6 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedJob.companyLogo}</span>
                  <h1 className="text-lg font-bold text-slate-900">{selectedJob.title}</h1>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-2 flex-wrap">
                  <span className="font-semibold text-slate-800">{selectedJob.company}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {selectedJob.location}
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedJob.salaryRange}
                  </span>
                </div>
              </div>

              {/* Fast Track Apply Button */}
              <button
                onClick={() => onApplyJob(selectedJob)}
                disabled={appliedJobIds.includes(selectedJob.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0 ${
                  appliedJobIds.includes(selectedJob.id)
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-[#0a66c2] hover:bg-[#004182] text-white hover:shadow-md'
                }`}
              >
                {appliedJobIds.includes(selectedJob.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Executive Fast-Track Active</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>1-Click Apply (No Interview)</span>
                  </>
                )}
              </button>
            </div>

            {/* Exclusive Perks Strip */}
            <div className="py-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Special Executive Perks Included For You:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedJob.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-md border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="py-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2">About the Role</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedJob.description}
              </p>
              <div className="mt-4 p-3.5 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-slate-800 leading-relaxed">
                <strong className="text-[#0a66c2] block mb-1">Executive Hiring Guarantee:</strong>
                Because this requisition was opened specifically for your skill profile, all standard coding rounds, committee deliberations, and take-home assignments are completely waived. You will meet directly with the C-Suite to review equity packages.
              </div>
            </div>
          </div>

          {/* Bottom Fast Track Notice */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Posted {selectedJob.postedAgo} · 1 Applicant (You)</span>
            <span className="font-semibold text-emerald-600">Candidate ranking: #1 (Sole pick)</span>
          </div>
        </div>
      )}
    </div>
  );
};
