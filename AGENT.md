# AGENT.md — afi-erp-orders-form

## Purpose
A Google Apps Script WebApp for creating and managing supply orders for Advanced Food Industries (AFI). Part of AFI's broader ERP system. Supports dynamic product rows, searchable dropdowns, order preview, and PDF generation.

## Structure
```
afi-erp-orders-form/
├── README.md
├── AGENT.md
├── .gitignore
└── src/
    ├── Backend.js          ← data access layer (Sheets read/write)
    ├── Helpers.js          ← pure utility functions
    ├── Middleware.js       ← server-side routing / validation
    ├── Server.js           ← doGet() / doPost() entry points
    ├── CreatePDF.js        ← PDF generation logic
    ├── AFIOrdersForm.html  ← main form UI
    └── OrderTemplate.html  ← PDF/preview order template
```

## Key Facts
- **Platform:** Google Apps Script WebApp
- **Data store:** Google Sheets (IDs configured in script properties or hardcoded)
- **Features:** Dynamic order rows, searchable dropdowns, preview modal, PDF export
- **Entry point:** `Server.js` → `doGet()` / `doPost()`
- **No `appsscript.json` or `env.js` in repo** — config managed via Script Properties

## Development Notes
- All source files live under `src/` — push with clasp from that directory
- No Node/npm at runtime; ES5-compatible GAS code only
