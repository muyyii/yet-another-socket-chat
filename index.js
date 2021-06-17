const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');
	let address = socket.handshake.address;
	console.log('socket ID: ' + socket.id);
	console.log('url from: ' + socket.handshake.url);
	console.log('New connection from ' + address.address + ':' + address.port);
	socket.on('disconnect', () => {
		console.log('user with ID: ' + socket.id + ' disconnected');
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
