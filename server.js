const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/bls', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'emdr-bls.html'));
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('updateSettings', (settings) => {
        console.log('Settings received:', settings);
        io.emit('updateSettings', settings);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
