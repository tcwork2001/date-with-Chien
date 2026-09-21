/**
 * Paste this into a Google Sheet's Apps Script editor
 * (Extensions -> Apps Script), then deploy it as a Web App.
 * See README.md for the full step-by-step.
 *
 * doPost   -> called by the date-invite page, appends one row per submission.
 * doGet    -> called by the private admin page, returns all rows as JSON
 *             (JSONP-wrapped when a ?callback= param is present), gated by
 *             ADMIN_KEY so only the admin page can read the data.
 */

// Change this to your own secret if you want — just also update it in
// admin.html so the two stay in sync.
var ADMIN_KEY = "xY4UB_cNghprpffIUod3TB3C";

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Received at", "Day", "Time", "Activity"]);
  }

  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.day || "",
    data.time || "",
    data.activity || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var params = (e && e.parameter) || {};
  var callback = params.callback;

  function respond(payload) {
    var json = JSON.stringify(payload);
    if (callback) {
      return ContentService
        .createTextOutput(callback + "(" + json + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService
      .createTextOutput(json)
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (params.key !== ADMIN_KEY) {
    return respond({ status: "error", message: "unauthorized" });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var values = sheet.getDataRange().getValues();
  var rows = [];

  // Skip the header row (row 0) if present.
  for (var i = 1; i < values.length; i++) {
    var r = values[i];
    if (!r[0]) continue;
    rows.push({
      receivedAt: (r[0] instanceof Date) ? r[0].toISOString() : String(r[0]),
      day: r[1] || "",
      time: r[2] || "",
      activity: r[3] || ""
    });
  }

  return respond({ status: "ok", rows: rows });
}
