import { useState } from 'react';
import { ShieldAlert, BookOpen, Scroll, Check } from 'lucide-react';
import { OnboardingData, FormErrors } from '../types';

interface PrivacyConsentStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PrivacyConsentStep({ data, onChange, onNext, onBack }: PrivacyConsentStepProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!data.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms & conditions';
    }
    if (!data.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6 text-left" id="privacy-container">
      {/* Header */}
      <div id="privacy-header">
        <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Legal & Privacy Consent</h2>
        <p className="text-sm text-slate-500 mt-1">
          Please review and accept our institutional guidelines, service terms, and safety policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="privacy-split-panel">
        {/* Scrollable Terms & Conditions Box */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col h-[280px]" id="terms-preview-box">
          <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Scroll className="w-3.5 h-3.5 text-gold-dark" />
            <span>EduQuest Terms of Service (Brief)</span>
          </span>
          <div className="flex-1 overflow-y-auto pr-2 text-xs text-slate-600 leading-relaxed space-y-3 no-scrollbar border-t border-slate-200 pt-2.5">
            <p><strong className="text-slate-800">1. Access & Credentials:</strong> By completing onboarding, you represent that you hold authentic, lawful authority to access this system under the selected student, teacher, parent, or admin credentials.</p>
            <p><strong className="text-slate-800">2. Account Safety:</strong> You are responsible for keeping your login credentials confidential and secure. Sharing passwords or utilizing account parameters for unverified third parties is strictly prohibited.</p>
            <p><strong className="text-slate-800">3. Content Conduct:</strong> EduQuest hosts rich collaborative forums. Any uploaded profile picture, educational goals summary, or custom curriculum material must strictly adhere to educational guidelines.</p>
            <p><strong className="text-slate-800">4. Service Term Limits:</strong> We offer a highly adaptive educational software package. The systems, analytical graphics, and dashboards are provided "as is" with guaranteed high-availability targets.</p>
          </div>
        </div>

        {/* Scrollable Privacy Policy Box */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col h-[280px]" id="privacy-preview-box">
          <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
            <span>EduQuest Privacy Agreement (Brief)</span>
          </span>
          <div className="flex-1 overflow-y-auto pr-2 text-xs text-slate-600 leading-relaxed space-y-3 no-scrollbar border-t border-slate-200 pt-2.5">
            <p><strong className="text-slate-800">1. Data Encryption:</strong> Your academic profiles, including grade classifications, learning goals, study languages, and notification channels are stored locally to safeguard your personal identity.</p>
            <p><strong className="text-slate-800">2. Third-Party Restrictions:</strong> No part of your academic performance data is ever packaged, sold, or distributed to advertisement corporations.</p>
            <p><strong className="text-slate-800">3. Children Protection:</strong> In compliance with global digital safety guidelines (COPPA), Parent and Guardian accounts are required to configure and authorize children accounts younger than 13.</p>
            <p><strong className="text-slate-800">4. Diagnostic Analytics:</strong> Anonymized performance parameters (such as average daily study hours or quiz completions) may be aggregated for platform performance auditing.</p>
          </div>
        </div>
      </div>

      {/* Interactive Checkbox Selection Card */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4" id="privacy-checkboxes-card">
        {/* Checkbox 1: Terms */}
        <div 
          onClick={() => onChange({ acceptTerms: !data.acceptTerms })}
          className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all duration-300 ${
            data.acceptTerms ? 'border-gold bg-gold/10' : 'border-slate-200 bg-white hover:bg-slate-100'
          }`}
          id="row-accept-terms"
        >
          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            data.acceptTerms ? 'bg-gold border-gold text-slate-950' : 'border-slate-300 bg-white'
          }`}>
            {data.acceptTerms && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-slate-850 font-display">I accept the Terms and Conditions of EduQuest <span className="text-gold-dark">*</span></p>
            <p className="text-xs text-slate-500 font-medium">Agreeing to this authorizes creating and maintaining your academic account profile.</p>
          </div>
        </div>
        {errors.acceptTerms && <p className="text-xs text-red-500 font-medium pl-1">{errors.acceptTerms}</p>}

        {/* Checkbox 2: Privacy */}
        <div 
          onClick={() => onChange({ acceptPrivacy: !data.acceptPrivacy })}
          className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all duration-300 ${
            data.acceptPrivacy ? 'border-gold bg-gold/10' : 'border-slate-200 bg-white hover:bg-slate-100'
          }`}
          id="row-accept-privacy"
        >
          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            data.acceptPrivacy ? 'bg-gold border-gold text-slate-950' : 'border-slate-300 bg-white'
          }`}>
            {data.acceptPrivacy && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-slate-850 font-display">I agree to the Privacy Policy Agreement <span className="text-gold-dark">*</span></p>
            <p className="text-xs text-slate-500 font-medium">Acknowledges the safe usage, local caching, and offline sandboxing guidelines of your inputs.</p>
          </div>
        </div>
        {errors.acceptPrivacy && <p className="text-xs text-red-500 font-medium pl-1">{errors.acceptPrivacy}</p>}

        {/* Checkbox 3: Marketing (Optional) */}
        <div 
          onClick={() => onChange({ marketingConsent: !data.marketingConsent })}
          className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all duration-300 ${
            data.marketingConsent ? 'border-gold bg-gold/10' : 'border-slate-200 bg-white hover:bg-slate-100'
          }`}
          id="row-accept-marketing"
        >
          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            data.marketingConsent ? 'bg-gold border-gold text-slate-950' : 'border-slate-300 bg-white'
          }`}>
            {data.marketingConsent && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-slate-800">I would like to receive product tips and promotional digests <span className="text-slate-500 font-normal">(Optional)</span></p>
            <p className="text-xs text-slate-500 font-medium">Opt-in to get exclusive scholarship reminders, test hacks, and curriculum guides.</p>
          </div>
        </div>
      </div>

      {/* Button controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200" id="step-nav-buttons-privacy">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          id="btn-back-7"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="px-8 py-3 rounded-xl bg-gold hover:bg-gold-hover text-slate-950 font-bold shadow-md shadow-gold/20 text-sm transition-all"
          id="btn-next-7"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
