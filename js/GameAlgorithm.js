angular
	.module('ttt3DApp')
	.factory('GameAlgorithm', GameAlgorithmFunc)

function GameAlgorithmFunc() {

	var GameAlgorithm = function(gameSpace, zSize, xSize, ySize, pointsToConnect) {

		// Initialize to gameSpace
		this.checkingSpace		= gameSpace;

		// Properties of the game space to check
		var zLength				= zSize;
		var xLength				= xSize;
		var yLength				= ySize;
		var ptsToConnect 		= pointsToConnect;

		// List of functions
		this.checkForWinner		= checkForWinner;

		var update					= update;
		var checkLine 				= checkLine;
		var extractHorizontal 		= extractHorizontal;
		var extractVertical 		= extractVertical;
		var extractDiagonalOne		= extractDiagonalOne;
		var extractDiagonalTwo		= extractDiagonalTwo;
		var extractYZVert			= extractYZVert;
		var extractYZDiagOne		= extractYZDiagOne;
		var extractYZDiagTwo		= extractYZDiagTwo;
		var extractZXDiagOne		= extractZXDiagOne;
		var extractZXDiagTwo		= extractZXDiagTwo;
		var extractDiag1D1			= extractDiag1D1;
		var extractDiag1D2			= extractDiag1D2;
		var extractDiag2D1			= extractDiag2D1;
		var extractDiag2D2			= extractDiag2D2;


		function checkForWinner(z, x, y, space, playerValue) {

			update(space);

			checkLine( extractHorizontal(z, x, y),  playerValue )
			checkLine( extractVertical(z, x, y),	playerValue )
			checkLine( extractDiagonalOne(z, x, y), playerValue )
			checkLine( extractDiagonalTwo(z, x, y), playerValue )
			checkLine( extractYZVert(z, x, y), 	    playerValue )
			checkLine( extractYZDiagOne(z, x, y), 	playerValue )
			checkLine( extractYZDiagTwo(z, x, y), 	playerValue )
			checkLine( extractZXDiagOne(z, x, y), 	playerValue )
			checkLine( extractZXDiagTwo(z, x, y), 	playerValue )
			checkLine( extractDiag1D1(z, x, y), 	playerValue )
			checkLine( extractDiag1D2(z, x, y), 	playerValue )
			checkLine( extractDiag2D1(z, x, y), 	playerValue )
			checkLine( extractDiag2D2(z, x, y), 	playerValue )
		}

		function update(space) {
			this.checkingSpace = space;
		}

		function checkLine(arr, playerValue) {
			var checkValue = "";
			var winningValue = "";

			// Create winning value
			for(var j = 0; j < ptsToConnect; j++) {
				winningValue = winningValue + playerValue;
			}

			// Create value of line
			for(var i = 0; i < arr.length; i++) {
				checkValue = checkValue + arr[i];
			}

			// Compare values
			if(checkValue.indexOf(winningValue) !== -1) {
				console.log("Line Winner");
				return true;
			}
			else { return false; }
		}

		//Extract line vertical line in reference to placed piece
		//Return an array containing values of that line
		function extractVertical(pz, px, py) {
			var theArr = [];
			for(var y = 0; y < yLength; y++) {
				theArr.push(this.checkingSpace[pz][px][y])
			}
			return theArr;
		}

		//Extract line horizontal line in reference to placed piece
		//Return an array containing values of that line
		function extractHorizontal(pz, px, py) {
			var theArr = [];
			for(var x = 0; x < xLength; x++) {
				theArr.push(this.checkingSpace[pz][x][py])
			}
			return theArr;		
		}

		// Extract positive diagonal line in reference to placed piece
		function extractDiagonalOne(pz, px, py) {
			var theArr = [];
			if(px <= py) {
				var x = 0;		var y = py-px;
			}
			else {
				var x = px-py;	var y = 0;
			}

			for(x, y; x < xLength && y < yLength; x++, y++) {
				theArr.push(this.checkingSpace[pz][x][y])
			}
			return theArr;		
		}

		//Extract negative diagonal line in reference to placed piece
		function extractDiagonalTwo(pz, px, py) {
			var theArr = [];
			var x;
			var y;

			if(px + py >= xLength) {
				x = xLength -1;
				y = py - (x-px);
			}
			else {
				x = px + py;
				y = 0;
			}

			for(x,y; 0 <= x && y < yLength; x--, y++) {
				theArr.push(this.checkingSpace[pz][x][y])
			}
			return theArr;		
		}

		//Extract vertical line in YZ plane of placed piece
		function extractYZVert(pz,px,py) {
			var theArr = [];

			var theArr = [];
			for(var z = 0; z < zLength; z++) {
				theArr.push(this.checkingSpace[z][px][py])
			}
			return theArr;
		}

		//Extract positive-sloped diagonal line in YZ plane of placed piece
		function extractYZDiagOne(pz, px, py) {
			var theArr = [];
			var z;
			var y;

			if(pz <= py) {
				var z = 0;		var y = py-pz;
			}
			else {
				var z = pz-py;	var y = 0;
			}

			for(z, y; z < zLength && y < yLength; z++, y++) {
				theArr.push(this.checkingSpace[z][px][y])
			}
			return theArr;
		}

		//Extract negatively-sloped diagonal line in YZ plane of placed piece
		function extractYZDiagTwo(pz, px, py) {
			var theArr = [];
			var z;
			var y;

			if(pz + py >= yLength) {
				y = yLength -1;
				z = pz - (y-py);
			}
			else {
				z = 0;
				y = pz + py;
			}

			for(z,y; z < zLength && 0 <= y; z++, y--) {
				theArr.push(this.checkingSpace[z][px][y])
			}
			return theArr;
		}

		//Extract positively-sloped diagonal line in ZX plane of placed piece
		function extractZXDiagOne(pz, px, py) {
			var theArr = [];
			var z;
			var x;

			if(pz <= px) {
				var z = 0;		var x = px-pz;
			}
			else {
				var z = pz-px;	var x = 0;
			}

			for(z, x; z < zLength && x < xLength; z++, x++) {
				theArr.push(this.checkingSpace[z][x][py])
			}
			return theArr;
		}

		//Extract negatively-sloped diagonal line in ZX plane of placed piece
		function extractZXDiagTwo(pz, px, py) {
			var theArr = [];
			var z;
			var x;

			if(pz + px >= xLength) {
				x = xLength -1;
				z = pz - (x-px);
			}
			else {
				x = pz + px;
				z = 0;
			}

			for(z,x; z < zLength && 0 <= x; z++, x--) {
				theArr.push(this.checkingSpace[z][x][py])
			}
			return theArr;	
		}

		// Extract one diagonal from first diagonal plane
		function extractDiag1D1(pz, px, py) {
			var theArr = [];
			var z; 	var x; 	 var y;

			z = pz; x = px; y = py;
			var i = z; 	var j = x; 	var k = y;
			// Find beginning of line
			for(i, j, k;  0 <= i && 0 <= j && 0 <= k; i--, j--, k--) {
				if(0 <= i && 0 <= j && 0 <= k) {
					z = i;  	x = j;		y = k;
				}
			}
			// Extract line
			for(z, x, y; z < zLength && x < xLength && y < yLength; z++, x++, y++) {
				theArr.push(this.checkingSpace[z][x][y])
			}
			return theArr;	
		}


		// Extract second diagonal from first diagonal plane
		function extractDiag1D2(pz, px, py) {
			var theArr = [];
			var z; 	var x; 	 var y;

			z = pz; x = px; y = py;
			var i = z; 	var j = x; 	var k = y;

			// Find beginning of line
			for(i, j, k;  0 <= i && j < xLength && k < yLength; i--, j++, k++) {
				if(0 <= i && j < xLength && k < yLength) {
					z = i;  	x = j;		y = k;
				}
			}
			// Extract line
			for(z, x, y; z < zLength && 0 <= x && 0 <= y; z++, x--, y--) {
				theArr.push(this.checkingSpace[z][x][y])
			}
			return theArr;	
		}

		// Extract first diagonal from second diagonal plane
		function extractDiag2D1(pz, px, py) {
			var theArr = [];
			var z; 	var x; 	 var y;

			z = pz; x = px; y = py;
			var i = z; 	var j = x; 	var k = y;
			// Find beginning of line
			for(i, j, k;  0 <= i && j < xLength && 0 <= k; i--, j++, k--) {
				if(0 <= i && j < xLength && 0 <= k) {
					z = i;  	x = j;		y = k;
				}
			}
			// Extract line
			for(z, x, y; z < zLength && 0 <= x && y < yLength; z++, x--, y++) {
				theArr.push(this.checkingSpace[z][x][y])
			}
			return theArr;	
		}

		// Extract second diagonal from second diagonal plane
		function extractDiag2D2(pz, px, py) {
			var theArr = [];
			var z; 	var x; 	 var y;

			z = pz; x = px; y = py;
			var i = z; 	var j = x; 	var k = y;
			// Find beginning of line
			for(i, j, k;  0 <= i && 0 <= j && k < yLength; i--, j--, k++) {
				if(0 <= i && 0 <= j && k < yLength) {
					z = i;  	x = j;		y = k;
				}
			}
			// Extract line
			for(z, x, y; z < zLength && x < xLength && 0 <= y; 	z++, x++, y--) {
				theArr.push(this.checkingSpace[z][x][y])
			}
			return theArr;	
		}

	}// End of GameAlgorithm
	return GameAlgorithm;
}