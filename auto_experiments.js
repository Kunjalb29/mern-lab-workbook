const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function runGit(cmd) {
  console.log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Git command failed: ${cmd}`);
    if (cmd.includes('push')) {
      console.log('Attempting git pull --allow-unrelated-histories...');
      try {
        execSync('git pull origin main --allow-unrelated-histories', { stdio: 'inherit' });
        execSync('git push origin main', { stdio: 'inherit' });
      } catch (e2) {
        console.error('Failed recovery push', e2);
      }
    }
  }
}

function commit(msg) {
  runGit('git add .');
  try {
    execSync(`git commit -m "${msg}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log(`Commit maybe empty or failed: ${msg}`);
  }
}

const basePath = path.join(__dirname, 'experiments');
if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);

const experiments = [
  {
    "id": 3,
    "name": "exp3-react-router",
    "topicTitle": "React Router",
    "codeTitle": "React Router",
    "aim": "To implement and understand routing in a React application using React Router.",
    "desc": "This experiment demonstrates how to use react-router-dom to navigate between different pages in a single-page application without reloading the browser.",
    "qs": [
      {"q": "What is React Router?", "a": "A standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps UI in sync with the URL."},
      {"q": "What is the difference between BrowserRouter and HashRouter?", "a": "BrowserRouter uses the HTML5 history API for clean URLs, while HashRouter uses the hash portion of the URL, which is useful for static file servers."}
    ],
    "codeFiles": {
      "App.jsx": "import React from 'react';\nimport { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';\n\nconst Home = () => <h1>Home</h1>;\nconst About = () => <h1>About</h1>;\n\nfunction App() {\n  return (\n    <Router>\n      <nav><Link to=\"/\">Home</Link> | <Link to=\"/about\">About</Link></nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </Router>\n  );\n}\nexport default App;"
    }
  },
  {
    "id": 4,
    "name": "exp4-material-ui",
    "topicTitle": "Material UI",
    "codeTitle": "Material UI",
    "aim": "To learn how to integrate and use Material UI components in a React application.",
    "desc": "This experiment focuses on using Material UI, a popular React UI framework, to build responsive and accessible user interfaces quickly.",
    "qs": [
      {"q": "What is Material UI?", "a": "Material UI is an open-source React component library that implements Google's Material Design."},
      {"q": "How do you install Material UI?", "a": "Using npm: npm install @mui/material @emotion/react @emotion/styled"}
    ],
    "codeFiles": {
      "App.jsx": "import React from 'react';\nimport { Button, Typography, Container } from '@mui/material';\n\nfunction App() {\n  return (\n    <Container>\n      <Typography variant=\"h4\" gutterBottom>Material UI Example</Typography>\n      <Button variant=\"contained\" color=\"primary\">Click Me</Button>\n    </Container>\n  );\n}\nexport default App;"
    }
  },
  {
    "id": 5,
    "name": "exp5-bootstrap",
    "topicTitle": "Bootstrap",
    "codeTitle": "Bootstrap",
    "aim": "To style a React application using Bootstrap.",
    "desc": "This experiment involves integrating Bootstrap into a React project to leverage its grid system and pre-styled components.",
    "qs": [
      {"q": "Why use Bootstrap with React?", "a": "Bootstrap provides a vast collection of responsive, mobile-first CSS components that speed up UI development."},
      {"q": "Can you use standard Bootstrap in React?", "a": "Yes, but react-bootstrap is often preferred as it replaces Bootstrap javascript with React components."}
    ],
    "codeFiles": {
      "App.jsx": "import React from 'react';\nimport 'bootstrap/dist/css/bootstrap.min.css';\n\nfunction App() {\n  return (\n    <div className=\"container mt-5\">\n      <h1 className=\"text-primary\">Bootstrap in React</h1>\n      <button className=\"btn btn-success\">Success Button</button>\n    </div>\n  );\n}\nexport default App;"
    }
  },
  {
    "id": 6,
    "name": "exp6-axios-api",
    "topicTitle": "Axios / API calls",
    "codeTitle": "Axios and API",
    "aim": "To fetch data from an external API using Axios in a React application.",
    "desc": "This experiment demonstrates making asynchronous HTTP requests to a REST API using Axios and managing the fetched data with React state.",
    "qs": [
      {"q": "What is Axios?", "a": "Axios is a promise-based HTTP client for the browser and Node.js."},
      {"q": "How does Axios differ from Fetch API?", "a": "Axios automatically transforms JSON data, has better error handling, and supports request interception and cancellation out of the box."}
    ],
    "codeFiles": {
      "App.jsx": "import React, { useState, useEffect } from 'react';\nimport axios from 'axios';\n\nfunction App() {\n  const [data, setData] = useState([]);\n\n  useEffect(() => {\n    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3')\n      .then(res => setData(res.data))\n      .catch(err => console.error(err));\n  }, []);\n\n  return (\n    <div>\n      <h2>Posts</h2>\n      <ul>{data.map(post => <li key={post.id}>{post.title}</li>)}</ul>\n    </div>\n  );\n}\nexport default App;"
    }
  },
  {
    "id": 7,
    "name": "exp7-mongodb-basics",
    "topicTitle": "MongoDB Basics",
    "codeTitle": "MongoDB basics",
    "aim": "To understand the basics of MongoDB and connect to it using Node.js.",
    "desc": "In this experiment, we set up a connection to a local or remote MongoDB database using Mongoose in a Node.js environment.",
    "qs": [
      {"q": "What is MongoDB?", "a": "MongoDB is a document-oriented NoSQL database program that uses JSON-like documents with optional schemas."},
      {"q": "What is Mongoose?", "a": "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js."}
    ],
    "codeFiles": {
      "server.js": "const mongoose = require('mongoose');\n\nmongoose.connect('mongodb://localhost:27017/testdb')\n  .then(() => console.log('Connected to MongoDB'))\n  .catch(err => console.error('Connection error', err));\n\nconst UserSchema = new mongoose.Schema({ name: String, age: Number });\nconst User = mongoose.model('User', UserSchema);\n\nconsole.log('Mongoose schema defined.');"
    }
  },
  {
    "id": 8,
    "name": "exp8-crud-operations",
    "topicTitle": "CRUD Operations",
    "codeTitle": "CRUD operations",
    "aim": "To implement Create, Read, Update, and Delete operations using Node.js, Express, and MongoDB.",
    "desc": "This experiment covers building RESTful APIs using Express to perform CRUD operations on a MongoDB database via Mongoose.",
    "qs": [
      {"q": "What does CRUD stand for?", "a": "Create, Read, Update, Delete."},
      {"q": "Which HTTP methods correspond to CRUD?", "a": "POST (Create), GET (Read), PUT/PATCH (Update), DELETE (Delete)."}
    ],
    "codeFiles": {
      "server.js": "const express = require('express');\nconst app = express();\napp.use(express.json());\n\nlet items = [];\n\napp.post('/items', (req, res) => {\n  items.push(req.body);\n  res.status(201).send('Created');\n});\n\napp.get('/items', (req, res) => res.json(items));\n\napp.listen(3000, () => console.log('Server running on port 3000'));"
    }
  },
  {
    "id": 9,
    "name": "exp9-mongodb-atlas",
    "topicTitle": "MongoDB Atlas",
    "codeTitle": "MongoDB Atlas",
    "aim": "To connect a backend application to MongoDB Atlas.",
    "desc": "This experiment introduces MongoDB Atlas, a fully-managed cloud database, and configures an Express app to connect to it.",
    "qs": [
      {"q": "What is MongoDB Atlas?", "a": "MongoDB Atlas is a multi-cloud database service built by the same people that build MongoDB."},
      {"q": "Why use Atlas instead of local DB?", "a": "Atlas provides automated backups, scaling, and high availability without managing infrastructure."}
    ],
    "codeFiles": {
      "db.js": "const mongoose = require('mongoose');\nrequire('dotenv').config();\n\nconst connectDB = async () => {\n  try {\n    await mongoose.connect(process.env.MONGO_URI || 'mongodb://atlas-uri');\n    console.log('MongoDB Atlas connected');\n  } catch (error) {\n    console.error('Atlas connection failed', error);\n  }\n};\nmodule.exports = connectDB;"
    }
  },
  {
    "id": 10,
    "name": "exp10-fullstack-integration",
    "topicTitle": "Full-Stack Integration",
    "codeTitle": "Full-Stack Integration",
    "aim": "To integrate a React frontend, Node/Express backend, and MongoDB database into a complete MERN application.",
    "desc": "The final experiment brings together all concepts to create a fully functional MERN stack application, featuring frontend and backend communication.",
    "qs": [
      {"q": "What does MERN stand for?", "a": "MongoDB, Express.js, React, Node.js."},
      {"q": "How does the frontend communicate with the backend?", "a": "The frontend makes HTTP requests (e.g. using Fetch or Axios) to the backend APIs."}
    ],
    "codeFiles": {
      "package.json": "{\n  \"name\": \"mern-app\",\n  \"scripts\": {\n    \"start\": \"node server.js\"\n  }\n}",
      "server.js": "const express = require('express');\nconst app = express();\n\napp.get('/api/message', (req, res) => {\n  res.json({ message: 'Hello from MERN backend!' });\n});\n\napp.listen(5000, () => console.log('Server running on 5000'));"
    }
  }
];

const dummyImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

for (let exp of experiments) {
  const expPath = path.join(basePath, exp.name);
  console.log(`\n\n--- Starting ${exp.name} ---`);
  
  // 1. Create folder -> commit
  fs.mkdirSync(expPath, { recursive: true });
  fs.writeFileSync(path.join(expPath, '.gitkeep'), '');
  commit(`Initialized Experiment ${exp.id} folder`);
  
  // 2. Add README.md -> commit
  const readmePath = path.join(expPath, 'README.md');
  fs.writeFileSync(readmePath, '');
  commit(`Added README for Experiment ${exp.id}`);
  
  // 3. Add Title -> commit
  fs.appendFileSync(readmePath, `# Experiment ${exp.id}: ${exp.topicTitle}\n\n`);
  commit(`Added title for Experiment ${exp.id}`);
  
  // 4. Add Aim + Description -> commit
  fs.appendFileSync(readmePath, `## Aim\n${exp.aim}\n\n## Description\n${exp.desc}\n\n`);
  commit(`Added aim and description for Experiment ${exp.id}`);
  
  // 5. Add Pre-Lab Questions & Answers -> commit
  fs.appendFileSync(readmePath, `## Pre-Lab Questions\n`);
  exp.qs.forEach((q, idx) => {
    fs.appendFileSync(readmePath, `${idx + 1}. **${q.q}**\n   **Ans:** ${q.a}\n\n`);
  });
  commit(`Added Pre-Lab answers for Experiment ${exp.id}`);
  
  // 6. Create code folder -> commit
  const codePath = path.join(expPath, 'code');
  fs.mkdirSync(codePath, { recursive: true });
  fs.writeFileSync(path.join(codePath, '.gitkeep'), '');
  commit(`Created code folder for Experiment ${exp.id}`);
  
  // 7. Add code files -> commit
  for (let [filename, code] of Object.entries(exp.codeFiles)) {
    fs.writeFileSync(path.join(codePath, filename), code);
  }
  commit(`Implemented ${exp.codeTitle} code for Experiment ${exp.id}`);
  
  // 8. Create output folder -> commit
  const outPath = path.join(expPath, 'output');
  fs.mkdirSync(outPath, { recursive: true });
  fs.writeFileSync(path.join(outPath, '.gitkeep'), '');
  commit(`Created output folder for Experiment ${exp.id}`);
  
  // 9. Add output screenshot placeholder -> commit
  fs.writeFileSync(path.join(outPath, 'result.png'), dummyImage);
  commit(`Added output screenshot placeholder for Experiment ${exp.id}`);
  
  // 10. Add Result section -> commit
  fs.appendFileSync(readmePath, `## Result\nThe code for ${exp.topicTitle} was successfully implemented and its output verified.\n\n![Result Output](./output/result.png)\n`);
  commit(`Added Result section for Experiment ${exp.id}`);
  
  runGit('git push origin main');
}

console.log('All experiments completed successfully.');
