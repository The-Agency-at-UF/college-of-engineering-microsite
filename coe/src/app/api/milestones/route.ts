import { NextRequest, NextResponse } from "next/server";
import { docClient } from "../../lib/dynamoClient";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME_M || "legacy_milestones";

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
    console.warn("Failed to fetch milestones from AWS:", error);
    return [];
  }
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

    // Fetch from AWS DynamoDB
    let allMilestones = await fetchAWSMilestones();

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
    // Return empty array on error
    return NextResponse.json({
      milestones: [],
      total: 0,
      offset: 0,
      limit: 0,
      hasMore: false
    });
  }
}

// Handle POST for creating new milestones
export async function POST(request: NextRequest) {
  try {
    const milestoneData = await request.json();
    
    // Generate milestone ID and timestamps
    const newMilestone = {
      ...milestoneData,
      milestone_id: `mst_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      significance_level: milestoneData.significance_level || 'medium'
    };

    // Save to DynamoDB
    if (process.env.AWS_ACCESS_KEY_ID) {
      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newMilestone,
        })
      );
    }

    return NextResponse.json({
      success: true,
      milestone: newMilestone,
      message: "Milestone created successfully"
    });

  } catch (error) {
    console.error("Error creating milestone:", error);
    return NextResponse.json(
      { error: "Failed to create milestone", success: false },
      { status: 500 }
    );
  }
}
