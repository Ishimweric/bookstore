const express = require("express");
const {connectToDB, getDB} = require("./db");

// INITIALISE APP
const app = express();

//CONNECT TO DATABASE
let db
connectToDB((err)=>{
  if (!err){
    // LISTEN TO PORT 3500
    app.listen(3500, ()=>{
      console.log("SERVER RUNNING AT PORT 3500");
    });
    db = getDB();
  }
});

// ROUTES FOR REQUEST HANDLIND
app.get("/books",async (req, res)=>{
  try{
    const books = db.collection("books");
    const getBooks = await books.find({}).sort({"author":1}).toArray(); // get the cursor but not the actual array
    res.status(200).json({getBooks}); //ok
  }catch(err){
    res.status(500).json({"error": "Could not fetch data!"});
  }
});