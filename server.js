const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/bls', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bls.html'));
});

io.on('connection', (socket) => {
    socket.on('updateSettings', (settings) => {
        io.emit('updateSettings', settings);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
