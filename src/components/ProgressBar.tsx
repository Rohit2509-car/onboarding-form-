import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number; // 1 to 8
  totalSteps: number;  // 8
}

const STEP_LABELS = [
  'Welcome',
  'Personal Info',
  'Role Selection',
  'Edu Parameters',
  'Preferences',
  'Alerts Config',
  'Legal & Privacy',
  'Ready to Go',
];

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Calculate completion percentage based on current step
  // Step 1: 0%, Step 8: 100%
  const percentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="space-y-4" id="progress-indicator-container">
      {/* Percentage metrics & state details */}
      <div className="flex items-center justify-between" id="progress-meta-text">
        <div className="text-left">
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block">
            STAGE {currentStep} OF {totalSteps}
          </span>
          <h3 className="text-xl font-bold text-white font-display tracking-tight mt-0.5">
            {STEP_LABELS[currentStep - 1]}
          </h3>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs font-semibold text-gold bg-slate-800 border border-gold/25 px-2.5 py-1 rounded-lg shadow-sm">
            {percentage}% Setup
          </span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden" id="horizontal-progress-bar">
        <motion.div 
          className="h-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>

      {/* Visual Step Dots Bead Grid */}
      <div className="flex justify-between items-center relative pt-1" id="step-beads-row">
        {/* Invisible back connector line */}
        <div className="absolute top-[17px] left-2 right-2 h-0.5 bg-slate-800 -z-10" />

        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;

          return (
            <div key={stepNum} className="flex flex-col items-center relative" id={`step-bead-wrapper-${stepNum}`}>
              {/* Step circle */}
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isCompleted 
                    ? '#D4AF37' // gold
                    : isActive 
                      ? '#0f172a' // slate-900
                      : '#1e293b', // slate-800
                  borderColor: isCompleted 
                    ? '#D4AF37'
                    : isActive 
                      ? '#D4AF37'
                      : '#334155', // slate-700
                }}
                transition={{ duration: 0.3 }}
                className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shadow-sm cursor-default ${
                  isCompleted ? 'text-slate-950' : isActive ? 'text-gold' : 'text-slate-500'
                }`}
                id={`bead-circle-${stepNum}`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </motion.div>

              {/* Small label for large viewports */}
              <span className={`hidden lg:block text-[9px] font-bold mt-1.5 uppercase tracking-wider ${
                isActive ? 'text-gold font-bold' : isCompleted ? 'text-gold/80 font-medium' : 'text-slate-500'
              }`}>
                {STEP_LABELS[idx].split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
