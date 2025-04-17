function formatBytes(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }
  
  function formatSeconds(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  }
  
  function updateStats() {
    const stats = window.sysStats.getStats();
  
    document.getElementById('totalMem').textContent = formatBytes(stats.totalMemory);
    document.getElementById('freeMem').textContent = formatBytes(stats.freeMemory);
    document.getElementById('uptime').textContent = formatSeconds(stats.uptime);
  }
  
  // Update every second
  setInterval(updateStats, 1000);
  updateStats();
  