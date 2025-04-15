const si = require('systeminformation');
const axios = require('axios');

// Server URL — update when deploying
const serverUrl = 'http://localhost:3000/stats'; // Change to public URL when deployed

// Function to gather and send system stats
async function getStatsAndSend() {
  try {
    console.log('Fetching system stats...');

    const mem = await si.mem();
    const os = await si.osInfo();
    const uuid = await si.uuid();

    const systemStats = {
      machineId: uuid.os, // Unique per machine
      hostname: os.hostname,
      totalMemory: mem.total,
      freeMemory: mem.free,
      uptime: process.uptime() // Uptime since agent started
    };

    console.log('[Sending stats] ->', systemStats);

    await axios.post(serverUrl, systemStats);
    console.log('✅ Stats sent successfully');
  } catch (err) {
    console.error('❌ Error getting/sending stats:', err.message);
  }
}

// Run every 60 seconds
setInterval(getStatsAndSend, 60000);

// Also run immediately on startup
getStatsAndSend();
