import { API_CONFIG, getApiEndpoint, logApiCall } from './apiConfig';
import { Event, Milestone } from './fakeApiData';

// Unified API client that works with both fake and real AWS API
export class ApiClient {
  
  // Events API
  static async getEvents(params?: {
    department?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const endpoint = 'events';
    const url = new URL(getApiEndpoint(endpoint), window.location.origin);
    
    // Add query parameters if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    logApiCall(url.toString(), API_CONFIG.USE_FAKE_API ? 'fake' : 'aws');

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle both fake API and AWS API response formats
      if (API_CONFIG.USE_FAKE_API) {
        return data.events || data; // Fake API returns { events: [...] }
      } else {
        // AWS API might return different format - adjust as needed
        return data.events || data.Items || data;
      }
    } catch (error) {
      console.error(`Failed to fetch events:`, error);
      throw error;
    }
  }

  // Milestones API
  static async getMilestones(params?: {
    department?: string;
    search?: string;
    significance?: string;
    limit?: number;
    offset?: number;
  }) {
    const endpoint = 'milestones';
    const url = new URL(getApiEndpoint(endpoint), window.location.origin);
    
    // Add query parameters if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    logApiCall(url.toString(), API_CONFIG.USE_FAKE_API ? 'fake' : 'aws');

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle both fake API and AWS API response formats
      if (API_CONFIG.USE_FAKE_API) {
        return data.milestones || data; // Fake API returns { milestones: [...] }
      } else {
        // AWS API might return different format - adjust as needed
        return data.milestones || data.Items || data;
      }
    } catch (error) {
      console.error(`Failed to fetch milestones:`, error);
      throw error;
    }
  }

  // Create new event
  static async createEvent(eventData: Partial<Event>) {
    const endpoint = 'events';
    const url = getApiEndpoint(endpoint);

    logApiCall(`POST ${url}`, API_CONFIG.USE_FAKE_API ? 'fake' : 'aws');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to create event:`, error);
      throw error;
    }
  }

  // Create new milestone
  static async createMilestone(milestoneData: Partial<Milestone>) {
    const endpoint = 'milestones';
    const url = getApiEndpoint(endpoint);

    logApiCall(`POST ${url}`, API_CONFIG.USE_FAKE_API ? 'fake' : 'aws');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milestoneData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to create milestone:`, error);
      throw error;
    }
  }
}