angular
	.module('ttt3DApp')
	.factory('GameAlgorithm', GameAlgorithmFunc)

function GameAlgorithmFunc() {

	var GameAlgorithm = function(gameSpace, pointsToConnect) {

		// Initialize to gameSpace
		this.checkingSpace		= gameSpace;
		
		// var ptsToConnect 	= pointsToConnect;
		this.ptsToConnect = 3;
		var boardLength = 3;

		this.checkXYPlane 		= checkXYPlane;
		this.chkHorizontalLn 	= chkHorizontalLn;
		this.chkVerticalLn 		= chkVerticalLn;
		this.chkPosDiagonalLn 	= chkPosDiagonalLn;
		this.chkNegDiagonalLn 	= chkNegDiagonalLn;
		this.update				= update;

		function update(space) {
			this.checkingSpace = space;
		}

		function checkXYPlane(pz, px, py) {
			this.chkHorizontalLn(pz, px, py);
			this.chkVerticalLn(pz, px, py);
			this.chkPosDiagonalLn(pz, px, py);
			this.chkNegDiagonalLn(pz, px, py);
		}

		function chkHorizontalLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelX;

			// Check 'horizontal' line. Y-point stays constant
			// Check in one direction of line.
			for(travelX = px; travelX <= boardLength -1 ; travelX++ ) {
				spaceValue = this.checkingSpace[pz][travelX][py];
				
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					// Set to begin check in opposite direction
					travelX = boardLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === 3) {
						console.log(" Horizontal! " + checkSum)
					}
				}

				// Check in opposite direction
				if(travelX === boardLength - 1) {
					for(travelX = px -1 ; 0 <= travelX; travelX--) {
						spaceValue = this.checkingSpace[pz][travelX][py];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							// Break this loop to stop check in opposite line.
							travelX = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === 3) {
								console.log(" Horizontal " + checkSum)
							}
						}
					}
					// Break for loop to stop overall check
					travelX = boardLength;
				}
			//end of for loop horizontal line		
			}	

		}


		// Check 'vertical' line. X-point stays constant
		function chkVerticalLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelY;
		
			// Check in one direction of line.
			for(travelY = py; travelY <= boardLength -1 ; travelY++ ) {
				spaceValue = this.checkingSpace[pz][px][travelY];
				
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelY = boardLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === 3) {
						console.log(" Vertical! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelY === boardLength - 1) {
					for(travelY = py -1 ; 0 <= travelY; travelY--) {
						spaceValue = this.checkingSpace[pz][px][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelY = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === 3) {
								console.log(" Vertical!" + checkSum)
							}
						}
					}
					travelY = boardLength;
				}
			//end of for loop vertical line		
			}	
		//End of chkVerticalLn	
		}


		// Check 'positive diagonal' line. X and y points increment
		function chkPosDiagonalLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelX;
			var travelY;

			// Check in one direction of line.
			for(travelY = py, travelX = px; 
						travelY <= boardLength -1 && travelX <= boardLength -1; 
						travelY++, travelX++) 
			{
				spaceValue = this.checkingSpace[pz][travelX][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelY = boardLength -1;
					travelX = boardLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === 3) {
						console.log("Positive Diagonal! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelY === boardLength - 1 || travelX === boardLength -1) {
					for(travelY = py -1, travelX = px -1; 
							0 <= travelY && 0 <= travelX; 
								travelY--, travelX--) {
						spaceValue = this.checkingSpace[pz][travelX][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelY = -1;
							travelX = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === 3) {
								console.log("Positive Diagonal! " + checkSum)
							}
						}
					}
					travelY = boardLength;
					travelX = boardLength;
				}
			//end of for loop positive diagonal line		
			}	

		//End of chkPosDiagonalLn
		}


		// Check 'neg diagonal' line. X point increments. Y point decrements
		function chkNegDiagonalLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelX;
			var travelY;

			// Check in one direction of line.
			for(travelY = py, travelX = px; 
						0<=travelY && travelX <= boardLength -1; 
						travelY--, travelX++) 
			{
				spaceValue = this.checkingSpace[pz][travelX][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelY = -1;
					travelX = boardLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === 3) {
						console.log("Negative Diagonal! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelY === -1 || travelX === boardLength -1) {
					for(travelY = py +1, travelX = px -1; 
							travelY <= boardLength-1 && 0 <= travelX; 
								travelY++, travelX--) {
						spaceValue = this.checkingSpace[pz][travelX][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelY = boardLength;
							travelX = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === 3) {
								console.log("Negative Diagonal! " + checkSum)
							}
						}
					}
					travelY = -1;
					travelX = boardLength;
				}
			//end of for loop negative diagonal line		
			}	
		//End of chkNegDiagonalLn	
		}

	// End of GameAlgorithm
	}

	return GameAlgorithm;
}