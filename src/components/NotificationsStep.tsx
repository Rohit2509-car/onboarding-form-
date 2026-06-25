import { ComponentType } from 'react';
import { motion } from 'motion/react';
import { Mail, PhoneCall, BellRing, BarChart4, AlertCircle } from 'lucide-react';
import { OnboardingData } from '../types';

interface NotificationsStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface ToggleItem {
  id: 'emailNotifications' | 'smsAlerts' | 'pushNotifications' | 'weeklyReports';
  title: string;
  description: string;
  icon: ComponentType<any>;
  colorClass: string;
}

const TOGGLE_ITEMS: ToggleItem[] = [
  {
    id: 'emailNotifications',
    title: 'Email Notifications',
    description: 'Get direct announcements about course updates, test replies, and platform system changes.',
    icon: Mail,
    colorClass: 'text-gold-dark bg-slate-50 border border-gold/30',
  },
  {
    id: 'smsAlerts',
    title: 'SMS Text Alerts',
    description: 'Receive SMS micro-messages for upcoming webinars, live streams, and instant class reschedules.',
    icon: PhoneCall,
    colorClass: 'text-gold-dark bg-slate-50 border border-gold/30',
  },
  {
    id: 'pushNotifications',
    title: 'Instant Push Alerts',
    description: 'Get real-time browser indicators for peer questions, assignment status, and quiz notifications.',
    icon: BellRing,
    colorClass: 'text-gold-dark bg-slate-50 border border-gold/30',
  },
  {
    id: 'weeklyReports',
    title: 'Weekly Performance Digest',
    description: "Receive a comprehensive diagnostic summary of completed study tasks and milestone achievement stats.",
    icon: BarChart4,
    colorClass: 'text-gold-dark bg-slate-50 border border-gold/30',
  },
];

export default function NotificationsStep({ data, onChange, onNext, onBack }: NotificationsStepProps) {
  const handleToggle = (id: ToggleItem['id']) => {
    onChange({ [id]: !data[id] });
  };

  return (
    <div className="space-y-6 text-left" id="notifications-container">
      {/* Header */}
      <div id="notify-header">
        <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Notification Settings</h2>
        <p className="text-sm text-slate-500 mt-1">
          Customize how you would like to receive updates, educational tips, and institutional notifications.
        </p>
      </div>

      {/* Switches Panel */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden" id="notify-switches-card">
        {TOGGLE_ITEMS.map((item) => {
          const IconComp = item.icon;
          const isActive = data[item.id];

          return (
            <div 
              key={item.id} 
              className="p-5 flex items-center justify-between gap-6 hover:bg-slate-100/50 transition-colors cursor-pointer"
              onClick={() => handleToggle(item.id)}
              id={`toggle-row-${item.id}`}
            >
              <div className="flex items-start gap-4" id={`toggle-left-${item.id}`}>
                {/* Rounded Icon badge */}
                <div className={`p-3 rounded-xl shrink-0 flex items-center justify-center ${item.colorClass}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-800 font-display">{item.title}</h4>
                  <p className="text-xs text-slate-550 leading-normal max-w-lg font-medium">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* HIGH FIDELITY ANIMATED TOGGLE BUTTON */}
              <div 
                className={`relative w-12 h-6.5 rounded-full p-1 transition-colors duration-300 flex items-center ${
                  isActive ? 'bg-gold' : 'bg-slate-200'
                }`}
                id={`toggle-switch-${item.id}`}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`w-4.5 h-4.5 rounded-full shadow-md ${isActive ? 'bg-slate-950' : 'bg-white border border-slate-300'}`}
                  animate={{ x: isActive ? 20 : 0 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance banner */}
      <div className="p-4 rounded-xl bg-gold/10 border border-gold/25 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-gold-dark">Communication Guarantee</p>
          <p className="text-[11px] text-slate-650 leading-normal font-medium">
            You can revoke or adjust these settings at any time in your student dashboard. We never share or sell your contact metadata.
          </p>
        </div>
      </div>

      {/* Button controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200" id="step-nav-buttons-notify">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          id="btn-back-6"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-gold hover:bg-gold-hover text-slate-950 font-bold shadow-md shadow-gold/20 text-sm transition-all"
          id="btn-next-6"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
