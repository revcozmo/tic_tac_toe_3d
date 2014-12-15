angular
	.module('ttt3DApp')
	.factory('GameSpace', GameSpaceFunc)

GameSpaceFunc.$inject = ['$firebase'];

// This creates the game board of the game. A 3D array is used
// to simulate 3D space. My naming of the z-axis, x-axis, and
// y-axis is different. The z-axis refers to the line going vertical.
// The z-points refer to the number of planes the game.
// The x-axis is the line going horiztonal.
// The y-axis is the line that goes through the monitor.
function GameSpaceFunc($firebase) {

	var GameSpace = function(zSize, xSize, ySize) {
		var self = this;

		// Method to create FireBase object
		var makeGameSpaceFB = makeGameSpaceFB;

		// Dimensions of 3D board and number of spaces
		var zLength 		 = zSize;
		var xLength			 = xSize;
		var yLength 		 = ySize;
		var totalSpaces;
		var occupiedSpaces	 = 0;

		// Functions to create 3D array
		this.create3DArray 	 = create3DArray;
		this.initToEmptyStr	 = initToEmptyStr;
		this.clearSpace		 = clearSpace;

		var calcTotalSpaces 	= calcTotalSpaces;
		this.updateBoard	 	= updateBoard;

		//////////////////
		// Here, creating a Firebase object to contain the game 
		// space information
		////////////////////
		this.theGameSpace;
		this.theGameSpace = makeGameSpaceFB();
		var tempArr		  = this.create3DArray();
		tempArr		  	  = this.initToEmptyStr(tempArr);
		this.theGameSpace.gameSpace = tempArr;
		calcTotalSpaces();
		this.theGameSpace.totalSpaces    = totalSpaces;
		this.theGameSpace.occupiedSpaces = occupiedSpaces;
		this.theGameSpace.$save();

		this.theGameSpace.$loaded(function() {
			self.theGameSpace.width = (Math.floor(100 / self.theGameSpace.gameSpace[0].length) - 1) + '%';
			self.theGameSpace.length = (Math.floor(100 / self.theGameSpace.gameSpace[0][0].length) - 1) + '%';
			self.theGameSpace.$save()
		});

		function makeGameSpaceFB() {
			var ref = new Firebase("https://t33d.firebaseio.com/GameSpace");	
			var theGameSpace = $firebase(ref).$asObject();

			return theGameSpace;
		}

		// Test of gathering indices of array of clicked space 
		function updateBoard(z,x,y, playerValue) {
			this.theGameSpace.gameSpace[z][x][y] = playerValue;
			this.theGameSpace.occupiedSpaces++;
			this.theGameSpace.$save();
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

		function clearSpace() {
			this.theGameSpace = [];
		}

	//End of GameSpace
	}

	return GameSpace;
}


