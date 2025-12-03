import { NextRequest, NextResponse } from "next/server";
import { fakeEvents } from "../../lib/fakeApiData";

// Fake API that behaves exactly like AWS backend
export async function GET(request: NextRequest) {
  try {
    // Simulate network delay like real API
    await new Promise(resolve => setTimeout(resolve, 200));

    const { searchParams } = new URL(request.url);
    
    // Support query parameters for filtering/searching
    const department = searchParams.get('department');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredEvents = [...fakeEvents];

    // Filter by department if specified
    if (department && department !== 'ALL') {
      filteredEvents = filteredEvents.filter(event => 
        event.department.toUpperCase() === department.toUpperCase()
      );
    }

    // Search in title and description if specified
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply pagination
    const paginatedEvents = filteredEvents.slice(offset, offset + limit);

    // Return AWS-style response
    return NextResponse.json({
      events: paginatedEvents,
      total: filteredEvents.length,
      offset: offset,
      limit: limit,
      hasMore: offset + limit < filteredEvents.length
    });

  } catch (error) {
    console.error("Events API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", events: [] },
      { status: 500 }
    );
  }
}

// Handle POST for creating new events (fake implementation)
export async function POST(request: NextRequest) {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const eventData = await request.json();
    
    // Generate fake ID and timestamps
    const newEvent = {
      ...eventData,
      event_id: `evt_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // In real app, this would save to database
    fakeEvents.push(newEvent);

    return NextResponse.json({
      success: true,
      event: newEvent,
      message: "Event created successfully"
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event", success: false },
      { status: 500 }
    );
  }
}