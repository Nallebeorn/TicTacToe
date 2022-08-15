console.log("*** TIC TAC TOE ***");

class BoardCell
{
    occupant: number = 0;
    domElement?: HTMLElement;
}

const boardSize = 3;
const boardState: BoardCell[] = [];

let whoseTurn = 1;

let winsCounter: { [player: number]: number } = { "-1": 0, "0": 0, "1": 0 };

initialize();

function initialize()
{
    const boardDom = document.getElementById("game-board-container");

    if (!boardDom?.children) return;

    let x = 0;
    let y = 0;

    for (let cell of boardDom?.children)
    {
        const boardCell: BoardCell = { occupant: 0, domElement: cell as HTMLElement };
        if (x++ >= boardSize)
        {
            x = 0;
            y++;
        }
        boardState.push(boardCell);
        cell.addEventListener("click", (event) =>
        {
            console.log("click");
            event.stopPropagation();
            onClickCell(boardCell)
        });
    }

    let loadedData = window.localStorage.getItem("tictactoe-win-stats");
    if (loadedData)
    {
        winsCounter = JSON.parse(loadedData) as any;
        updateWinStatsText();
    }
}

function restartGame()
{
    whoseTurn = 1;

    for (let cell of boardState)
    {
        if (cell.occupant !== 0)
        {
            getMarkerElement(cell).style.backgroundSize = "0%";
            cell.occupant = 0;
        }
        document.getElementById("winner-container")!.style.transform = "scale(0)";
    }
}

function onClickCell(cell: BoardCell)
{
    if (whoseTurn !== 0 && cell.occupant === 0)
    {
        cell.occupant = whoseTurn;
        getMarkerElement(cell).style.backgroundSize = "100%";

        let winner = findWinner();
        if (winner != 0)
        {
            endGame("Winner: ", "./" + getCssClassOfPlayer(winner) + ".png", winner);
        }
        else if (isBoardFull())
        {
            endGame("Tie!", "", winner);
        }

        whoseTurn = -whoseTurn;
    }
}

function endGame(winnerText: string, iconUrl: string, winner: number)
{
    console.log("end game")
    winsCounter[winner]++;
    window.localStorage.setItem("tictactoe-win-stats", JSON.stringify(winsCounter));
    whoseTurn = 0;
    document.getElementById("winner-text")!.innerText = winnerText;
    let icon = document.getElementById("winner-icon") as HTMLImageElement;
    icon.src = iconUrl
    document.getElementById("winner-container")!.style.transform = "scale(1)";
    document.getElementById("rematch-button")?.addEventListener("click", () => restartGame(), { once: true });
    updateWinStatsText();
}

function updateWinStatsText()
{
    document.getElementById("circle-stats")!.innerText = winsCounter[1].toString();
    document.getElementById("cross-stats")!.innerText = winsCounter[-1].toString();
    document.getElementById("tie-stats")!.innerText = winsCounter[0].toString();
}

function getCellAt(x: number, y: number)
{
    return boardState[x + y * boardSize];
}

function getMarkerElement(cell: BoardCell): HTMLElement
{
    return cell.domElement?.getElementsByClassName(getCssClassOfPlayer(cell.occupant))[0] as HTMLElement;
}

function getCssClassOfPlayer(player: number): string
{
    if (player > 0) return "circle";
    else if (player < 0) return "cross";
    else return "";
}

function findWinner(): number
{
    for (let y = 0; y < boardSize; y++)
    {
        let winner = findRowWinner(y);
        if (winner != 0) return winner;
    }

    for (let x = 0; x < boardSize; x++)
    {
        let winner = findColumnWinner(x);
        if (winner != 0) return winner;
    }

    let winner = findDiagonalBackslashWinner();
    if (winner != 0) return winner;

    winner = findDiagonalSlashWinner();
    if (winner != 0) return winner;

    return 0;
}

function findRowWinner(y: number): number
{
    let score = 0;
    for (let x = 0; x < boardSize; x++)
    {
        score += getCellAt(x, y).occupant;
    }

    if (score === boardSize) return 1;
    else if (score === -boardSize) return -1;

    return 0;
}

function findColumnWinner(x: number): number
{
    let score = 0;
    for (let y = 0; y < boardSize; y++)
    {
        score += getCellAt(x, y).occupant;
    }

    if (score === boardSize) return 1;
    else if (score === -boardSize) return -1;

    return 0;
}

function findDiagonalBackslashWinner(): number
{
    let score = 0;
    for (let d = 0; d < boardSize; d++)
    {
        score += getCellAt(d, d).occupant;
    }

    if (score === boardSize) return 1;
    else if (score === -boardSize) return -1;

    return 0;
}

function findDiagonalSlashWinner(): number
{
    let score = 0;
    for (let d = 0; d < boardSize; d++)
    {
        score += getCellAt(d, boardSize - 1 - d).occupant;
    }

    if (score === boardSize) return 1;
    else if (score === -boardSize) return -1;

    return 0;
}

function isBoardFull(): boolean
{
    for (let x = 0; x < boardSize; x++)
    {
        for (let y = 0; y < boardSize; y++)
        {
            if (getCellAt(x, y).occupant === 0)
            {
                return false;
            }
        }
    }

    return true;
}