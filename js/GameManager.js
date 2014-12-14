angular
	.module('ttt3DApp')
	.factory('GameManager', GameManagerFunc)

GameManagerFunc.$inject = ['$firebase', 'GameSpace', 'GameAlgorithm', 'Player'];

function GameManagerFunc($firebase, GameSpace, GameAlgorithm, Player) {

	var GameManager = function() {
		var self	= this;

		// Create Firebase object for lobby
		self.lobby 				= $firebase(new Firebase("https://t33d.firebaseio.com/Lobby"))
									.$asObject();

		// Create GameSpace and GameAlgorithm objects
		self.gameSpace 			= new GameSpace(3,3,3);
		self.gameAlgorithm 		= new GameAlgorithm(self.gameSpace, 3, 3, 3, 3);

		// Functions and properties to toggle menus
		self.toggleStartMenu	= toggleStartMenu;
		self.toggleGameSpace	= toggleGameSpace;
		self.toggleGameOver		= toggleGameOver;
		self.showStartMenu		= true;
		self.showGameSpace		= false;
		self.showGameOver 		= false;

		// Functions for Start Menu
		self.toggleGameFull		= toggleGameFull;
		self.updatePlayer 		= updatePlayer;
		self.startGame 			= startGame;
 		// self.deletePlayer 		= deletePlayer;

 		// Functions for Game Board
 		self.onSpaceClick 		= onSpaceClick;
		self.gameFull 			= false;

		// Functions and properties for Game Over Menu
		self.theWinner			= "";
		self.playAgain 			= playAgain;


		// When Firebase data is loaded
		self.lobby.$loaded (function(){
			self.lobby.theWinner = "";

			// Init numPlayers if it doesn't exist
			if(self.lobby.numPlayers === undefined) {
				self.lobby.numPlayers = 0;
				self.lobby.$save();
			}
			else {
				self.lobby.numPlayers += 1;
				self.lobby.$save();
			}
		
			// Create player. Use numPlayers as player's ID
		 	self.playerMe	= new Player(self.lobby.numPlayers);
		});


		function toggleStartMenu() {
			if(self.showStartMenu)
				self.showStartMenu = false;
			else
				self.showStartMenu = true;
		}

		function toggleGameSpace() {
			if(self.showGameSpace)
				self.showGameSpace = false;
			else
				self.showGameSpace = true;
		}

		function toggleGameOver() {
						console.log("intoggle")
			if(self.showGameOver)
				self.showGameOver = false;
			else
				self.showGameOver = true;
			console.log(self.showGameOver)
		}


		function updatePlayer() {
			self.playerMe.thisPlayer.$save();
		}


		//////////////////////////////
		// At Start Menu
		//////////////////////////////

		function startGame() {
			// Player ID of lower number starts game
			if(self.playerMe.thisPlayer.playerID < self.playerMe.otherPlayer.playerID) {
				self.playerMe.thisPlayer.playerTurn = true;
				self.playerMe.thisPlayer.$save();
			}
			else {
				self.playerMe.otherPlayer.playerTurn = true;
				self.playerMe.otherPlayer.$save();
			}

			// Switch views
			self.toggleStartMenu();
			self.toggleGameSpace();
		}

		// function deletePlayer() {
		// 	self.playerMe.currentPlayer.$remove();
		// 	self.playerMe.currentPlayer.$save();
		// }

		function toggleGameFull() {
			if(self.gameFull)
				self.gameFull = false;
			else
				self.gameFull = true;
		}

		//////////////////////////////
		// During game play
		//////////////////////////////

		function onSpaceClick(z, x, y) {
			var winner = [];

			// Runs only on current player's turn
			if(self.playerMe.thisPlayer.playerTurn) {

				// Run if clicked space is empty
				if(self.gameSpace.theGameSpace.gameSpace[z][x][y] === "") {
					// Update spaces of board (in GameSpace object)
					self.gameSpace.updateBoard(z, x, y, self.playerMe.thisPlayer.playerValue)

					// Pass in board to the Game Algorithm object to look for a winning line
					winner = self.gameAlgorithm.checkForWinner(z, x, y, 
						self.gameSpace.theGameSpace.gameSpace, self.playerMe.thisPlayer.playerValue)
					
					// Toggle turns
					self.playerMe.thisPlayer.playerTurn = false;
					self.playerMe.otherPlayer.playerTurn = true;
					self.playerMe.thisPlayer.$save()
					self.playerMe.otherPlayer.$save()

					// Run if thisPlayer played a winning line
					if(winner.indexOf(true) !== -1) {
						// Set winner
						self.playerMe.thisPlayer.theWinner = true;
						self.playerMe.otherPlayer.theWinner = false;
						// Disable board
						self.playerMe.thisPlayer.playerTurn = false;
						self.playerMe.otherPlayer.playerTurn = false;

						self.playerMe.thisPlayer.$save()
						self.playerMe.otherPlayer.$save()

						// Toggle Game Over Menu
						self.lobby.theWinner = self.playerMe.thisPlayer.name + " is the winner!";
						self.lobby.$save();
					}

					// Declaring a tie/cat's game
					if(winner.indexOf(true) === -1 && 
						self.gameSpace.theGameSpace.occupiedSpaces === self.gameSpace.theGameSpace.totalSpaces) {
						
						// No winner/cat's game
						self.playerMe.thisPlayer.theWinner = false;
						self.playerMe.otherPlayer.theWinner = false;
						// Disable board
						self.playerMe.thisPlayer.playerTurn = false;
						self.playerMe.otherPlayer.playerTurn = false;
						
						self.playerMe.thisPlayer.$save()
						self.playerMe.otherPlayer.$save()

						// Toggle Game Over Menu
						self.lobby.theWinner = "Tie Game";
						self.lobby.$save();
					}
				}//second if
			}//first if

			if(self.waitingMsg !== null)
				self.waitingMsg = null;
		}

		//////////////////////////////
		// For Game Over Menu
		//////////////////////////////

		function playAgain() {
			// Make buttons disappear and have a 'waiting sign'
			// Toggle info
			if(self.playerMe.thisPlayer.theWinner === true) {
				self.playerMe.updateWins();
				self.playerMe.toggleTurn();
				self.playerMe.thisPlayer.theWinner = "";
				self.playerMe.saveToFB();

				self.waitingMsg = "Waiting for " + self.playerMe.otherPlayer.name;
			}

			
			if(self.playerMe.thisPlayer.theWinner === false) {
				var z = parseInt(self.zSize);
				var x = parseInt(self.xSize);
				var y = parseInt(self.ySize);
				var ptsToConnect = parseInt(self.ptsToConnect);

				if( z === undefined || x === undefined 
					                || y === undefined || ptsToConnect === undefined) {

					self.errorMsg = "Select settings for next game";
				}
				else {
					// Clear current board
					// self.gameSpace.theGameSpace.$remove();

					self.gameSpace.theGameSpace.$loaded(function() {
						// Recreate board and algorithm
						self.gameSpace 			= new GameSpace(z,x,y);
						self.gameAlgorithm 		= new GameAlgorithm(self.gameSpace, z, x, y, ptsToConnect);

						// Reset Game Over Message
						self.errorMsg = null;

						self.lobby.theWinner = "";
						self.lobby.$save();

						// Reset values for next game
						self.playerMe.updateLosses();
						self.playerMe.thisPlayer.theWinner = "";
						self.playerMe.saveToFB();

						if(self.playerMe.otherPlayer.theWinner !== "")
							self.waitingMsg = "Waiting for " + self.playerMe.otherPlayer.name;
					});

				}

			}
			// reset whatever values that need to be reset
		}

// Boolean for showing options.  Loser...but if cats game.  Higher ID number chooses

		// function for winner who clicks no

	} // End of GameManager

	return GameManager;
}


