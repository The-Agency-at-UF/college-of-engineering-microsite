import { NextRequest, NextResponse } from "next/server";
import { fakeMilestones } from "../../lib/fakeApiData";
import { docClient } from "../../lib/dynamoClient";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "legacy_milestones";

// Fetch milestones from AWS DynamoDB
async function fetchAWSMilestones() {
  try {
    if (!process.env.AWS_ACCESS_KEY_ID) {
      // AWS credentials not configured, skip AWS fetch
      return [];
    }

    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const response = await docClient.send(command);
    return response.Items || [];
  } catch (error) {
    console.warn("Failed to fetch milestones from AWS (will use fake data):", error);
    return [];
  }
}

// Merge AWS and fake data, with AWS data taking precedence
function mergeMilestoneData(awsMilestones: any[], fakeMilestones: any[]) {
  // Create a map of AWS milestones by ID for quick lookup
  const awsMap = new Map(awsMilestones.map(m => [m.milestone_id, m]));
  
  // Start with fake milestones, but replace with AWS data if exists
  const merged: any[] = [];
  
  // Add AWS milestones first (they take precedence)
  for (const awsMilestone of awsMilestones) {
    merged.push({
      ...awsMilestone,
      // Ensure AWS milestones keep their existing image_url if they have one
    });
  }
  
  // Add fake milestones that don't exist in AWS
  for (const fakeMilestone of fakeMilestones) {
    if (!awsMap.has(fakeMilestone.milestone_id)) {
      merged.push(fakeMilestone);
    }
  }
  
  return merged;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Support query parameters for filtering/searching
    const department = searchParams.get('department');
    const search = searchParams.get('search');
    const significance = searchParams.get('significance');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch from AWS first, then merge with fake data
    const awsMilestones = await fetchAWSMilestones();
    let allMilestones = mergeMilestoneData(awsMilestones, fakeMilestones);

    // Filter by department if specified
    if (department && department !== 'ALL') {
      allMilestones = allMilestones.filter(milestone => 
        milestone.department?.toUpperCase() === department.toUpperCase()
      );
    }

    // Filter by significance level if specified
    if (significance) {
      allMilestones = allMilestones.filter(milestone =>
        milestone.significance_level === significance
      );
    }

    // Search in title and description if specified
    if (search) {
      const searchTerm = search.toLowerCase();
      allMilestones = allMilestones.filter(milestone =>
        milestone.title?.toLowerCase().includes(searchTerm) ||
        milestone.description?.toLowerCase().includes(searchTerm) ||
        milestone.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort by date (newest first)
    allMilestones.sort((a, b) => {
      const dateA = new Date(a.milestone_date || 0).getTime();
      const dateB = new Date(b.milestone_date || 0).getTime();
      return dateB - dateA;
    });

    // Apply pagination
    const paginatedMilestones = allMilestones.slice(offset, offset + limit);

    // Return AWS-style response
    return NextResponse.json({
      milestones: paginatedMilestones,
      total: allMilestones.length,
      offset: offset,
      limit: limit,
      hasMore: offset + limit < allMilestones.length
    });

  } catch (error) {
    console.error("Milestones API Error:", error);
    // Fallback to fake data only on error
    return NextResponse.json({
      milestones: fakeMilestones,
      total: fakeMilestones.length,
      offset: 0,
      limit: fakeMilestones.length,
      hasMore: false
    });
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
