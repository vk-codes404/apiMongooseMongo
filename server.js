import express from "express"; //usage of express
import dotenv from "dotenv"; //usage of dotenv
import mongoose from "mongoose"; //usage of moongose
import cors from "cors"; //usage of cors
import KabasCrew from "./KabasCrew.js"; //usage of KabasCrew

dotenv.config(); //activate the .env

const app = express(); //stance of express into the 'app'

app.use(express.json()); //allow the app to use json type of files
app.use(cors()); //allow the app to concede cors permission

const PORT = process.env.PORT ?? 3000; //stabilish the http server using the .env or attributing 3000

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI); //connect into the DB through .env
    return console.log("Connected with success on DB");
  } catch (error) {
    return console.log("Failed to connect on DB" + error.message);
  }
}

const start = async () => {
  //server initiation function
  await connectDB(); //connect on DB
  app.listen(PORT, () => console.log(`Connected with success on PORT ${PORT}`)); //run the server on PORT
};

start(); //calling function

app.get("/registers", async (req, res) => {
  //route for consultation
  try {
    const allRegister = await KabasCrew.find(); //consulting through schema
    return res.status(200).json(allRegister); //showing all registers
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.get("/registers/:id", async (req, res) => {
  //route for specific consultation
  try {
    const oneRegister = await KabasCrew.findById(req.params.id); //consulting specific ID
    return res.status(200).json(oneRegister); //showing specific ID
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.post("/registers", async (req, res) => {
  //route for creation
  try {
    const createRegister = await KabasCrew.create(req.body); //creating new entry
    return res.status(201).json(createRegister); //returning what was created
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.delete("/registers/:id", async (req, res) => {
  //route for deletion
  try {
    const deleteRegister = await KabasCrew.findByIdAndDelete(req.params.id); //deleting an entry by ID
    return res.status(200).json(deleteRegister); //returning what was deleted
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.put("/registers/:id", async (req, res) => {
  //route for editing
  try {
    const updateRegister = await KabasCrew.findByIdAndUpdate(
      //editing by ID and showing updated versioin
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updateRegister); //returning updated entry
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
