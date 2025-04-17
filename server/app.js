// Import required modules
const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const os = require('os');
const cors = require('cors');

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use dynamic port for Render deployment
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve downloadable agent files
app.use('/downloads', express.static(path.join(__dirname, 'public', 'downloads')));

// Load routes
const dashboardRoute = require('./routes/dashboard');
app.use('/', dashboardRoute);

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('✅ A client connected via Socket.IO');

    const machineId = socket.id;

    // Emit system stats every second
    const interval = setInterval(() => {
        const stats = {
            machineId,
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            uptime: os.uptime(),
        };
        socket.emit('system-stats', stats);
    }, 1000);

    // Allow client to request stats manually
    socket.on('get-stats', () => {
        const stats = {
            machineId,
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            uptime: os.uptime(),
        };
        socket.emit('system-stats', stats);
    });

    socket.on('disconnect', () => {
        console.log('❌ A client disconnected');
        clearInterval(interval);
    });
});

// Endpoint to receive stats from the agent
app.post('/stats', (req, res) => {
    const stats = req.body;
    console.log('📥 Received system stats from agent:', stats);
    res.status(200).json({ message: '✅ Stats received successfully' });

    // You can also emit these stats to a specific frontend user if needed
    // io.emit('system-stats', stats);
});

// Start the server
server.listen(PORT, () => {
    console.log(`✅ Server is live at: http://localhost:${PORT}`);
});
