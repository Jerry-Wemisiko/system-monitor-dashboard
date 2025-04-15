const si = require('systeminformation');
const axios = require('axios');

// The URL of your deployed server to receive stats
const serverUrl = 'http://localhost:3000/stats'; // Replace with your server URL once deployed

// Define the function to get stats and send to the server
async function getStatsAndSend() {
  try {
    console.log('Fetching system stats...');

    // Log available methods in systeminformation
    console.log(Object.keys(si));

    // Get system stats
    const memory = await si.mem();
    const osInfo = await si.osInfo();  // Get OS info which includes uptime

    // Log the stats to verify if they are being fetched
    console.log('Memory Stats:', memory);
    console.log('OS Info:', osInfo);

    // Extract uptime from osInfo
    const uptime = osInfo.uptime;

    const systemStats = {
      totalMemory: memory.total,
      freeMemory: memory.free,
      uptime: uptime,
    };

    // Log the system stats to verify that we're sending the correct data
    console.log('System Stats to be sent:', systemStats);

    // Send stats to the server
    await axios.post(serverUrl, systemStats);
    console.log('Stats sent successfully');
  } catch (error) {
    console.error('Error getting or sending system stats:', error);
  }
}

// Export the function so it can be required and used in other files
module.exports = {
  getStatsAndSend,
};

// Run the stats function every minute (or adjust as needed)
setInterval(getStatsAndSend, 60000); // Send stats every minute
