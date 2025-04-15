//import required modules
const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const os = require('os');

//initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const PORT = process.env.PORT || 3000;

//set view engine to ejs
app.set('view engine', 'ejs');  

//set folder for static files
app.use(express.static(path.join(__dirname, 'public')));

//set up routes
const dashboardRoute = require('./routes/dashboard');
app.use('/', dashboardRoute);

// When a new client connects via Socket.IO
io.on('connection', (socket) => {
  console.log('✅ A client connected');

  // Send system stats every second
  const interval = setInterval(() => {
    const totalMemory = os.totalmem();   // Total memory in bytes
    const freeMemory = os.freemem();     // Free memory in bytes
    const uptime = os.uptime();          // Uptime in seconds

    // Send the stats to the client
    socket.emit('system-stats', {
      totalMemory,
      freeMemory,
      uptime
    });
  }, 1000);

  // Stop the interval if the client disconnects
  socket.on('disconnect', () => {
    console.log('❌ A client disconnected');
    clearInterval(interval);
  });
});


//start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
