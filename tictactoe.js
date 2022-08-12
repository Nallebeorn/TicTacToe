"use strict";
console.log("*** TIC TAC TOE ***");
var Player;
(function (Player) {
    Player[Player["None"] = 0] = "None";
    Player[Player["Cross"] = 1] = "Cross";
    Player[Player["Circle"] = 2] = "Circle";
})(Player || (Player = {}));
class BoardCell {
    constructor() {
        this.occupant = Player.None;
    }
}
const boardSize = 3;
const boardState = [];
let whoseTurn = Player.Cross;
initialize();
function initialize() {
    const boardDom = document.getElementById("game-board-container");
    if (!(boardDom === null || boardDom === void 0 ? void 0 : boardDom.children))
        return;
    for (let cell of boardDom === null || boardDom === void 0 ? void 0 : boardDom.children) {
        const boardCell = { occupant: Player.None, domElement: cell };
        boardState.push(boardCell);
        cell.addEventListener("click", () => onClickCell(boardCell));
    }
}
function onClickCell(cell) {
    if (cell.occupant == Player.None) {
        cell.occupant = whoseTurn;
        getMarkerElement(cell).style.backgroundSize = "100%";
        whoseTurn = getOppositePlayer(whoseTurn);
    }
}
function getMarkerElement(cell) {
    var _a;
    return (_a = cell.domElement) === null || _a === void 0 ? void 0 : _a.getElementsByClassName(getClassOfPlayer(cell.occupant))[0];
}
function getClassOfPlayer(player) {
    if (player == Player.Circle)
        return "circle";
    else if (player == Player.Cross)
        return "cross";
    else
        return "";
}
function getOppositePlayer(player) {
    if (player == Player.Circle)
        return Player.Cross;
    else if (player == Player.Cross)
        return Player.Circle;
    else
        return Player.None;
}
