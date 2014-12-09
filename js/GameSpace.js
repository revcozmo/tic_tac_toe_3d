angular
	.module('ttt3DApp')
	.factory('GameSpace', GameSpaceFunc)

GameSpaceFunc.$inject = ['GameAlgorithm'];

function GameSpaceFunc(GameAlgorithm) {

	var GameSpace = function(zSize, xSize, ySize) {
		// Variable that'll hold the 3D array
		this.theGameSpace = [];

		this.zLength = zSize;
		this.xLength = xSize;
		this.yLength = ySize;

		this.totalSpaces;
		var calcTotalSpaces = calcTotalSpaces;

		this.currentX;
		this.currentY;
		this.currentZ;

		this.create3DArray 	 = create3DArray;
		this.initToNull		 = initToNull;
		this.change			 = change;

		// Create the game space when object is instantiated
		this.theGameSpace = this.create3DArray();
		this.theGameSpace = this.initToNull(this.theGameSpace);
		this.CHECKER	  = new GameAlgorithm(this.theGameSpace, 3)
		
		// Test of gathering indexes from angular 
		function change(z,x,y) {
			// console.log("clicked")
			this.currentZ = z;
			this.currentX = x;
			this.currentY = y;
			this.theGameSpace[z][x][y] = 1;

			this.CHECKER.update(this.theGameSpace)
			this.CHECKER.checkXYPlane(this.currentZ, this.currentX, this.currentY);
			this.CHECKER.checkYZPlane(this.currentZ, this.currentX, this.currentY);
			this.CHECKER.checkXZPlane(this.currentZ, this.currentX, this.currentY);
			this.CHECKER.checkDiagOnePlane(this.currentZ, this.currentX, this.currentY);
			this.CHECKER.checkDiagTwoPlane(this.currentZ, this.currentX, this.currentY);
		}

		function calcTotalSpaces() {
			this.totalSpaces = this.zLength * this.xLength * this.yLength;
		}


		this.toggleWidth = function() {
			return (Math.floor(100 / this.xLength) - 1) + '%'; 
		}

		this.toggleHeight = function() {
			return (Math.floor(100 / this.yLength) - 1) + '%';
		}

		// Create 3D Array to desired dimensions
		function create3DArray() {
  			var threeDArray = [];

  			for (var i=0; i < this.zLength; i++) {
			     threeDArray[i] = [];

			     for(var j=0; j < this.xLength; j++) {
			     	threeDArray[i][j] = [];
			     }
			  }
			return threeDArray;
		}

		// Initialize 3D Array's keys to null
		function initToNull(array) {
			var z;
			for(z = 0; z < this.zLength; z++){
				var x;
				for(x = 0; x < this.xLength; x++) {
					var y;
					for(y = 0; y < this.yLength; y++){
						array[z][x][y] = null;
					}
				}
			}
			return array;
		}

	//End of GameSpace
	}

	return GameSpace;
}
