import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Sparkles, RefreshCw, Undo2, ChevronRight, Check } from 'lucide-react';

import { OnboardingData, INITIAL_ONBOARDING_DATA } from './types';
import ProgressBar from './components/ProgressBar';
import WelcomeStep from './components/WelcomeStep';
import PersonalInfoStep from './components/PersonalInfoStep';
import RoleSelectionStep from './components/RoleSelectionStep';
import EducationalInfoStep from './components/EducationalInfoStep';
import LearningPreferencesStep from './components/LearningPreferencesStep';
import NotificationsStep from './components/NotificationsStep';
import PrivacyConsentStep from './components/PrivacyConsentStep';
import OnboardingSummaryStep from './components/OnboardingSummaryStep';
import CompletionStep from './components/CompletionStep';
import Dashboard from './components/Dashboard';

const LOCAL_STORAGE_KEY = 'edu_quest_onboarding_draft_v1';
const CURRENT_STEP_KEY = 'edu_quest_onboarding_current_step';
const COMPLETED_KEY = 'edu_quest_onboarding_completed_flag';

export default function App() {
  const [data, setData] = useState<OnboardingData>(INITIAL_ONBOARDING_DATA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load drafted state on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
      const savedStep = localStorage.getItem(CURRENT_STEP_KEY);
      const isCompleted = localStorage.getItem(COMPLETED_KEY);

      if (savedDraft) {
        setData(JSON.parse(savedDraft));
      }
      if (savedStep) {
        setCurrentStep(Number(savedStep));
      }
      if (isCompleted === 'true') {
        setShowDashboard(true);
      }
    } catch (e) {
      console.error('Error recovering draft onboarding data:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-save progress whenever data or current step changes
  useEffect(() => {
    if (isLoading) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(CURRENT_STEP_KEY, String(currentStep));
    } catch (e) {
      console.error('Error auto-saving onboarding progress:', e);
    }
  }, [data, currentStep, isLoading]);

  const handleDataChange = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (currentStep < 9) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem(COMPLETED_KEY, 'true');
      setShowDashboard(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your onboarding draft? This will clear all details.')) {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(CURRENT_STEP_KEY);
        localStorage.removeItem(COMPLETED_KEY);
        setData(INITIAL_ONBOARDING_DATA);
        setCurrentStep(1);
        setShowDashboard(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50" id="global-loader">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-primary-500 animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading your onboarding session...</p>
        </div>
      </div>
    );
  }

  // If onboarding is finalized, render their interactive SaaS dashboard
  if (showDashboard) {
    return (
      <Dashboard 
        data={data} 
        onReset={handleReset} 
      />
    );
  }

  // Animation helper for slide transitions
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const getProTipText = (step: number) => {
    switch (step) {
      case 1:
        return "Take your time setting up. A complete profile gives you the most accurate course path recommendations.";
      case 2:
        return "Providing your correct age and name helps us customize language levels and course pacing appropriately.";
      case 3:
        return "Choosing the correct role helps us tailor your learning path and dashboard features.";
      case 4:
        return "Your academic background dictates the complexity of projects and assignments suggested.";
      case 5:
        return "Select multiple media formats! We combine videos, articles, and interactive quizzes to suit your flow.";
      case 6:
        return "Enable reminders to help you build healthy daily learning habits without cluttering your inbox.";
      case 7:
        return "Your data is secured with enterprise-grade AES-256 encryption. We never share your data with advertisers.";
      default:
        return "You're all set! Preparing your customized educational dashboard in real time.";
    }
  };

  return (
    <div className="min-h-screen marble-bg flex items-center justify-center p-4 sm:p-6 relative overflow-hidden" id="app-viewport">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-20">
        {/* Soft floating luxury gold orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-gold/5 blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-slate-900/10 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Container Wizard */}
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-3xl border border-gold/40 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col min-h-[580px]" id="onboarding-wizard-frame">
        
        {/* Top Edge High-Contrast Progress Bar matching theme */}
        <div className="w-full h-1 bg-slate-100 shrink-0">
          <motion.div 
            className="h-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]" 
            initial={{ width: '0%' }}
            animate={{ width: `${currentStep < 9 ? Math.round(((currentStep - 1) / 8) * 100) : 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          />
        </div>

        {/* Dual Panel Body Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Navigation Sidebar */}
          <aside className="hidden md:flex md:w-[280px] bg-slate-50 border-r border-slate-200 p-8 flex-col justify-between shrink-0" id="wizard-branding-bar">
            
            {/* Header / Brand Logo */}
            <div className="space-y-5 relative" id="brand-header">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center shadow-md shadow-gold/20">
                  <span className="text-slate-950 font-bold text-lg font-display">E</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900 font-display">
                  EduQuest<span className="text-gold text-3xl leading-none font-sans">.</span>
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-[10px] font-bold font-display leading-tight text-gold-dark uppercase tracking-widest">Elevating Learning</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">
                  Adaptive role-based education paths.
                </p>
              </div>
            </div>

            {/* Checklist Step List */}
            <div className="space-y-4 relative py-6" id="inline-checklist-guide">
              <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider block">
                Onboarding Checklist
              </span>
              <ul className="space-y-3.5">
                {[
                  { label: 'Welcome Screen', activeStep: 1 },
                  { label: 'Personal Info', activeStep: 2 },
                  { label: 'User Role', activeStep: 3 },
                  { label: 'Academic Profiles', activeStep: 4 },
                  { label: 'Instruction Media', activeStep: 5 },
                  { label: 'Notification Settings', activeStep: 6 },
                  { label: 'Terms & Safety', activeStep: 7 },
                  { label: 'Learning Roadmap', activeStep: 8 },
                ].map((step, idx) => {
                  const stepNum = idx + 1;
                  const done = currentStep > stepNum;
                  const current = currentStep === stepNum;
                  return (
                    <li 
                      key={idx} 
                      className={`flex items-center gap-4 text-xs font-semibold transition-opacity duration-300 ${
                        current 
                          ? 'opacity-100' 
                          : done 
                            ? 'opacity-85' 
                            : 'opacity-40'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        done 
                          ? 'bg-gold/15 border border-gold/30 text-gold-dark' 
                          : current 
                            ? 'bg-gold text-slate-950 ring-4 ring-gold/25' 
                            : 'bg-slate-200 text-slate-400 border border-slate-300'
                      }`}>
                        {done ? (
                          <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                        ) : (
                          <span className="text-[11px] font-bold font-mono">{stepNum}</span>
                        )}
                      </div>
                      <span className={`text-sm ${
                        current 
                          ? 'font-bold text-slate-900 font-display tracking-wide' 
                          : done 
                            ? 'font-semibold text-slate-600' 
                            : 'font-semibold text-slate-400'
                      }`}>{step.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom Dynamic Contextual Tip Card */}
            <div className="pt-4 border-t border-slate-200" id="brand-footer-tip">
              <div className="p-4 bg-white rounded-2xl border border-gold/20 shadow-sm text-left">
                <p className="text-[10px] text-gold-dark font-bold uppercase tracking-wider mb-1.5">Pro Tip</p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  {getProTipText(currentStep)}
                </p>
              </div>
            </div>
          </aside>

          {/* Right Main workspace container */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto" id="wizard-workspace-area">
            
            {/* Top progress bar (only show during interactive onboarding steps 1 to 8) */}
            {currentStep < 9 && (
              <div className="mb-6" id="top-progress-wrapper">
                <ProgressBar currentStep={currentStep} totalSteps={9} />
              </div>
            )}

          {/* Form Wizard Inner Step router */}
          <div className="flex-1 flex flex-col justify-center" id="onboarding-steps-router">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
                id={`step-wrapper-${currentStep}`}
              >
                {currentStep === 1 && (
                  <WelcomeStep 
                    onNext={handleNext} 
                  />
                )}

                {currentStep === 2 && (
                  <PersonalInfoStep
                    data={data}
                    onChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 3 && (
                  <RoleSelectionStep
                    data={data}
                    onChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 4 && (
                  <EducationalInfoStep
                    data={data}
                    onChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 5 && (
                  <LearningPreferencesStep
                    data={data}
                    onChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 6 && (
                  <NotificationsStep
                    data={data}
                    onChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 7 && (
                  <PrivacyConsentStep
                    data={data}
                    onChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 8 && (
                  <OnboardingSummaryStep
                    data={data}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 9 && (
                  <CompletionStep
                    data={data}
                    onGoToDashboard={handleComplete}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Micro validation alert status or footer note */}
          {currentStep < 9 && (
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium" id="wizard-micro-footer">
              <span className="text-slate-500 font-semibold">Auto-saving draft...</span>
              <button 
                type="button" 
                onClick={handleReset}
                className="hover:text-gold-dark text-slate-500 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Reset form data</span>
              </button>
            </div>
          )}

        </div>
        </div>
      </div>
    </div>
  );
}
