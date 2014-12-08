angular
	.module('ttt3DApp')
	.factory('Player', PlayerFunc)

function PlayerFunc() {

	// In the tictactoe sense, 1 is 'O' and -1 is 'X'.
	var PLAYER_VALUES = [1, -1];

	// This keeps tracks the number of Player objects that
	// have been instantiated
	var numPlayerObjs = 0;
	
	var Player = function() {
		// Increment numPlayerObjs when a Player object is created.
		numPlayerObjs += 1;

		var playerName;
		var	playerValue;
		var playerIcon;
		var playerTurn		= false;
		var wins			= 0;
		var losses			= 0;
		var ties			= 0;


		this.updatePlayerName = updatePlayerName;
		this.initPlayerValue  = initPlayerValue;
		this.updateIcon		= updateIcon;
		this.toggleTurn		= toggleTurn;
		this.getPlayerValue	= getPlayerValue;
		this.updateWins		= updateWins;
		this.updateLosses	= updateLosses;
		this.updateTies		= updateTies;

		// Debugging purposes
		this.viewPlayerValue = function() {
			console.log(playerValue)
		}

		// Initialize playerValue
		this.initPlayerValue();

		function updatePlayerName(name) { playerName = name; }

		function initPlayerValue() {
			playerValue = PLAYER_VALUES[numPlayerObjs -1];
		}

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