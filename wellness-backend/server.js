require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

// Connect to MongoDB (Use Atlas connection from .env)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ Connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB Atlas"));

// Define Schema and Model
const patientSchema = new mongoose.Schema({
  patient_id: String,
  name: String,
  age: Number,
  gender: String,
  medical_history: [
    {
      condition: String,
      diagnosed_on: String,
    },
  ],
  appointments: [
    {
      date: String,
      doctor: String,
      department: String,
    },
  ],
  diagnostics: [
    {
      test_name: String,
      result: String,
      date: String,
    },
  ],
  mental_health: [
    {
      session_notes: String,
      evaluation: String,
      therapist: String,
    },
  ],
  physiotherapy: [
    {
      progress_log: String,
      session_date: String,
    },
  ],
  nutrition: [
    {
      dietary_plan: String,
      calorie_intake: Number,
      progress: String,
    },
  ],
  yoga: [
    {
      session_plan: String,
      wearable_data: String,
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

// API Routes

// Get all patients sorted by patient_id
app.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ patient_id: 1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new patient
app.post("/patients", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.json(savedPatient); // Send back the saved patient data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update Patient
app.put("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.delete("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// Add this route before your existing routes
app.get("/patients/next-id", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ patient_id: -1 }).limit(1);
    const lastId = patients.length > 0 ? parseInt(patients[0].patient_id.substring(1)) : 0;
    const nextId = `P${String(lastId + 1).padStart(3, '0')}`;
    res.json({ nextId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
