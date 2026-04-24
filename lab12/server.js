const express = require("express");

const app = express();

// Middleware to read JSON body
app.use(express.json());

// Sample data
const students = [
  { id: 1, name: "Ali", department: "CS" },
  { id: 2, name: "Sara", department: "IT" },
  { id: 3, name: "Ahmed", department: "CS" }
];

// Task 2: Basic Routes
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.get("/about", (req, res) => {
  res.send("This is About Page");
});

// Task 3: Get All Students
app.get("/students", (req, res) => {
  res.json(students);
});

// Task 4: Route Parameter
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).send("Student not found");
  }

  res.json(student);
});

// Task 5: Query String
app.get("/search", (req, res) => {
  const dept = req.query.department;

  const filtered = students.filter(s => s.department === dept);

  res.json(filtered);
});

// Task 6: POST Request
app.post("/students", (req, res) => {
  const newStudent = req.body;

  students.push(newStudent);

  res.json({
    message: "Student added",
    data: students
  });
});

// Task 7: PUT Request
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).send("Student not found");
  }

  student.name = updatedData.name || student.name;
  student.department = updatedData.department || student.department;

  res.json({
    message: "Student updated",
    data: student
  });
});

// Task 8: DELETE Request
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).send("Student not found");
  }

  students.splice(index, 1);

  res.json({
    message: "Student deleted",
    data: students
  });
});

// Task 9: 404 Handler
app.use((req, res) => {
  res.status(404).send("404 - Route Not Found");
});

// Task 1: Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});