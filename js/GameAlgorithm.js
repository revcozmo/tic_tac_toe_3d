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
		
		var zLength				= 3;
		var xLength				= 3;
		var yLength				= 3;

		this.update				= update;

		this.checkXYPlane 		= checkXYPlane;
		this.chkHorizontalLn 	= chkHorizontalLn;
		this.chkVerticalLn 		= chkVerticalLn;
		this.chkPosDiagonalLn 	= chkPosDiagonalLn;
		this.chkNegDiagonalLn 	= chkNegDiagonalLn;
		
		this.checkYZPlane 		= checkYZPlane;
		this.chkYZVerticalLn 	= chkYZVerticalLn;
		this.chkYZDiagOneLn 	= chkYZDiagOneLn;
		this.chkYZDiagTwoLn 	= chkYZDiagTwoLn;

		this.checkXZPlane		= checkXZPlane;
		this.chkXZDiagOneLn 	= chkXZDiagOneLn;
		this.chkXZDiagTwoLn 	= chkXZDiagTwoLn;

		this.checkDiagOnePlane	= checkDiagOnePlane;
		this.chkD1D1Ln			= chkD1D1Ln;
		this.chkD1D2Ln			= chkD1D2Ln;

		this.checkDiagTwoPlane	= checkDiagTwoPlane;
		this.chkD2D1Ln			= chkD2D1Ln;
		this.chkD2D2Ln			= chkD2D2Ln;

		function update(space) {
			this.checkingSpace = space;
		}

		function checkXYPlane(pz, px, py) {
			this.chkHorizontalLn(pz, px, py);
			this.chkVerticalLn(pz, px, py);
			this.chkPosDiagonalLn(pz, px, py);
			this.chkNegDiagonalLn(pz, px, py);
		}

		function checkYZPlane(pz, px, py) {
			this.chkYZVerticalLn(pz, px, py);
			this.chkYZDiagOneLn(pz, px, py);
			this.chkYZDiagTwoLn(pz, px, py);
		}

		function checkXZPlane(pz, px, py) {
			this.chkXZDiagOneLn(pz, px, py);
			this.chkXZDiagTwoLn(pz, px, py);
		}

		function checkDiagOnePlane(pz, px, py) {
			this.chkD1D1Ln(pz, px, py);
			this.chkD1D2Ln(pz, px, py);
		}

		function checkDiagTwoPlane(pz, px, py) {
			this.chkD2D1Ln(pz, px, py);
			this.chkD2D2Ln(pz, px, py);
		}


		function chkHorizontalLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelX;

			// Check 'horizontal' line. Y-point stays constant
			// Check in one direction of line.
			for(travelX = px; travelX <= xLength -1 ; travelX++ ) {
				spaceValue = this.checkingSpace[pz][travelX][py];
				
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					// Set to begin check in opposite direction
					travelX = xLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log(" Horizontal! " + checkSum)
					}
				}

				// Check in opposite direction
				if(travelX === xLength - 1) {
					for(travelX = px -1 ; 0 <= travelX; travelX--) {
						spaceValue = this.checkingSpace[pz][travelX][py];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							// Break this loop to stop check in opposite line.
							travelX = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log(" Horizontal " + checkSum)
							}
						}
					}
					// Break for loop to stop overall check
					travelX = xLength;
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
			for(travelY = py; travelY <= yLength -1 ; travelY++ ) {
				spaceValue = this.checkingSpace[pz][px][travelY];
				
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelY = yLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log(" Vertical! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelY === yLength - 1) {
					for(travelY = py -1 ; 0 <= travelY; travelY--) {
						spaceValue = this.checkingSpace[pz][px][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelY = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log(" Vertical!" + checkSum)
							}
						}
					}
					travelY = yLength;
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
						travelY <= yLength -1 && travelX <= xLength -1; 
						travelY++, travelX++) 
			{
				spaceValue = this.checkingSpace[pz][travelX][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelY = yLength -1;
					travelX = xLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("Positive Diagonal! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelY === yLength - 1 || travelX === xLength -1) {
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
							if(checkSum === this.ptsToConnect) {
								console.log("Positive Diagonal! " + checkSum)
							}
						}
					}
					travelY = yLength;
					travelX = xLength;
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
						0<=travelY && travelX <= xLength -1; 
						travelY--, travelX++) 
			{
				spaceValue = this.checkingSpace[pz][travelX][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelY = -1;
					travelX = xLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("Negative Diagonal! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelY === -1 || travelX === xLength -1) {
					for(travelY = py +1, travelX = px -1; 
							travelY <= yLength-1 && 0 <= travelX; 
								travelY++, travelX--) {
						spaceValue = this.checkingSpace[pz][travelX][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelY = yLength;
							travelX = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("Negative Diagonal! " + checkSum)
							}
						}
					}
					travelY = -1;
					travelX = xLength;
				}
			//end of for loop negative diagonal line		
			}	
		//End of chkNegDiagonalLn	
		}


		function chkYZVerticalLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;

			// Check in one direction of line.
			for(travelZ = pz; travelZ <= zLength -1 ; travelZ++ ) {
				spaceValue = this.checkingSpace[travelZ][px][py];
				
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					// Set to begin check in opposite direction
					travelZ = zLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("YZ Line! " + checkSum)
					}
				}

				// Check in opposite direction
				if(travelZ === zLength - 1) {
					for(travelZ = pz -1 ; 0 <= travelZ; travelZ--) {
						spaceValue = this.checkingSpace[travelZ][px][py];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							// Break this loop to stop check in opposite line.
							travelZ = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("YZ Line!" + checkSum)
							}
						}
					}
					// Break for loop to stop overall check
					travelZ = zLength;
				}
			//end of first for loop		
			}	
		//End of chkYZVerticalLn
		}


		function chkYZDiagOneLn(pz, px, py) { 
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;
			var travelY;

			// Z decrements.  Y increments
			// Check in one direction of line.
			for(travelZ = pz, travelY = py; 
						0<=travelZ && travelY <= yLength -1; 
						travelZ--, travelY++) 
			{
				spaceValue = this.checkingSpace[travelZ][px][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelZ = -1;
					travelY = yLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("YZ Diag ONE! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelZ === -1 || travelY === yLength -1) {
					for(travelZ = pz +1, travelY = py -1; 
							travelZ <= zLength-1 && 0 <= travelY; 
								travelZ++, travelY--) {
						spaceValue = this.checkingSpace[travelZ][px][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelZ = zLength;
							travelY = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("YZ Diag ONE! " + checkSum)
							}
						}
					}
					travelZ = -1;
					travelY = yLength;
				}
			//end of first for loop
			}	

		//End of chkYZDiagOneLn
		}

		function chkYZDiagTwoLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;
			var travelY;

			// Z and Y increments
			// Check in one direction of line.
			for(travelZ = pz, travelY = py; 
						travelZ <= zLength && travelY <= yLength -1; 
						travelZ++, travelY++) 
			{
				spaceValue = this.checkingSpace[travelZ][px][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelZ = zLength - 1;
					travelY = yLength - 1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("YZ Diag TWO! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelZ === zLength -1  || travelY === yLength -1) {
					for(travelZ = pz -1, travelY = py -1; 
							0 <= travelZ && 0 <= travelY; 
								travelZ--, travelY--) {
						spaceValue = this.checkingSpace[travelZ][px][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelZ = -1;
							travelY = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("YZ Diag TWO! " + checkSum)
							}
						}
					}
					travelZ = zLength;
					travelY = yLength;
				}
			//end of first for loop
			}	
		//End of chkYZDiagonTwoLn
		}

		function chkXZDiagOneLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;
			var travelX;

			// Z decrements and X increments
			// Check in one direction of line.
			for(travelZ = pz, travelX = px; 
						0 <= travelZ  && travelX <= xLength -1; 
						travelZ--, travelX++) 
			{
				spaceValue = this.checkingSpace[travelZ][travelX][py];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelZ = -1;
					travelX = xLength - 1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("XZ Diag ONE! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelZ === -1  || travelX === xLength -1) {
					for(travelZ = pz + 1, travelX = px -1; 
							travelZ <= zLength - 1 && 0 <= travelX; 
								travelZ++, travelX--) {
						spaceValue = this.checkingSpace[travelZ][travelX][py];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelZ = zLength;
							travelX = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("XZ Diag ONE! " + checkSum)
							}
						}
					}
					travelZ = -1;
					travelX = xLength;
				}
			//end of first for loop
			}	
		//End of chkXZDiagOneLn
		}

		function chkXZDiagTwoLn(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;
			var travelX;

			// Z and X increments
			// Check in one direction of line.
			for(travelZ = pz, travelX = px; 
						travelZ <= zLength -1 && travelX <= xLength -1; 
						travelZ++, travelX++) 
			{
				spaceValue = this.checkingSpace[travelZ][travelX][py];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelZ = zLength -1;
					travelX = xLength - 1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("XZ Diag TWO! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelZ === zLength -1  || travelX === xLength -1) {
					for(travelZ = pz - 1, travelX = px -1; 
							0 <= travelZ && 0 <= travelX; 
								travelZ--, travelX--) {
						spaceValue = this.checkingSpace[travelZ][travelX][py];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelZ = -1;
							travelX = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("XZ Diag TWO! " + checkSum)
							}
						}
					}
					travelZ = zLength;
					travelX = xLength;
				}
			//end of first for loop
			}				
		//End of chkXZDiagTwoLn
		}

		function chkD1D1Ln(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;
			var travelX;
			var travelY;

			// Z and Y decrements. X increments
			for(travelZ = pz, travelX = px, travelY = py; 
						0 <= travelZ && travelX <= xLength -1 && 0 <= travelY; 
						travelZ--, travelX++, travelY--) 
			{
				spaceValue = this.checkingSpace[travelZ][travelX][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelZ = -1;
					travelX = xLength - 1;
					travelY	= -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("DiagOne Line One! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelZ === -1  || travelX === xLength -1 || travelY === -1) {
					for(travelZ = pz + 1, travelX = px -1, travelY = py + 1; 
							travelZ <= zLength-1 && 0 <= travelX && travelY <= yLength-1; 
								travelZ++, travelX--, travelY++) {
						spaceValue = this.checkingSpace[travelZ][travelX][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelZ = zLength;
							travelX = -1;
							travelY = yLength;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("DiagOne Line TWO! " + checkSum)
							}
						}
					}
					travelZ = -1;
					travelX = xLength;
					travelY = -1;
				}
			//end of first for loop
			}				
		//End of chkD1D1Ln	
		}


		
		function chkD1D2Ln(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;
			var travelX;
			var travelY;

			// Z and X increments. Y decrements
			for(travelZ = pz, travelX = px, travelY = py; 
						travelZ <= zLength -1 && travelX <= xLength -1 && 0 <= travelY; 
						travelZ++, travelX++, travelY--) 
			{
				spaceValue = this.checkingSpace[travelZ][travelX][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelZ = zLength - 1;
					travelX = xLength - 1;
					travelY	= -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("DiagOne Line Two! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelZ === zLength-1  || travelX === xLength -1 || travelY === -1) {
					for(travelZ = pz - 1, travelX = px -1, travelY = py + 1; 
							0 <= travelZ && 0 <= travelX && travelY <= yLength-1; 
								travelZ--, travelX--, travelY++) {
						spaceValue = this.checkingSpace[travelZ][travelX][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelZ = -1;
							travelX = -1;
							travelY = yLength;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("DiagOne Line TWO! " + checkSum)
							}
						}
					}
					travelZ = zLength;
					travelX = xLength;
					travelY = -1;
				}
			//end of first for loop
			}							
		// End of chkD1D2Ln
		}

		function chkD2D1Ln(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;
			var travelX;
			var travelY;

			// Z, X, and Y increment.
			for(travelZ = pz, travelX = px, travelY = py; 
					travelZ <= zLength -1 && travelX <= xLength -1 && travelY <= yLength-1; 
						travelZ++, travelX++, travelY++) 
			{
				spaceValue = this.checkingSpace[travelZ][travelX][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelZ = zLength - 1;
					travelX = xLength - 1;
					travelY	= yLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("DiagTwo Line One! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelZ === zLength-1  || travelX === xLength -1 || travelY === yLength-1) {
					for(travelZ = pz - 1, travelX = px -1, travelY = py - 1; 
							0 <= travelZ && 0 <= travelX && 0 <= travelY; 
								travelZ--, travelX--, travelY--) {
						spaceValue = this.checkingSpace[travelZ][travelX][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelZ = -1;
							travelX = -1;
							travelY = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("DiagTwo Line one! " + checkSum)
							}
						}
					}
					travelZ = zLength;
					travelX = xLength;
					travelY = yLength;
				}
			//end of first for loop
			}	
		//End of chkD2D1Ln	
		}
		
		function chkD2D2Ln(pz, px, py) {
			var spaceValue = 0;
			var checkSum = 0;
			var travelZ;
			var travelX;
			var travelY;

			// Z decrements. X and Y increment.
			for(travelZ = pz, travelX = px, travelY = py; 
					0 <= travelZ && travelX <= xLength -1 && travelY <= yLength-1; 
						travelZ--, travelX++, travelY++) 
			{
				spaceValue = this.checkingSpace[travelZ][travelX][travelY];
			
				if(spaceValue === null || spaceValue === 'block' 
					|| spaceValue === 'bomb' || spaceValue === -1) {
					travelZ = -1;
					travelX = xLength - 1;
					travelY	= yLength -1;
				}
				else {
					checkSum += spaceValue;
					if(checkSum === this.ptsToConnect) {
						console.log("DiagTwo Line Two! " + checkSum)
					}
				}

				// Check in opposite direction
				// Check when reached one side
				if(travelZ === -1  || travelX === xLength -1 || travelY === yLength-1) {
					for(travelZ = pz + 1, travelX = px -1, travelY = py - 1; 
							travelZ <= zLength-1 && 0 <= travelX && 0 <= travelY; 
								travelZ++, travelX--, travelY--) {
						spaceValue = this.checkingSpace[travelZ][travelX][travelY];
						if(spaceValue === null || spaceValue === 'block' 
								|| spaceValue === 'bomb' || spaceValue === -1) {
							//something
							travelZ = zLength-1;
							travelX = -1;
							travelY = -1;
						}
						else {
							checkSum += spaceValue;
							if(checkSum === this.ptsToConnect) {
								console.log("DiagTwo Line TWO! " + checkSum)
							}
						}
					}
					travelZ = -1;
					travelX = xLength;
					travelY = yLength;
				}
			//end of first for loop
			}	
		// End of chkD2D2Ln
		}
		

	// End of GameAlgorithm
	}

	return GameAlgorithm;
}