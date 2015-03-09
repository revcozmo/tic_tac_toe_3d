angular
	.module('ttt3DApp')
	.factory('Player', Player)

Player.$inject = ['$firebaseObject', '$state'];

// One Player object contains the data of both 
// the current player(thisPlayer) and the opponent (otherPlayer).
// This is done to dyanmically change both player's data in
// a single turn
function Player($firebaseObject, $state) {
	
	var Player = function(numPlayers) {
		var self = this;

		// Gather Firebase data of two players
		self.checkPlayer 	= $firebaseObject(new Firebase("https://t33d.firebaseio.com/2Players/player"));
		self.checkPlayerConnections 	= new Firebase("https://t33d.firebaseio.com/2Players/player/connections");
		self.checkPlayer2 	= $firebaseObject(new Firebase("https://t33d.firebaseio.com/2Players/player2"));
		self.checkPlayer2Connections 	= new Firebase("https://t33d.firebaseio.com/2Players/player2/connections");

		var connectedRef = new Firebase("https://t33d.firebaseio.com/.info/connected");

		// Player data of current player
		self.thisPlayer;
		// Player data of opponent
		self.otherPlayer;

		// Spectator
		self.spectator 	= false;

		// On Player object instantiation, 
		// set current player and opponentdata
		self.checkPlayer.$loaded(function(data) {
			self.checkPlayer2.$loaded(function(data) {
				if(self.checkPlayer.playerID === undefined) {

					self.thisPlayer = initPlayer1FB();
					self.thisPlayerConnections = self.checkPlayerConnections;
					self.otherPlayer = self.checkPlayer2;
					self.otherPlayerConnections = self.checkPlayer2Connections;
					instantiateWatch();

					connectedRef.on('value', function(snapshot) {
						if (snapshot.val()) {
							self.thisPlayerConnections.onDisconnect().remove();
							self.thisPlayerConnections.set(true);
						}
					});
				}
				else {
					if(self.checkPlayer2.playerID === undefined) {

						self.thisPlayer = initPlayer2FB();
						self.thisPlayerConnections = self.checkPlayer2Connections;
						self.otherPlayer = self.checkPlayer;
						self.otherPlayerConnections = self.checkPlayerConnections;
						instantiateWatch();

						connectedRef.on('value', function(snapshot) {
							if (snapshot.val()) {
								self.thisPlayerConnections.onDisconnect().remove();
								self.thisPlayerConnections.set(true);
							}
						});
					}
					else {
						self.spectator = true;
						$state.go('gamefull')
					}
				}
			});
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
			self.checkPlayer.isReady = false;
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
			self.checkPlayer2.isReady = false;
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
		    self.unwatchP1 = self.thisPlayer.$watch(function() {
		        if(self.thisPlayer.isReady && self.otherPlayer.isReady) {
		            console.log("p1 watch!")
		            $state.go('gamespace')
		        }
		    });

		    self.unwatchP2 = self.otherPlayer.$watch(function() {
		        if(self.thisPlayer.isReady && self.otherPlayer.isReady) {
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