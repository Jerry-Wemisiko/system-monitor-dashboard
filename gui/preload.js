// preload.js
const { contextBridge } = require('electron');
const io = require('socket.io-client');

// Connect to the backend server
const socket = io('http://localhost:3000'); // Ensure this matches your backend's address and port

socket.on('connect', () => {
    console.log('Connected to backend');
  });
  
  socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
  });
  

// Expose the socket to the renderer process
contextBridge.exposeInMainWorld('api', {
  onSystemStats: (callback) => socket.on('system-stats', callback),
  requestStats: () => socket.emit('get-stats'),
});
