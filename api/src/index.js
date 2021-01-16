const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwtToken = require('jsontokens')

const DatabaseHelper = require('./helper/DatabaseHelper');
const Helpers = require('./utils/helpers.js');

const pg = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
});

app.use(bodyParser.json()); 
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.send('Hello World -- deployed again!')
})


app.get('/join', async (req, res) => {
  await DatabaseHelper
    .table('items')
    .join('lists', DatabaseHelper.raw('item.list_id::varchar'), DatabaseHelper.raw('lists.uuid::varchar'))
    .select('lists.*', 'items.*')
    .then((data) => {
      res.send(data)
    })

})

app.get('/test', (req, res) => {
  res.send('Hello World -- test phase!')
  console.log("test done");
 
});

/**  get all current records in champions table
 * @params
 * @returns all champions in RAW format
 */

app.get('/champions', async (req, res) => {
  const result = await pg
    .select(['uuid', 'championName', 'championKey','role', 'created_at','updated_at'])
    .from('champions');
  res.json({ 
    res: result,
  });
});

/**  post a new record with generated uuid in champions table
 * @params 
 * @returns posts one record in champions table
 */

app.post('/champion', async (req, res) => {
  const uuid = Helpers.generateUUID();
  
  const result = await pg

    .table('champions')
    .insert({ uuid, championName: `Aatrox`, championKey: `266`, role:`fighter, tank`})  
    .returning('*')
    .then((res) => {
      return res;
    });
  console.log('added 3 champions');
  console.log(result);
  res.send(result);
});

/**  delete specific champion by the uuid in champions table
 * @params uuid
 * @returns deletes the record specified by the uuid from champions table
 */

app.delete('/champion/:uuid', async (req, res) => {
  const result = await pg
    .table('champions')
    .where('uuid', req.params.uuid)
    .del(['id', 'uuid', 'championName', 'championKey','role', 'created_at','updated_at'])
    .then((res) => {
      return res; 
    });
  console.log('deleted record.');
  console.log(result);
  res.send(result);
});

/**  get specific champion by the uuid in champions table
 * @params uuid
 * @returns one specific record by the uuid from champions table
 */

app.get('/champion/:uuid', async (req, res) => {
  const result = await pg
    .select(['uuid', 'championName', 'championKey','role', 'created_at','updated_at'])
    .from('champions')
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  }); 
});

/**  update champion searching by the uuid in champions table
 * @params uuid
 * @returns updates the record in champions table by the uuid
 */

app.put('/champion/:uuid', async (req, res) => {
  const result = await pg
  .table('champions')
  .where({ uuid: req.params.uuid})
    .update({ championName: `Kayn`, championKey: `6931`, role: `assassin` })
    .returning('*')
    .then(function (result) {
      console.log(result);
      res.json(result);
      res.status(200).send('Champion successfully edited!');
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send('Error editing champion!');
    });
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}`));
}

async function initialiseTables() {
  await pg.schema.hasTable('champions').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('champions', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('championName');
          table.string('championKey');
          table.string('role');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table champions');
         
        });
 
    }
  });
  await pg.schema.hasTable('roles').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('roles', (table) => {
          table.increments().primary();
          table.uuid('uuid');
          table.string('marksman');
          table.string('mages');
          table.string('fighter');
          table.string('tank');
          table.string('assassin');
          table.string('support');
          table.timestamps(true, true);
        }) 
        .then(async () => { 
          console.log('created table roles');
          
        });

    }
  });
}
initialiseTables()

module.exports = app
