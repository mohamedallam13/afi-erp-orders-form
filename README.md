# AFI Orders Form

A Google Apps Script WebApp for creating and managing supply orders at Advanced Food Industries (AFI). Part of AFI's broader ERP system — supports dynamic product rows, searchable dropdowns, order preview, and PDF generation.

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-WebApp-blue)
![Status](https://img.shields.io/badge/Status-Production-green)

---

## About AFI

Advanced Food Industries (AFI) is a food manufacturing company based in 10th of Ramadan City, Egypt, specialising in spices and processed meats. This form is one component of a larger ERP system covering order management, inventory, production planning, and financial management.

---

## Features

- **Order creation and modification** — fields for salesperson, customer, date, time, and payment type
- **Dynamic product rows** — add or remove product lines with quantity, unit, and comments per item
- **Searchable dropdowns** — fast lookup for salespersons, customers, products, and units
- **Order preview** — view full order details with serial number before submitting
- **PDF generation** — generates and opens a formatted order PDF on submission
- **Validation** — prevents submission until all required fields are complete
- **Responsive design** — works on mobile and desktop

---

## Tech Stack

| Layer    | Technology                      |
|----------|---------------------------------|
| Platform | Google Apps Script              |
| UI       | HTML5, CSS3, Vanilla JavaScript |
| Database | Google Sheets                   |
| PDF      | GAS `DriveApp` / HTML template  |
| Deploy   | clasp CLI                       |

---

## Project Structure

```
afi-erp-orders-form/
├── README.md
├── AGENT.md
├── .gitignore
└── src/
    ├── Backend.js          # Data access layer (Sheets read/write)
    ├── Helpers.js          # Pure utility functions
    ├── Middleware.js       # Server-side routing and validation
    ├── Server.js           # doGet() / doPost() entry points
    ├── CreatePDF.js        # PDF generation logic
    ├── AFIOrdersForm.html  # Main order form UI
    └── OrderTemplate.html  # HTML template used for PDF / preview
```

---

## Getting Started

### Prerequisites

- A Google account with Google Apps Script access
- [clasp](https://github.com/google/clasp) installed globally

```bash
npm install -g @google/clasp
clasp login
```

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedallam13/afi-erp-orders-form.git
   cd afi-erp-orders-form
   ```

2. Link to your Apps Script project:
   ```bash
   clasp create --type webapp --title "AFI Orders Form" --rootDir src
   ```

3. Push source files:
   ```bash
   clasp push
   ```

---

## Deployment

1. In the Apps Script editor, go to **Deploy > New deployment**
2. Select type: **Web app**
3. Set access permissions as required for AFI staff
4. Click **Deploy** and distribute the Web App URL

---

## Author

**Mohamed Allam** — [GitHub](https://github.com/mohamedallam13) · [Email](mailto:mohamedallam.tu@gmail.com)
