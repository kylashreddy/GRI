// Google Apps Script Code - Deploy as Web App for GRI Website Forms
// 1. Go to https://script.google.com
// 2. Create a new project
// 3. Paste this code
// 4. Deploy as Web App
// 5. Copy the Web App URL and use it in your form

function doPost(e) {
  try {
    // Get form data
    var rawData = e.postData.contents;
    
    if (!rawData) {
      return ContentService.createTextOutput(JSON.stringify({ result: "error", message: "No Data Received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var formPayload;
    
    try { 
      formPayload = JSON.parse(rawData); 
    } catch(parseError) {
      return ContentService.createTextOutput(JSON.stringify({ result: "error", message: "Invalid JSON" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var submissionTime = new Date();
    
    // Check form type
    if (formPayload.type && formPayload.type === "contact") {
      // Handle Contact Form - use Contact sheet
      var contactSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contact");
      if (!contactSheet) {
        contactSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Contact");
      }
      if (contactSheet.getLastRow() === 0) {
        contactSheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
      }
      contactSheet.appendRow([
        submissionTime, 
        formPayload.name || "", 
        formPayload.email || "", 
        formPayload.subject || "", 
        formPayload.message || ""
      ]);
    } else {
      // Handle GRINOVA Registration Form - use first sheet (Sheet1)
      var grinovaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      
      // Add headers if first row
      if (grinovaSheet.getLastRow() === 0) {
        grinovaSheet.appendRow(["Timestamp", "Name", "Email", "Phone", "College", "Course", "Year", "Team Name", "Team Size", "Problem Domain", "Idea Description", "Motivation"]);
      }
      
      // Append new row with GRINOVA data
      grinovaSheet.appendRow([
        submissionTime,
        formPayload.name || "",
        formPayload.email || "",
        formPayload.phone || "",
        formPayload.college || "",
        formPayload.course || "",
        formPayload.year || "",
        formPayload.teamName || "",
        formPayload.teamSize || "",
        formPayload.problemDomain || "",
        formPayload.ideaDescription || "",
        formPayload.motivation || ""
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch(errorMsg) {
    Logger.log(errorMsg.toString());
    return ContentService.createTextOutput(JSON.stringify({ result: "error", message: errorMsg.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Also add this function to handle GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput('GRI Form Backend is Running');
}
