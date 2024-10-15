const http = require('http');
const express = require('express');
const { Server } = require('colyseus');
const { monitor } = require('@colyseus/monitor');

const MyRoom = require('./MyRoom');

const app = express();
const server = http.createServer(app);
const colyseusServer = new Server({
  server: server,
});

colyseusServer.define('game_room', MyRoom);


colyseusServer.listen(2567);
app.use('/colyseus', monitor());
console.log('Colyseus server is running...');
