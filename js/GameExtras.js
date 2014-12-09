angular
	.module('ttt3DApp')
	.factory('GameExtras', GameExtrasFunc)

function GameExtrasFunc() {

	var GameExtras = function(threeDArr, zLength, xLength, yLength) {

		var DDDArr 		= threeDArr;
		var z 			= zLength;
		var x 			= xLength;
		var y 			= yLength;

		this.addBlocks		= addBlocks;
		this.addBombs		= addBombs;
		this.activateBomb 	= activateBomb;

		function addBlocks() {
			do {
				var zSpace = Math.floor(Math.random() * z);
				var xSpace = Math.floor(Math.random() * x);
				var ySpace = Math.floor(Math.random() * y);
			}
			while(DDDArr[zSpace][xSpace][ySpace] !== null);
			
			DDDArr[zSpace][xSpace][ySpace] = 'block';
		}

		function addBombs() {
			do {
				var zSpace = Math.floor(Math.random() * z);
				var xSpace = Math.floor(Math.random() * x);
				var ySpace = Math.floor(Math.random() * y);
			}
			while(DDDArr[zSpace][xSpace][ySpace] !== null);
			
			DDDArr[zSpace][xSpace][ySpace] = 'bomb';
		}
		
		function activateBomb() {
			
		}
		
	}

	return GameExtras;
}
