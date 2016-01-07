/**
 * Created by wolfy on 1/5/2016.
 */
var playerOneName = "Player 1";
var playerTwoName = "Player 2";
var playerOneChar = "X";
var playerTwoChar = "O";
var playerOneTurn = true;
var gameEnded = false;

var fieldCells = fieldCells =
    [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

function beginGame() {
    populateCellElements();
    playerOneTurn = true;
}

function populateCellElements() {
    var cellElementName = "";
    var rowsCount = fieldCells.length;
    var colsCount = fieldCells[0].length;

    for (var row = 0; row < rowsCount; row++) {
        for (var col = 0; col < colsCount; col++) {
            cellElementName = "cell-" + row.toString() + col.toString();
            document.getElementById(cellElementName).innerHTML = fieldCells[row][col];
        }
    }
}

function cellClickEvent(elementId) {
    if (gameEnded) {
        return;
    }

    var rowCol = getRowAndColFromString(elementId);
    setCellCharacter(rowCol, playerOneChar);
    checkWinCondition(rowCol);
    playerTwoAction();
}

function playerTwoAction() {
    var rowCol = generateRowCol();
    setCellCharacter(rowCol, playerTwoChar);
    checkWinCondition(rowCol);
}

function generateRowCol() {

    var row = getRandomArbitrary(fieldCells.length - 1);
    var col = getRandomArbitrary(fieldCells[0].length - 1);

    if (cellIsEmpty(fieldCells[row][col])) {
        return [row, col];
    } else {
        return generateRowCol();
    }
}

function getRandomArbitrary(max) {
    var x = Math.floor((Math.random() * max));
    return x;
}

function getRowAndColFromString(elementId) {
    var result = new Array(2);
    result[0] = getRowFromString(elementId);
    result[1] = getColFromString(elementId);

    return result;
}

function getRowFromString(elementId) {
    return elementId[elementId.length - 2];
}

function getColFromString(elementId) {
    return elementId[elementId.length - 1];
}

function setCellCharacter(rowCol, char) {
    var row = rowCol[0];
    var col = rowCol[1];
    var cell = fieldCells[row][col];

    if (cellIsEmpty(cell)) {
        fieldCells[row][col] = char;
        populateCellElements();
    }
}

function cellIsEmpty(cell) {
    return cell == null;
}

function checkWinCondition(rowCol) {
    var row = rowCol[0];
    var col = rowCol[1];
    var char = fieldCells[row][col];
    if (hasWon(char)) {
        endGame();
    }
}

function hasWon(char) {
    return checkVertical(char) ||
        checkHorizontal(char) ||
        checkDiagonal(char);
}

function checkVertical(char) {
    for (var col = 0; col < fieldCells[0].length; col++) {
        var firstElement = fieldCells[0][col];
        var secondElement = fieldCells[1][col];
        var thirdElement = fieldCells[2][col];

        if (firstElement == char && secondElement == char && thirdElement == char) {
            changeColor([0, col], [1, col], [2, col]);
            return true;
        }
    }

    return false;
}

function checkHorizontal(char) {
    for (var row = 0; row < fieldCells.length; row++) {
        var firstElement = fieldCells[row][0];
        var secondElement = fieldCells[row][1];
        var thirdElement = fieldCells[row][2];

        if (firstElement == char && secondElement == char && thirdElement == char) {
            changeColor([row, 0], [row, 1], [row, 2]);
            return true;
        }
    }

    return false;
}

function checkDiagonal(char) {
    return checkRightDiagonal(char) || checkLeftDiagonal(char);
}

function checkRightDiagonal(char) {
    var firstElement = fieldCells[0][0];
    var secondElement = fieldCells[1][1];
    var thirdElement = fieldCells[2][2];

    if (firstElement == char && secondElement == char && thirdElement == char) {
        changeColor([0, 0], [1, 1], [2, 2]);
        return true;
    }
}

function checkLeftDiagonal(char) {
    var firstElement = fieldCells[0][2];
    var secondElement = fieldCells[1][1];
    var thirdElement = fieldCells[2][0];

    if (firstElement == char && secondElement == char && thirdElement == char) {
        changeColor([0, 2], [1, 1], [2, 0]);
        return true;
    }
}

function changeColor(arrayOne, arrayTwo, arrayThree) {
    var firstElement = "cell-" + arrayOne[0].toString() + arrayOne[1].toString();
    var secondElement = "cell-" + arrayTwo[0].toString() + arrayTwo[1].toString();
    var thirdElement = "cell-" + arrayThree[0].toString() + arrayThree[1].toString();

    document.getElementById(firstElement).style.color = "green";
    document.getElementById(secondElement).style.color = "green";
    document.getElementById(thirdElement).style.color = "green";
}

function endGame() {
    //var playerWon = playerOneTurn ? playerOneName : playerTwoName;
    alert("You won!");
    document.location.href = "game-win-page.html";
}