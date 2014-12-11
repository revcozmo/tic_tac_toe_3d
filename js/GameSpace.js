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

		this.totalSpaces = this.zLength * this.xLength * this.yLength;
		var calcTotalSpaces = calcTotalSpaces;

		this.create3DArray 	 = create3DArray;
		// this.createMatrix 	 = createMatrix;
		this.initToNull		 = initToNull;
		this.change			 = change;

		// Create the game space when object is instantiated
		// this.theGameSpace = this.createMatrix(this.xLength, this.yLength, "x");
		this.theGameSpace = this.create3DArray();
		this.theGameSpace = this.initToNull(this.theGameSpace);

		// Instantiate Game Algorithm
		this.CHECKER	  = new GameAlgorithm(this.theGameSpace, this.zLength,
												this.xLength, this.yLength, 3);
	
		// Test of gathering indexes from angular 
		function change(z,x,y) {
			// console.log("clicked")
			this.currentZ = z;
			this.currentX = x;
			this.currentY = y;
			this.theGameSpace[z][x][y] = 'x';

			this.CHECKER.update(this.theGameSpace)

			//Add GameAlgorithm checking functions here
			this.CHECKER.checkLine(
				this.CHECKER.extractHorizontal(z, x, y));
			
			this.CHECKER.checkLine(
				this.CHECKER.extractVertical(z, x, y));

			this.CHECKER.checkLine(
				this.CHECKER.extractDiagonalOne(z, x, y));

			this.CHECKER.checkLine(
				this.CHECKER.extractDiagonalTwo(z, x, y));

			this.CHECKER.checkLine(this.CHECKER.extractYZVert(z,x,y));

			this.CHECKER.checkLine(this.CHECKER.extractYZDiagOne(z,x,y));

			this.CHECKER.checkLine(this.CHECKER.extractYZDiagTwo(z,x,y));

			this.CHECKER.checkLine(this.CHECKER.extractZXDiagOne(z,x,y));

			this.CHECKER.checkLine(this.CHECKER.extractZXDiagTwo(z,x,y));

			this.CHECKER.checkLine(this.CHECKER.extractDiag1D1(z,x,y));

			this.CHECKER.checkLine(this.CHECKER.extractDiag1D2(z,x,y));

			this.CHECKER.checkLine(this.CHECKER.extractDiag2D1(z,x,y));

			this.CHECKER.checkLine(this.CHECKER.extractDiag2D2(z,x,y));
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

		// // Create 3D Array to desired dimensions
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


		// Create 2D matrix
		// function createMatrix(numRows, numColumns, defaultValue){
		// 	var matrix = []; 
		// 	for(var i = 0; i < numRows; i++){
  //  			var row = new Array(numColumns);
  //  			for (var j=0; j < row.length; j++){
  //   			row[j] = defaultValue;
  //  			}
  //  			matrix.push(row);
 	// 		}
		// 	return matrix;
		// }


		// Create 3D Array
		// numPlanes refer to the z-axis.  numColumns = x-axis.  numRows = y-axis
		// function create3Darray(numPlanes, numColumns, numRows, defaultValue) {
		// 	var arr = [];

		// 	for(var i = 0; i < numPlanes; i++) {
		// 		var xAxis = new Array(numColumns);

		// 		for(var j = 0; j < xAxis; j++) {
		// 			var yAxis = new Array(numRows);

		// 			for(var k = 0; k <)

		// 		}

		// 	}
		// }

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
