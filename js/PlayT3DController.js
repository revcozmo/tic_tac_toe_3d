angular.module('ttt3DApp')
	.controller('PlayT3DController', PlayT3DControllerFunc);

	PlayT3DControllerFunc.$inject = ['GameSpace', 'GameAlgorithm'];

	function PlayT3DControllerFunc(GameSpace, GameAlgorithm) {




		this.activeSpace = new GameSpace(3,3,3);
		// this.checkManager = new GameAlgorithm(this.activeSpace, 3);
		// this.checkManager.chkXYPlane(asdf, asdf, asf);

	};