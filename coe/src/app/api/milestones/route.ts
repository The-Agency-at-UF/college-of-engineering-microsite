import { NextRequest, NextResponse } from "next/server";
import { fakeMilestones } from "../../lib/fakeApiData";

// Fake API that behaves exactly like AWS backend
export async function GET(request: NextRequest) {
  try {
    // Simulate network delay like real API
    await new Promise(resolve => setTimeout(resolve, 250));

    const { searchParams } = new URL(request.url);
    
    // Support query parameters for filtering/searching
    const department = searchParams.get('department');
    const search = searchParams.get('search');
    const significance = searchParams.get('significance');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredMilestones = [...fakeMilestones];

    // Filter by department if specified
    if (department && department !== 'ALL') {
      filteredMilestones = filteredMilestones.filter(milestone => 
        milestone.department.toUpperCase() === department.toUpperCase()
      );
    }

    // Filter by significance level if specified
    if (significance) {
      filteredMilestones = filteredMilestones.filter(milestone =>
        milestone.significance_level === significance
      );
    }

    // Search in title and description if specified
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredMilestones = filteredMilestones.filter(milestone =>
        milestone.title.toLowerCase().includes(searchTerm) ||
        milestone.description.toLowerCase().includes(searchTerm) ||
        milestone.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort by date (newest first)
    filteredMilestones.sort((a, b) => 
      new Date(b.milestone_date).getTime() - new Date(a.milestone_date).getTime()
    );

    // Apply pagination
    const paginatedMilestones = filteredMilestones.slice(offset, offset + limit);

    // Return AWS-style response
    return NextResponse.json({
      milestones: paginatedMilestones,
      total: filteredMilestones.length,
      offset: offset,
      limit: limit,
      hasMore: offset + limit < filteredMilestones.length
    });

  } catch (error) {
    console.error("Milestones API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch milestones", milestones: [] },
      { status: 500 }
    );
  }
}

// Handle POST for creating new milestones (fake implementation)
export async function POST(request: NextRequest) {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const milestoneData = await request.json();
    
    // Generate fake ID and timestamps
    const newMilestone = {
      ...milestoneData,
      milestone_id: `mst_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      significance_level: milestoneData.significance_level || 'medium'
    };

    // In real app, this would save to database
    fakeMilestones.push(newMilestone);

    return NextResponse.json({
      success: true,
      milestone: newMilestone,
      message: "Milestone created successfully"
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create milestone", success: false },
      { status: 500 }
    );
  }
}
