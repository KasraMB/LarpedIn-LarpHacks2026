import React, { useState } from 'react';
import { X, User, Briefcase, MapPin, Sparkles, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile
}) => {
  const [name, setName] = useState(userProfile.name);
  const [headline, setHeadline] = useState(userProfile.headline);
  const [currentCompany, setCurrentCompany] = useState(userProfile.currentCompany);
  const [location, setLocation] = useState(userProfile.location);
  const [skillsStr, setSkillsStr] = useState(userProfile.skills.join(', '));
  const [bio, setBio] = useState(userProfile.bio);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSaveProfile({
      ...userProfile,
      name: name.trim() || userProfile.name,
      headline: headline.trim() || userProfile.headline,
      currentCompany: currentCompany.trim() || userProfile.currentCompany,
      location: location.trim() || userProfile.location,
      skills: skillsArray.length > 0 ? skillsArray : userProfile.skills,
      bio: bio.trim() || userProfile.bio
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#0a66c2]" />
            <h2 className="font-bold text-base text-slate-900">
              Edit Your Candidate Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Tip: Put your real name and current focus! All AI recruiters, viral posts, and offer letters will instantly address you directly.
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-md p-2 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0a66c2]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Headline</label>
            <textarea
              rows={2}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-md p-2 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0a66c2]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Current Company</label>
              <input
                type="text"
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-md p-2 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-md p-2 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Top Skills (Comma Separated)
            </label>
            <input
              type="text"
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
              className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-md p-2 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0a66c2]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">About / Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-md p-2 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0a66c2]"
            />
          </div>

          {/* Footer Controls */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
