import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BrainCircuit, Compass, RotateCw, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { OnboardingData } from '../types';

interface OnboardingSummaryStepProps {
  data: OnboardingData;
  onNext: () => void;
  onBack: () => void;
}

const LOADING_STEPS = [
  "Analyzing your unique educational profile...",
  "Synthesizing syllabus milestones and objectives...",
  "Calibrating your daily time commitment path...",
  "Structuring custom platform recommendations...",
  "Styling your personal learning roadmap with Gemini..."
];

export default function OnboardingSummaryStep({ data, onNext, onBack }: OnboardingSummaryStepProps) {
  const [roadmap, setRoadmap] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingStepIdx, setLoadingStepIdx] = useState<number>(0);
  const [error, setError] = useState<string>('');

  // Progressive loading text rotation
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  const fetchRoadmap = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate learning roadmap. Please check your network or try again.');
      }

      const resData = await response.json();
      if (!resData.text) {
        throw new Error('Empty roadmap received from the server.');
      }
      setRoadmap(resData.text);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred while compiling your roadmap.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  return (
    <div className="space-y-6 text-left" id="onboarding-summary-container">
      {/* Top Header Label */}
      <div className="space-y-2" id="summary-header">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/25 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STEP 8 OF 9: PERSONAL ROADMAP</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
          Your AI Learning <span className="text-gold-dark font-extrabold">Roadmap</span>
        </h2>
        <p className="text-xs text-slate-500 leading-normal font-medium">
          Gemini has compiled your selections to build a customized, milestone-driven pathway for your role as a <strong className="text-gold-dark uppercase text-[10px] tracking-wide">{data.role}</strong>.
        </p>
      </div>

      {/* Main Panel Content Area */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 min-h-[320px] max-h-[460px] overflow-y-auto relative shadow-inner" id="summary-roadmap-panel">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-6"
              id="roadmap-loading-state"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full border-2 border-dashed border-gold/20 animate-spin-slow" />
                <div className="absolute w-12 h-12 rounded-full border-2 border-gold/40 animate-spin" />
                <div className="w-8 h-8 rounded-full bg-gold text-slate-950 flex items-center justify-center shadow-lg shadow-gold/25">
                  <BrainCircuit className="w-4 h-4 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2 max-w-sm">
                <p className="text-sm font-bold text-slate-800 font-display">
                  {LOADING_STEPS[loadingStepIdx]}
                </p>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  We use the latest Gemini models to design highly optimized, step-by-step pathways. This takes just a moment.
                </p>
              </div>

              {/* Skeleton loading preview lines */}
              <div className="w-full max-w-md space-y-2.5 pt-4 opacity-50">
                <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-slate-200 rounded w-5/6 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" style={{ animationDelay: '0.4s' }} />
                <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" style={{ animationDelay: '0.6s' }} />
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-5"
              id="roadmap-error-state"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="space-y-1.5 max-w-sm">
                <h4 className="text-sm font-bold text-slate-800">Roadmap Generation Failed</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchRoadmap}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-gold hover:bg-gold-hover px-4 py-2 rounded-xl transition-all cursor-pointer shadow"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Retry Generation</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-sm text-slate-800 max-w-none space-y-4"
              id="roadmap-content-area"
            >
              {/* Highlight bar info */}
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-gold/10 border border-gold/20 mb-4 text-xs font-semibold text-gold-dark">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Your syllabus-aligned study track is saved and synced to your dashboard account.</span>
              </div>

              {/* Rendered markdown body */}
              <div className="markdown-body text-slate-800 leading-relaxed space-y-4 text-sm font-medium">
                <ReactMarkdown>{roadmap}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200" id="summary-controls-footer">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 hover:bg-slate-50 px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          id="btn-summary-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={loading || !!error}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-gold hover:bg-gold-hover px-5 py-3 rounded-xl shadow-md shadow-gold/20 hover:scale-101 active:scale-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          id="btn-summary-next"
        >
          <span>Continue to Finalize</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
