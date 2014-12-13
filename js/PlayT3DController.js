angular.module('ttt3DApp')
	.controller('PlayT3DController', PlayT3DControllerFunc);

	PlayT3DControllerFunc.$inject = ['GameSpace', 'GameManager'];

	function PlayT3DControllerFunc(GameSpace, GameManager) {
		
		// Create the Tic Tac Toe 3D Game
		this.theGame		= new GameManager();

		this.activeSpace 			= new GameSpace(3,3,3);
	};