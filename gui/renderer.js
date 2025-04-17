// renderer.js

// Function to format bytes to a more readable format
function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / (1024 ** i)).toFixed(2)} ${sizes[i]}`;
  }
  
  // Function to format uptime in HH:MM:SS
  function formatUptime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  }
  
  // Listen for system stats from the backend
  window.api.onSystemStats((data) => {
    document.getElementById('totalMem').textContent = formatBytes(data.totalMemory);
    document.getElementById('freeMem').textContent = formatBytes(data.freeMemory);
    document.getElementById('uptime').textContent = formatUptime(data.uptime);
  });
  window.api.onSystemStats((data) => {
    console.log('Received system stats:', data);
    // Update DOM elements here
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    window.api.requestStats();
  });
  
  // Request system stats when the DOM is fully loaded
  window.addEventListener('DOMContentLoaded', () => {
    window.api.requestStats();
  });
  