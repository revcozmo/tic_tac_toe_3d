angular
	.module('ttt3DApp')
	.factory('Player', Player)

Player.$inject = ['$firebaseObject', '$state'];

// One Player object contains the data of both 
// the current player(thisPlayer) and the opponent (otherPlayer).
// This is done to dyanmically change both players' data in a single turn
function Player($firebaseObject, $state) {
	
	var Player = function(numPlayers) {

		var self = this;

		/***********************************
		* Connecting To Firebase References
		************************************/
		var playersRef		= new Firebase("https://t33d.firebaseio.com/2Players");

		// Construct a new firebase reference from the url, and sync local object to data
		var checkPlayerRef 	= new Firebase("https://t33d.firebaseio.com/2Players/player");
		var checkPlayer 	= $firebaseObject(checkPlayerRef);

		var checkPlayer2Ref = new Firebase("https://t33d.firebaseio.com/2Players/player2");
		var checkPlayer2 	= $firebaseObject(checkPlayer2Ref);

		var connectedRef = new Firebase("https://t33d.firebaseio.com/.info/connected");


		/***********************************
		* Variables and Function Variables
		***********************************/
		self.thisPlayer;				// Player data of current player
		self.otherPlayer;				// Player data of opponent
		self.spectator 		= false;	// When game is full, any visitor is a spectator

		self.initPlayer1FB 	= initPlayer1FB;	// Function to initialize Firebase data of player1
		self.initPlayer2FB	= initPlayer2FB;	// Function to initialize FB data of player2

		// List of other functions
		self.toggleTurn		= toggleTurn;
		self.updateWins		= updateWins;
		self.updateLosses	= updateLosses;
		self.updateTies		= updateTies;
		self.saveToFB 		= saveToFB;		// Save to Firebase

		var instantiateWatch 	= instantiateWatch;
		var runConnectedRef		= runConnectedRef;


		/**********************************************
		* Run these functions upon Player instantiation
		***********************************************/

		/**
		*  When the game is empty, the first two visitors are set as player1 and player2.
		*  Visitors after are considered spectators.  Currently, spectators are not allowed to
		*  watch the game.
		**/
		checkPlayer.$loaded(function(data) {
			checkPlayer2.$loaded(function(data) {

				if($state.is('lounge')) {
					if(checkPlayer.playerID === undefined) {	// visitor set as player1

						self.thisPlayer 	= initPlayer1FB();
						self.thisPlayerRef 	= checkPlayerRef;
						
						self.otherPlayer 	= checkPlayer2;
						self.otherPlayerRef = checkPlayer2Ref;

						instantiateWatch();
						runConnectedRef();
					}
					else if(checkPlayer2.playerID === undefined) {  // visitor set as player2

						self.thisPlayer 	= initPlayer2FB();
						self.thisPlayerRef	= checkPlayer2Ref;

						self.otherPlayer 	= checkPlayer;
						self.otherPlayerRef = checkPlayerRef;

						instantiateWatch();
						runConnectedRef();
					}
					else {
						self.spectator = true;
						$state.go('gamefull')		// Redirect to Gamefull screen
					}
				}
			});
		});

		/**
		* Handle when one player leaves during a game.  
		* Currently, when either player disconnects
		* its firebase reference is destroyed.  This listener detects the event and redirects
		* the current player to the Game Over screen.
		**/
		playersRef.on('child_removed', function(oldChildSnapshot) {
			if($state.is('gamespace')) {
				playersRef.remove()
				$state.go('gameempty')
			}
		});


		////////////////////////////////////
		// Functions Used
		////////////////////////////////////

		// Initialize player default values
		function initPlayer1FB() {
			checkPlayer.name = "";
			checkPlayer.playerID = numPlayers;
			checkPlayer.isReady = false;
			checkPlayer.playerValue =  "x";
			checkPlayer.playerTurn = false;
			checkPlayer.theWinner = "";
			checkPlayer.wins =  0;
			checkPlayer.losses = 0;
			checkPlayer.ties =  0;

			checkPlayer.$save();
			return checkPlayer;
		}

		function initPlayer2FB() {
			checkPlayer2.name = "";
			checkPlayer2.playerID = numPlayers;
			checkPlayer2.isReady = false;
			checkPlayer2.playerValue =  "o";
			checkPlayer2.playerTurn = false;
			checkPlayer2.theWinner = "";
			checkPlayer2.wins =  0;
			checkPlayer2.losses = 0;
			checkPlayer2.ties =  0;

			checkPlayer2.$save();
			return checkPlayer2;
		}

		/**
		* Event listener on any changes to either players.
		* Redirect player to the game space screen when both players are ready
		**/
		function instantiateWatch() {
		    self.unwatchP1 = self.thisPlayer.$watch(function() {
		        if(self.thisPlayer.isReady && self.otherPlayer.isReady) {
		            $state.go('gamespace')
		        }
		    });

		    self.unwatchP2 = self.otherPlayer.$watch(function() {
		        if(self.thisPlayer.isReady && self.otherPlayer.isReady) {
		            $state.go('gamespace')
		        }
		    });
		}

		function runConnectedRef() {
			connectedRef.on('value', function(snapshot) {
				if(snapshot.val()) {
					self.thisPlayerRef.onDisconnect().remove();		// When player disconnects, destroy data
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

	} // End of Player

	return Player;
}