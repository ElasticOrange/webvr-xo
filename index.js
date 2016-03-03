var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var player1 = false;
var player1Socket = null;

var player2 = false;
var player2Socket = null;

io.on(
    'connection',
    function(socket) {
        console.log('Player connected');
        var player = 0;

        if (player1 == false) {
            socket.emit(
                'playerSet', {
                    player: 1
                }
            );

            player1 = true;
            player1Socket = socket;
            player = 1;
        } else if (player2 == false) {
            socket.emit(
                'playerSet', {
                    player: 2
                }
            );

            player2 = true;
            player2Socket = socket;
            player = 2;
        } else {
            console.log('Too many players');
        }

        socket.on(
            'playerMove',
            function(data) {
                console.log('playerMove fired');
                console.log(data);

                if (data.playerActor == 1) {
                    player2Socket.emit(
                        'playerMove',
                        data
                    );
                } else if (data.playerActor == 2) {
                    player1Socket.emit(
                        'playerMove',
                        data
                    );
                }
            }
        );
    }
);

io.on('disconnect', function(socket) {
    console.log(socket.metadata);
});

server.listen(3000);
