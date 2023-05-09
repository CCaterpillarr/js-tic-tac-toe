const resetButton = document.querySelector(".resetButton");
resetButton.addEventListener("click", reset);
function reset() {
	location.reload(true);
}

const playSection = document.querySelector("#playSection");

const battlefield = {
	tile1: "",
	tile1State: "",
	tile2: "",
	tile2State: "",
	tile3: "",
	tile3State: "",
	tile4: "",
	tile4State: "",
	tile5: "",
	tile5State: "",
	tile6: "",
	tile6State: "",
	tile7: "",
	tile7State: "",
	tile8: "",
	tile8State: "",
	tile9: "",
	tile9State: "",
	gameState: "inProgress",
	playerClickAllowed: 1,
};

function createGame() {
	const flexContainer = document.createElement("div");
	flexContainer.classList.toggle("flexContainer");
	playSection.appendChild(flexContainer);

	let lastPlayerTile;
	let lastCpuTile;

	for (let i = 1; i <= 9; i++) {
		let tile = document.createElement("div");
		tile.classList.toggle("tile");
		if (i === 4 || i === 5 || i === 6 || i === 7 || i === 8 || i === 9) {
			tile.classList.toggle("topBorder");
		}
		if (i === 1 || i == 4 || i === 7 || i === 2 || i === 5 || i === 8) {
			tile.classList.toggle("sideBorder");
		}
		tile.number = i;
		flexContainer.appendChild(tile);
		tile.addEventListener("click", function () {
			if (
				battlefield.playerClickAllowed === 1 &&
				battlefield[`tile${event.target.number}State`] === "" &&
				battlefield.gameState === "inProgress"
			) {
				battlefield.playerClickAllowed = 0;
				battlefield[`tile${event.target.number}`].textContent = "X";
				battlefield[`tile${event.target.number}State`] = "X";
				lastPlayerTile = event.target.number;

				checkForWin();

				if (battlefield.gameState === "inProgress") {
					lastCpuTile = cpuChoice(lastPlayerTile, lastCpuTile); // runs cpuChoice and sets lastCpuTile
					checkForWin();
				}
			}
		});
		battlefield[`tile${i}`] = tile;
	}
}

function cpuChoice(lastPlayerTile, lastCpuTile) {
	while (1) {
		let strategyRoll = Math.floor(Math.random() * 100 + 1);
		let target;
		if (strategyRoll <= 33) {
			target = lastPlayerTile;
		} else {
			target = lastCpuTile;
		}
		let random = cpuTileRoll(target);

		if (battlefield[`tile${random}State`] === "") {
			battlefield[`tile${random}`].textContent = "O";
			battlefield[`tile${random}State`] = "O";
			return random;
		}
	}
}
function cpuTileRoll(target) {
	let random;
	let direction = Math.floor(Math.random() * 3 + 1);
	switch (target) {
		case 1:
			switch (direction) {
				case 1:
					random = 2;
					break;
				case 2:
					random = 4;
					break;
				case 3:
					random = 5;
					break;
				default:
					random = Math.floor(Math.random() * 9 + 1);
			}
			break;
		case 2:
			switch (direction) {
				case 1:
					random = 1;
					break;
				case 2:
					random = 3;
					break;
				case 3:
					random = 5;
					break;
				default:
					random = Math.floor(Math.random() * 9 + 1);
			}
			break;
		case 3:
			switch (direction) {
				case 1:
					random = 2;
					break;
				case 2:
					random = 5;
					break;
				case 3:
					random = 6;
					break;
				default:
					random = Math.floor(Math.random() * 9 + 1);
			}
			break;
		case 4:
			switch (direction) {
				case 1:
					random = 1;
					break;
				case 2:
					random = 5;
					break;
				case 3:
					random = 7;
					break;
				default:
					random = Math.floor(Math.random() * 9 + 1);
			}
			break;
		case 5:
			random = Math.floor(Math.random() * 9 + 1);
			break;
		case 6:
			switch (direction) {
				case 1:
					random = 3;
					break;
				case 2:
					random = 5;
					break;
				case 3:
					random = 9;
					break;
				default:
					random = Math.floor(Math.random() * 9 + 1);
			}
			break;
		case 7:
			switch (direction) {
				case 1:
					random = 4;
					break;
				case 2:
					random = 5;
					break;
				case 3:
					random = 8;
					break;
				default:
					random = Math.floor(Math.random() * 9 + 1);
			}
			break;
		case 8:
			switch (direction) {
				case 1:
					random = 7;
					break;
				case 2:
					random = 5;
					break;
				case 3:
					random = 9;
					break;
				default:
					random = Math.floor(Math.random() * 9 + 1);
			}
			break;
		case 9:
			switch (direction) {
				case 1:
					random = 8;
					break;
				case 2:
					random = 5;
					break;
				case 3:
					random = 6;
					break;
				default:
					random = Math.floor(Math.random() * 9 + 1);
			}
			break;
		default:
			random = Math.floor(Math.random() * 9 + 1);
	}

	return random;
}

