
// const func = {
//   initialiseTables: async function (db) {
//     await db.schema.hasTable('champions').then(async (exists) => {
//       if (!exists) {
//         await db.schema
//           .createTable('champions', (table) => {
//             table.increments().primary();
//             table.string('uuid');
//             table.string('championName');
//             table.string('championKey');
//             table.string('role');
//             table.timestamps(true, true);
//           })
//           .then(async () => {
//             console.log('created table champions');
//           })
//           .catch((e) => {
//             // console.error(e)
//           })
//       }

//     })


//     await db.schema.hasTable('roles').then(async (exists) => {
//       if (!exists) {
//         await db.schema
//           .createTable('roles', (table) => {
//             table.increments().primary();
//             table.uuid('uuid');
//             table.string('marksman'); 
//             table.string('mages'); 
//             table.string('fighter');
//             table.string('tank');
//             table.string('assassin'); 
//             table.string('support');
//             table.timestamps(true, true);
//           })
//           .then(async () => {
//             console.log('created table lane');
//           })
//           .catch((e) => {
//             // console.error(e)
//           })
//       }
//     })
//   }
// }

// module.exports = func