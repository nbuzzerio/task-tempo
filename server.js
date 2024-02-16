import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 7000;

// Serve static files from the 'dist' folder
app.use(express.static(__dirname + "/dist"));
app.use(express.json());

app.post("/api/saveTasks", (req, res) => {
  try {
    const tasks = req.body;
    const filePath = join(__dirname, "src", "data", "tasks.json");
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    res.status(200).json({ message: "Tasks saved successfully" });
  } catch (error) {
    console.error("Error saving tasks:", error);
    res.status(500).json({ message: "Failed to save tasks" });
  }
});

app.get("/api/getTasks", (req, res) => {
  try {
    const filePath = join(__dirname, "src", "data", "tasks.json");
    const tasks = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(tasks));
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

// Define a catch-all route to serve 'index.html'
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
