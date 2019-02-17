const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 5000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


let clientTv = null;
let userPhone = null;
let dronePhone = null;

const io = socketIO(server);

io.on('connection', function (socket) {

    /* Nous récupérons les bons identifiants pour envoyer au bonnes personne le flux, et pas en broadcast */
    socket.on('connectionTv', () => {
        console.log("Connexion de la télévision");
        clientTv = socket.id;
        io.to(`${clientTv}`).emit('connection', 'Hello television');
    });

    socket.on('userPhone', () => {
        console.log("Connexion du téléphone de l'utilisateur");
        userPhone = socket.id;
        io.to(`${userPhone}`).emit('connection', 'Hello téléphone');
    });

    socket.on('dronePhone', () => {
        console.log("Connexion du téléphone connecté au drone");
        dronePhone = socket.id;
        io.to(`${dronePhone}`).emit('connection', 'Hello drone');
    });


    /* */
    socket.on('scanQrCode', () => {
        console.log("SCAN");
        userPhone = socket.id;
        // io.sockets.connected[clientTv].emit('startIntroduction', true);
        io.emit('startIntroduction', true);
    });


    socket.on('lookAtScreen', () => {
        // io.sockets.connected[clientTv].emit('lookAtScreen', true);
        io.emit('lookAtScreen', true);

    });

    socket.on('isereView', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('isereView', true);
    });
    socket.on('movingIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('movingIntroduction', true);
    });
    socket.on('turnIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('turnIntroduction', true);
    });
    socket.on('upIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('upIntroduction', true);
    });
    socket.on('stopIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('stopIntroduction', true);
    });
    socket.on('understandIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('understandIntroduction', true);
    });

    socket.on('understandIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('understandIntroduction', true);
    });
    socket.on('letsGoIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('letsGoIntroduction', true);
    });
    socket.on('letsGoIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('letsGoIntroduction', true);
    });

    socket.on('letsGoIntroduction', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('letsGoIntroduction', true);
    });
    socket.on('chooseLandscape', (data) => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('chooseLandscape', data);
    });
    socket.on('confirmLandscape', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('confirmLandscape', true);
    });
    socket.on('closeLandscape', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('closeLandscape', true);
    });
    socket.on('loadDrone', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('loadDrone', true);
    });

    socket.on('startDrone', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('startDrone', true);
    });

    socket.on('stopByUserDrone', () => {
        // io.sockets.connected[clientTv].emit('isereView', true);
        io.emit('stopByUserDrone', true);
    });

    socket.on('disconnect', function () {
        // if (clientTv === socket.id) {
        //     clientTv = null
        // }
    });
});