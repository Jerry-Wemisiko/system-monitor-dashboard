const os = require('os');

window.sysStats = {
  getStats: () => {
    return {
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      uptime: os.uptime()
    };
  }
};
