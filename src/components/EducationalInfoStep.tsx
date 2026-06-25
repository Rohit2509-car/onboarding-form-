import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Landmark, Users, Plus, Minus, BookOpen, Star, Sparkles } from 'lucide-react';
import { OnboardingData, FormErrors, SUBJECT_OPTIONS } from '../types';

interface EducationalInfoStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ACADEMIC_LEVELS = ['Middle School', 'High School', 'Undergraduate', 'Postgraduate', 'Professional'];
const EXPERIENCE_OPTIONS = ['Less than 1 year', '1 - 3 years', '4 - 7 years', '8+ years'];
const QUALIFICATIONS = ["Bachelor's Degree", "Master's Degree", 'Doctorate / Ph.D.', 'Teaching Certification', 'Other Professional Degree'];
const ADMIN_DEPARTMENTS = ['Academic Registry', 'Admissions Office', 'IT & Systems Management', 'Student Affairs', 'Campus Administration'];

export default function EducationalInfoStep({ data, onChange, onNext, onBack }: EducationalInfoStepProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (data.role === 'student') {
      if (!data.studentInfo.grade) {
        newErrors.grade = 'Please select your grade or class level';
      }
      if (!data.studentInfo.schoolName.trim()) {
        newErrors.schoolName = 'School / College name is required';
      }
      if (!data.studentInfo.currentLevel) {
        newErrors.currentLevel = 'Current academic level is required';
      }
      if (data.studentInfo.preferredSubjects.length === 0) {
        newErrors.preferredSubjects = 'Please select at least one preferred subject';
      }
    } else if (data.role === 'teacher') {
      if (!data.teacherInfo.institutionName.trim()) {
        newErrors.institutionName = 'Institution name is required';
      }
      if (!data.teacherInfo.teachingExperience) {
        newErrors.teachingExperience = 'Teaching experience is required';
      }
      if (!data.teacherInfo.qualification) {
        newErrors.qualification = 'Highest qualification is required';
      }
      if (data.teacherInfo.subjectsTaught.length === 0) {
        newErrors.subjectsTaught = 'Please select at least one subject taught';
      }
    } else if (data.role === 'parent') {
      if (!data.parentInfo.childGrade) {
        newErrors.childGrade = "Please enter your child's grade or class level";
      }
      if (!data.parentInfo.learningGoals.trim()) {
        newErrors.parentLearningGoals = 'Learning goals are required';
      }
    } else if (data.role === 'admin') {
      if (!data.adminInstitution.trim()) {
        newErrors.adminInstitution = 'Institution/Campus Name is required';
      }
      if (!data.adminDepartment) {
        newErrors.adminDepartment = 'Administrative Department is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext();
    }
  };

  // Helper to handle subject chips toggling
  const handleSubjectToggle = (subject: string) => {
    if (data.role === 'student') {
      const current = data.studentInfo.preferredSubjects;
      const updated = current.includes(subject)
        ? current.filter(s => s !== subject)
        : [...current, subject];
      
      onChange({
        studentInfo: {
          ...data.studentInfo,
          preferredSubjects: updated,
        },
      });

      if (errors.preferredSubjects) {
        setErrors(prev => ({ ...prev, preferredSubjects: '' }));
      }
    } else if (data.role === 'teacher') {
      const current = data.teacherInfo.subjectsTaught;
      const updated = current.includes(subject)
        ? current.filter(s => s !== subject)
        : [...current, subject];

      onChange({
        teacherInfo: {
          ...data.teacherInfo,
          subjectsTaught: updated,
        },
      });

      if (errors.subjectsTaught) {
        setErrors(prev => ({ ...prev, subjectsTaught: '' }));
      }
    }
  };

  return (
    <div className="space-y-6 text-left" id="educational-info-container">
      {/* Header */}
      <div id="edu-header">
        <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Educational Profile</h2>
        <p className="text-sm text-slate-500 mt-1">
          Provide your professional or academic parameters to fine-tune recommendations.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6" id="edu-form-card">
        {/* STUDENT ROLE FIELDS */}
        {data.role === 'student' && (
          <div className="space-y-5" id="student-fields-block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* School / College Name */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-gold-dark" />
                  <span>School / College Name <span className="text-gold-dark">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stanford University"
                  value={data.studentInfo.schoolName}
                  onChange={(e) => {
                    onChange({
                      studentInfo: { ...data.studentInfo, schoolName: e.target.value },
                    });
                    if (errors.schoolName) setErrors(prev => ({ ...prev, schoolName: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.schoolName 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                  }`}
                />
                {errors.schoolName && <p className="text-xs text-red-500 mt-1">{errors.schoolName}</p>}
              </div>

              {/* Grade / Class */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                  Grade / Class / Year <span className="text-gold-dark">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grade 11, Sophomore"
                  value={data.studentInfo.grade}
                  onChange={(e) => {
                    onChange({
                      studentInfo: { ...data.studentInfo, grade: e.target.value },
                    });
                    if (errors.grade) setErrors(prev => ({ ...prev, grade: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.grade 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                  }`}
                />
                {errors.grade && <p className="text-xs text-red-500 mt-1">{errors.grade}</p>}
              </div>
            </div>

            {/* Academic Level Selector */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-700 mb-2">
                Current Academic Level <span className="text-gold-dark">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {ACADEMIC_LEVELS.map((level) => {
                  const isSelected = data.studentInfo.currentLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        onChange({
                          studentInfo: { ...data.studentInfo, currentLevel: level },
                        });
                        if (errors.currentLevel) setErrors(prev => ({ ...prev, currentLevel: '' }));
                      }}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-gold bg-gold/15 text-gold-dark shadow-sm'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-gold/30 hover:text-slate-700'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
              {errors.currentLevel && <p className="text-xs text-red-500 mt-1">{errors.currentLevel}</p>}
            </div>

            {/* Preferred Subjects multi-select */}
            <div className="flex flex-col pt-2">
              <label className="text-xs font-semibold text-slate-700 mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
                <span>Preferred Subjects <span className="text-gold-dark">*</span> <span className="text-slate-500 font-normal">(Select all that apply)</span></span>
              </label>
              <div className="flex flex-wrap gap-2">
                {SUBJECT_OPTIONS.map((subj) => {
                  const isSelected = data.studentInfo.preferredSubjects.includes(subj);
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => handleSubjectToggle(subj)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'border-gold bg-gold/15 text-gold-dark font-semibold'
                          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-gold/30'
                      }`}
                    >
                      {isSelected && <Star className="w-3 h-3 fill-gold text-gold shrink-0" />}
                      <span>{subj}</span>
                    </button>
                  );
                })}
              </div>
              {errors.preferredSubjects && <p className="text-xs text-red-500 mt-1">{errors.preferredSubjects}</p>}
            </div>
          </div>
        )}

        {/* TEACHER ROLE FIELDS */}
        {data.role === 'teacher' && (
          <div className="space-y-5" id="teacher-fields-block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Institution Name */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Institution / School Name <span className="text-gold-dark">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Westwood Academy"
                  value={data.teacherInfo.institutionName}
                  onChange={(e) => {
                    onChange({
                      teacherInfo: { ...data.teacherInfo, institutionName: e.target.value },
                    });
                    if (errors.institutionName) setErrors(prev => ({ ...prev, institutionName: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.institutionName 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                  }`}
                />
                {errors.institutionName && <p className="text-xs text-red-500 mt-1">{errors.institutionName}</p>}
              </div>

              {/* Teaching Experience */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                  Teaching Experience <span className="text-gold-dark">*</span>
                </label>
                <select
                  value={data.teacherInfo.teachingExperience}
                  onChange={(e) => {
                    onChange({
                      teacherInfo: { ...data.teacherInfo, teachingExperience: e.target.value },
                    });
                    if (errors.teachingExperience) setErrors(prev => ({ ...prev, teachingExperience: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                    errors.teachingExperience 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                  }`}
                >
                  <option value="" className="bg-white">Select Experience</option>
                  {EXPERIENCE_OPTIONS.map((exp) => (
                    <option key={exp} value={exp} className="bg-white">{exp}</option>
                  ))}
                </select>
                {errors.teachingExperience && <p className="text-xs text-red-500 mt-1">{errors.teachingExperience}</p>}
              </div>
            </div>

            {/* Highest Qualification */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-700 mb-1.5">
                Highest Academic Qualification <span className="text-gold-dark">*</span>
              </label>
              <select
                value={data.teacherInfo.qualification}
                onChange={(e) => {
                  onChange({
                    teacherInfo: { ...data.teacherInfo, qualification: e.target.value },
                  });
                  if (errors.qualification) setErrors(prev => ({ ...prev, qualification: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                  errors.qualification 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                }`}
              >
                <option value="" className="bg-white">Select Qualification</option>
                {QUALIFICATIONS.map((qual) => (
                  <option key={qual} value={qual} className="bg-white">{qual}</option>
                ))}
              </select>
              {errors.qualification && <p className="text-xs text-red-500 mt-1">{errors.qualification}</p>}
            </div>

            {/* Subjects Taught multi-select */}
            <div className="flex flex-col pt-2">
              <label className="text-xs font-semibold text-slate-700 mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
                <span>Subjects Taught <span className="text-gold-dark">*</span> <span className="text-slate-500 font-normal">(Select all that apply)</span></span>
              </label>
              <div className="flex flex-wrap gap-2">
                {SUBJECT_OPTIONS.map((subj) => {
                  const isSelected = data.teacherInfo.subjectsTaught.includes(subj);
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => handleSubjectToggle(subj)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'border-gold bg-gold/15 text-gold-dark font-semibold'
                          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-gold/30'
                      }`}
                    >
                      {isSelected && <Star className="w-3 h-3 fill-gold text-gold shrink-0" />}
                      <span>{subj}</span>
                    </button>
                  );
                })}
              </div>
              {errors.subjectsTaught && <p className="text-xs text-red-500 mt-1">{errors.subjectsTaught}</p>}
            </div>
          </div>
        )}

        {/* PARENT ROLE FIELDS */}
        {data.role === 'parent' && (
          <div className="space-y-5" id="parent-fields-block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Child's Grade */}
              <div className="flex flex-col justify-end">
                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                  Child's Grade / Learning Year <span className="text-gold-dark">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grade 5, Preschool"
                  value={data.parentInfo.childGrade}
                  onChange={(e) => {
                    onChange({
                      parentInfo: { ...data.parentInfo, childGrade: e.target.value },
                    });
                    if (errors.childGrade) setErrors(prev => ({ ...prev, childGrade: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.childGrade 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                  }`}
                />
                {errors.childGrade && <p className="text-xs text-red-500 mt-1">{errors.childGrade}</p>}
              </div>

              {/* Number of Children Interactive Counter */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Number of Children</span>
                </label>
                <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 rounded-xl p-1 max-w-[160px]">
                  <button
                    type="button"
                    onClick={() => {
                      const count = Math.max(1, data.parentInfo.numberOfChildren - 1);
                      onChange({ parentInfo: { ...data.parentInfo, numberOfChildren: count } });
                    }}
                    className="w-9 h-9 flex items-center justify-center bg-white rounded-lg border border-slate-200 text-slate-600 hover:text-gold-dark hover:border-gold active:bg-slate-50 shadow-sm font-semibold transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center font-bold text-slate-800 text-sm">
                    {data.parentInfo.numberOfChildren}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const count = Math.min(10, data.parentInfo.numberOfChildren + 1);
                      onChange({ parentInfo: { ...data.parentInfo, numberOfChildren: count } });
                    }}
                    className="w-9 h-9 flex items-center justify-center bg-white rounded-lg border border-slate-200 text-slate-600 hover:text-gold-dark hover:border-gold active:bg-slate-50 shadow-sm font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Child's Learning Goals text area */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Key Learning Goals for Children <span className="text-gold-dark">*</span></span>
                <span className="text-[10px] text-slate-500 font-normal">Min 10 chars</span>
              </label>
              <textarea
                placeholder="e.g. Build foundational reading skills, improve arithmetic performance, or explore introductory software coding..."
                value={data.parentInfo.learningGoals}
                rows={4}
                onChange={(e) => {
                  onChange({
                    parentInfo: { ...data.parentInfo, learningGoals: e.target.value },
                  });
                  if (errors.parentLearningGoals) setErrors(prev => ({ ...prev, parentLearningGoals: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.parentLearningGoals 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                }`}
              />
              {errors.parentLearningGoals && <p className="text-xs text-red-500 mt-1">{errors.parentLearningGoals}</p>}
              
              {/* Suggestion tags for parent */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[10px] text-slate-500 font-medium py-1">Quick additions:</span>
                {['Boost Math Grades', 'College Prep', 'Interactive Coding', 'Reading Habits'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const current = data.parentInfo.learningGoals.trim();
                      const suffix = current ? `, ${tag.toLowerCase()}` : tag;
                      onChange({
                        parentInfo: {
                          ...data.parentInfo,
                          learningGoals: current + suffix,
                        },
                      });
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 hover:text-gold-dark border border-slate-200 text-slate-600 text-[10px] font-medium transition-all"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ADMINISTRATOR ROLE FIELDS */}
        {data.role === 'admin' && (
          <div className="space-y-5" id="admin-fields-block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Institution Name */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Campus / Corporate Institution <span className="text-gold-dark">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lincoln High District"
                  value={data.adminInstitution}
                  onChange={(e) => {
                    onChange({ adminInstitution: e.target.value });
                    if (errors.adminInstitution) setErrors(prev => ({ ...prev, adminInstitution: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.adminInstitution 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                  }`}
                />
                {errors.adminInstitution && <p className="text-xs text-red-500 mt-1">{errors.adminInstitution}</p>}
              </div>

              {/* Administrative Department */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                  Administrative Department <span className="text-gold-dark">*</span>
                </label>
                <select
                  value={data.adminDepartment}
                  onChange={(e) => {
                    onChange({ adminDepartment: e.target.value });
                    if (errors.adminDepartment) setErrors(prev => ({ ...prev, adminDepartment: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                    errors.adminDepartment 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-200 focus:ring-gold/25 focus:border-gold'
                  }`}
                >
                  <option value="" className="bg-white">Select Department</option>
                  {ADMIN_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept} className="bg-white">{dept}</option>
                  ))}
                </select>
                {errors.adminDepartment && <p className="text-xs text-red-500 mt-1">{errors.adminDepartment}</p>}
              </div>
            </div>

            {/* Note about admin dashboard setup */}
            <div className="p-4 rounded-xl bg-gold/10 border border-gold/25 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gold-dark">Admin Control Console Enabled</p>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  Selecting Admin role provisions system management controls. You will be able to manage user credentials, review system audits, and configure global campus integrations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Button controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200" id="step-nav-buttons-edu">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          id="btn-back-4"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="px-8 py-3 rounded-xl bg-gold hover:bg-gold-hover text-slate-950 font-bold shadow-md shadow-gold/20 text-sm transition-all"
          id="btn-next-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
