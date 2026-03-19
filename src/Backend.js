(function (root, factory) {
  root.AFI_ORDERSFORM = factory();
})(this, function () {

  const MASTER_INDEX_ID = "1ZGPAIXC33UJVj1ZG9UJM70Qy8j-8qv0j"

  const { Toolkit } = AFILibrary
  const { readFromJSON, writeToJSON, timestampCreate, groupBy } = Toolkit

  const LIVE = true
  const ORDERS_EMAIL = "afistores1994@gmail.com"
  const TEST_EMAIL = "advancedfood1@gmail.com"

  function fetchLists() {
    const listsString = getLists()
    return listsString
  }

  ////////////////////////////////////// FETCH LISTS

  function getLists() {
    const masterFile = readFromJSON(MASTER_INDEX_ID)
    const { ordersDisplay, clientsFormulatedObj, activeAsSalesPersonnel, productsList, unitsForOrdersForm, counters } = masterFile
    const ordersArray = readFromJSON(ordersDisplay)
    console.log("Orders Loaded")
    const clientsArray = readFromJSON(clientsFormulatedObj)
    console.log("Clients Loaded")
    const asSalesArray = readFromJSON(activeAsSalesPersonnel)
    console.log("Sales Loaded")
    const productsArray = readFromJSON(productsList)
    console.log("Products Loaded")
    const unitsArray = readFromJSON(unitsForOrdersForm)
    console.log("Units Loaded")
    const countersFile = readFromJSON(counters)
    console.log("Counters Loaded")
    const { receviedOrdersCounter } = countersFile
    return JSON.stringify({ ordersArray, clientsArray, asSalesArray, productsArray, unitsArray, receviedOrdersCounter })
  }

  ////////////////////////////////////// MODIFY ORDERS

  function modifyOrder(formData) {
    console.log(formData)
    const { pdfUrl, blob } = generateOrderPDF(formData)
    console.log(formData)
    modifyOrderInDBSheet(formData)
    sendEmail(blob, formData)
    console.log(formData)
    return pdfUrl
  }

  function modifyOrderInDBSheet(formData) {
    augmentModParameters(formData)
    AFIDBSheetsController.runRequest("updateOrder", formData)
  }

  function augmentModParameters(formData) {
    // Combine the date and time into a single string
    const dateTimeString = `${formData.orderDate}T${formData.orderTime}`;
    // Create a Date object
    const dateObj = new Date(dateTimeString);
    formData.updateType = "changeOfOrder"
    // formData.order_date = timestampCreate(dateObj, "M/d/YYYY HH:mm:ss")
    formData.changed_at = timestampCreate(dateObj, "M/d/YYYY HH:mm:ss")
  }

  ////////////////////////////////////// SUBMIT NEW ORDER

  function submitForm(formData) {
    console.log(formData)
    const splitFormDataArray = splitFormDataByStore(formData)
    const pdfURLArray = splitFormDataArray.map(createOrder)
    return JSON.stringify(pdfURLArray)
  }

  function createOrder(formData) {
    const { pdfUrl, blob } = generateOrderPDF(formData)
    saveOrderToDBSheet(formData)
    sendEmail(blob, formData)
    increaseOrderCounter()
    console.log(formData)
    SpreadsheetApp.flush()
    return pdfUrl
  }


  function splitFormDataByStore(formData) {
    // Group items by store using productData.program_store_code
    const groupedItems = formData.items.reduce((acc, item) => {
      const storeId = item.productData.program_store_code;
      if (!acc[storeId]) {
        acc[storeId] = [];
      }
      acc[storeId].push(item);
      return acc;
    }, {});

    const storeKeys = Object.keys(groupedItems);

    // If there is only one store, return a single element array with no suffix modifications
    if (storeKeys.length === 1) {
      const storeId = storeKeys[0];
      return [{
        orderSerial: formData.orderSerial, // original serial, no suffix appended
        originalSerial: null, // added original serial parameter
        orderDate: formData.orderDate,
        orderTime: formData.orderTime,
        salesPersonData: formData.salesPersonData,
        paymentType: formData.paymentType,
        clientData: formData.clientData,
        generalComments: formData.generalComments,
        order_comment: formData.order_comment,
        store_id: storeId,
        items: groupedItems[storeId]
      }];
    }

    // Define a mapping from store id to orderSerial suffix when there are multiple stores
    const suffixMapping = {
      26: 'DRY',
      40: 'MEAT'
    };

    // If more than one store, create an array with each store's items and appended suffix
    return storeKeys.map(storeId => {
      const suffix = suffixMapping[storeId] || '';
      return {
        orderSerial: formData.orderSerial ? augmentSuffixToSerial(formData.orderSerial, suffix) : undefined,
        originalSerial: formData.orderSerial, // added original serial parameter
        orderDate: formData.orderDate,
        orderTime: formData.orderTime,
        salesPersonData: formData.salesPersonData,
        paymentType: formData.paymentType,
        clientData: formData.clientData,
        generalComments: formData.generalComments,
        order_comment: formData.order_comment,
        store_id: storeId,
        items: groupedItems[storeId]
      };
    });
  }

  function augmentSuffixToSerial(orderSerial, suffix){
    const [num,year] = orderSerial.split("-")
    const newSerial = num + suffix + "-" + year
    return newSerial
  }


  function generateOrderPDF(formData) {
    const PDF_FOLDER = "13up7eOMNFnpBqjMo81ox8SFm7dbAZ9nI"
    const template = HtmlService.createTemplateFromFile('server/OrderTemplate');
    template.data = formData;
    const html = template.evaluate();
    const blob = html.getAs(MimeType.PDF);
    const folder = DriveApp.getFolderById(PDF_FOLDER); // Create a folder for orders
    const constructedOrderSerial = formData.orderSerial + (formData.modificationVersion? "-" + formData.modificationVersion : "")
    const fileName = `Order_${constructedOrderSerial}_${formData.clientData.name}_${new Date().toISOString().split('T')[0]}.pdf`;
    const file = folder.createFile(blob.setName(fileName));
    const pdfUrl = file.getUrl();
    formData.order_url = pdfUrl
    return { pdfUrl, blob };
  }

  function saveOrderToDBSheet(formData) {
    augmentNewParameters(formData)
    AFIDBSheetsController.runRequest("createNewOrder", formData)
  }

  function augmentNewParameters(formData) {
    // Combine the date and time into a single string
    const dateTimeString = `${formData.orderDate}T${formData.orderTime}`;
    // Create a Date object
    const dateObj = new Date(dateTimeString);
    formData.order_date = timestampCreate(dateObj, "M/d/YYYY HH:mm:ss")
    formData.changed_at = timestampCreate(dateObj, "M/d/YYYY HH:mm:ss")
  }

  function sendEmail(blob, formData) {
    MailApp.sendEmail({
      to: LIVE ? ORDERS_EMAIL : TEST_EMAIL,
      subject: "Order " + formData.orderSerial + " " + formData.clientData.name,
      body: "Please find the order attached.",
      attachments: [blob] // Just pass the blob directly in the attachments array
    });
  }

  function increaseOrderCounter() {
    const masterFile = readFromJSON(MASTER_INDEX_ID)
    const { counters } = masterFile
    const countersFile = readFromJSON(counters)
    console.log(countersFile)
    countersFile.receviedOrdersCounter = countersFile.receviedOrdersCounter + 1
    writeToJSON(counters, countersFile)
  }

  return {
    fetchLists,
    submitForm,
    modifyOrder
  }
})

function submitForm(formData) {
  return AFI_ORDERSFORM.submitForm(formData)
}
function modifyOrder(formData) {
  return AFI_ORDERSFORM.modifyOrder(formData)
}

function fetchLists() {
  return AFI_ORDERSFORM.fetchLists()
}