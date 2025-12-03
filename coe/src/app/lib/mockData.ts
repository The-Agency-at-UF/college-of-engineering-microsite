// Mock milestone data for testing and development
export interface Milestone {
  milestone_id: string;
  title: string;
  description?: string;
  image_url?: string;
  milestone_date: string;
  department: string;
  tags?: string[];
  themes?: string[];
  media_format?: string;
  created_at: string;
  updated_at: string;
}

// Event interface for consistency
export interface Event {
  event_id: string;
  title: string;
  description?: string;
  image_url?: string;
  event_date: string;
  department: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export const mockMilestones: Milestone[] = [
  {
    milestone_id: "1",
    title: "First Engineering Building",
    description: "Construction of the first dedicated engineering building at UF.",
    milestone_date: "1925-09-15",
    department: "CIVIL",
    tags: ["infrastructure", "historic"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    milestone_id: "2", 
    title: "Computer Science Department Founded",
    description: "Establishment of the Computer Science department, pioneering computing education.",
    milestone_date: "1968-01-20",
    department: "CISE",
    tags: ["computing", "education"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    milestone_id: "3",
    title: "Biomedical Engineering Program Launch",
    description: "Launch of interdisciplinary biomedical engineering program.",
    milestone_date: "1975-08-30",
    department: "BME",
    tags: ["biomedical", "interdisciplinary"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    milestone_id: "4",
    title: "Chemical Plant Pilot Laboratory",
    description: "Opening of state-of-the-art chemical engineering pilot plant laboratory.",
    milestone_date: "1982-03-12",
    department: "CHEM",
    tags: ["laboratory", "innovation"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    milestone_id: "5",
    title: "Materials Research Institute",
    description: "Founding of the materials science and engineering research institute.",
    milestone_date: "1988-06-05",
    department: "MSE",
    tags: ["research", "materials"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    milestone_id: "6",
    title: "Agricultural Innovation Center",
    description: "Opening of precision agriculture and biological systems research center.",
    milestone_date: "2005-04-18",
    department: "AG BIO",
    tags: ["agriculture", "sustainability"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    milestone_id: "7",
    title: "Aerospace Engineering Lab",
    description: "Launch of advanced aerospace and mechanical engineering laboratory complex.",
    milestone_date: "2012-11-08",
    department: "MAE",
    tags: ["aerospace", "mechanical"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  }
];

export const mockEvents: Event[] = [
  {
    event_id: "1",
    title: "First Computer Laboratory",
    description: "Establishment of the first computer science laboratory at UF College of Engineering.",
    event_date: "1965",
    department: "CISE",
    tags: ["computers", "technology"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    event_id: "2", 
    title: "Biomedical Engineering Program Launch",
    description: "Launch of the innovative biomedical engineering program combining medicine and engineering.",
    event_date: "1972",
    department: "BME",
    tags: ["biomedical", "healthcare"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    event_id: "3",
    title: "Chemical Plant Design Competition",
    description: "Students win national chemical plant design competition for sustainable processes.",
    event_date: "1985",
    department: "CHEM",
    tags: ["sustainability", "competition"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    event_id: "4",
    title: "Advanced Materials Research Center",
    description: "Opening of state-of-the-art materials science and engineering research facility.",
    event_date: "1990",
    department: "MSE",
    tags: ["materials", "research"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    event_id: "5",
    title: "Bridge Design Innovation",
    description: "Revolutionary bridge design methodology developed for hurricane resistance.",
    event_date: "1995",
    department: "CIVIL",
    tags: ["infrastructure", "innovation"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    event_id: "6",
    title: "Power Systems Laboratory",
    description: "Establishment of advanced electrical and computer engineering power systems lab.",
    event_date: "2000",
    department: "EEE",
    tags: ["power", "electrical"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  }
];