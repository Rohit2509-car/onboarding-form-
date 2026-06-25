import { ComponentType } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Landmark, Users, Key, Check } from 'lucide-react';
import { OnboardingData, UserRole } from '../types';

interface RoleSelectionStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface RoleCard {
  id: UserRole;
  title: string;
  description: string;
  icon: ComponentType<any>;
  colorClass: string;
  badgeClass: string;
}

const ROLE_CARDS: RoleCard[] = [
  {
    id: 'student',
    title: 'Student',
    description: 'Access courses, participate in interactive quizzes, submit projects, and track your daily performance metrics.',
    icon: GraduationCap,
    colorClass: 'bg-slate-50 text-gold-dark border border-gold/30',
    badgeClass: 'bg-gold/15 text-gold-dark border border-gold/25',
  },
  {
    id: 'teacher',
    title: 'Educator / Teacher',
    description: 'Design course curriculums, evaluate mock test assignments, lead live webinars, and mentor student groups.',
    icon: Landmark,
    colorClass: 'bg-slate-50 text-gold-dark border border-gold/30',
    badgeClass: 'bg-gold/15 text-gold-dark border border-gold/25',
  },
  {
    id: 'parent',
    title: 'Parent / Guardian',
    description: "Monitor your child's academic milestones, receive progress summaries, and collaborate directly with teachers.",
    icon: Users,
    colorClass: 'bg-slate-50 text-gold-dark border border-gold/30',
    badgeClass: 'bg-gold/15 text-gold-dark border border-gold/25',
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage campus permissions, oversee academic compliance, moderate forums, and audit institutional configurations.',
    icon: Key,
    colorClass: 'bg-slate-50 text-gold-dark border border-gold/30',
    badgeClass: 'bg-gold/15 text-gold-dark border border-gold/25',
  },
];

export default function RoleSelectionStep({ data, onChange, onNext, onBack }: RoleSelectionStepProps) {
  const handleRoleSelect = (role: UserRole) => {
    onChange({ role });
  };

  return (
    <div className="space-y-6" id="role-selection-container">
      {/* Step Heading */}
      <div className="text-left" id="step-header-role">
        <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Choose your platform role</h2>
        <p className="text-sm text-slate-500 mt-1">
          Select the option that best represents how you will interact with the educational ecosystem.
        </p>
      </div>

      {/* Grid of Interactive Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="roles-grid">
        {ROLE_CARDS.map((role) => {
          const IconComponent = role.icon;
          const isSelected = data.role === role.id;

          return (
            <motion.div
              key={role.id}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleRoleSelect(role.id)}
              className={`relative cursor-pointer text-left p-6 rounded-[20px] border transition-all duration-300 flex flex-col justify-between h-full ${
                isSelected
                  ? 'border-gold bg-slate-50 shadow-md shadow-gold/15 ring-2 ring-gold/20'
                  : 'border-slate-200 bg-white hover:border-gold/30 hover:shadow-sm'
              }`}
              id={`role-card-${role.id}`}
            >
              <div className="space-y-4">
                {/* Header Icon + Selection Indicator */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-14 h-14 ${role.colorClass} rounded-2xl flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-slate-950"
                      id={`checked-role-${role.id}`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    </motion.div>
                  )}
                </div>

                {/* Role text details */}
                <div className="space-y-1">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${role.badgeClass}`}>
                    {role.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 font-display pt-1">{role.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1 font-medium">
                    {role.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200" id="step-nav-buttons-role">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          id="btn-back-3"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!data.role}
          className={`px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
            data.role
              ? 'bg-gold hover:bg-gold-hover text-slate-950 shadow-gold/20 cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
          id="btn-next-3"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
