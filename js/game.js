var scene = document.querySelector('a-scene');
var pieceContainer = document.querySelector('#pieces');

var xMarkTemplateString = document.querySelector('#x-mark-template').innerHTML;
var xMarkTemplate = nunjucks.compile(xMarkTemplateString);

var oMarkTemplateString = document.querySelector('#o-mark-template').innerHTML;
var oMarkTemplate = nunjucks.compile(oMarkTemplateString);

var winnerOneTemplateString = document.querySelector('#winner1').innerHTML;
var winnerTwoTemplateString = document.querySelector('#winner2').innerHTML;
var winnerTemplate = {
    1: nunjucks.compile(winnerOneTemplateString),
    2: nunjucks.compile(winnerTwoTemplateString)
};

var pieceHoverTimer;
var pieceHoverTimeout = 2000;
var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var boardPlaceholderTranslation = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2]
};
var boardPieceCoordinates = {
    1: [-1, 3],
    2: [0, 3],
    3: [1, 3],
    4: [-1, 2],
    5: [0, 2],
    6: [1, 2],
    7: [-1, 1],
    8: [0, 1],
    9: [1, 1]
};
var currentPlayer = 1;
var gameOver = false;

var bindPlaceholderSelect = function(domElement, callback) {
    domElement.addEventListener(
        'mouseenter',
        function() {
            pieceHoverTimer = setTimeout(
                function() {
                    callback(domElement);
                },
                pieceHoverTimeout
            );
        }
    );

    domElement.addEventListener(
        'mouseleave',
        function() {
            clearTimeout(pieceHoverTimer);
        }
    );
}

var placePiece = function(element) {
    var position = element.getAttribute('piecePosition');
    if (checkICanPlacePiece(position)) {
        drawPiece(position);
        markPieceInBoard(position);

        var winner = findWinner(board);
        if (winner) {
            console.log('Winner ' + winner);
            gameOver = true;

            drawWinner(winner);
        }

        currentPlayer = currentPlayer == 1 ? 2 : 1;
    }
}

var drawWinner = function (winner) {
    var winnerRendered = winnerTemplate[winner].render();
    scene.insertAdjacentHTML('beforeend', winnerRendered);
};

var checkICanPlacePiece = function(position) {
    if (gameOver) {
        return false;
    }

    console.log('Coordinates');
    console.log(boardPlaceholderTranslation[position]);
    var coordinates = boardPlaceholderTranslation[position];
    if (board[coordinates[0], coordinates[1]]) {
        return true;
    }

    return false;
}

var drawPiece = function(position) {
    if (currentPlayer == 1) {
        pieceTemplate = xMarkTemplate;
    } else {
        pieceTemplate = oMarkTemplate;
    }

    var coordinates = boardPieceCoordinates[position];

    pieceTemplateRendered = pieceTemplate.render({
        position: (coordinates[0]) + " " + (coordinates[1]) + " " + "0.2"
    });
    scene.insertAdjacentHTML('beforeend', pieceTemplateRendered);
}

var markPieceInBoard = function (position) {
    var coordinates = boardPlaceholderTranslation[position];
    board[coordinates[0]][coordinates[1]] = currentPlayer;
}

var findWinner = function() {
    var winner = false;
    debugger;

    // Horizontal
    if ((board[0][0] == board[0][1]) && (board[0][1] == board[0][2]) && (board[0][0] != 0)) {
        winner = board[0][0];
    }

    if ((board[1][0] == board[1][1]) && (board[1][1] == board[1][2]) && (board[1][0] != 0)) {
        winner = board[1][0];
    }

    if ((board[2][0] == board[2][1]) && (board[2][1] == board[2][2]) && (board[2][0] != 0)) {
        winner = board[2][2];
    }

    // Vertical
    if ((board[0][0] == board[1][0]) && (board[1][0] == board[2][0]) && (board[0][0] != 0)) {
        winner = board[0][0];
    }

    if ((board[0][1] == board[1][1]) && (board[1][1] == board[2][1]) && (board[0][1] != 0)) {
        winner = board[0][1];
    }

    if ((board[0][2] == board[1][2]) && (board[1][2] == board[2][2]) && (board[0][2] != 0)) {
        winner = board[0][2];
    }

    // Diagonals
    if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && (board[0][0] != 0)) {
        winner = board[0][0];
    }

    if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0]) && (board[0][2] != 0)) {
        winner = board[0][2];
    }

    return winner;
}

// Set events
for (var i = 1; i <= 9; i++) {
    bindPlaceholderSelect(
        document.querySelector('#placeholder' + i),
        function(element) {
            placePiece(element);
        }
    );
}
