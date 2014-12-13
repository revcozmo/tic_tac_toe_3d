angular
	.module('ttt3DApp')
	.factory('Player', Player)

Player.$inject = ['$firebase']

function Player($firebase) {
	
	var Player = function(numPlayers) {

		var self = this;

		self.checkPlayer 	= $firebase(new Firebase("https://t33d.firebaseio.com/2Players/player"))
								.$asObject();
		self.checkPlayer2 	= $firebase(new Firebase("https://t33d.firebaseio.com/2Players/player2"))
								.$asObject();

		self.thisPlayer;
		self.otherPlayer;

		// List of functions to initialize Firebase data of player
		self.initPlayer1FB 	= initPlayer1FB;
		self.initPlayer2FB	= initPlayer2FB;



		// List of other functions
		self.updatePlayerName = updatePlayerName;
		self.updateIcon		= updateIcon;
		self.toggleTurn		= toggleTurn;
		self.getPlayerValue	= getPlayerValue;
		self.updateWins		= updateWins;
		self.updateLosses	= updateLosses;
		self.updateTies		= updateTies;



		// Create player1 or player 2 data
		self.checkPlayer.$loaded(function() {
			if(self.checkPlayer.name === undefined) {

				self.thisPlayer = initPlayer1FB();
				self.otherPlayer = self.checkPlayer2;
			}
			else {
				if(self.checkPlayer.name !== undefined)
					self.thisPlayer = initPlayer2FB();
					self.otherPlayer = self.checkPlayer;
			};

		});

		function initPlayer1FB() {
			self.checkPlayer.name = "";
			self.checkPlayer.playerID = numPlayers;
			self.checkPlayer.playerValue =  "x";
			self.checkPlayer.playerTurn = false;
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
			self.checkPlayer2.wins =  0;
			self.checkPlayer2.losses = 0;
			self.checkPlayer2.ties =  0;

			self.checkPlayer2.$save();
			return self.checkPlayer2;
		}






		function updatePlayerName(name) { playerName = name; }

		function updateIcon(icon) 		{ playerIcon = icon; }

		function toggleTurn() {
			if(playerTurn) 	{ playerTurn = false; }
			else 			{ playerTurn = true; }
		}

		function getPlayerValue() { return playerValue;	}
		function updateWins() 	{ wins += 1; }
		function updateLosses() { losses += 1; }
		function updateTies() 	{ ties += 1; }

	// End of Player
	}


	return Player;
}