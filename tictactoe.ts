console.log("*** TIC TAC TOE ***");

enum Player {
    None,
    Cross,
    Circle,
}

class BoardCell {
    occupant: Player = Player.None;
    domElement?: HTMLElement;
}

const boardSize = 3;
const boardState: BoardCell[] = [];

let whoseTurn = Player.Cross;

initialize();

function initialize() {
    const boardDom = document.getElementById("game-board-container");

    if (!boardDom?.children) return;

    for (let cell of boardDom?.children) {
        const boardCell: BoardCell = { occupant: Player.None, domElement: cell as HTMLElement };
        boardState.push(boardCell);
        cell.addEventListener("click", () => onClickCell(boardCell));
    }
}

function onClickCell(cell: BoardCell) {
    if (cell.occupant == Player.None) {
        cell.occupant = whoseTurn;
        getMarkerElement(cell).style.backgroundSize = "100%";

        whoseTurn = getOppositePlayer(whoseTurn);
    }
}

function getMarkerElement(cell: BoardCell): HTMLElement {
    return cell.domElement?.getElementsByClassName(getClassOfPlayer(cell.occupant))[0] as HTMLElement;
}

function getClassOfPlayer(player: Player): string {
    if (player == Player.Circle) return "circle";
    else if (player == Player.Cross) return "cross";
    else return "";
}

function getOppositePlayer(player: Player) {
    if (player == Player.Circle) return Player.Cross;
    else if (player == Player.Cross) return Player.Circle;
    else return Player.None;
}