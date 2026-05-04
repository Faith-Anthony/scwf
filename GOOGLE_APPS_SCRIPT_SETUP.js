// Google Apps Script for handling form submissions from SCWF website
// 
// SETUP INSTRUCTIONS:
// 1. Create a Google Sheet at https://sheets.google.com
// 2. Go to Extensions > Apps Script
// 3. Delete all existing code
// 4. Paste THIS ENTIRE CODE
// 5. In line 30, replace 'YOUR_SHEET_ID_HERE' with your actual Sheet ID
//    (Find it in the Sheet URL: https://docs.google.com/spreadsheets/d/SHEET_ID/...)
// 6. Click Deploy > New deployment > Select 'Web app'
// 7. Set "Execute as" to your email
// 8. Set "Who has access" to "Anyone"
// 9. Copy the deployment URL
// 10. Paste the URL in your .env.local file as VITE_GOOGLE_SHEET_ENDPOINT

const SHEET_ID = '16RuxdmFnQ_CI1OAYl_e_ZnLyS5Fm6y22pJs_VHC6jVY'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Form Submissions'; // Sheet tab name (will be created if doesn't exist)

function doPost(e) {
  try {
    let data = {};
    
    // Handle both JSON and form data
    if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('No data received');
    }

    // Get or create the sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Submitted At',
        'Full Name',
        'Email',
        'Phone',
        'Interest',
        'Timestamp'
      ]);
    }

    // Add the form data
    sheet.appendRow([
      new Date().toLocaleString(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.interest || '',
      data.timestamp || ''
    ]);

    // Log success for debugging
    Logger.log('Form submitted: ' + data.email);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Form submitted successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// IMPORTANT CORS CONSIDERATIONS:
// - Google Apps Script handles CORS automatically for web app deployments
// - The doPost() function accepts POST requests from any origin
// - No additional CORS configuration needed

// TESTING (optional):
// 1. Deploy the script as described above
// 2. Open the deployment URL in your browser - you should see an error (expected)
// 3. Check the Execution log (Executions tab) for any issues
// 4. Test by submitting a form on your website
// 5. Check your Google Sheet for the new entry