//easy mode
/* function cpuChoice(lastPlayerTile, lastCpuTile) {
	let random;
	let tileHit = false;
	while (tileHit === false) {
		random = Math.floor(Math.random() * 9 + 1);
		if (battlefield[`tile${random}State`] === "") {
			battlefield[`tile${random}`].textContent = "O";
			battlefield[`tile${random}State`] = "O";
			tileHit = true;
		}
	}
	return random;
} */

function checkForWin() {
	let result;
	if (
		(battlefield.tile1State === "X" && //	1 2 3
			battlefield.tile2State === "X" &&
			battlefield.tile3State === "X") ||
		(battlefield.tile4State === "X" && //	4 5 6
			battlefield.tile5State === "X" &&
			battlefield.tile6State === "X") ||
		(battlefield.tile7State === "X" && //	7 8 9
			battlefield.tile8State === "X" &&
			battlefield.tile9State === "X") ||
		(battlefield.tile1State === "X" && //	1 4 7
			battlefield.tile4State === "X" &&
			battlefield.tile7State === "X") ||
		(battlefield.tile2State === "X" && //	2 5 8
			battlefield.tile5State === "X" &&
			battlefield.tile8State === "X") ||
		(battlefield.tile3State === "X" && //	3 6 9
			battlefield.tile6State === "X" &&
			battlefield.tile9State === "X") ||
		(battlefield.tile1State === "X" && //	1 5 9
			battlefield.tile5State === "X" &&
			battlefield.tile9State === "X") ||
		(battlefield.tile3State === "X" && //	3 5 7
			battlefield.tile5State === "X" &&
			battlefield.tile7State === "X")
	) {
		result = "player won";
		concludeGame(result);
	} else if (
		(battlefield.tile1State === "O" && //	1 2 3
			battlefield.tile2State === "O" &&
			battlefield.tile3State === "O") ||
		(battlefield.tile4State === "O" && //	4 5 6
			battlefield.tile5State === "O" &&
			battlefield.tile6State === "O") ||
		(battlefield.tile7State === "O" && //	7 8 9
			battlefield.tile8State === "O" &&
			battlefield.tile9State === "O") ||
		(battlefield.tile1State === "O" && //	1 4 7
			battlefield.tile4State === "O" &&
			battlefield.tile7State === "O") ||
		(battlefield.tile2State === "O" && //	2 5 8
			battlefield.tile5State === "O" &&
			battlefield.tile8State === "O") ||
		(battlefield.tile3State === "O" && //	3 6 9
			battlefield.tile6State === "O" &&
			battlefield.tile9State === "O") ||
		(battlefield.tile1State === "O" && //	1 5 9
			battlefield.tile5State === "O" &&
			battlefield.tile9State === "O") ||
		(battlefield.tile3State === "O" && //	3 5 7
			battlefield.tile5State === "O" &&
			battlefield.tile7State === "O")
	) {
		result = "player lost";
		concludeGame(result);
	} else if (
		battlefield.tile1State !== "" &&
		battlefield.tile2State !== "" &&
		battlefield.tile3State !== "" &&
		battlefield.tile4State !== "" &&
		battlefield.tile5State !== "" &&
		battlefield.tile6State !== "" &&
		battlefield.tile7State !== "" &&
		battlefield.tile8State !== "" &&
		battlefield.tile9State !== ""
	) {
		result = "draw";
		concludeGame(result);
	} else {
		battlefield.playerClickAllowed = 1;
	}
}

const header = document.querySelector(".header");
const announcement = document.createElement("p");
announcement.classList.toggle("announcement");

/* const redLine = document.createElement("div");
redLine.classList.toggle("redLine");
playSection.appendChild(redLine); */

function concludeGame(result) {
	if (result === "player won") {
		battlefield.gameState = "playerWon";
		announcement.textContent = "You won.";
		header.appendChild(announcement);
	} else if (result === "player lost") {
		battlefield.gameState = "playerLost";
		announcement.textContent = "You lost.";
		header.appendChild(announcement);
	} else {
		battlefield.gameState = "draw";
		announcement.textContent = "Draw.";
		header.appendChild(announcement);
	}
	const veil = document.createElement("div");
	playSection.appendChild(veil);
	veil.classList.toggle("veil");
}

createGame();
