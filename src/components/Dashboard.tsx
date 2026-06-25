import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, Landmark, Users, Key, Sparkles, BookOpen, 
  Calendar, Clock, Settings, RefreshCw, Star, ArrowUpRight, 
  CheckCircle, Plus, Mail, MessageSquare, Shield, Bell, LogOut, FileText
} from 'lucide-react';
import { OnboardingData } from '../types';

interface DashboardProps {
  data: OnboardingData;
  onReset: () => void;
}

export default function Dashboard({ data, onReset }: DashboardProps) {
  const [supportMessage, setSupportMessage] = useState<string>('');

  // Safe defaults
  const name = data.fullName || 'EduQuest User';
  const role = data.role || 'student';
  const avatar = data.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256';

  // Subtitle/Meta based on role
  const getRoleBadgeColor = () => {
    return 'bg-gold/15 text-gold border-gold/25';
  };

  const getRoleInstitution = () => {
    switch (role) {
      case 'student': return data.studentInfo.schoolName || 'Global Academy';
      case 'teacher': return data.teacherInfo.institutionName || 'Westwood Secondary School';
      case 'parent': return `Guardian Profile • ${data.parentInfo.numberOfChildren} Children`;
      case 'admin': return data.adminInstitution || 'System Administration';
      default: return 'EduQuest Campus';
    }
  };

  const handleSupportClick = () => {
    setSupportMessage('Live support channels are offline in the preview sandbox.');
    setTimeout(() => setSupportMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-16" id="dashboard-root">
      {/* Premium Dashboard Navbar */}
      <header className="bg-white/80 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md" id="dashboard-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gold text-slate-950 shadow-md shadow-gold/10 flex items-center justify-center">
              <GraduationCap className="w-5.5 h-5.5" />
            </div>
            <span className="font-display font-bold text-slate-900 text-lg tracking-tight">EduQuest SaaS</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification alert simulator */}
            {data.pushNotifications && (
              <button className="relative p-2 text-slate-500 hover:text-gold-dark hover:bg-slate-100 rounded-xl transition-all">
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full ring-2 ring-white" />
                <Bell className="w-5 h-5" />
              </button>
            )}

            <div className="h-8 w-px bg-slate-200" />

            {/* Quick Profile Pill */}
            <div className="flex items-center gap-2.5">
              <img 
                src={avatar} 
                alt="Profile Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <span className="hidden sm:inline text-xs font-bold text-slate-700 truncate max-w-[120px]">
                {name}
              </span>
            </div>

            {/* Re-do / Reset Onboarding */}
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-gold-dark bg-white hover:bg-slate-50 border border-slate-200 hover:border-gold/30 px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer"
              title="Reset onboarding and change roles"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gold-dark" />
              <span className="hidden md:inline">Reset Profile</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 text-left" id="dashboard-main">
        
        {/* Welcome Block */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm" id="welcome-banner">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Profile pic frame */}
            <div className="relative shrink-0">
              <img 
                src={avatar} 
                alt="Profile" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-gold/20 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1.5 -right-1.5 p-1 rounded-lg bg-gold text-slate-950 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
                  Welcome back, <span className="text-gold-dark font-extrabold">{name}</span>!
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getRoleBadgeColor()}`}>
                  {role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 font-medium">
                <Landmark className="w-4 h-4 text-gold-dark" />
                <span>{getRoleInstitution()}</span>
              </p>
            </div>
          </div>

          {/* Quick study metrics summary */}
          <div className="flex items-center gap-6 divide-x divide-slate-200 pt-4 md:pt-0 border-t border-slate-200 md:border-none w-full md:w-auto" id="quick-metrics">
            <div className="pr-6">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Commitment</p>
              <p className="text-lg font-bold text-gold-dark font-display mt-0.5">{data.dailyLearningTime}</p>
            </div>
            <div className="pl-6">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Study Language</p>
              <p className="text-lg font-bold text-gold-dark font-display mt-0.5">{data.preferredLanguage}</p>
            </div>
          </div>
        </section>

        {/* Primary Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="dashboard-grid">
          
          {/* LEFT & CENTER PANELS: Core Academic Workspaces */}
          <div className="lg:col-span-2 space-y-6" id="dashboard-workspace-left">
            
            {/* STUDENT WORKSPACE */}
            {role === 'student' && (
              <div className="space-y-6" id="student-workspace">
                {/* Preferred subjects track */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                      <BookOpen className="w-4.5 h-4.5 text-gold-dark" />
                      <span>Syllabus Cores ({data.studentInfo.preferredSubjects.length})</span>
                    </h3>
                    <span className="text-xs text-gold-dark font-bold cursor-pointer flex items-center gap-0.5">
                      <span>Add Course</span>
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {data.studentInfo.preferredSubjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {data.studentInfo.preferredSubjects.map((subj, index) => (
                        <div key={subj} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-gold/30 transition-all flex items-start justify-between group">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wide text-gold-dark block">Syllabus Core {index + 1}</span>
                            <h4 className="text-sm font-bold text-slate-800 font-display mt-1">{subj}</h4>
                            <p className="text-xs text-slate-500 mt-0.5 font-medium">Academic Level: {data.studentInfo.currentLevel}</p>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-gold-dark group-hover:bg-gold group-hover:text-slate-950 transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
                      <p className="text-sm text-slate-500">No core subjects specified. Click "Reset Profile" to select preferred topics.</p>
                    </div>
                  )}
                </div>

                {/* Study planner schedule */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 font-display mb-4 flex items-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-gold-dark" />
                    <span>Daily Study Planner</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-gold/5 border border-gold/20 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white text-gold-dark border border-gold/15 shadow-sm flex items-center justify-center">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 font-display">Concept Review session</p>
                          <p className="text-[10px] text-slate-500 font-medium">Duration: {data.dailyLearningTime} • Adaptive Pacing</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1.5 rounded-full bg-gold text-slate-950 hover:bg-gold-hover text-[10px] font-bold cursor-pointer transition-colors shadow-sm">START STUDY</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-50 text-gold-dark flex items-center justify-center border border-slate-100">
                          <CheckCircle className="w-4 h-4 text-gold-dark" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 font-display">Complete Diagnostic Quiz</p>
                          <p className="text-[10px] text-slate-500 font-medium">Mock Quiz • 15 questions</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gold-dark bg-gold/10 border border-gold/25 px-2.5 py-1 rounded-md">COMPLETED</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TEACHER WORKSPACE */}
            {role === 'teacher' && (
              <div className="space-y-6" id="teacher-workspace">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                      <BookOpen className="w-4.5 h-4.5 text-gold-dark" />
                      <span>Subjects You Teach ({data.teacherInfo.subjectsTaught.length})</span>
                    </h3>
                    <span className="text-xs font-bold text-gold-dark flex items-center gap-1 cursor-pointer">
                      <span>Add Curriculum</span>
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.teacherInfo.subjectsTaught.map((subj, idx) => (
                      <div key={subj} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-gold/30 transition-all flex items-start justify-between group">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wide text-gold-dark block">Course {idx + 1}</span>
                          <h4 className="text-sm font-bold text-slate-800 font-display mt-1">{subj}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">Level: {data.teacherInfo.qualification}</p>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white text-gold-dark border border-slate-200 group-hover:bg-gold group-hover:text-slate-950 transition-all flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Classroom diagnostics */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-900 font-display">Grading Queue</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-700 font-semibold">Calculus Homework 3</span>
                        <span className="font-bold text-gold-dark">12 Pending</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                        <div className="bg-gold h-full w-2/3" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">Expedite review to meet system schedule requirements.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-900 font-display">Educator Stats</h4>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-gold/5 rounded-xl border border-gold/20">
                        <p className="text-[10px] text-slate-500 font-bold">EXP LEVEL</p>
                        <p className="text-sm font-bold text-slate-850 font-display mt-1">{data.teacherInfo.teachingExperience}</p>
                      </div>
                      <div className="p-3 bg-gold/5 rounded-xl border border-gold/20">
                        <p className="text-[10px] text-slate-500 font-bold">SYSTEM ACTIVE</p>
                        <p className="text-sm font-bold text-slate-850 font-display mt-1">4 Classes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PARENT WORKSPACE */}
            {role === 'parent' && (
              <div className="space-y-6" id="parent-workspace">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                    <Users className="w-4.5 h-4.5 text-gold-dark" />
                    <span>Your Child Profiles ({data.parentInfo.numberOfChildren})</span>
                  </h3>

                  <div className="space-y-3.5">
                    {Array.from({ length: data.parentInfo.numberOfChildren }).map((_, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gold/15 text-gold-dark border border-gold/25 font-bold text-sm flex items-center justify-center shrink-0">
                            C{idx + 1}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 font-display">Child Student Profile {idx + 1}</h4>
                            <p className="text-xs text-slate-500 font-medium">Grade Level: {data.parentInfo.childGrade || 'Grade 5'}</p>
                          </div>
                        </div>

                        {/* Micro tracking progress bar */}
                        <div className="w-full sm:max-w-[200px] space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                            <span>Syllabus Progress</span>
                            <span className="text-gold-dark">{65 + idx * 10}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden border border-slate-100">
                            <div className="bg-gold h-full" style={{ width: `${65 + idx * 10}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals review card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 font-display mb-3">Family Study Objective</h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm leading-relaxed italic font-medium">
                    "{data.parentInfo.learningGoals || 'No learning goals stated.'}"
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Stated goals are synchronized with teacher evaluation criteria.</p>
                </div>
              </div>
            )}

            {/* ADMINISTRATOR WORKSPACE */}
            {role === 'admin' && (
              <div className="space-y-6" id="admin-workspace">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 font-display mb-4 flex items-center gap-2">
                    <Shield className="w-4.5 h-4.5 text-gold-dark" />
                    <span>Campus Control Metrics: {data.adminInstitution || 'Central Hub'}</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Campus Department</p>
                      <p className="text-sm font-bold text-slate-800 font-display mt-1">{data.adminDepartment || 'Academic Registry'}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Active Ratios</p>
                      <p className="text-sm font-bold text-slate-800 font-display mt-1">15:1 Student-Teacher</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1 shadow-sm">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">System Security</p>
                      <p className="text-sm font-bold text-gold-dark flex items-center gap-1.5 mt-1">
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                        <span>Audit Compliant</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Audit trail simulation */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 font-display mb-3">System Log Auditing</h3>
                  <div className="space-y-2 font-mono text-[11px] text-slate-600">
                    <div className="flex justify-between p-2 rounded bg-slate-50 border border-slate-200 shadow-inner">
                      <span>SEC_AUDIT: Profile config generated for role: administrator</span>
                      <span className="text-slate-400">Just now</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-50 border border-slate-200 shadow-inner">
                      <span>REG_SYS: Encryption flags toggled to active</span>
                      <span className="text-slate-400">1m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Unified Learning Preferences Dashboard Summary */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm" id="preferences-workspace-track">
              <h3 className="text-base font-bold text-slate-900 font-display mb-4 flex items-center gap-2">
                <Settings className="w-4.5 h-4.5 text-gold-dark" />
                <span>Active Study Media & Preferences</span>
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {data.preferredFormats.map((formatId) => (
                  <span 
                    key={formatId} 
                    className="px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-xs text-gold-dark font-bold capitalize"
                  >
                    ✦ {formatId.replace('_', ' ')} Lessons
                  </span>
                ))}
                {data.preferredFormats.length === 0 && (
                  <span className="text-xs text-slate-500">No preference tags selected.</span>
                )}
              </div>

              {data.generalLearningGoals && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Personal Milestone Goal</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{data.generalLearningGoals}</p>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDEBAR: Alert Settings, Communication summaries, calendar widget */}
          <div className="space-y-6" id="dashboard-workspace-right">
            
            {/* Quick Profile Diagnostic card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-md" id="side-profile-card">
              <img 
                src={avatar} 
                alt="Profile Large" 
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-base font-bold text-slate-900 font-display mt-3">{name}</h3>
              <p className="text-xs text-slate-500 font-semibold capitalize">{role} Account</p>

              <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2 text-left">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Contact Channel</p>
                  <p className="text-xs font-bold text-slate-800 font-display truncate mt-0.5">{data.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Phone Alert</p>
                  <p className="text-xs font-bold text-slate-800 font-display mt-0.5">{data.mobile || 'Not set'}</p>
                </div>
              </div>
            </div>

            {/* Alert Channels configured */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md" id="side-alerts-card">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Activated Alert Channels</h4>
              <div className="space-y-2.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center justify-between">
                  <span>Email Alerts</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.emailNotifications ? 'bg-gold/10 text-gold-dark border border-gold/25' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                    {data.emailNotifications ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SMS Texts</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.smsAlerts ? 'bg-gold/10 text-gold-dark border border-gold/25' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                    {data.smsAlerts ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Push Alerts</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.pushNotifications ? 'bg-gold/10 text-gold-dark border border-gold/25' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                    {data.pushNotifications ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Weekly Diagnostics</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.weeklyReports ? 'bg-gold/10 text-gold-dark border border-gold/25' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                    {data.weeklyReports ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white border border-slate-700 space-y-4 shadow-xl">
              <div>
                <h4 className="text-sm font-bold text-white font-display">Need custom guidance?</h4>
                <p className="text-xs text-slate-400 leading-normal mt-1">
                  Connect with academic counselors or teachers to resolve syllabus roadblocks.
                </p>
              </div>
              <button 
                type="button"
                onClick={handleSupportClick}
                className="w-full py-2.5 text-xs font-bold bg-gold hover:bg-gold-hover text-slate-950 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Launch Live Support Room
              </button>
              {supportMessage && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] text-gold font-medium mt-2"
                >
                  {supportMessage}
                </motion.p>
              )}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
