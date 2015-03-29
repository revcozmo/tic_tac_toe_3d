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
		this.returnDDDArr 	= returnDDDArr;

		function addBlocks(numBlocks) {
			for(var i = 0; i < numBlocks; i++) {
				do {
					var zSpace = Math.floor(Math.random() * z);
					var xSpace = Math.floor(Math.random() * x);
					var ySpace = Math.floor(Math.random() * y);
				}
				while(DDDArr[zSpace][xSpace][ySpace] !== "");
				
				DDDArr[zSpace][xSpace][ySpace] = 'bk';
			}
		}

		function addBombs(numBombs) {
			for(var i = 0; i < numBombs; i++) {
				do {
					var zSpace = Math.floor(Math.random() * z);
					var xSpace = Math.floor(Math.random() * x);
					var ySpace = Math.floor(Math.random() * y);
				}
				while(DDDArr[zSpace][xSpace][ySpace] !== "");
				
				DDDArr[zSpace][xSpace][ySpace] = 'bomb';
			}
		}
		
		function activateBomb() {
			
		}

		function returnDDDArr() {
			
		}

		
	}

	return GameExtras;
}
