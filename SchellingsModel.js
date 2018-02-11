// let agents = [];
class SchellingsModel {
	/**
	* @param {int} size - number of colums and rows of the grid
	* @param {int} percentage - percentage of agents of one type or another
	* @param {int} freeCells - percentage of free cells in the grid // deprecated
	* @param {int} agentKind - how many different kind of agnts are present on the 
	* @param {int} threshold - maximum amount of "fremd" neighbour the agent can have
	* @param {boolean} randomizedThreshold - if true the schelling's model starts with randomized thresholds
	  that change according to how much the agent had to move.
	*/
	constructor(agentKind, size, threshold1, threshold2, freeCells, randomizedThreshold) {
		this.cols = this.rows = size + 1;
		this.r = floor(gridSize / size + 1);
		this.AK = agentKind;
		this.agents = [];
		this.agents = matrix(this.rows, this.cols, null);
		this.agentCount = 0;
		this.unhappinessIndex = [];
		this.unhappyCount = 0;
		this.decreaseValue = 0.000000001;
		//initialize the model by filling the 2D array with agents
		for (let y = 1; y < this.rows - 1; y++) {
			for (let x = 1; x < this.cols - 1; x++) {
				if (floor(random(100)) > freeCells) {
					this.agents[x][y] = new Agent(floor(random(agentKind)), randomizedThreshold == true ? 0 : threshold1, randomizedThreshold == true ? floor(random(1, 100)) : threshold2);// randomizedThreshold == true ? floor(random(2, 9)) * 10 : threshold
					this.agentCount++;
				}
			}
		}
	}

	show() {
		for (let y = 1; y < this.rows - 1; y++) {
			for (let x = 1; x < this.cols - 1; x++) {
				if (this.agents[x][y] != null) this.agents[x][y].show(350 + x * this.r, y * this.r, this.r);
			}
		}
	}

	moveAgents() {
		let freeSpots = emptySpots(this.agents);
		this.unhappyCount = 0;
		for (let y = 1; y < this.rows - 1; y++) {
			for (let x = 1; x < this.cols - 1; x++) {
				if (this.agents[x][y] != null) {
					if (this.agents[x][y].sat < 1) {
						moveAgent(this.agents, x, y, freeSpots);
						this.unhappyCount++;
					}
				}
			}
		}
		/**
		 * function that updates the position of the agents in the
		 * neighbourhood
		 * @param {Agent array} agents - the array of agents
		 * @param {int} x - position of the agent on x axis
		 * @param {int} y - position of the agent on y axis
		 * @param {Array} arr - freeSpots array 
		 */
		function moveAgent(agents, x, y, arr) {
			let d = 0, minD = gridSize,
				newX = 0, newY = 0;ß
			let index = floor(random(arr.length));//check for a random position
			newX = arr[index].x;
			newY = arr[index].y;
			agents[newX][newY] = agents[x][y];
			agents[x][y] = null;
			agents[newX][newY].sat = 1;//reset satisfaction of the agent to 1
			//we play a note according to the distance the agent had to move
			d = dist(x, y, newX, newY);
			// playSound(d, floor(gridSize / size + 1));//improve this using this.r or similar
			freeSpots = emptySpots(agents);//update the empty position array
		}
		/**
		 * function that returns an array of empty spots where the agents can move to
		 * @param {2D Array} arr2D - a 2D array that stores the agents
		 * @returns {2D Array} spots - a 2D array with the empty spots
		 */
		function emptySpots(arr2D) {
			let spots = [];
			for (let row = 1; row < arr2D.length - 1; ++row) {
				for (let col = 1; col < arr2D[row].length - 1; ++col) {
					if (arr2D[row][col] == null) spots.push(createVector(row, col));
				}
			}
			return spots;
		}

	}

	checkNeighbour() {
		let totalNeighbour = 0;
		let totalSameType = 0;
		let totalOtherType = 0;
		for (let y = 1; y < this.rows - 1; y++) {
			for (let x = 1; x < this.cols - 1; x++) {
				if (this.agents[x][y] != null) {//always ignore the null spot
					//////////////////////
					for (let i = -1; i <= 1; i++) {
						for (let j = -1; j <= 1; j++) {
							if (this.agents[x + j][y + i] != null) totalNeighbour++;//here we check the number of neighbours
							if (this.agents[x + j][y + i] != null && this.agents[x + j][y + i].type == this.agents[x][y].type) totalSameType++;
							if (this.agents[x + j][y + i] != null && this.agents[x + j][y + i].type != this.agents[x][y].type) totalOtherType++;
						}
					}
					//here we check if the amount of unwanted neighbours surpasses the threshold
					if (totalNeighbour - 1 > 0) {//here we check if there is any neighbour around the agent
						let percSameType = floor(((totalSameType - 1) / (totalNeighbour - 1)) * 100);//we do minus 1 because the loop checks also the agent itself
						let percOtherType = floor(((totalOtherType - 1) / (totalNeighbour - 1)) * 100);
						if (this.agents[x][y].t1 < 1) {//if the lower threshold is less than 1 we consider only the upper threshold
							if (percSameType >= this.agents[x][y].t2) this.agents[x][y].sat = 1;//reduce the agent satisfaction accoding to the percentage of same neighbours
							else this.agents[x][y].sat = 0;
						} else {
							if (percOtherType >= this.agents[x][y].t1 && percSameType >= this.agents[x][y].t2) this.agents[x][y].sat = 1;//reduce the agent satisfaction accoding to the percentage of same neighbours
							else this.agents[x][y].sat = 0;
						}
					} else this.agents[x][y].sat = 1;// if there is no one around the agent is satisfied
					//reset the counters
					totalNeighbour = 0;
					totalSameType = 0;
					totalOtherType = 0;
					//////////////////////////	end of this.agents[x][y] !=null if
				}
			}
		}
	}
	// this function displays the total satisfaction of the population of the agents
	displySatisfaction() {
		let unhappiness = map(this.unhappyCount, 0, this.agentCount, 0, 100);//needs to be revised!!
		this.unhappinessIndex.push(unhappiness);
		if (this.unhappinessIndex.length > 100) {
			this.unhappinessIndex.splice(0, 1);
		}
		noFill();
		stroke(0);
		strokeWeight(5);
		beginShape();
		for (let i = 0; i < this.unhappinessIndex.length; i++)vertex(5 + i * 3, 500 - this.unhappinessIndex[i]);
		endShape();
		document.getElementById("happinessValue").innerHTML = ":-( level\n" + parseInt(unhappiness) + " %";
	}
}

/**
* 2D array function
* from Douglas Crockford (JavaScript: The Good Parts, p.64)
* @param {int} rows - number of rows
* @param {int} cols - number of columns
* @param {int} initial - initial value
*/
let matrix = function (rows, cols, initial) {
	let arr = [];
	for (let i = 0; i < rows; ++i) {
		let columns = [];
		for (let j = 0; j < cols; ++j) {
			columns[j] = initial;
		}
		arr[i] = columns;
	}
	return arr;
}