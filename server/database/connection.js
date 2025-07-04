// server/db/connection.js
const { MongoClient } = require('mongodb');

let client;   // cached MongoClient
let db;       // cached database handle

/**
 * Returns a ready-to-use database instance.
 * Call this once at startup, then reuse the handle everywhere.
 */
async function connect() {
  if (db) return db;                      // already connected

  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
  const dbName = process.env.MONGO_DB || 'mydb';

  client = new MongoClient(uri, {
    maxPoolSize: 10,                      // tweak as needed
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();                 // open TCP connection
  db = client.db(dbName);

  console.log(`✓ MongoDB connected → ${uri}/${dbName}`);
  return db;
}

/**
 * Gracefully close the connection when the process ends.
 */
async function close() {
  if (client) await client.close();
}

module.exports = { connect, close };
