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

		// List of functions
		self.toggleGameFull		= toggleGameFull;
		self.updatePlayer 		= updatePlayer;

		self.gameFull 			= false;
		self.currentGame 		= [];



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
		
		 	self.playerMe	= new Player(self.lobby.numPlayers);
		});


		function updatePlayer() {
			self.playerMe.currentPlayer.$save();
			console.log("clicked")
		}

		function toggleGameFull() {
			if(self.gameFull)
				self.gameFull = false;
			else
				self.gameFull = true;
		}

	} // End of GameManager

	return GameManager;
}


