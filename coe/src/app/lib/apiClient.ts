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
    const apiEndpoint = getApiEndpoint(endpoint);
    
    // Construct URL - handle both relative and absolute URLs
    let url: URL;
    if (apiEndpoint.startsWith('http://') || apiEndpoint.startsWith('https://')) {
      // Absolute URL (AWS API)
      url = new URL(apiEndpoint);
    } else {
      // Relative URL (local Next.js API)
      if (typeof window === 'undefined') {
        throw new Error('Cannot construct URL: window is not available. This code must run in the browser.');
      }
      url = new URL(apiEndpoint, window.location.origin);
    }
    
    // Add query parameters if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const finalUrl = url.toString();
    logApiCall(finalUrl, API_CONFIG.USE_FAKE_API ? 'fake' : 'aws');
    console.log('🌐 Fetching events from URL:', finalUrl);

    try {
      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ HTTP error! status: ${response.status}`, errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Handle both fake API and AWS API response formats
      let events;
      if (API_CONFIG.USE_FAKE_API) {
        events = data.events || data; // Fake API returns { events: [...] }
      } else {
        // AWS API might return different format - adjust as needed
        events = data.events || data.Items || data;
      }
      
      // Log all returned event objects
      console.log('📋 Events returned from API:', events);
      console.log('📊 Total events:', Array.isArray(events) ? events.length : 'Not an array');
      if (Array.isArray(events) && events.length > 0) {
        console.log('📝 Event objects:', JSON.stringify(events, null, 2));
      }
      
      return events;
    } catch (error) {
      console.error(`❌ Failed to fetch events:`, error);
      console.error(`❌ Failed URL:`, finalUrl);
      console.error(`❌ Error details:`, error instanceof Error ? error.message : String(error));
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.error('💡 This usually means:');
        console.error('   1. The Next.js dev server is not running (run: npm run dev)');
        console.error('   2. The API route does not exist');
        console.error('   3. There is a network/CORS issue');
        console.error(`   4. Check if ${finalUrl} is accessible`);
      }
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
    const apiEndpoint = getApiEndpoint(endpoint);
    
    // Construct URL - handle both relative and absolute URLs
    let url: URL;
    if (apiEndpoint.startsWith('http://') || apiEndpoint.startsWith('https://')) {
      // Absolute URL (AWS API)
      url = new URL(apiEndpoint);
    } else {
      // Relative URL (local Next.js API)
      url = new URL(apiEndpoint, window.location.origin);
    }
    
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