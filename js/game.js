
$('#submitSN').click(function(event){

  event.preventDefault();
  var artist = document.getElementById('searchForm').value
  var url = 'http://localhost:3000/search/?searchString=' + artist
  $.ajax({url: url, dataType: 'jsonp',success: function(data){
    lyrics = data.lyrics;
    songLength = data.song_length;
    document.getElementById('lyricbox').innerHTML = lyrics;
    alert("Lyrics have been loaded successfully")

}});
});


function begin(){
    if(document.getElementById('hard').checked){
    letters = calculatedTimes(getCharArray(lyrics), songLength);
    document.getElementById('hard').checked = false;
  } else {
    letters = calculatedTimes(getFirstLettersArray(lyrics), songLength);
    document.getElementById('easy').checked = false;


  }

var letterCount = 0;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "#0DAE61	"

//Global variable setup

var correctLettersCounter = 0;
var totalLettersCounter = -1;
var velocity = -1;
var topOffset = 20;
var letterCanvasWidth=28;
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

//Start drawing
setInterval(deleteOldLetters, 1000/10);
setInterval(updateLetterPos, 1000/10);
var lastRender = Date.now();
var initTime = Date.now();
render();

function updateLetterPos() {
  for (var i=0; i < letters.length; i++)
   letters[i][1] += velocity;
}


//Add key events to the canvas
window.addEventListener( "keydown", doKeyDown, true);

function render() {
 var delta = Date.now() - lastRender;
 drawGame();
 requestAnimationFrame(render);
 lastRender = Date.now();
}

function drawGame() {
 drawUpcomingLetters();
}

function setupOffsets() {
 for (var i = 0; i < 27; i++) {
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
	document.getElementById("final_score").value = correctLettersCounter;
}

function drawUpcomingLetters() {
 if (letters.length == 0) return;
 for (var i = 0; i < letters.length; i++) {
	 updateLetter(letters[i]);
 }
}

function updateLetter(letter) {
 clearLetter(letter);
 if (letter[1] < 45 && letter[1] > -45) {
	 drawLetter("stroke", letter[0], topOffset);
//   	 ctx.drawImage(strokeFonts[alphabet.indexOf(letter[0])], tmpOffset, topOffset);
 }

 drawLetter("fill", letter[0], letter[1]);
//    ctx.drawImage(fillFonts[alphabet.indexOf(letter[0])], tmpOffset, letter[1]);
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
