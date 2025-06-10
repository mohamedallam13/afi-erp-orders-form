const request = {
  page: "AFIOrdersForm",
}

// const request = {
//   props: {
//     data: {
//       clientData: {
//         area_id: "420000000000003",
//         branch_id: "410000000000002",
//         client_id: "400000000000001",
//         name: "كارفور-كايروفيستفال"
//       },
//       generalComments: "sdfsdfds",
//       items: [
//         {
//           item_comment: "rsdfsdf",
//           productData: { product_id: '200000000000001', name: 'ابوعلى فلفل أسود - ملاحة--6221058001205' },
//           quantity: "33",
//           unit: { unit_id: '70000000000002', name: 'قطعة' },
//         }
//       ],
//       orderDate: "2025-01-29",
//       orderSerial: "000000018-2025",
//       orderTime: "13:18:18",
//       order_comment: "sdfsdfds",
//       paymentType: "check",
//       salesPersonData: {
//         name: "أ/ دينا الشاذلي",
//         person_id: "600000000000002"
//       }
//     }
//   },
//   page: "server/OrderTemplate",
// }

function doGet(e) {
  const params = e.parameters || {}
  console.log(params)
  const { page, props = {} } = request
  return _R(page, { ...props, ...params }, { metaData: [{ name: "viewport", content: "width=device-width, initial-scale=1" }] })
}

