require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/wellnessDB");


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define Schema and Model
const patientSchema = new mongoose.Schema({
  patient_id: String,
  name: String,
  age: Number,
  gender: String,
  medical_history: [
    {
      condition: String,
      diagnosed_on: String
    }
  ],
  appointments: [
    {
      date: String,
      doctor: String,
      department: String
    }
  ],
  diagnostics: [
    {
      test_name: String,
      result: String,
      date: String
    }
  ],
  mental_health: [
    {
      session_notes: String,
      evaluation: String,
      therapist: String
    }
  ],
  physiotherapy: [
    {
      progress_log: String,
      session_date: String
    }
  ],
  nutrition: [
    {
      dietary_plan: String,
      calorie_intake: Number,
      progress: String
    }
  ],
  yoga: [
    {
      session_plan: String,
      wearable_data: String
    }
  ]
});


const Patient = mongoose.model("Patient", patientSchema);

// API Routes

// Get all patients
// Get all patients sorted by patient_id
app.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ patient_id: 1 }); // 🔥 Sort in ascending order
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Add new patient
app.post("/patients", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.json({ message: "Patient added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
