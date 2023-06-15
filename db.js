import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://maxisantoro2003:4747Maxi@cluster0.q6o6rkk.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("austral");

export default db;


