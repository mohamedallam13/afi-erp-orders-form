// function createPdfFromHtml() {

//   const FOLDER_ID = "1WzVnj3t8QzEOGO_4H2O_0Yw4BJTmsBuM"
//   const FILE_NAME = "SGConfidentialityAgreement"
//   const folder = DriveApp.getFolderById(FOLDER_ID); // Replace with your folder ID
//   var htmlOutput = _R(FILE_NAME)
//   var blob = htmlOutput.getAs("application/pdf")
//   try {
//     blob.setName(FILE_NAME);
//     folder.createFile(blob);
//   } catch (error) {
//     console.log("pdf " + FILE_NAME + " wasn't created")
//     var count = 0
//     var success = false
//     while (count < 3 && success == false) {
//       try {
//         blob.setName(FILE_NAME);
//         folder.createFile(blob)
//         success = true
//         console.log("pdf " + FILE_NAME + " was created")
//       } catch (error) {
//         count++
//         console.log("pdf " + FILE_NAME + " wasn't created" + count)
//         if (count === 3) { throw error }
//       }
//     }
//   }

//   Logger.log('PDF Created and Saved to Drive');
// }
