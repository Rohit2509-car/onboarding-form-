import { useState, ComponentType } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Video, Users, ClipboardCheck, Puzzle, FileText, Check, Clock, Globe2, Target } from 'lucide-react';
import { OnboardingData, FormErrors, FORMAT_OPTIONS, DAILY_TIME_OPTIONS, LANGUAGES } from '../types';

interface LearningPreferencesStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Map IDs to specific Lucide Icons for high fidelity representation
const FORMAT_ICONS: { [key: string]: ComponentType<any> } = {
  video: Video,
  live: Users,
  quizzes: ClipboardCheck,
  assignments: FileText,
  interactive: Puzzle,
  reading: BookOpen,
};

export default function LearningPreferencesStep({ data, onChange, onNext, onBack }: LearningPreferencesStepProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (data.preferredFormats.length === 0) {
      newErrors.preferredFormats = 'Please choose at least one preferred study format';
    }
    if (!data.dailyLearningTime) {
      newErrors.dailyLearningTime = 'Please select your preferred daily study commitment';
    }
    if (!data.preferredLanguage) {
      newErrors.preferredLanguage = 'Please choose your preferred study language';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext();
    }
  };

  const handleFormatToggle = (id: string) => {
    const current = data.preferredFormats;
    const updated = current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id];
    
    onChange({ preferredFormats: updated });

    if (errors.preferredFormats) {
      setErrors(prev => ({ ...prev, preferredFormats: '' }));
    }
  };

  return (
    <div className="space-y-6 text-left" id="learning-preferences-container">
      {/* Header */}
      <div id="pref-header">
        <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Learning Preferences</h2>
        <p className="text-sm text-slate-500 mt-1">
          Define your study habits, daily schedule commitments, and desired format delivery to optimize curriculum pacing.
        </p>
      </div>

      {/* Grid structure: multi-select formats */}
      <div className="space-y-4" id="pref-format-section">
        <label className="text-xs font-semibold text-slate-700 block">
          How do you prefer to learn? <span className="text-gold-dark">*</span> <span className="text-slate-500 font-normal">(Select all that apply)</span>
        </label>
        
        {errors.preferredFormats && (
          <p className="text-xs text-red-500 mb-2 font-medium">{errors.preferredFormats}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="formats-grid">
          {FORMAT_OPTIONS.map((format) => {
            const IconComp = FORMAT_ICONS[format.id] || BookOpen;
            const isSelected = data.preferredFormats.includes(format.id);

            return (
              <motion.div
                key={format.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFormatToggle(format.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-start gap-3.5 transition-all duration-300 ${
                  isSelected
                    ? 'border-gold bg-slate-50 shadow-md shadow-gold/15 ring-2 ring-gold/10'
                    : 'border-slate-200 bg-white hover:border-gold/30 hover:shadow-sm'
                }`}
                id={`format-card-${format.id}`}
              >
                {/* Custom Icon wrapper */}
                <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center transition-colors ${
                  isSelected 
                    ? 'bg-gold text-slate-950' 
                    : 'bg-slate-50 text-gold-dark border border-gold/30'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>

                <div className="space-y-0.5 flex-1 pr-4">
                  <h4 className="text-sm font-bold text-slate-800 font-display flex items-center gap-2">
                    <span>{format.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-gold-dark shrink-0 stroke-[3.5]" />}
                  </h4>
                  <p className="text-xs text-slate-600 leading-normal pt-0.5 font-medium">
                    {format.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Grid: Daily Study Time & Language */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" id="pref-meta-fields">
        {/* Daily Time Options */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold-dark" />
            <span>Daily Study Commitment <span className="text-gold-dark">*</span></span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {DAILY_TIME_OPTIONS.map((time) => {
              const isSelected = data.dailyLearningTime === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => onChange({ dailyLearningTime: time })}
                  className={`px-3 py-3 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'border-gold bg-gold/15 text-gold-dark font-semibold shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-gold/30 hover:text-slate-700'
                  }`}
                >
                   {time}
                </button>
              );
            })}
          </div>
          {errors.dailyLearningTime && <p className="text-xs text-red-500 mt-1">{errors.dailyLearningTime}</p>}
        </div>

        {/* Preferred Learning Language */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-gold-dark" />
            <span>Preferred Instruction Language <span className="text-gold-dark">*</span></span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LANGUAGES.map((lang) => {
              const isSelected = data.preferredLanguage === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onChange({ preferredLanguage: lang })}
                  className={`px-3 py-3 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'border-gold bg-gold/15 text-gold-dark font-semibold shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-gold/30 hover:text-slate-700'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
          {errors.preferredLanguage && <p className="text-xs text-red-500 mt-1">{errors.preferredLanguage}</p>}
        </div>
      </div>

      {/* Core Academic Goals */}
      <div className="flex flex-col" id="pref-goals-section">
        <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-gold-dark" />
          <span>General Learning Goals <span className="text-slate-500 font-normal">(Optional)</span></span>
        </label>
        <textarea
          placeholder="e.g. Master the foundations of calculus to excel in college prep tests, study French grammar to conversational level, or build deep portfolio apps for junior engineering roles..."
          value={data.generalLearningGoals}
          rows={3}
          onChange={(e) => onChange({ generalLearningGoals: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all duration-300"
        />
      </div>

      {/* Button controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200" id="step-nav-buttons-pref">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          id="btn-back-5"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="px-8 py-3 rounded-xl bg-gold hover:bg-gold-hover text-slate-950 font-bold shadow-md shadow-gold/20 text-sm transition-all"
          id="btn-next-5"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
