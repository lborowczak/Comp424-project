"use strict";

function getFirstLettersArray(lyricsString){

	var cleanString = prepareString(lyrics);
	var firstLetters = new Array();

	//Split on newlines and spaces
	cleanString.split(/[\n ]+/)
	.forEach(function(currItem) {
		firstLetters.push(currItem.charAt(0))
	})
	return firstLetters;
}

//songLength in s
function calculateTimes(array, songLength){
	var songLengthInMS = songLength * 1000;
	var arraySize = array.length;
	return (arraySize/songLengthInMS); //TODO is this right? Do we want it to add a timestamp next to each letter, or do we calculate that client-side?
}


function getCharArray(stringToParse) {

	var cleanString = prepareString(stringToParse);
	var lettersArray = new Array();

	//Split on newlines and spaces
	cleanString.split(/[\n ]+/)
	.forEach(function (currItem) {

		//Split between every character
		currItem.split("")
		.forEach(function (currChar) {
			lettersArray.push(currChar);
		})
	});
	return lettersArray;
}

//Function to remove many unsupported characters:
//! ? . , : ; " $ [ ] { } | " @ # $ % ^ & * ( ) - = + \ (tab)
function prepareString (stringToPrepare) {
	var upper = stringToPrepare.toUpperCase();
	return upper.replace(/[!?.,:;"$\[\]{}|@#$%^&*()-=+\\\t]+/gi, "");
}
