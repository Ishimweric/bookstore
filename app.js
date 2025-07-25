const express = require("express");

// INITIALISE APP
const app = express();

// ROUTES FOR REQUEST HANDLIND
app.get("/books",(req, res)=>{
  res.json({"message" : "Welcome to api land"})
})

// LISTEN TO PORT 3500
app.listen(3500, ()=>{
  console.log("SERVER RUNNING AT PORT 3500");
});