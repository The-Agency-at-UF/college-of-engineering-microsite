import { NextRequest, NextResponse } from "next/server";
import { docClient } from "../../lib/dynamoClient";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME || "legacy_events";

// Fetch events from AWS DynamoDB (handles pagination)
async function fetchAWSEvents() {
  try {
    console.log('🔍 fetchAWSEvents called');
    console.log('🔑 AWS_ACCESS_KEY_ID exists:', !!process.env.AWS_ACCESS_KEY_ID);
    
    if (!process.env.AWS_ACCESS_KEY_ID) {
      // AWS credentials not configured, skip AWS fetch
      console.warn('⚠️ AWS credentials not configured, returning empty array');
      return [];
    }

    const allItems: Record<string, unknown>[] = [];
    let lastEvaluatedKey: Record<string, unknown> | undefined = undefined;

    do {
      const scanParams: {
        TableName: string;
        ExclusiveStartKey?: Record<string, unknown>;
      } = {
        TableName: TABLE_NAME,
      };
      
      if (lastEvaluatedKey) {
        scanParams.ExclusiveStartKey = lastEvaluatedKey;
      }

      const command = new ScanCommand(scanParams);
      const response = await docClient.send(command);
      
      if (response.Items) {
        allItems.push(...response.Items);
      }

      lastEvaluatedKey = response.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (lastEvaluatedKey);

    return allItems;
  } catch (error) {
    console.warn("Failed to fetch events from AWS:", error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 GET /api/events called');
    const { searchParams } = new URL(request.url);
    
    // Support query parameters for filtering/searching
    const department = searchParams.get('department');
    const search = searchParams.get('search');
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    
    // Only apply pagination if explicitly requested
    const limit = limitParam ? parseInt(limitParam) : undefined;
    const offset = offsetParam ? parseInt(offsetParam) : 0;

    // Fetch from AWS (gets all events)
    let filteredEvents = await fetchAWSEvents();
    console.log(`📊 Total events fetched from AWS: ${filteredEvents.length}`);
    console.log('📋 All events:', JSON.stringify(filteredEvents, null, 2));

    // Filter by department if specified
    if (department && department !== 'ALL') {
      filteredEvents = filteredEvents.filter(event => {
        const eventDept = (event as { department?: string }).department;
        return eventDept?.toUpperCase() === department.toUpperCase();
      });
    }

    // Search in title and description if specified
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredEvents = filteredEvents.filter(event => {
        const eventObj = event as { title?: string; description?: string; tags?: string[] };
        return (
          eventObj.title?.toLowerCase().includes(searchTerm) ||
          eventObj.description?.toLowerCase().includes(searchTerm) ||
          eventObj.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
        );
      });
    }

    // Sort by date (newest first)
    filteredEvents.sort((a, b) => {
      const eventA = a as { event_date?: string | number };
      const eventB = b as { event_date?: string | number };
      const dateA = new Date(eventA.event_date || 0).getTime();
      const dateB = new Date(eventB.event_date || 0).getTime();
      return dateB - dateA;
    });

    // Apply pagination only if limit is specified
    const paginatedEvents = limit !== undefined 
      ? filteredEvents.slice(offset, offset + limit)
      : filteredEvents;

    console.log(`✅ Returning ${paginatedEvents.length} events (total: ${filteredEvents.length})`);
    console.log('🎯 Events being returned:', JSON.stringify(paginatedEvents, null, 2));

    // Return AWS-style response
    return NextResponse.json({
      events: paginatedEvents,
      total: filteredEvents.length,
      offset: offset,
      limit: limit || filteredEvents.length,
      hasMore: limit !== undefined ? (offset + limit < filteredEvents.length) : false
    });

  } catch (error) {
    console.error("Events API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", events: [] },
      { status: 500 }
    );
  }
}

// Handle POST for creating new events
export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    
    // Generate event ID and timestamps
    const newEvent = {
      ...eventData,
      event_id: `evt_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save to DynamoDB
    if (process.env.AWS_ACCESS_KEY_ID) {
      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newEvent,
        })
      );
    }

    return NextResponse.json({
      success: true,
      event: newEvent,
      message: "Event created successfully"
    });

  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event", success: false },
      { status: 500 }
    );
  }
}