angular
	.module('ttt3DApp')
	.factory('Player', Player)

Player.$inject = ['$firebase'];

// One Player object contains the data of both 
// the current player(thisPlayer) and the opponent (otherPlayer).
// This is done to dyanmically change both player's data in
// a single turn
function Player($firebase) {
	
	var Player = function(numPlayers) {
		var self = this;

		// Gather Firebase data of two players
		self.checkPlayer 	= $firebase(new Firebase("https://t33d.firebaseio.com/2Players/player"))
								.$asObject();
		self.checkPlayer2 	= $firebase(new Firebase("https://t33d.firebaseio.com/2Players/player2"))
								.$asObject();

		// Player data of current player
		self.thisPlayer;
		// Player data of opponent
		self.otherPlayer;

		// On Player object instantiation, 
		// set current player and opponentdata
		self.checkPlayer.$loaded(function(data) {
			if(self.checkPlayer.playerID === undefined) {

				self.thisPlayer = initPlayer1FB();
				self.otherPlayer = self.checkPlayer2;
				instantiateWatch();
			}
			else {
				if(self.checkPlayer2.playerID === undefined) {
					self.thisPlayer = initPlayer2FB();
					self.otherPlayer = self.checkPlayer;
					instantiateWatch();
				}
			}
		});


		// List of functions to initialize Firebase data of player
		self.initPlayer1FB 	= initPlayer1FB;
		self.initPlayer2FB	= initPlayer2FB;

		// List of other functions
		self.toggleTurn		= toggleTurn;
		self.updateWins		= updateWins;
		self.updateLosses	= updateLosses;
		self.updateTies		= updateTies;
		self.saveToFB 		= saveToFB;


		// Initialize player default values
		function initPlayer1FB() {
			self.checkPlayer.name = "";
			self.checkPlayer.playerID = numPlayers;
			self.checkPlayer.playerValue =  "x";
			self.checkPlayer.playerTurn = false;
			self.checkPlayer.theWinner = "";
			self.checkPlayer.wins =  0;
			self.checkPlayer.losses = 0;
			self.checkPlayer.ties =  0;

			self.checkPlayer.$save();
			return self.checkPlayer;
		}

		function initPlayer2FB() {
			self.checkPlayer2.name = "";
			self.checkPlayer2.playerID = numPlayers;
			self.checkPlayer2.playerValue =  "o";
			self.checkPlayer2.playerTurn = false;
			self.checkPlayer2.theWinner = "";
			self.checkPlayer2.wins =  0;
			self.checkPlayer2.losses = 0;
			self.checkPlayer2.ties =  0;

			self.checkPlayer2.$save();
			return self.checkPlayer2;
		}

		function instantiateWatch() {
		    self.watchP1 = self.thisPlayer.$watch(function() {
		        if(self.thisPlayer.isReady === true && self.otherPlayer.isReady === true) {
		            console.log("p1 watch!")
		            $state.go('gamespace')
		        }
		    });

		    self.watchP2 = self.otherPlayer.$watch(function() {
		        if(self.thisPlayer.isReady === true && self.otherPlayer.isReady === true) {
		            console.log("p2 watch!")
		            $state.go('gamespace')
		        }
		    });
		}

		function toggleTurn() {
			if(self.thisPlayer.playerTurn)
				self.thisPlayer.playerTurn = false; 
			else 
				self.thisPlayer.playerTurn = true;
		}
		
		function updateWins() {
			self.thisPlayer.wins++;
		}
		
		function updateLosses()  {
			self.thisPlayer.losses++;
		}

		function updateTies() {
			self.thisPlayer.ties++
		}

		function saveToFB() {
			self.thisPlayer.$save();
		}

	}// End of Player

	return Player;
}