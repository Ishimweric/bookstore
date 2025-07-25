const express = require("express");
const {connectToDB, getDB} = require("./db");
const { ObjectId } = require("mongodb");

// INITIALISE APP
const app = express();
app.use(express.json());

//CONNECT TO DATABASE
let db
connectToDB((err)=>{
  if (!err){
    // LISTEN TO PORT 3500
    app.listen(3500, ()=>{
      console.log("SERVER RUNNING AT PORT 3500");
    });
    db = getDB();
  }else{
    console.error("Failed to cinnect to db: ",err)
    process.exit(1);
  }
});

// ROUTES FOR REQUEST HANDLIND
app.get("/books",async (req, res)=>{
  try{
    const books = db.collection("books");
    const getBooks = await books.find({}).sort({"author":1}).toArray(); // get the cursor but not the actual array
    res.status(200).json({getBooks}); //ok
  }catch(err){
    res.status(500).json({"error": "Could not fetch data!"}); //server error
  }
});

app.get("/books/:id",async (req, res)=>{
  try{
    const id = req.params.id;

    // check if the id is valid
    if (!ObjectId.isValid(id)){
      res.status(400).json({"error" : "invalid id"})
    }
    
    const books = db.collection("books");
    const getBook = await books.findOne({"_id" : new ObjectId(id)});
    res.status(200).json({getBook});
  }catch(err){
    res.status(500).json({"error":"Could not fetch data!"});
  }
});

app.post("/books", async (req, res)=>{
  try{
    const book = req.body;
    const books = db.collection("books");
    const result = await books.insertOne(book);
    res.status(201).json(result); // succesfully inserted data
  }catch(err){
    res.status(500).json({"error" : "Unable to add data!"})
  }
});

app.delete("/books/:id", async (req, res)=>{
  try{
    const id = req.params.id;

    //check if id is valid
    if(!ObjectId.isValid(id)) res.status(400).json({"error" : "Inavlid ID"});

    const books = db.collection("books");
    await books.deleteOne({"_id" : new ObjectId(id)});
    res.status(200).json({"Message":"Book successfuly deleted"});
  }catch(err){
    res.status(500).json({"error" : "Failed to delete data!"})
  }
});

app.patch("/books/:id", async (req, res)=>{
  try{
    const id = req.params.id;
    const updates = req.body;
    //check if id is valid
    if(!ObjectId.isValid(id)) res.status(400).json({"error" : "Invalid ID"});

    const books = db.collection("books");
    await books.updateOne(
      {"_id": new ObjectId(id)},
      {$set: updates}
    );
    res.status(200).json({"Message" : "Succesfully updated the field!"})
  }catch(err){
    res.status(500).json({"error" : "Failed to update data!"})
  }
})