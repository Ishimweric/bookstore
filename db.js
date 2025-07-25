// STORE DATABASE CONNECTION CODE
require("dotenv").config();
// get mongo client
const uri = process.env.DATABASE_URI;
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