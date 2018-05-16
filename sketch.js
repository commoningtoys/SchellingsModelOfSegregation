let w;
let h; 
let agent; 
let SM; 
let gridSize; 
let menuSpace = 300;
let randomizedThresholds = false;
let showInfo = false;
let cnv;
function setup() {
	w = windowWidth;
	h = windowHeight;
	gridSize = floor(h * 0.95);
	cnv = createCanvas(innerHeight, innerHeight);
	cnv.parent('p5Sketch');
	rectMode(CENTER);
	background(255);
	frameRate(10);
	// constructor(agentKind, size, threshold1, threshold2, freeCells, randomizedThreshold)
	// SM = new SchellingsModel(2, 30, 10, 30, 30, false);
	initModelByCase(1);
}

function draw() {
	if (SM != null) {
		background(255);
		SM.checkNeighbour();
		SM.moveAgents();
		SM.show();
		if(showInfo)SM.displySatisfaction();
	}
	let t1 = document.getElementById("threshold1");
	let t2 = document.getElementById("threshold2");
	if (parseInt(t1.value) >= parseInt(t2.value)) {
		t2.value = parseInt(t1.value) + 1;
		document.getElementById("theThreshold").innerHTML = thresholdText();
	}
}
function windowResized(){
	resizeCanvas(innerHeight, innerHeight);
	initModel();
}
function initModel() {
	let input1 = document.getElementById("kind").value;
	let input2 = document.getElementById("size").value;
	let input3 = document.getElementById("threshold1").value;
	let input4 = document.getElementById("threshold2").value;
	let input5 = document.getElementById("freeCell").value;
	SM = new SchellingsModel(parseInt(input1),
		parseInt(input2),
		parseInt(input3),
		parseInt(input4),
		parseInt(input5),
		randomizedThresholds);
}

function updateValue() {
	document.getElementById("theSize").innerHTML = "size: " + document.getElementById("size").value;
	document.getElementById("theKind").innerHTML = "kind: " + document.getElementById("kind").value;
	if (!randomizedThresholds) document.getElementById("theThreshold").innerHTML = thresholdText();
	else document.getElementById("theThreshold").innerHTML = randomizedThresholds == true ? "RANDOMIZED! max " + document.getElementById("threshold2").value + "%" : thresholdText();
	document.getElementById("theFreeCell").innerHTML = "free cells: " + document.getElementById("freeCell").value + "%";
}

function randomThreshold() {
	randomizedThresholds = !randomizedThresholds;
	document.getElementById("randomThreshold").innerHTML = randomizedThresholds == true ? "SET BACK TO DEFAULT" : "RANDOMIZE THE THERSHOLDS";
	document.getElementById("theThreshold").innerHTML = randomizedThresholds == true ? "RANDOMIZED! max " + document.getElementById("threshold2").value + "%" : thresholdText();
	initModel();
}
function thresholdText() {
	return document.getElementById("threshold1").value + "% threshold " + document.getElementById("threshold2").value + "%";
}
/**
 * this function intializes the model with different cases
 * @param {int} val - the case to be called
 */
function initModelByCase(val) {
	let emptySpots = document.getElementById("freeCell").value;
	// constructor(agentKind, size, threshold1, threshold2, freeCells, randomizedThreshold)	
	if (val == 1) {
		SM = new SchellingsModel(2, 30, 0, 10, emptySpots, false);
		document.getElementById("theThreshold").innerHTML = "0% &lt threshold &lt 10%";
		document.getElementById("threshold1").value = 0;
	}
	if (val == 2) {
		SM = new SchellingsModel(2, 30, 15, 45, 30, false);
		document.getElementById("theThreshold").innerHTML = "15% &lt threshold &lt 45%";
	}
	if (val == 3) {
		randomThreshold()
	}
}