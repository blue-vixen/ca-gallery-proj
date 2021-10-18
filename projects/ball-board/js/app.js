var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img src="img/glue.png" />'

var gBoard;
var gGamerPos;
var gBallsCreated;
var gBallsCollected;
var gIntervalBall;
var gIntervalGlue;
var isGlued = false;

var audioBall = new Audio('collect.wav');
var audioGlue = new Audio('glue.mp3');
var audioUnglue = new Audio('unglue.mp3');
function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gBallsCreated = 2;
	gBallsCollected = 0;
	gIntervalBall = setInterval(createRandomBall, 3000);
	gIntervalGlue = setInterval(createRandomGlue, 5000);
}

function restartGame() {
	document.querySelector(".modal").style.display = "none";
	document.querySelector("h2 span").innerHTML = 0;
	initGame();
}

function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}
	//Create passages
	board[0][5].type = FLOOR;
	board[5][0].type = FLOOR;
	board[9][5].type = FLOOR;
	board[5][11].type = FLOOR;

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	// console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			//DONE! change to short if statement
			// if (currCell.type === FLOOR) cellClass += ' floor';
			// else if (currCell.type === WALL) cellClass += ' wall';

			cellClass += (currCell.type === FLOOR) ? ' floor ' : cellClass += ' wall ';

			//Change To template string
			// strHTML += '\t<td class="cell ' + cellClass +
			// 	'"  onclick="moveTo(' + i + ',' + j + ')" >\n';
			strHTML += `\t<td class ="cell ${cellClass}" on click="moveTo(${i},${j})">\n`

			// TODO - change to switch case statement
			switch (currCell.gameElement) {
				case GAMER:
					strHTML += GAMER_IMG;
					break;
				case BALL:
					strHTML += BALL_IMG;
					break;

			}

			// if (currCell.gameElement === GAMER) {
			// 	strHTML += GAMER_IMG;
			// } else if (currCell.gameElement === BALL) {
			// 	strHTML += BALL_IMG;
			// }

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	if (isGlued) return;

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);


	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0)
		|| (jAbsDiff === 1 && iAbsDiff === 0)
		|| (jAbsDiff === 11 && iAbsDiff === 0)
		|| (jAbsDiff === 0 && iAbsDiff === 9)) {

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			gBallsCollected++
			updateScore(gBallsCollected);
			checkVictory();
			audioBall.play();

		} else if (targetCell.gameElement === GLUE) {
			console.log('GLUED!');
			isGlued = true;
			audioGlue.play();
			GAMER_IMG = '<img src="img/gamer-purple.png" />';
			setTimeout(function () {
				isGlued = false
				GAMER_IMG = '<img src="img/gamer.png" />'
				renderCell(gGamerPos, GAMER_IMG);
				audioUnglue.play();
			}, 3000);
		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

function updateScore(score) {
	document.querySelector("h2 span").innerText = score;
}

function checkVictory() {
	if (gBallsCollected === gBallsCreated) {
		document.querySelector(".modal").style.display = "block";
		clearInterval(gIntervalBall);
		clearInterval(gIntervalGlue);
	}
}

function getEmptyCells(board) {
	var res = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			var currCell = board[i][j];
			currCell.i = i;
			currCell.j = j;
			if (currCell.type !== WALL && !currCell.gameElement) {
				res.push(currCell);
			}
		}
	}
	// console.log(res);
	return res;
}

function createRandomBall() {
	var emptyCells = getEmptyCells(gBoard);
	if (!emptyCells.length) return;
	var randomCell = emptyCells[getRandomInt(0, emptyCells.length)];
	var randomCellPos = { i: randomCell.i, j: randomCell.j };
	//Update the model
	gBoard[randomCell.i][randomCell.j].gameElement = BALL;
	//Render the cell
	renderCell(randomCellPos, BALL_IMG);
	gBallsCreated++

}

function createRandomGlue() {
	var emptyCells = getEmptyCells(gBoard);
	if (!emptyCells.length) return;
	var randomCell = emptyCells[getRandomInt(0, emptyCells.length)];
	var randomCellPos = { i: randomCell.i, j: randomCell.j };
	//Update the model
	gBoard[randomCell.i][randomCell.j].gameElement = GLUE;
	//Render the DOM
	renderCell(randomCellPos, GLUE_IMG);
	setTimeout(clearGlue, 3000, randomCell);

}

function clearGlue(randCell) {
	if (gBoard[randCell.i][randCell.j].gameElement !== GAMER) {
		gBoard[randCell.i][randCell.j].gameElement = null;
		renderCell(randCell, '');
	}
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			if (j === 0) moveTo(i, gBoard[0].length - 1);
			else moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			if (j === gBoard[0].length - 1) moveTo(i, 0);
			else moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			if (i === 0) moveTo(gBoard.length - 1, j);
			else moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			if (i === gBoard.length - 1) moveTo(0, j);
			else moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}
