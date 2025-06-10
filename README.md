# AFI Orders Form

This project is a Google Apps Script application for managing orders for Advanced Food Industries (AFI), a company specializing in the production of food products, including spices and processed meat. The application allows users to create and modify supply orders, which are then pushed to a database.

## About AFI

Advanced Food Industries (AFI) is a leading producer of high-quality food products, including a variety of spices and processed meats. The company is committed to delivering excellence in food manufacturing, ensuring that all products meet the highest standards of quality and safety. AFI is based in 10th of Ramadan City, Egypt.

## Bigger Picture: ERP System

The AFI Orders Form is part of a larger Enterprise Resource Planning (ERP) system designed to streamline and enhance the company's operations. The ERP system integrates various business processes, including order management, inventory control, production planning, and financial management. By centralizing these functions, the ERP system helps AFI improve efficiency, reduce costs, and enhance decision-making capabilities.

## Key Features

### Order Creation and Modification:
- Users can create new supply orders or modify existing ones.
- The form includes fields for sales person, customer name, order date, time, and payment type.

### Dynamic Form Elements:
- The form dynamically adds rows for product details, allowing users to specify the product, quantity, unit, and comments for each item.
- Users can add or remove rows as needed.

### Searchable Dropdowns:
- The application includes searchable dropdowns for selecting sales persons, customers, products, and units, enhancing user experience by allowing quick searches.

### Preview Functionality:
- Users can preview the order before submission, which displays all entered details in a formatted document.
- The preview includes a serial number, date, time, payment type, and a detailed list of products.

### PDF Generation:
- Upon submission, the application generates a PDF of the order, which can be opened in a new tab for printing or saving.

### Responsive Design:
- The application is designed to be responsive, ensuring usability on various devices, including mobile.

### Error Handling:
- The form includes validation to ensure all required fields are filled before submission.

## Project Structure

### Frontend:
- **HTML/CSS/JavaScript**: The frontend is built using HTML for structure, CSS for styling, and JavaScript for interactivity.

### Backend:
- **Google Apps Script**: The backend logic is handled by Google Apps Script, which manages data fetching, form submission, and PDF generation.

### Files:
- **appsscript.json**: Configuration file for the Google Apps Script project.
- **server/**: Directory containing server-side scripts:
  - `Helpers.js`
  - `Middleware.js`
  - `Server.js`
  - `CreatePDF.js`
  - `Backend.js`
- **AFIOrdersForm.html**: Main HTML file for the orders form.
- **server/OrderTemplate.html**: Template HTML file for orders.

## Getting Started

1. **Clone the Project**: Use clasp to clone the project:
   ```bash
   clasp clone 1XGn6toCRaYZBtAcFbDn5eMUAPFQcj0UmWiQSEFRBnxHO_h_597PqtAKg
   ```

2. **Edit Files**: Make changes to the files locally.

3. **Push Changes**: Use clasp to push changes back to Google Apps Script:
   ```bash
   clasp push
   ```

4. **Pull Changes**: To pull the latest changes from Google Apps Script:
   ```bash
   clasp pull
   ```

## Requirements

- [clasp](https://github.com/google/clasp) installed globally.
- Google account with access to Google Apps Script.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
