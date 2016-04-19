"use strict";

function getFirstLetters(wordsArray){
	
	wordsArray.forEach(function(currItem) {
		returnFirstLetters.push(currItem.charAt(0))
	})
	return returnFirstLetters;
}

//songLength in s
function calculateTimes(array, songLength){
	var songLengthInMS = songLength * 1000;
	var arraySize = array.length;
	return arraySize/songLengthInMS; //TODO is this right? Do we want it to add a timestamp next to each letter, or do we calculate that client-side?
}
	


//Possibly not needed
function newLinesToCharArray(stringToParse) {
	var returnFirstLetters;
	stringToParse.split("\n")
		.forEach(function (currItem) {
			returnFirstLetters.push(stringToParse.split(""));
		}
		
}


//Not needed
function newLinesToArray(stringToParse) {
	var returnLinesArray = stringToParse.split("\n");
}

function stringToCharArray(stringToParse) {
	var returnLinesArray = stringToParse.split("");
}
