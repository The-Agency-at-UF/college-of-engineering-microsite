/**
 * Bulk Event Creation Script
 * 
 * This script uses the complete events list and creates events via the API.
 * 
 * Usage:
 *   npx tsx scripts/bulk-create-events.ts [--dry-run] [--api-url=http://localhost:3000]
 * 
 * Options:
 *   --dry-run: Preview events without creating them
 *   --api-url: Base URL for the API (default: http://localhost:3000)
 */

import { completeEvents } from './events-list';

// Department name mapping to filter codes (matching the UI filter buttons)
// Filter values: BME, CISE, CIVIL, CHEM, MSE, ABE, MAE, ESE, EEE
const departmentMap: Record<string, string> = {
  "College of Engineering": "COE", // College-wide events - not in filter list, may need special handling
  "Mechanical & Aerospace Engineering": "MAE",
  "Electrical & Computer Engineering": "EEE", // Maps to EEE filter button
  "Chemical Engineering": "CHEM",
  "Agricultural & Biological Engineering": "ABE", // Maps to ABE filter button
  "Industrial & Systems Engineering": "ISE",
  "Materials Science & Engineering": "MSE",
  "Engineering Education": "ENGE" // Not in filter list - may need to add or map elsewhere
};


/**
 * Convert year string to ISO date format (always returns a single year, no ranges)
 */
function parseYearToDate(year: string): string {
  // Handle ranges - always use the first/earliest year
  if (year.includes('–') || year.includes('-')) {
    const parts = year.split(/[–-]/);
    // Take the first part and extract year from it
    year = parts[0].trim();
  }

  // Handle decade notation (e.g., "1920s" -> "1920", "1950s" -> "1950")
  // Remove 's' at the end if it's a decade
  year = year.replace(/(\d{4})s$/, '$1');

  // Handle special cases
  if (year.includes('WWII') || year.includes('WW2') || year.includes('WWII Era')) {
    return '1942-01-01'; // Mid-WWII
  }

  // Extract the first 4-digit year found
  const yearMatch = year.match(/\d{4}/);
  if (yearMatch) {
    const numericYear = parseInt(yearMatch[0], 10);
    if (numericYear >= 1900 && numericYear <= 2100) {
      return `${numericYear}-01-01`;
    }
  }

  // Fallback - should not happen with proper data
  console.warn(`⚠️  Could not parse year: "${year}", using 1900 as fallback`);
  return '1900-01-01';
}

/**
 * Map department name to code
 */
function mapDepartment(department: string): string {
  return departmentMap[department] || department.toUpperCase().replace(/\s+/g, '_');
}

/**
 * Process and create events
 */
async function processEvents(dryRun: boolean = false, apiUrl: string = 'http://localhost:3000') {
  console.log(`\n${dryRun ? '🔍 DRY RUN MODE - No events will be created' : '🚀 CREATING EVENTS'}\n`);
  console.log(`API URL: ${apiUrl}\n`);
  console.log('='.repeat(80));

  const events = completeEvents.map((event) => {
    const eventDate = parseYearToDate(event.year);
    const department = mapDepartment(event.department);

    return {
      title: event.title,
      description: event.description,
      event_date: eventDate,
      department,
      tags: [],
      media_type: "image"
    };
  });

  // Display preview
  console.log(`\n📋 Processed ${events.length} events:\n`);
  events.forEach((event, index) => {
    console.log(`${index + 1}. [${event.department}] ${event.title}`);
    console.log(`   Date: ${event.event_date}`);
    console.log(`   Description: ${event.description.substring(0, 80)}...`);
    console.log('');
  });

  if (dryRun) {
    console.log('\n✅ Dry run complete. Remove --dry-run flag to create events.\n');
    return;
  }

  // Create events via API
  console.log('\n📤 Creating events via API...\n');
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    try {
      const response = await fetch(`${apiUrl}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        await response.json();
        console.log(`✅ [${i + 1}/${events.length}] Created: ${event.title}`);
        successCount++;
      } else {
        const errorText = await response.text();
        console.error(`❌ [${i + 1}/${events.length}] Failed: ${event.title}`);
        console.error(`   Error: ${response.status} - ${errorText}`);
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ [${i + 1}/${events.length}] Error creating: ${event.title}`);
      console.error(`   ${error instanceof Error ? error.message : String(error)}`);
      errorCount++;
    }

    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total: ${events.length}\n`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const apiUrlArg = args.find(arg => arg.startsWith('--api-url='));
const apiUrl = apiUrlArg ? apiUrlArg.split('=')[1] : 'http://localhost:3000';

// Run the script
processEvents(dryRun, apiUrl).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

