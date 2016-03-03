var connectUri =
    window.location.protocol + '//' +
    window.location.hostname + ':3000';
var socket = io.connect(
    connectUri
);

socket.on('playerTurn', function(msg) {
    console.log(msg);
});

socket.on(
    'playerSet',
    function(data) {
        player = data.player;
        console.log('You are player ' + player);
    }
);

sendPieceMoved = function(position) {
    console.log('Emitting playerMove');

    socket.emit(
        'playerMove',
        {
            playerActor: player,
            move: position
        }
    );
}

socket.on(
    'playerMove',
    function(data) {
        console.log(data);
        placePiece(data.move, true);
        currentPlayer = 3 - currentPlayer;
    }
);

socket.on(
    'connect',
    function() {
        console.log('Connected!');
    }
);
