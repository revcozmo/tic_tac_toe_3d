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
		self.showWinner 		= showWinner;



		// When Firebase data is loaded
		self.lobby.$loaded (function(){

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
					self.showWinner();
				}

				// Declaring a tie/cat's game
				if(winner.indexOf(true) === -1 && 
					self.gameSpace.theGameSpace.occupiedSpaces === self.gameSpace.theGameSpace.totalSpaces) {
					
					self.playerMe.thisPlayer.theWinner = false;
					self.playerMe.otherPlayer.theWinner = false;

					// Disable board
					self.playerMe.thisPlayer.playerTurn = false;
					self.playerMe.otherPlayer.playerTurn = false;
					self.playerMe.thisPlayer.$save()
					self.playerMe.otherPlayer.$save()

					// Toggle Game Over Menu
					self.showWinner();
				}
			}
		}

		//////////////////////////////
		// For Game Over Menu
		//////////////////////////////
		// function for showing winner on screen
		function showWinner() {
			if(self.playerMe.thisPlayer.theWinner)
				self.theWinner = self.playerMe.thisPlayer.name + " wins";
			else if(self.playerMe.otherPlayer.theWinner)
				self.theWinner = self.playerMe.otherPlayer.name + "wins";
			else
				self.theWinner = "TIE";

			self.toggleGameOver();
		}

		// function for winner who clicks yes
		// 	updates info.  add waiting screen for player two

		// function for winner who clicks no

		// 	show loser ng-show
		// 	collect info for next game 
		// 	clear current board 
		// 	create new board for new game 
		// 	update loser info



	} // End of GameManager

	return GameManager;
}


