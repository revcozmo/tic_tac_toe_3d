angular.module('ttt3DApp')
	.controller('PlayT3DController', PlayT3DControllerFunc);

	PlayT3DControllerFunc.$inject = ['GameSpace', 'GameAlgorithm', 'Player'];

	function PlayT3DControllerFunc(GameSpace, GameAlgorithm, Player) {

		this.activeSpace = new GameSpace(3,3,3);

		this.Player1 = new Player();
		this.Player2 = new Player();		
	};