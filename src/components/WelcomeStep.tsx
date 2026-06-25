import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, BookOpen, Sparkles, Trophy } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 py-4" id="welcome-step-container">
      {/* Left Column: Copy & CTAs */}
      <div className="flex-1 text-left space-y-6" id="welcome-text-panel">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/20 text-xs font-bold uppercase tracking-wider"
          id="badge-welcome"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span>Empowering Lifelong Learners</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display"
          id="welcome-title"
        >
          Your Personalized <br />
          <span className="bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent">
            Learning Journey
          </span>{' '}
          Begins Here
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base text-slate-600 leading-relaxed max-w-xl font-medium"
          id="welcome-desc"
        >
          Welcome to <span className="font-semibold text-gold-dark">EduQuest</span>, the next-generation adaptive education platform. In just a few quick steps, we'll design a customized dashboard tailored to your exact role, curriculum, schedules, and learning aspirations.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
          id="welcome-button-wrapper"
        >
          <button
            onClick={onNext}
            className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-hover text-slate-950 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-gold/20 transform transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            id="btn-get-started"
          >
            <span>Begin Onboarding</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Highlight points */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 pt-6 max-w-md border-t border-slate-200"
          id="welcome-stats"
        >
          <div className="flex items-center gap-3" id="stat-1">
            <div className="p-2.5 rounded-xl bg-slate-50 text-gold-dark border border-gold/30">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Adaptive Paths</p>
              <p className="text-xs text-slate-500">Curated daily guides</p>
            </div>
          </div>
          <div className="flex items-center gap-3" id="stat-2">
            <div className="p-2.5 rounded-xl bg-slate-50 text-gold-dark border border-gold/30">
              <Trophy className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Verified Goals</p>
              <p className="text-xs text-slate-500">Milestones & certs</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Premium CSS Interactive Graphic */}
      <div className="flex-1 flex justify-center items-center w-full min-h-[320px] lg:min-h-[400px]" id="welcome-graphic-panel">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[380px] aspect-square"
          id="welcome-graphic-stack"
        >
          {/* Main Backdrop circle with gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-slate-100 to-transparent rounded-full blur-3xl -z-10" />
          
          {/* Interactive Core Shield/Globe */}
          <div className="absolute inset-4 rounded-3xl bg-slate-50 border border-gold/25 shadow-xl flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Pulsing Core icon */}
            <motion.div 
              animate={{ 
                scale: [1, 1.04, 1],
                rotate: [0, 3, -3, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-gold to-gold-hover flex items-center justify-center text-slate-950 shadow-xl shadow-gold/20"
              id="graphic-core-icon"
            >
              <GraduationCap className="w-12 h-12" />
            </motion.div>

            {/* Micro Dashboard UI Inside Graphics */}
            <div className="w-full mt-6 space-y-3" id="graphic-card-rows">
              <div className="h-2 w-2/3 bg-slate-200 rounded-full mx-auto" />
              <div className="h-1.5 w-1/2 bg-slate-200/70 rounded-full mx-auto" />
              
              <div className="flex justify-center gap-1.5 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>

          {/* Floating Bubble 1: Current Progress */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 bg-white/95 border border-gold/25 p-3.5 rounded-2xl shadow-lg flex items-center gap-3 text-slate-800"
            id="welcome-floating-1"
          >
            <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold-dark">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">Global Rank</p>
              <p className="text-xs font-bold text-gold-dark mt-1">Top 5% Student</p>
            </div>
          </motion.div>

          {/* Floating Bubble 2: Activity Log */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -left-3 bg-white/95 border border-gold/25 p-3.5 rounded-2xl shadow-lg flex items-center gap-3 text-slate-800"
            id="welcome-floating-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold-dark">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">Next Activity</p>
              <p className="text-xs font-bold text-slate-800 mt-1">AI Coding Quest</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
