// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to receive stats from the agent
app.post('/stats', (req, res) => {
  const systemStats = req.body;

  // Log the received stats
  console.log('Received stats:', systemStats);

  // Optionally, you can store the stats in a database here (e.g., MongoDB, MySQL, etc.)
  
  // Send a response back to acknowledge receipt
  res.status(200).send('Stats received successfully');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
