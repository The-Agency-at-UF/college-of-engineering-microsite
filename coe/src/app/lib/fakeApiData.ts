// Fake API data that mimics real AWS backend responses
export interface Event {
  event_id: string;
  title: string;
  description: string;
  event_date: string;
  department: string;
  tags: string[];
  event_type?: string;
  image_url?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

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


// Realistic UF Engineering Milestones Data
export const fakeMilestones: Milestone[] = [
  {
    milestone_id: "mst_001",
    title: "First Engineering Building Dedicated",
    description: "The University of Florida's first dedicated engineering building was completed, establishing the foundation for what would become one of the nation's premier engineering colleges.",
    milestone_date: "1925-09-15",
    department: "CIVIL",
    tags: ["historic", "infrastructure", "foundation"],
    themes: ["infrastructure", "education"],
    media_format: "image",
    image_url: "/images/gallery/'74 Gainesville Sun Publicity.JPG",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    milestone_id: "mst_002",
    title: "Computer Science Department Established", 
    description: "The Computer and Information Science and Engineering Department was founded, pioneering computer science education in the Southeast and establishing UF as a leader in computing research.",
    milestone_date: "1968-08-20",
    department: "CISE",
    tags: ["computer-science", "department-founding", "education"],
    themes: ["technology", "education", "innovation"],
    media_format: "document",
    image_url: "/images/gallery/'74 Orlando Exhibit 2.JPG",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    milestone_id: "mst_003",
    title: "Biomedical Engineering Program Launch",
    description: "Launch of the interdisciplinary Biomedical Engineering program, combining engineering principles with medical sciences to advance healthcare technology and research.",
    milestone_date: "1975-01-15",
    department: "BME",
    tags: ["biomedical", "interdisciplinary", "healthcare"],
    themes: ["healthcare", "education", "innovation"],
    media_format: "video",
    image_url: "/images/gallery/'75 AIME Honorees INF.JPG",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    milestone_id: "mst_004",
    title: "Chemical Engineering Pilot Plant Opens",
    description: "Opening of the state-of-the-art chemical engineering pilot plant laboratory, providing students with hands-on experience in industrial-scale chemical processes.",
    milestone_date: "1982-03-10",
    department: "CHEM",
    tags: ["pilot-plant", "laboratory", "industrial-processes"],
    themes: ["infrastructure", "research", "innovation"],
    media_format: "image",
    image_url: "/images/gallery/'75 Civil Student Project INF.JPG",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    milestone_id: "mst_005",
    title: "Materials Science Research Institute Founded",
    description: "Establishment of the Materials Science and Engineering Research Institute, focusing on advanced materials development, nanotechnology, and materials characterization.",
    milestone_date: "1988-06-05",
    department: "MSE",
    tags: ["research-institute", "materials", "nanotechnology"],
    themes: ["materials", "research", "technology"],
    media_format: "presentation",
    image_url: "/images/gallery/'75 Honor Student INF.JPG",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    milestone_id: "mst_006",
    title: "Precision Agriculture Center Established",
    description: "Opening of the Precision Agriculture Research Center, pioneering the use of GPS, sensors, and data analytics to revolutionize farming practices in Florida and beyond.",
    milestone_date: "2005-04-18",
    department: "ABE",
    tags: ["precision-agriculture", "gps", "sensors", "data-analytics"],
    themes: ["sustainability", "technology", "innovation"],
    media_format: "interactive",
    image_url: "/images/gallery/'74 High School Students in Summer INF.JPG",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    milestone_id: "mst_007",
    title: "Aerospace Engineering Laboratory Complex",
    description: "Launch of the advanced Aerospace Engineering Laboratory Complex featuring wind tunnels, propulsion testing facilities, and spacecraft simulation environments.",
    milestone_date: "2012-11-08",
    department: "MAE",
    tags: ["aerospace", "wind-tunnels", "propulsion", "simulation"],
    themes: ["aerospace", "research", "infrastructure"],
    media_format: "video",
    image_url: "/images/gallery/'74 Student Glider INF.JPG",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    milestone_id: "mst_008",
    title: "Environmental Engineering Research Center",
    description: "Establishment of the Environmental and Sustainable Engineering Research Center, addressing critical challenges in water resources, air quality, and sustainable development.",
    milestone_date: "2000-02-14",
    department: "ESE",
    tags: ["environmental", "water-resources", "air-quality", "sustainability"],
    themes: ["sustainability", "research", "infrastructure"],
    media_format: "document",
    image_url: "/images/gallery/'75 Bike INF.JPG",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];