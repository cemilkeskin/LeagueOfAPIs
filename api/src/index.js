const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwtToken = require('jsontokens')



const DatabaseHelper = require('./helper/DatabaseHelper');
const InitialiseDBHelpers = require('./helper/InitialiseDBHelpers')
const UUIDHelper = require('./helper/UuidHelpers');
const Helpers = require('./helper/helpers');
/*
const AuthHelper = require('./helper/AuthHelper');
InitialiseDBHelpers.initialiseTables(DatabaseHelper);
*/

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

app.get('/champions', async (req, res) => {
  const result = await pg
    .select(['uuid', 'championName', 'championKey','role', 'created_at','updated_at'])
    .from('champions');
  res.json({ 
    res: result,
  });
});

app.post('/add-champions', async (req, res) => {
  const uuid = Helpers.generateUUID();
  
  const result = await pg

   
    .table('champions')
    .insert({ uuid, championName: `Kayn`, championKey: `141`, role:`fighter, assassin` })  
    .returning('*')
    .then((res) => {
      return res;
    });
  console.log('added 3 champions');
  console.log(result);
  res.send(result);
}); 

/*
app.get('/questions', AuthHelper.tokenValidator, async (req, res) => {
  await DatabaseHelper.table('records').select('*').where({ user_id: req.body.user.uuid }).then((data) => {
    res.send(data);
  }).catch((error) => { 
    res.send(error).status(400)
  })
})
*/

/*
app.get('/question/:uuid', AuthHelper.tokenValidator, async (req, res) => {
  if (req.params.uuid) {
    await DatabaseHelper.table('records').select('*').where({ uuid: req.params.uuid }).then((data) => {
      if (data.length > 0) {
        res.send(data[0]);
      }
      else {
        // could not find
        res.sendStatus(404)
      }
    }).catch((error) => {
      res.send(error).status(400)
    })
  }
  else {
    res.send(400)
  }
})
 
*/


/*
app.patch('/question/:uuid', AuthHelper.tokenValidator, async (req, res) => {
  if (req.params.uuid && req.body) {
    const toAlter = {};
    if (req.body.question) {
      toAlter["question"] = req.body.question;
    }
    await DatabaseHelper.table('records').update(toAlter).where({ uuid: req.params.uuid }).returning('*').then((data) => {
      if (data.length > 0) {
        res.status(200).send(data[0]);
      }
      else {
        res.status(404).send();
      }
    }).catch((error) => {
      res.status(403).send(error)
    })
  }
  else {
    res.sendStatus(400)
  }
})
app.delete('/question/:uuid', AuthHelper.tokenValidator, async (req, res) => {
  if (req.params.uuid) {
    await DatabaseHelper.table('records').delete().where({ uuid: req.params.uuid }).returning('*').then((data) => {
      if (data.length > 0) {
        res.sendStatus(200);
      }
      else {
        res.sendStatus(404);
      }
    }).catch((error) => {
      res.send(error).status(400)
    })
  }
  else {
    res.send(400)
  }
})
*/

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