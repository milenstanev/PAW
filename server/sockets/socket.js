let socketInstance = (io) => {
    io.on('connection', function (socket) {
        socket.on('message', function (data) {
            io.emit('broadcastMsg', data);
        });
    });
}

export default socketInstance;