function begin(){
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "orange"

//Global variable setup
var correctLettersCounter = 0;
var totalLettersCounter = -1;
var velocity = -5;
var topOffset = 20;
var letterCanvasWidth=28;
var letters = new Array();
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var offsets = new Array();
setupOffsets();
var progressBar = document.getElementById("progressBar");

//add a canvas for each character
var strokeFonts = new Array();
var fillFonts = new Array();
addCanvases();

//Initial draw calls
drawTopLetters();
createUpcomingLetters();

//Start drawing
setInterval(createUpcomingLetters, 10000/10);
setInterval(deleteOldLetters, 1000/10);
var lastRender = Date.now();
var initTime = Date.now();
render();

//Add key events to the canvas
window.addEventListener( "keydown", doKeyDown, true);

function render() {
 var delta = Date.now() - lastRender;
 velocity = -Math.floor((delta/16) * (Math.log(Date.now() - initTime)/Math.log(10)) );
 drawGame();
 requestAnimationFrame(render);
 lastRender = Date.now();
}

function drawGame() {
 drawUpcomingLetters();
}

function setupOffsets() {
 for (i=0; i< 27; i++) {
	 offsets[i] = 50 + (i*35);
 }
}

function addCanvases() {
    ctx.textBaseline = "hanging";
    ctx.font = "38px Droid Sans Mono";
    ctx.textAlign = "left";

    for (var i=0; i < 27; i++) {
        var renderedText = document.createElement('canvas');
        renderedText.width = letterCanvasWidth;
        renderedText.height = 40;
        var tmpCtx = renderedText.getContext('2d');
        tmpCtx.textBaseline = "hanging";
        tmpCtx.font = "38px Droid Sans Mono";
        tmpCtx.textAlign = "left";
        tmpCtx.strokeText(alphabet[i], 2, 2);
        tmpCtx.strokeText(alphabet[i], 2, 2);
        tmpCtx.strokeText(alphabet[i], 2, 2);
        tmpCtx.strokeText(alphabet[i], 2, 2);
        tmpCtx.strokeText(alphabet[i], 2, 2);
        tmpCtx.strokeText(alphabet[i], 2, 2);
        tmpCtx.strokeText(alphabet[i], 2, 2);
        tmpCtx.strokeText(alphabet[i], 2, 2);
        strokeFonts.push(renderedText);
    }

    for (var i=0; i < 27; i++) {
        var renderedText = document.createElement('canvas');
        renderedText.width = letterCanvasWidth;
        renderedText.height = 40;
        var tmpCtx = renderedText.getContext('2d');
        tmpCtx.textBaseline = "hanging";
        tmpCtx.font = "38px Droid Sans Mono";
        tmpCtx.textAlign = "left";
        tmpCtx.fillText(alphabet[i], 2, 2);
        fillFonts.push(renderedText);
    }
}

function drawTopLetters() {
    for (var i=0; i < alphabet.length; i++) {
    ctx.drawImage(strokeFonts[i], offsets[i], topOffset);
    }
}

function updateCounter() {
    progressBar.setAttribute("value", correctLettersCounter);
    progressBar.setAttribute("max", totalLettersCounter);
    document.getElementById('counter').innerHTML = correctLettersCounter +"/" + totalLettersCounter;
}

function drawUpcomingLetters() {
 if (letters.length == 0) return;
 for (i = 0; i < letters.length; i++) {
	 updateLetter(letters[i]);
 }
}

function updateLetter(letter) {
 clearLetter(letter);
 if (letter[1] < 45 && letter[1] > -45) {
	 drawLetter("stroke", letter[0], topOffset);
//   	 ctx.drawImage(strokeFonts[alphabet.indexOf(letter[0])], tmpOffset, topOffset);
 }
 letter[1] += velocity;
 drawLetter("fill", letter[0], letter[1]);
//    ctx.drawImage(fillFonts[alphabet.indexOf(letter[0])], tmpOffset, letter[1]);
}

function createUpcomingLetters() {
 deleteOldLetters();
 var randNum = Math.floor(Math.random() * 26);
 var tmpArray= [alphabet[randNum],500];
 letters.push(tmpArray);
}

function deleteOldLetters() {
 if (letters.length == 0) return;
 if (!(letters[0][1] > -100)) {
	 letters.shift();
	 totalLettersCounter += 1;
	 updateCounter();
 }
}

function getOffset(tmpLet) {
 return offsets[alphabet.indexOf(tmpLet)];
}


function doKeyDown(e) {
 if (e.which == 0 || e.ctrlKey || e.metaKey || e.altKey) {
	 return;
 }
 var key = (String.fromCharCode(e.keyCode)).toUpperCase();
 for (var i=0; i < letters.length; i++) {

	 if (letters[i][0] == key) {

		 var letterLoc = letters[i][1];
		 if (letterLoc < 45 && letterLoc > -45) {
		 	 correctLettersCounter +=1;
			 clearLetter(letters[i]);
			 drawLetter("stroke", key, topOffset);
			 letters[i][1] = -200;
			 return;
		 }
	 }
 }
}

function clearLetter(letter) {
 ctx.clearRect(getOffset(letter[0]), letter[1], letterCanvasWidth, 40);
}

function drawLetter(type, character, offset) {
 switch (type) {
	 case "fill":
		 ctx.drawImage(fillFonts[alphabet.indexOf(character)], getOffset(character), offset);
		 break;
	 case "stroke":
		 ctx.drawImage(strokeFonts[alphabet.indexOf(character)], getOffset(character), offset);
		 break;
 }
 }

}