export default (socket) => {
    console.log('connected user');
    socket.emit('messages', 'user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
    });
}