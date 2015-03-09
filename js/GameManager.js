angular
	.module('ttt3DApp')
	.factory('GameManager', GameManagerFunc)

GameManagerFunc.$inject = ['$firebase', 'GameSpace', 'GameAlgorithm', 'Player', '$state', '$rootScope'];

function GameManagerFunc($firebase, GameSpace, GameAlgorithm, Player, $state, $rootScope) {

	var GameManager = function() {
		var self	= this;

		// On GameManager instanstiation, Create Firebase object for lobby
		self.lobby 	= $firebase(new Firebase("https://t33d.firebaseio.com/Lobby")).$asObject();

		// When Firebase data is loaded, initialize default values
		self.lobby.$loaded (function(){
			self.lobby.theWinner 		= "";
			self.lobby.waitingMsg 		= "";

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


		// Create GameSpace and GameAlgorithm objects
		self.gameSpace 			= new GameSpace(3,3,3);
		self.gameAlgorithm 		= new GameAlgorithm(self.gameSpace, 3, 3, 3, 3);

		// Functions for Start Menu
		self.updatePlayer 		= updatePlayer;
		self.startGame 			= startGame;
 		
 		// Functions for Game Board
 		self.onSpaceClick 		= onSpaceClick;

		// Functions for Game Over Menu
		self.playAgain 			= playAgain;
		self.destroyPlayer 		= destroyPlayer;

		function destroyPlayer() {
			self.playerMe.thisPlayer.$remove();
			self.playerMe.thisPlayer.$save();
		}


		// Run when state changes.
		// Unregister watch functions in Player.js
		$rootScope.$on('$stateChangeSuccess', function(){
			console.log("state chaged!")
			if($state.is('gamespace')) {
				console.log("in gamespace");
				self.playerMe.unwatchP1();
				self.playerMe.unwatchP2();
			}
		});


	//////////////////////////////
	// At Start Menu
	//////////////////////////////
		// Function to run when current player clicks on 'play'
		function updatePlayer() {
			self.playerMe.thisPlayer.$save();
		}

		// Function to run when current player clicks 'play'
		function startGame() {
			// Player input check
			if(self.playerMe.thisPlayer.name === "") {
				self.nameError = "Please enter your name";
			}
			// Show message when waiting for opponent
			else if(self.playerMe.otherPlayer.name === undefined
						       || self.playerMe.otherPlayer.name === "") {
				self.nameError	= null;
				self.waitingPlayer = "Waiting for opponent";
				self.playerMe.thisPlayer.isReady = true;
				self.playerMe.thisPlayer.$save();
			}
			else {
				// Player ID of lower number starts game
				if(self.playerMe.thisPlayer.playerID < self.playerMe.otherPlayer.playerID) {
					self.playerMe.thisPlayer.playerTurn = true;
					self.playerMe.thisPlayer.$save();
				}
				else {
					self.playerMe.otherPlayer.playerTurn = true;
					self.playerMe.otherPlayer.$save();
				}

				self.playerMe.thisPlayer.isReady = true;
				self.playerMe.thisPlayer.$save();
			}
		}

console.log($state)

	//////////////////////////////
	// During game play
	//////////////////////////////

		function onSpaceClick(z, x, y) {
			// Holds list of booleans of found, winning lines
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
						
						// Update ties record
						self.playerMe.thisPlayer.ties++
						self.playerMe.otherPlayer.ties++

						// Player with most losses or player who clicked
						// the for the cat's game goes first in next game
						if(self.playerMe.thisPlayer.losses >= self.playerMe.otherPlayer.losses) {
							self.playerMe.thisPlayer.theWinner = true;
							self.playerMe.otherPlayer.theWinner = false;
						}
						else {
							self.playerMe.thisPlayer.theWinner = false;
							self.playerMe.otherPlayer.theWinner = true;	
						}				

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
		}

	//////////////////////////////
	// For Game Over Menu
	//////////////////////////////

		function playAgain() {
			// Run if current player is the winner
			if(self.playerMe.thisPlayer.theWinner === true) {
				// Update win record
				if(self.lobby.theWinner !== "Tie Game")
					self.playerMe.updateWins();

				// Clear player's winner status
				self.playerMe.thisPlayer.theWinner = "";

				// Update changes to FB
				self.playerMe.saveToFB();

				// If other player has not clicked to play yet
				if(self.playerMe.otherPlayer.theWinner !== "") {
					self.lobby.waitingMsg = "Waiting for " + self.playerMe.otherPlayer.name;
					self.lobby.$save();
				}
				else {
					// Reset values for next game
					self.playerMe.toggleTurn();
					self.playerMe.saveToFB();
					
					self.playerMe.otherPlayer.theWinner = "";
					self.playerMe.otherPlayer.$save();

					self.lobby.theWinner = "";
					self.lobby.waitingMsg = "";
					self.lobby.$save();
				}
			}
			// Current player is the loser
			else if(self.playerMe.thisPlayer.theWinner === false) {
				var z = parseInt(self.zSize);
				var x = parseInt(self.xSize);
				var y = parseInt(self.ySize);
				var ptsToConnect = parseInt(self.ptsToConnect);

				// Player input check
				if( z === undefined || x === undefined 
					                || y === undefined || ptsToConnect === undefined) {

					self.errorMsg = "Select settings for next game";
				}
				else {
					// Loser creates new game
					self.gameSpace.theGameSpace.$loaded(function() {
						// Recreate board and algorithm
						self.gameSpace 			= new GameSpace(z,x,y);
						self.gameAlgorithm 		= new GameAlgorithm(self.gameSpace, z, x, y, ptsToConnect);

						// Reset game settings error message
						self.errorMsg = null;

						// Clear current player's win status
						self.playerMe.thisPlayer.theWinner = "";			

						// Update losses
						if(self.lobby.theWinner !== "Tie Game")
							self.playerMe.updateLosses();

						// Update changes to firebase
						self.playerMe.saveToFB();

						// other player hasn't clicked play yet
						if(self.playerMe.otherPlayer.theWinner !== "") {
							self.lobby.waitingMsg = "Waiting for " + self.playerMe.otherPlayer.name;
						}
						else {
							// Reset values for next game
							self.playerMe.otherPlayer.playerTurn = true;
							self.playerMe.otherPlayer.theWinner = "";

							self.playerMe.otherPlayer.$save();

							self.lobby.theWinner = "";
							self.lobby.waitingMsg = "";
							self.lobby.$save();
						}
					});
				}
			}
		}



		window.onbeforeunload = function() {
			self.playerMe.thisPlayer.$remove()
			self.playerMe.thisPlayer.$save();
		};

	} // End of GameManager

	return GameManager;
}