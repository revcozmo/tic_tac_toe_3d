var boardSpace;
var boardSize =  3;
var elemArray;

var plane0 = document.getElementsByClassName('plane_0');
var plane1 = document.getElementsByClassName('plane_1');
var plane2 = document.getElementsByClassName('plane_2');

//A temporary array to help create the variable elemArray
var tempArray = [plane0, plane1, plane2];

var player1 = true;
var player2;


//Create 3D Array. This array represents 3D space coordinates.
//Example, array[z][x][y].  Z, x, and y refers to points on the 
//z-axis, x-axis, and y-axis, respectively.
function create3By3Array() {
  var arr = [];

  for (var i=0; i<3; i++) {
     arr[i] = [];

     for(var j=0; j < 3; j++) {
     	arr[i][j] = [];
     }
  }
  return arr;
}

boardSpace = create3By3Array();
elemArray = create3By3Array();


//Initialize boardSpace array to null
function makeBoardSpace() {
	var z;
	for(z = 0; z < boardSize; z++){
		var x;
		for(y = 0; y < boardSize; y++) {
			var y;
			for(x = 0; x < boardSize; x++){
				boardSpace[z][x][y] = null;
			}
		}
	}
}

//Create array for HTML elements.
function makeElemArray() {
	var holder;
	for(var i = 0; i < tempArray.length; i++) {
		holder = 0;
		for(var k = 0; k < boardSize; k++) {
			for(var j = 0; j < boardSize; j++) {
				elemArray[i][j][k] = tempArray[i][holder];
				holder++;
			}
		}
	}
}

//Event when player clicks on a space
function forOnClick() {
	var z;
	for(z = 0; z < boardSize; z++){
		var x;
		for(y = 0; y < boardSize; y ++) {
			var y;
			for(x = 0; x < boardSize; x++) {
				elemArray[z][x][y].onclick = (function() {
					var currentZ = z; var currentX = x;	var currentY = y;
					return function() {
						console.log(currentZ, currentX, currentY, this.innerText)
					}
				})();
			}
		}
	}
}


makeBoardSpace();
makeElemArray();
forOnClick();