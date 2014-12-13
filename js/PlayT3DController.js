angular.module('ttt3DApp')
	.controller('PlayT3DController', PlayT3DControllerFunc);

	PlayT3DControllerFunc.$inject = ['GameManager'];

	function PlayT3DControllerFunc(GameManager) {
		
		// Create the Tic Tac Toe 3D Game
		this.theGame		= new GameManager();
	};