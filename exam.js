const express = require('express');
const app = express();
const students = [];

class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  getDetails() {
    return `Name: ${this.name}, Grade: ${this.grade}`;
  }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send ('Welcome to Student Grade Tracker');
});

app.post ('/students', (req, res) => {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: 'Invalid or missing JSON body'});
    }

    const { name, grade } = req.body;
    if (!name || grade === undefined) {
      return res.status(400).json({ error: 'Name and grade are required.' });
    }

    const student = new Student (name, grade);
    students.push(student);
    res.status(201).json({
      message: 'Student added successfully. ',
      student: student.getDetails()
    });
});

app.get ('/students', (req, res) => {
  const details = students.map(student => student.getDetails());
  res.json(details);
});

app.listen (3000, () => {
  console.log('Server is running on port 3000');
});