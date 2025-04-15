// Import required modules
const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const os = require('os');

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
const dashboardRoute = require('./routes/dashboard');
app.use('/', dashboardRoute);

// Middleware to parse JSON bodies
app.use(express.json()); // Required to handle POST requests with JSON data

// Handle socket connection and system stats emission
io.on('connection', (socket) => {
    console.log('✅ A client connected');

    // Emit system stats to the connected user (client's system stats)
    const interval = setInterval(() => {
        const totalMemory = os.totalmem();   // Total memory in bytes
        const freeMemory = os.freemem();     // Free memory in bytes
        const uptime = os.uptime();          // Uptime in seconds

        // Send the stats to the client via socket
        socket.emit('system-stats', {
            totalMemory,
            freeMemory,
            uptime
        });
    }, 1000); // Emit stats every 1 second

    // Listen for the 'get-stats' event from the client
    socket.on('get-stats', () => {
        const totalMemory = os.totalmem();   // Total memory in bytes
        const freeMemory = os.freemem();     // Free memory in bytes
        const uptime = os.uptime();          // Uptime in seconds

        // Send the stats to the client immediately after they requested it
        socket.emit('system-stats', {
            totalMemory,
            freeMemory,
            uptime
        });
    });

    // Stop the interval if the client disconnects
    socket.on('disconnect', () => {
        console.log('❌ A client disconnected');
        clearInterval(interval);
    });
});

// POST route to handle stats from the agent (Optional)
app.post('/stats', (req, res) => {
    const stats = req.body;
    console.log('Received system stats:', stats);

    // Respond with a confirmation
    res.status(200).json({ message: 'Stats received successfully' });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
