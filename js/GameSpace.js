angular
	.module('ttt3DApp')
	.factory('GameSpace', GameSpaceFunc)

GameSpaceFunc.$inject = ['GameAlgorithm', '$firebase'];

function GameSpaceFunc(GameAlgorithm, $firebase) {

	var GameSpace = function(zSize, xSize, ySize) {
		// A Firebase object that'll hold the 3D array
		// Later, this.  ftheGameSpace.gameSpace will be the property
		// that holds the 3D array
		this.theGameSpace;

		// Method to create FireBase object
		this.makeGameSpaceFB = makeGameSpaceFB;

		// Dimensions of 3D board and number of spaces
		var zLength 		 = zSize;
		var xLength			 = xSize;
		var yLength 		 = ySize;
		var totalSpaces;

		this.create3DArray 	 = create3DArray;
		this.initToEmptyStr	 = initToEmptyStr;
		this.clearSpace		 = clearSpace;

		this.calcTotalSpaces 	= calcTotalSpaces;
		this.change			 	= change;

		// Change size of boxes depending on dimensions. In HTML/CSS
		this.toggleWidth 	 = toggleWidth;
		this.toggleHeight    = toggleHeight;

		// Create the game space when object is instantiated
		this.theGameSpace = this.makeGameSpaceFB();
		var tempArr		  = this.create3DArray();
		tempArr		  	  = this.initToEmptyStr(tempArr);
		this.theGameSpace.gameSpace = tempArr;
		this.theGameSpace.$save();
		
		totalSpaces 	  = this.calcTotalSpaces();

		// Instantiate Game Algorithm
		this.CHECKER	  = new GameAlgorithm(this.theGameSpace.gameSpace, zLength,
												xLength, yLength, 3);
	
		// Test of gathering indexes from angular 
		function change(z,x,y) {
			// console.log("clicked")
			this.currentZ = z;
			this.currentX = x;
			this.currentY = y;
			this.theGameSpace.gameSpace[z][x][y] = 'x';
			this.theGameSpace.$save();

			this.CHECKER.update(this.theGameSpace.gameSpace)

			// //Add GameAlgorithm checking functions here
			this.CHECKER.checkLine(this.CHECKER.extractHorizontal(z, x, y));
			
			this.CHECKER.checkLine(this.CHECKER.extractVertical(z, x, y));

			this.CHECKER.checkLine(this.CHECKER.extractDiagonalOne(z, x, y));

			this.CHECKER.checkLine(this.CHECKER.extractDiagonalTwo(z, x, y));

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

		function makeGameSpaceFB() {
			var ref = new Firebase("https://t33d.firebaseio.com/GameSpace");	
			var theGameSpace = $firebase(ref).$asObject();

			return theGameSpace;
		}

		// Create 3D Array to desired dimensions
		function create3DArray() {
  			var threeDArray = [];

  			for (var i=0; i < zLength; i++) {
			     threeDArray[i] = [];

			     for(var j=0; j < xLength; j++) {
			     	threeDArray[i][j] = [];
			     }
			  }
			return threeDArray;
		}

		// Initialize 3D Array's keys to empty string
		function initToEmptyStr(array) {
			var z;
			for(z = 0; z < zLength; z++){
				var x;
				for(x = 0; x < xLength; x++) {
					var y;
					for(y = 0; y < yLength; y++){
						array[z][x][y] = "";
					}
				}
			}
			return array;
		}

		function calcTotalSpaces() {
			totalSpaces = zLength * xLength * yLength;
		}

		function toggleWidth() {
			return (Math.floor(100 / xLength) - 1) + '%'; 
		}

		function toggleHeight() {
			return (Math.floor(100 / yLength) - 1) + '%';
		}

		function clearSpace() {
			this.theGameSpace = [];
		}


	//End of GameSpace
	}

	return GameSpace;
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



