const SPREADSHEET_ID = "1yCcL2wGDJheSeKYwkMeE4bQggk3mLmR40QQp54RcrSk";
const EXPENSE_HEADERS = ["id", "createdAt", "day", "title", "amount", "payer", "mode", "category", "participants"];
const MEMBER_HEADERS = ["name"];

function doGet() {
  return jsonResponse(readLedger_());
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    if (payload.action === "read") return jsonResponse(readLedger_());
    if (payload.action === "replace") return jsonResponse(replaceLedger_(payload.state || {}));
    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function readLedger_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const expenseSheet = ensureSheet_(spreadsheet, "Expenses", EXPENSE_HEADERS);
  const memberSheet = ensureSheet_(spreadsheet, "Members", MEMBER_HEADERS);
  const expenseRows = expenseSheet.getDataRange().getValues().slice(1);
  const memberRows = memberSheet.getDataRange().getValues().slice(1);
  const expenses = expenseRows
    .filter((row) => row[0])
    .map((row) => ({
      id: String(row[0]),
      createdAt: String(row[1] || ""),
      day: String(row[2] || "day1"),
      title: String(row[3] || ""),
      amount: Number(row[4]) || 0,
      payer: String(row[5] || ""),
      mode: String(row[6] || "equal"),
      category: String(row[7] || "其他"),
      participants: String(row[8] || "").split("|").filter(Boolean),
    }));
  const travelers = memberRows.map((row) => String(row[0] || "").trim()).filter(Boolean);
  return { ok: true, travelers, expenses, updatedAt: new Date().toISOString() };
}

function replaceLedger_(state) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const expenseSheet = ensureSheet_(spreadsheet, "Expenses", EXPENSE_HEADERS);
  const memberSheet = ensureSheet_(spreadsheet, "Members", MEMBER_HEADERS);
  const settingsSheet = ensureSheet_(spreadsheet, "Settings", ["key", "value"]);
  const travelers = Array.isArray(state.travelers) ? state.travelers : [];
  const expenses = Array.isArray(state.expenses) ? state.expenses : [];
  writeRows_(memberSheet, MEMBER_HEADERS, travelers.map((name) => [name]));
  writeRows_(
    expenseSheet,
    EXPENSE_HEADERS,
    expenses.map((expense) => [
      expense.id,
      expense.createdAt || state.updatedAt || new Date().toISOString(),
      expense.day,
      expense.title,
      Number(expense.amount) || 0,
      expense.payer,
      expense.mode || "equal",
      expense.category || "其他",
      (expense.participants || []).join("|"),
    ])
  );
  writeRows_(settingsSheet, ["key", "value"], [["updatedAt", new Date().toISOString()]]);
  return { ok: true, saved: expenses.length, travelers: travelers.length, updatedAt: new Date().toISOString() };
}

function ensureSheet_(spreadsheet, name, headers) {
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  if (currentHeaders.join("|") !== headers.join("|")) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  sheet.setFrozenRows(1);
  return sheet;
}

function writeRows_(sheet, headers, rows) {
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length) sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sheet.autoResizeColumns(1, headers.length);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
