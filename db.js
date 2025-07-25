// STORE DATABASE CONNECTION CODES

// get mongo client
const uri = "mongodb://localhost:27017/bookstore";
const {MongoClient} = require("mongodb");
let dbConnection

const connectToDB = async ()=>{
  //connect to my local database
  const client = await MongoClient.connect(uri);
   dbConnection = client.db();


}