export interface Event {
  event_id: string;
  title: string;
  department?: string;
  event_date?: string;
  description?: string;
  tags?: string[];
  image_url?: string;
  media_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Milestone {
  milestone_id: string;
  title: string;
  department?: string;
  milestone_date?: string;
  description?: string;
  tags?: string[] | string;
  image_url?: string;
  media_type?: string;
  significance_level?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EventForm {
  title: string;
  department: string;
  event_date: string;
  description: string;
  tags: string[];
  media_type: string;
  image_url?: string;
}

export interface MilestoneForm {
  title: string;
  department: string;
  milestone_date: string;
  description: string;
  tags: string | string[];
  media_type: string;
  image_url?: string;
}

