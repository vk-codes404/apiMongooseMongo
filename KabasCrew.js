import mongoose from "mongoose";

const KabasCrewSchema = new mongoose.Schema({
  //schema for db
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: 100,
  },
  alias: {
    type: String,
    required: [true, "Alias is required"],
    maxlength: 50,
  },
});

export default mongoose.model("KabasCrew", KabasCrewSchema); //exporting the const and changing the exporting name for KabasCrew
