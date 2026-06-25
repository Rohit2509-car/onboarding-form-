export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface StudentInfo {
  grade: string;
  schoolName: string;
  preferredSubjects: string[];
  currentLevel: string;
}

export interface TeacherInfo {
  institutionName: string;
  teachingExperience: string;
  subjectsTaught: string[];
  qualification: string;
}

export interface ParentInfo {
  childGrade: string;
  numberOfChildren: number;
  learningGoals: string;
}

export interface OnboardingData {
  // Step 2: Personal Information
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  country: string;
  profilePicture: string; // Base64 string or default avatar path

  // Step 3: Role Selection
  role: UserRole | null;

  // Step 4: Educational Information (depending on role)
  studentInfo: StudentInfo;
  teacherInfo: TeacherInfo;
  parentInfo: ParentInfo;
  adminInstitution: string; // Dynamic admin fields
  adminDepartment: string;

  // Step 5: Learning Preferences
  preferredFormats: string[]; // Multi-select options
  dailyLearningTime: string;
  preferredLanguage: string;
  generalLearningGoals: string;

  // Step 6: Notifications & Communication
  emailNotifications: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;

  // Step 7: Privacy & Consent
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  marketingConsent: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export const INITIAL_ONBOARDING_DATA: OnboardingData = {
  fullName: '',
  email: '',
  mobile: '',
  dob: '',
  gender: '',
  country: '',
  profilePicture: '',
  role: null,
  studentInfo: {
    grade: '',
    schoolName: '',
    preferredSubjects: [],
    currentLevel: '',
  },
  teacherInfo: {
    institutionName: '',
    teachingExperience: '',
    subjectsTaught: [],
    qualification: '',
  },
  parentInfo: {
    childGrade: '',
    numberOfChildren: 1,
    learningGoals: '',
  },
  adminInstitution: '',
  adminDepartment: '',
  preferredFormats: [],
  dailyLearningTime: '1 hour',
  preferredLanguage: 'English',
  generalLearningGoals: '',
  emailNotifications: true,
  smsAlerts: false,
  pushNotifications: true,
  weeklyReports: true,
  acceptTerms: false,
  acceptPrivacy: false,
  marketingConsent: false,
};

export const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'India',
  'Germany', 'France', 'Japan', 'Brazil', 'South Africa', 'Singapore',
  'New Zealand', 'United Arab Emirates', 'Spain', 'Mexico'
];

export const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export const SUBJECT_OPTIONS = [
  'Mathematics', 'Science (Physics/Chemistry/Biology)', 'English Literature & Language',
  'History', 'Geography', 'Computer Science & Coding', 'Art & Design',
  'Music', 'Foreign Languages', 'Economics & Business'
];

export const FORMAT_OPTIONS = [
  { id: 'video', label: 'Video Lessons', description: 'Bite-sized, animated & structured videos' },
  { id: 'live', label: 'Live Classes', description: 'Interactive webinars and real-time QA' },
  { id: 'quizzes', label: 'Practice Quizzes', description: 'Self-paced tests with instant explanations' },
  { id: 'assignments', label: 'Assignments', description: 'Hands-on projects with educator feedback' },
  { id: 'interactive', label: 'Interactive Activities', description: 'Gamified puzzles and collaborative tasks' },
  { id: 'reading', label: 'Reading Materials', description: 'Comprehensive PDFs, articles, and e-books' }
];

export const DAILY_TIME_OPTIONS = [
  '15 - 30 minutes',
  '30 - 60 minutes',
  '1 - 2 hours',
  '2+ hours'
];

export const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Hindi'
];
