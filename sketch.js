let w, h, agent, SM, gridSize, menuSpace = 300,
	osc, osc2, env,
	randomizedThresholds = false;
function setup(){
	w = windowWidth;
	h = windowHeight;
	gridSize = floor(h * 0.95);
	createCanvas(w, h);
	rectMode(CENTER);
	background(255);
	// initialize the sound library
	frameRate(10);
	osc = new p5.Oscillator();
	osc.setType('triangle');
	osc2 = new p5.Oscillator();
	osc2.setType('sawtooth');
	env = new p5.Env();
	osc.start();
	// osc2.start();
	env.setADSR(0.001, 0.5, 0.1, 0.5);
	env.setRange(1, 0);
	// initModel();
	// volume0();
	SM = new SchellingsModel(30, 50, 10, 6, 30, false);
}

function draw(){	
	if(SM != null){
			background(255);
			SM.checkNeighbour();
			SM.moveAgents();
			SM.displySatisfaction();				
			SM.show();
		}
}

function initModel(){
	let input1 = document.getElementById("kind").value;
	let input2 = document.getElementById("size").value;
	let input3 = document.getElementById("threshold").value;
	let input4 = document.getElementById("freeCell").value;
	SM = new SchellingsModel(parseInt(input2), 50, parseInt(input4), parseInt(input1), parseInt(input3), randomizedThresholds);
}

function updateValue(){
	document.getElementById("theSize").innerHTML = "size: " + document.getElementById("size").value;
	document.getElementById("theKind").innerHTML = "kind: " + document.getElementById("kind").value;
	if(!randomizedThresholds)document.getElementById("theThreshold").innerHTML = "threshold: " + document.getElementById("threshold").value + " %";
	document.getElementById("theFreeCell").innerHTML = "freeCell: " + document.getElementById("freeCell").value + " %";
}

function randomThreshold(){
	randomizedThresholds = !randomizedThresholds;
	document.getElementById("randomThreshold").innerHTML = randomizedThresholds == true ? "SET BACK TO DEFAULT" : "RANDOMIZE THE THERSHOLDS";
	document.getElementById("theThreshold").innerHTML = randomizedThresholds == true ? "RANDOMIZED!" : "threshold: " + document.getElementById("threshold").value + " %";
}
/**
AUDIO STUFF
*/
//THE FLLOWING FUNCTIONS TURN ON AND OFF THE SOUND
function volume0(){
	masterVolume(0, 0.5);
}
function volumeUp(){	
	masterVolume(1, 0.5);
}
//improve audio!!!!
function playSound(num, divider){
	let midiValue = map(num, 0, document.getElementById("size").value, 20, 100);
	let frequency = map(num, 0, document.getElementById("size").value, 120, 660);
    var freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);
    // osc2.freq(frequency);
    // env.add(osc2);
    env.play(osc, 0, 0.1);
    // env.play(osc2, 0, 0.1);
    // env.add(osc2);
}