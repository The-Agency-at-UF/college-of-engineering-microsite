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

// Realistic UF Engineering Events Data
export const fakeEvents: Event[] = [
  {
    event_id: "evt_001",
    title: "Gator Engineering Expo 2024",
    description: "Annual showcase of student projects and research across all engineering disciplines. Over 200 projects displayed by undergraduate and graduate students.",
    event_date: "2024-04-15",
    department: "ALL",
    event_type: "expo",
    tags: ["student-projects", "expo", "research", "showcase"],
    image_url: "/images/pic1.jpg",
    location: "Reitz Union Ballroom",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-03-01T15:30:00Z"
  },
  {
    event_id: "evt_002", 
    title: "AI in Healthcare Symposium",
    description: "Biomedical engineering researchers present cutting-edge AI applications in medical diagnostics, surgical robotics, and personalized medicine.",
    event_date: "2024-03-22",
    department: "BME",
    event_type: "symposium",
    tags: ["artificial-intelligence", "healthcare", "symposium", "research"],
    image_url: "/images/pic2.jpg",
    location: "BME Building Auditorium",
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-02-15T11:20:00Z"
  },
  {
    event_id: "evt_003",
    title: "Sustainable Infrastructure Challenge",
    description: "Civil engineering students compete in designing climate-resilient infrastructure solutions for Florida's coastal communities.",
    event_date: "2024-02-28",
    department: "CIVIL",
    event_type: "competition",
    tags: ["sustainability", "competition", "infrastructure", "climate"],
    image_url: "/images/pic3.jpg",
    location: "Weil Hall",
    created_at: "2024-01-05T14:00:00Z",
    updated_at: "2024-02-10T16:45:00Z"
  },
  {
    event_id: "evt_004",
    title: "Quantum Computing Workshop",
    description: "Introduction to quantum algorithms and their applications in optimization problems. Hands-on programming with quantum simulators.",
    event_date: "2024-05-10",
    department: "CISE",
    event_type: "workshop",
    tags: ["quantum-computing", "workshop", "algorithms", "programming"],
    image_url: "/images/pic4.jpg",
    location: "CSE Building Lab E301",
    created_at: "2024-02-01T08:30:00Z",
    updated_at: "2024-04-15T12:00:00Z"
  },
  {
    event_id: "evt_005",
    title: "Green Chemistry Innovation Day",
    description: "Chemical engineering department showcases research in sustainable chemical processes, renewable energy, and environmental remediation.",
    event_date: "2024-03-18",
    department: "CHEM",
    event_type: "showcase",
    tags: ["green-chemistry", "sustainability", "innovation", "environment"],
    image_url: "/images/pic5.jpg",
    location: "Chemical Engineering Building",
    created_at: "2024-01-20T13:15:00Z",
    updated_at: "2024-03-01T09:30:00Z"
  },
  {
    event_id: "evt_006",
    title: "Advanced Materials Characterization Seminar",
    description: "Materials science researchers demonstrate electron microscopy, X-ray diffraction, and spectroscopy techniques for nanomaterials analysis.",
    event_date: "2024-04-03",
    department: "MSE",
    event_type: "seminar",
    tags: ["materials-science", "characterization", "seminar", "nanotechnology"],
    image_url: "/images/pic6.jpg",
    location: "Materials Science Lab",
    created_at: "2024-02-05T11:00:00Z",
    updated_at: "2024-03-20T14:15:00Z"
  },
  {
    event_id: "evt_007",
    title: "Precision Agriculture Technology Fair",
    description: "Agricultural and biological engineering students present IoT sensors, drone applications, and machine learning solutions for modern farming.",
    event_date: "2024-04-25",
    department: "ABE",
    event_type: "fair",
    tags: ["precision-agriculture", "iot", "drones", "machine-learning"],
    image_url: "/images/pic7.jpg",
    location: "ABE Building Atrium",
    created_at: "2024-02-10T10:45:00Z",
    updated_at: "2024-04-01T16:20:00Z"
  },
  {
    event_id: "evt_008",
    title: "Aerospace Design Competition",
    description: "Mechanical and aerospace engineering teams compete in designing and building autonomous aircraft for cargo delivery missions.",
    event_date: "2024-05-15",
    department: "MAE",
    event_type: "competition",
    tags: ["aerospace", "competition", "design", "autonomous-systems"],
    image_url: "/images/pic1.jpg",
    location: "MAE Hangar Facility",
    created_at: "2024-02-15T12:30:00Z",
    updated_at: "2024-04-20T08:00:00Z"
  },
  {
    event_id: "evt_009",
    title: "Environmental Remediation Research Forum",
    description: "Environmental and sustainable engineering researchers share breakthrough methods for water treatment, soil restoration, and pollution control.",
    event_date: "2024-03-08",
    department: "ESE",
    event_type: "forum",
    tags: ["environmental", "remediation", "research", "water-treatment"],
    image_url: "/images/pic2.jpg",
    location: "Environmental Engineering Lab",
    created_at: "2024-01-25T15:00:00Z",
    updated_at: "2024-02-28T13:45:00Z"
  },
  {
    event_id: "evt_010",
    title: "Power Systems and Smart Grid Symposium",
    description: "Electrical engineering faculty and students explore renewable energy integration, grid modernization, and power electronics innovations.",
    event_date: "2024-04-12",
    department: "EEE",
    event_type: "symposium",
    tags: ["power-systems", "smart-grid", "renewable-energy", "symposium"],
    image_url: "/images/pic3.jpg",
    location: "Electrical Engineering Building",
    created_at: "2024-02-20T09:15:00Z",
    updated_at: "2024-03-25T11:30:00Z"
  }
];

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
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];