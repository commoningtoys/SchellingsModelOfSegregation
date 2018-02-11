// let agentColors = [];
let blue, red;
class Agent{
	/**
	* constructor for the agent class
	* @param {int} type - the type of agent, is an integer between 0 and 8
	* usually are only used to different type but can be interesting with more
	* @param {int} thershold - dafines the percentage of non similar neighbours are tolerated
	*/
	constructor(type, threshold1, threshold2){
		this.sat = 0;//defines the satisfaction of the agent 1 is satisfied and 0 unsatisfied
		this.type = type;
		this.t1 = threshold1;
		this.t2 = threshold2;
		// this.tu = threshold <= 20 ? this.tu = 100 - map(threshold, 0, 20, 40, 0) : null;
		this.move = 0;
		this.alpha = map(parseFloat(this.t2), 10, 70, 25, 255);//maps the threshold of the agent
		this.agentColors = [color(255, 0, 0, this.alpha), color(0, 255, 0, this.alpha), color(0, 0, 255, this.alpha), 
				   color(255, 255, 0, this.alpha), color(0, 255, 255, this.alpha), color(255, 0, 255, this.alpha),
				   color(0, this.alpha), color(255, this.alpha)];
		
	blue = color(0, 0, 255);
	red = color(255, 0, 0);
	}
	/**
	* constructor for the agent class
	* @param {int} x - position on x axis
	* @param {int} y - position on y axis
	* @param {int} r - radius of polygon
	*/
	show(x, y, r){
		strokeWeight(3);
		stroke(0);
		noFill();
		fill(0, this.alpha);
		beginShape();
		for(let i = 0; i < this.type + 3; i++){
			let angle = map(i, 0, this.type + 3, 0 - HALF_PI, TWO_PI - HALF_PI);
			let posX = x + cos(angle) * (r/2.2);
			let posY = y + sin(angle) * (r/2.2);
			vertex(posX, posY);
		}
		endShape(CLOSE);
		// fill(red);
		// text(this.sat, x, y)

	}
}