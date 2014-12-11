angular.module('ttt3DApp')
	.controller('PlayT3DController', PlayT3DControllerFunc);

	PlayT3DControllerFunc.$inject = ['GameSpace','Player'];

	function PlayT3DControllerFunc(GameSpace, Player) {

		this.activeSpace = new GameSpace(3,6,6);

		// this.Player1 = new Player();
		// this.Player2 = new Player();		
	};