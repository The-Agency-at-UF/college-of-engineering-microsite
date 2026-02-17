// Department types and data
export interface Department {
  id: string;
  name: string;
  fullName: string;
}

export const DEPARTMENTS: Department[] = [
  { id: "all", name: "ALL", fullName: "All Departments" },
  { id: "ece", name: "ECE", fullName: "Electrical & Computer Engineering" },
  { id: "chem", name: "CHEM", fullName: "Chemical Engineering" },
  { id: "abe", name: "ABE", fullName: "Agricultural & Biological Engineering" },
  { id: "mae", name: "MAE", fullName: "Mechanical & Aerospace Engineering" },
  { id: "mse", name: "MSE", fullName: "Materials Science & Engineering" },
  { id: "ne", name: "NE", fullName: "Nuclear Engineering" },
  { id: "ise", name: "ISE", fullName: "Industrial & Systems Engineering" },
  { id: "cise", name: "CISE", fullName: "Computer & Information Science & Engineering" },
  { id: "bme", name: "BME", fullName: "Biomedical Engineering" },
  { id: "essie", name: "ESSIE", fullName: "Engineering School of Sustainable Infrastructure & Environment" },
  { id: "eed", name: "EED", fullName: "Engineering Education" },
];

// Filter configurations for milestones
export const MILESTONE_FILTER_CONFIGS = [
  // Removed themes filter 
  // {
  //   id: "themes",
  //   label: "THEMES",
  //   multiSelect: true,
  //   options: [
  //     { id: "theme_1", label: "INNOVATION", value: "innovation" },
  //     { id: "theme_2", label: "RESEARCH", value: "research" },
  //     { id: "theme_3", label: "EDUCATION", value: "education" },
  //     { id: "theme_4", label: "INFRASTRUCTURE", value: "infrastructure" },
  //     { id: "theme_5", label: "TECHNOLOGY", value: "technology" },
  //     { id: "theme_6", label: "SUSTAINABILITY", value: "sustainability" },
  //     { id: "theme_7", label: "HEALTHCARE", value: "healthcare" },
  //     { id: "theme_8", label: "AEROSPACE", value: "aerospace" },
  //     { id: "theme_9", label: "MATERIALS", value: "materials" }
  //   ]
  // },

  {
    id: "mediaFormats", 
    label: "MEDIA FORMATS",
    multiSelect: true,
    options: [
      { id: "media_1", label: "IMAGE", value: "image" },
      { id: "media_2", label: "VIDEO", value: "video" },
      { id: "media_3", label: "PDF", value: "pdf" }
    ]
  }
];

// Filter configurations for events
export const EVENT_FILTER_CONFIGS = [
  {
    id: "eventTypes",
    label: "EVENT TYPES",
    multiSelect: true,
    options: [
      { id: "type_1", label: "WORKSHOP", value: "workshop" },
      { id: "type_2", label: "SYMPOSIUM", value: "symposium" },
      { id: "type_3", label: "COMPETITION", value: "competition" },
      { id: "type_4", label: "EXPO", value: "expo" },
      { id: "type_5", label: "SEMINAR", value: "seminar" },
      { id: "type_6", label: "CONFERENCE", value: "conference" },
      { id: "type_7", label: "FORUM", value: "forum" },
      { id: "type_8", label: "FAIR", value: "fair" },
      { id: "type_9", label: "SHOWCASE", value: "showcase" }
    ]
  },
  {
    id: "departments", 
    label: "DEPARTMENTS",
    multiSelect: true,
    options: [
      { id: "dept_1", label: "ECE", value: "ECE" },
      { id: "dept_2", label: "CHEM", value: "CHEM" },
      { id: "dept_3", label: "ABE", value: "ABE" },
      { id: "dept_4", label: "MAE", value: "MAE" },
      { id: "dept_5", label: "MSE", value: "MSE" },
      { id: "dept_6", label: "NE", value: "NE" },
      { id: "dept_7", label: "ISE", value: "ISE" },
      { id: "dept_8", label: "CISE", value: "CISE" },
      { id: "dept_9", label: "BME", value: "BME" },
      { id: "dept_10", label: "ESSIE", value: "ESSIE" },
      { id: "dept_11", label: "EED", value: "EED" }
    ]
  }
];

// Color constants
export const COLORS = {
  primary: '#002657',
  secondary: '#0021A5',
  accent: '#FA4616',
  white: '#FFFFFF',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
} as const;

// Common styles
export const COMMON_STYLES = {
  button: {
    primary: `bg-[${COLORS.primary}] hover:bg-[#001d42] text-white transition-colors`,
    accent: `bg-[${COLORS.accent}] hover:bg-[#e63e0f] text-white transition-colors`,
    filter: `text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full transition-colors`,
  },
  container: {
    section: 'w-full py-20 px-8 bg-white',
    centered: 'flex justify-center items-center min-h-[400px]',
    grid: 'grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center',
  },
  text: {
    title: `text-[${COLORS.primary}] text-lg font-medium`,
    error: 'text-red-600 text-lg',
    loading: `text-[${COLORS.primary}] text-lg`,
  }
} as const;