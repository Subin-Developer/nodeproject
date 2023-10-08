//imports
const express = require('express');
const mongoose = require("mongoose");
const product = require("./Models/Productmodel")
const bike = require("./Models/bikemodel")
const multer = require('multer');


const app = express();
const port = 3000;

mongoose.set("strictQuery", false);


app.use(express.json())


// Define a storage engine for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get("/hello", (req, res) => {
   res.json({ value: "HELLO SUBIN" })
})




//Post method
app.post("/product", async (req, res) => {
   try {
      const newproduct = await product.create(req.body)
      res.status(200).json(newproduct)
   } catch (error) {
      console.log(error.message),
         res.status(500).json({ message: error.message })

   }
})


//get specific data

app.get("/product/:name", async (req, res) => {
   try {
      const {name}=req.params;
      const newproduct = await product.find({name});
      res.status(200).json(newproduct)
   } catch (error) {
      console.log(error.message),
         res.status(500).json({ message: error.message })

   }
})

//get method
app.get("/product", async (req, res) => {
   try {
      const newproduct = await product.find({});
      res.status(200).json(newproduct)
      console.log(res.statusCode);
   } catch (error) {
      console.log(error.message),
         res.status(500).json({ message: error.message })

   }
})

//put
app.put("/product/:name", async (req, res) => {
   try {
      const {name}=req.params;
      const newproduct = await product.findandupdate(name, req.body);
      res.status(200).json(newproduct)
      console.log('callled');
   } catch (error) {
      console.log(error.message),
         res.status(500).json({ message: error.message })

   }
})



 app.post("/bike",upload.any(), async(req,res)=>{
   try {
      const bikes = await bike.create(req.body)
      res.status(200).json(bikes)
   } catch (error) {
      console.log(error.message),
      res.status(500).json({ message: error.message })
   }
 })
 app.get("/bike", async (req, res) => {
   try {
      const newproduct = await product.find({});
      res.status(200).json(newproduct)
      console.log(res.statusCode);
   } catch (error) {
      console.log(error.message),
         res.status(500).json({ message: error.message })

   }
})



mongoose.connect("mongodb+srv://subinsubi_7012:mothalamma@cluster0.sul6tip.mongodb.net/noeds?retryWrites=true&w=majority")
   .then(() => {
      app.listen(port,() => {
         console.log('connected at' + port)
      })
   })
   .catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
   });