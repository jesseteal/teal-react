const mysql = require('mysql2');

const db = {

  // connect to db if not yet connected
  init: async () => {
    if(typeof db.pool === 'undefined'){
      db.pool = await mysql.createPool({
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS
      });
    }
  },

  // pass SQL to db and return results
  query: async (...args) => {
    await db.init();
    const conn = db.pool.promise();
    return await conn.query(...args)
      .catch(console.log);
  },

  first: async (...args) => {
    const [rows] = await db.query(...args);
    return rows[0];
  },

  // manually disconnect
  quit: () => {
    db.pool.end();
  },
}

module.exports = db;
