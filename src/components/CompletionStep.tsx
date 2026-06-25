import { motion } from 'motion/react';
import { Sparkles, Trophy, CheckCircle2, ArrowRight, BookOpen, Star } from 'lucide-react';
import { OnboardingData } from '../types';

interface CompletionStepProps {
  data: OnboardingData;
  onGoToDashboard: () => void;
}

export default function CompletionStep({ data, onGoToDashboard }: CompletionStepProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 space-y-7" id="completion-container">
      
      {/* Celebration visual layer */}
      <div className="relative w-40 h-40 flex items-center justify-center" id="completion-graphic-wrapper">
        {/* Animated background concentric spinning circles */}
        <div className="absolute inset-0 bg-gold/15 rounded-full blur-2xl animate-pulse-slow" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 border border-dashed border-gold/25 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-6 border border-dashed border-gold/15 rounded-full"
        />

        {/* Central visual shield */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-gold to-yellow-500 text-slate-950 flex items-center justify-center shadow-xl shadow-gold/20"
          id="completion-shield-icon"
        >
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </motion.div>

        {/* Floating star particles */}
        <motion.div 
          animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-2 left-2 text-gold-dark"
        >
          <Star className="w-5 h-5 fill-gold text-gold" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-4 right-2 text-gold-dark"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Copy */}
      <div className="space-y-3 max-w-lg" id="completion-text-panel">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/25 text-xs font-bold tracking-wide"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>ONBOARDING COMPLETE</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 font-display tracking-tight"
          id="completion-headline"
        >
          You are all set, <span className="text-gold-dark font-extrabold">{data.fullName || 'Learner'}</span>!
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-sm leading-relaxed font-medium"
          id="completion-subtext"
        >
          Your personalized EduQuest profile for <strong className="text-gold-dark uppercase font-semibold text-xs">{data.role}</strong> has been configured successfully. We have tailored your learning widgets, synchronized class reminders, and compiled syllabus suggestions.
        </motion.p>
      </div>

      {/* Structured Account Confirmation Summary */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-2 gap-4 text-left shadow-sm"
        id="completion-summary-card"
      >
        <div id="summary-col-1">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Account Role</p>
          <p className="text-xs font-bold text-slate-800 font-display capitalize mt-0.5">{data.role}</p>
        </div>
        <div id="summary-col-2">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Time Target</p>
          <p className="text-xs font-bold text-slate-800 font-display mt-0.5">{data.dailyLearningTime}</p>
        </div>
        <div id="summary-col-3" className="border-t border-slate-200 pt-2.5">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Study Language</p>
          <p className="text-xs font-bold text-slate-800 font-display mt-0.5">{data.preferredLanguage}</p>
        </div>
        <div id="summary-col-4" className="border-t border-slate-200 pt-2.5">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Formats</p>
          <p className="text-xs font-bold text-slate-800 font-display truncate mt-0.5" title={data.preferredFormats.join(', ')}>
            {data.preferredFormats.length} delivery channels
          </p>
        </div>
      </motion.div>

      {/* Button wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
        id="completion-btn-wrapper"
      >
        <button
          onClick={onGoToDashboard}
          className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-hover text-slate-950 px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-gold/25 hover:scale-101 active:scale-100 transition-all duration-300 cursor-pointer"
          id="btn-go-to-dashboard"
        >
          <span>Go to Dashboard</span>
          <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </motion.div>
    </div>
  );
}
