// Type definitions for Events and Milestones
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

export interface Milestone {
  milestone_id: string;
  title: string;
  description?: string;
  image_url?: string;
  milestone_date: string;
  department: string;
  tags?: string[];
  themes?: string[];
  media_type?: string; // Changed from media_format to match actual API
  media_format?: string; // Keep for backward compatibility
  created_at: string;
  updated_at: string;
}
