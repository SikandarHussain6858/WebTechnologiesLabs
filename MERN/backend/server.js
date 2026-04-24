// import express
const express = require('express');

// initialize express app 
const app = express();

// sample data
const users = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Charlie', role: 'Guest' }
];

// define a route
app.get('/', (req,res)=>{
    res.send('hello world ! my mern is working');
});

// NEW ROUTE: Add this right below your '/' route!
app.get('/api/users', (req, res) => {
    res.json(users);
});

// define a port 
const PORT = 3000;

// start the server 
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});