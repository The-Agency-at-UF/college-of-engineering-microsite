// Department types and data
export interface Department {
  id: string;
  name: string;
  fullName: string;
}

export const DEPARTMENTS: Department[] = [
  { id: "all", name: "ALL", fullName: "All Departments" },
  { id: "cise", name: "CISE", fullName: "Computer & Information Science & Engineering" },
  { id: "agbio", name: "AG BIO", fullName: "Agricultural & Biological Engineering" },
  { id: "bme", name: "BME", fullName: "Biomedical Engineering" },
  { id: "chem", name: "CHEM", fullName: "Chemical Engineering" },
  { id: "civil", name: "CIVIL", fullName: "Civil & Coastal Engineering" },
  { id: "ese", name: "ESE", fullName: "Environmental & Sustainable Engineering" },
  { id: "ise", name: "ISE", fullName: "Industrial & Systems Engineering" },
  { id: "mse", name: "MSE", fullName: "Materials Science & Engineering" },
  { id: "mae", name: "MAE", fullName: "Mechanical & Aerospace Engineering" },
];

// Filter configurations for milestones
export const MILESTONE_FILTER_CONFIGS = [
  {
    id: "themes",
    label: "THEMES",
    multiSelect: true,
    options: [
      { id: "theme_1", label: "THEME", value: "innovation" },
      { id: "theme_2", label: "THEME", value: "research" },
      { id: "theme_3", label: "THEME", value: "education" },
      { id: "theme_4", label: "THEME", value: "infrastructure" },
      { id: "theme_5", label: "THEME", value: "technology" },
      { id: "theme_6", label: "THEME", value: "sustainability" },
      { id: "theme_7", label: "THEME", value: "healthcare" },
      { id: "theme_8", label: "THEME", value: "aerospace" },
      { id: "theme_9", label: "THEME", value: "materials" }
    ]
  },
  {
    id: "mediaFormats", 
    label: "MEDIA FORMATS",
    multiSelect: true,
    options: [
      { id: "media_1", label: "MEDIA FORMAT", value: "image" },
      { id: "media_2", label: "MEDIA FORMAT", value: "video" },
      { id: "media_3", label: "MEDIA FORMAT", value: "document" },
      { id: "media_4", label: "MEDIA FORMAT", value: "audio" },
      { id: "media_5", label: "MEDIA FORMAT", value: "interactive" },
      { id: "media_6", label: "MEDIA FORMAT", value: "presentation" }
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
      { id: "dept_1", label: "BME", value: "BME" },
      { id: "dept_2", label: "CISE", value: "CISE" },
      { id: "dept_3", label: "CIVIL", value: "CIVIL" },
      { id: "dept_4", label: "CHEM", value: "CHEM" },
      { id: "dept_5", label: "MSE", value: "MSE" },
      { id: "dept_6", label: "ABE", value: "ABE" },
      { id: "dept_7", label: "MAE", value: "MAE" },
      { id: "dept_8", label: "ESE", value: "ESE" },
      { id: "dept_9", label: "EEE", value: "EEE" }
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