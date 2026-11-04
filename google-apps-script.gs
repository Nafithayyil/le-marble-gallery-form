// Optional: logs every enquiry from the form into a Google Sheet.
// Setup steps are in README.md.

var HEADERS = ["Submitted At", "Name", "Preferred Language", "Looking For", "Application Area",
               "Approx. Area (sq. ft.)", "Colour Preference", "Contact Number", "Project Type"];
var KEYS = ["submittedAt", "name", "language", "products", "application",
            "area", "colour", "phone", "projectType"];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

  var data = JSON.parse(e.postData.contents);
  // Prefix with ' so Sheets keeps phone numbers and ranges as text
  sheet.appendRow(KEYS.map(function (k) { return k === "submittedAt" ? new Date(data[k]) : "'" + (data[k] || ""); }));

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
