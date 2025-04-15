const socket = io();

setInterval(() => {
    //get system stats from server
    const stats ={
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        uptime: os.uptime()
    };
    //emit stats to server
    socket.emit('system-stats', stats);
}, 1000);
