# AFI Orders Form

This project is a Google Apps Script application for managing orders for Advanced Food Industries (AFI), a company specializing in the production of food products, including spices and processed meat. The application allows users to create and modify supply orders, which are then pushed to a database.

## About AFI

Advanced Food Industries (AFI) is a leading producer of high-quality food products, including a variety of spices and processed meats. The company is committed to delivering excellence in food manufacturing, ensuring that all products meet the highest standards of quality and safety. AFI is based in 10th of Ramadan City, Egypt.

## Bigger Picture: ERP System

The AFI Orders Form is part of a larger Enterprise Resource Planning (ERP) system designed to streamline and enhance the company's operations. The ERP system integrates various business processes, including order management, inventory control, production planning, and financial management. By centralizing these functions, the ERP system helps AFI improve efficiency, reduce costs, and enhance decision-making capabilities.

## Project Structure

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
