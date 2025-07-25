// STORE DATABASE CONNECTION CODES

// get mongo client
const uri = "mongodb://localhost:27017/bookstore";
const {MongoClient} = require("mongodb");

//connect to my local database
let dbConnection
const connectToDB = async (cb)=>{
  let client
  try{
    client = await MongoClient.connect(uri);
    dbConnection = client.db();
    console.log("Successfully connected to db!")
    return cb();
  }catch(err){
    console.error("Unable to connect: ",err);
    return cb(err);
  }
}

const getDB = ()=> dbConnection

module.exports = {connectToDB, getDB}