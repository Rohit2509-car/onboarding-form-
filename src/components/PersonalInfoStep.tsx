import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Calendar, Globe, Upload, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';
import { OnboardingData, FormErrors, COUNTRIES, GENDERS } from '../types';

interface PersonalInfoStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Predefined modern avatar illustrations (using stable, beautiful unsplash illustrations)
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
];

export default function PersonalInfoStep({ data, onChange, onNext, onBack }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (data.mobile && !/^\+?[0-9\s\-()]{7,15}$/.test(data.mobile)) {
      newErrors.mobile = 'Please provide a valid phone number';
    }

    if (!data.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const birthYear = new Date(data.dob).getFullYear();
      const currentYear = new Date().getFullYear();
      if (birthYear > currentYear - 3 || birthYear < currentYear - 100) {
        newErrors.dob = 'Please enter a plausible birth date';
      }
    }

    if (!data.gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!data.country) {
      newErrors.country = 'Please choose your country of residence';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext();
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Only image files are supported');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be under 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange({ profilePicture: e.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6" id="personal-info-container">
      {/* Step Heading */}
      <div className="text-left" id="step-header">
        <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Tell us about yourself</h2>
        <p className="text-sm text-slate-500 mt-1">
          Provide your core account credentials and personalize your educational identity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="personal-grid-layout">
        {/* Left Column: Avatar upload and info validation */}
        <div className="lg:col-span-1 space-y-6 flex flex-col items-center lg:items-stretch" id="profile-picture-panel">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs text-center" id="avatar-card-inner">
            <span className="text-xs font-bold text-gold-dark uppercase tracking-wider block mb-4">
              Profile Photo
            </span>

            {/* Core Upload Bubble */}
            <div className="flex flex-col items-center gap-4">
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative group w-32 h-32 rounded-full flex items-center justify-center border-2 border-dashed overflow-hidden transition-all duration-300 bg-slate-100 ${
                  isDragging 
                    ? 'border-gold bg-gold/10' 
                    : data.profilePicture 
                      ? 'border-slate-200' 
                      : 'border-slate-200 hover:border-gold'
                }`}
                id="profile-picture-dropzone"
              >
                {data.profilePicture ? (
                  <>
                    <img 
                      src={data.profilePicture} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange({ profilePicture: '' });
                        }}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-4 text-slate-400 hover:text-gold-dark transition-colors"
                  >
                    <Upload className="w-6 h-6 mb-1 text-gold-dark" />
                    <span className="text-[11px] font-medium leading-tight">Drag here or <span className="text-gold-dark underline font-semibold">Browse</span></span>
                  </button>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Preset Quick-Select */}
              <div className="w-full" id="preset-avatar-options">
                <p className="text-[11px] text-slate-500 font-medium mb-2">Or select an avatar</p>
                <div className="flex justify-center gap-2">
                  {PRESET_AVATARS.map((avatarUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onChange({ profilePicture: avatarUrl })}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 ${
                        data.profilePicture === avatarUrl 
                          ? 'border-gold ring-2 ring-gold/25' 
                          : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={avatarUrl} 
                        alt={`Preset Avatar ${idx}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Secure details card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start gap-3 text-left">
            <ShieldCheck className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-slate-850">SaaS Data Policy</p>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                Your personal credentials and profile details are securely saved offline in your browser's local state.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Fields Column */}
        <div className="lg:col-span-2 space-y-5 text-left" id="fields-panel">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col" id="field-fullname">
              <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold-dark" />
                <span>Full Name <span className="text-gold-dark">*</span></span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={data.fullName}
                  onChange={(e) => {
                    onChange({ fullName: e.target.value });
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-200 focus:ring-gold/25 focus:border-gold focus:bg-white'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
            <div className="flex flex-col" id="field-email">
              <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gold-dark" />
                <span>Email Address <span className="text-gold-dark">*</span></span>
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                value={data.email}
                onChange={(e) => {
                  onChange({ email: e.target.value });
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-slate-200 focus:ring-gold/25 focus:border-gold focus:bg-white'
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div className="flex flex-col" id="field-mobile">
              <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-dark" />
                <span>Mobile Number <span className="text-slate-500 font-normal">(Optional)</span></span>
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={data.mobile}
                onChange={(e) => {
                  onChange({ mobile: e.target.value });
                  if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.mobile 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-slate-200 focus:ring-gold/25 focus:border-gold focus:bg-white'
                }`}
              />
              {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col" id="field-dob">
              <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                <span>Date of Birth <span className="text-gold-dark">*</span></span>
              </label>
              <input
                type="date"
                value={data.dob}
                onChange={(e) => {
                  onChange({ dob: e.target.value });
                  if (errors.dob) setErrors(prev => ({ ...prev, dob: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.dob 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-slate-200 focus:ring-gold/25 focus:border-gold focus:bg-white'
                }`}
              />
              {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender Selection */}
            <div className="flex flex-col" id="field-gender">
              <label className="text-xs font-semibold text-slate-700 mb-1.5">
                Gender <span className="text-gold-dark">*</span>
              </label>
              <select
                value={data.gender}
                onChange={(e) => {
                  onChange({ gender: e.target.value });
                  if (errors.gender) setErrors(prev => ({ ...prev, gender: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm text-slate-850 focus:outline-none focus:ring-2 transition-all ${
                  errors.gender 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-slate-200 focus:ring-gold/25 focus:border-gold focus:bg-white'
                }`}
              >
                <option value="" className="bg-white text-slate-800">Select Gender</option>
                {GENDERS.map((gender) => (
                  <option key={gender} value={gender} className="bg-white text-slate-800">
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
            </div>

            {/* Country Selection */}
            <div className="flex flex-col" id="field-country">
              <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gold-dark" />
                <span>Country / Region <span className="text-gold-dark">*</span></span>
              </label>
              <select
                value={data.country}
                onChange={(e) => {
                  onChange({ country: e.target.value });
                  if (errors.country) setErrors(prev => ({ ...prev, country: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm text-slate-850 focus:outline-none focus:ring-2 transition-all ${
                  errors.country 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-slate-200 focus:ring-gold/25 focus:border-gold focus:bg-white'
                }`}
              >
                <option value="" className="bg-white text-slate-800">Select Country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country} className="bg-white text-slate-800">
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Button controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200" id="step-nav-buttons">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          id="btn-back-2"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="px-8 py-3 rounded-xl bg-gold hover:bg-gold-hover text-slate-950 font-bold shadow-md shadow-gold/20 text-sm transition-all"
          id="btn-next-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
