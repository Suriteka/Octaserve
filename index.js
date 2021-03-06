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
let iPad = null;

const io = socketIO(server);

io.on('connection', function (socket) {

    /* Nous récupérons les bons identifiants pour envoyer au bonnes personne le flux, et pas en broadcast */
    socket.on('clientTv', () => {
        console.log("Connexion de la télévision");
        clientTv = socket.id;
        io.to(`${clientTv}`).emit('connectedTV', 'Hello television');
    });

    socket.on('userPhone', () => {
        console.log("Connexion du téléphone de l'utilisateur");
        userPhone = socket.id;
        io.to(`${userPhone}`).emit('connectedUser', 'Hello téléphone');
        io.to(`${clientTv}`).emit('startIntroduction', true);
    });

    socket.on('dronePhone', () => {
        console.log("Connexion du téléphone connecté au drone");
        dronePhone = socket.id;
        io.to(`${dronePhone}`).emit('connectedDrone', 'Hello drone');
    });

    socket.on('iPad', () => {
        console.log("Connexion de l'iPad");
        iPad = socket.id;
    });

    /* Sending video */
    socket.on('sendVideo', (data) => {
        io.to(`${iPad}`).emit('video', data);
    })

    /* Events send to screens between User Phone and Screen */
    socket.on('lookAtScreen', () => {
        // io.sockets.connected[clientTv].emit('lookAtScreen', true);
        io.to(`${clientTv}`).emit('lookAtScreen', true);

    });

    socket.on('isereView', () => {
        io.to(`${clientTv}`).emit('isereView', true);
    });
    socket.on('isereViewToUsePhone', () => {
        io.to(`${clientTv}`).emit('isereViewToUsePhone', true);
    });
    socket.on('useHeadPhone', () => {
        io.to(`${clientTv}`).emit('useHeadPhone', true);
    });
    socket.on('isereNextView', () => {
        io.to(`${clientTv}`).emit('isereNextView', true);
    });
    socket.on('isereHasRead', () => {
       io.to(`${userPhone}`).emit('isereHasRead', true);
   });
    socket.on('movingIntroduction', () => {
        io.to(`${clientTv}`).emit('movingIntroduction', true);
    });
    socket.on('turnIntroduction', () => {
        io.to(`${clientTv}`).emit('turnIntroduction', true);
    });
    socket.on('upIntroduction', () => {
        io.to(`${clientTv}`).emit('upIntroduction', true);
    });
    socket.on('stopIntroduction', () => {
        io.to(`${clientTv}`).emit('stopIntroduction', true);
    });
    socket.on('understandIntroductionOne', () => {
        io.to(`${clientTv}`).emit('understandIntroductionOne', true);
    });
    socket.on('understandIntroductionTwo', () => {
        io.to(`${clientTv}`).emit('understandIntroductionTwo', true);
    });
    socket.on('letsGoIntroduction', () => {
        io.to(`${clientTv}`).emit('letsGoIntroduction', true);
    });
    socket.on('chooseLandscape', (data) => {
        io.to(`${clientTv}`).emit('chooseLandscape', data);
    });
    socket.on('confirmLandscape', () => {
        io.to(`${clientTv}`).emit('confirmLandscape', true);
    });
    socket.on('closeLandscape', () => {
        io.to(`${clientTv}`).emit('closeLandscape', true);
    });
    socket.on('loadDrone', () => {
        io.to(`${clientTv}`).emit('loadDrone', true);
    });
    socket.on('startDrone', () => {
        console.log("Start Drone");
        io.emit('startDrone', true);
    });
    socket.on('readTuto', () => {
        io.to(`${clientTv}`).emit('readTuto', true);
    });
    socket.on('startDroneView', () => {
        console.log("Start Drone View");
        io.emit('startDroneView', true);
    });
    socket.on('landingDrone', () => {
        console.log("Landing drone");
        io.emit('stopDrone', true);
        io.emit('stopDroneView', true);
    });
    socket.on('sendGyro', (data) => {
        io.to(`${iPad}`).emit('sendGyro', data);
        io.to(`${dronePhone}`).emit('sendGyro', data);
    })
  
    socket.on('battery', (data) => {
      io.to(`${iPad}`).emit('battery', data);
    });

    socket.on('disconnect', function () {
        // if (clientTv === socket.id) {
        //     clientTv = null
        // }
    });
});
