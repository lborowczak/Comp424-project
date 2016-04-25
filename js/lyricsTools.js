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
function calculatedTimes(charArray, songLength){
	var songLengthInMS = songLength * 100;

    //Get the number of ms per letter / 10, rounded to the nearest ms
	var msPerLetter = Math.round(songLengthInMS/charArray.length);
	var returnArray = new Array();
	for (var i = 0; i < charArray.length; i++)
	{
		var tmpArray = [charArray[i], msPerLetter * (i + 1)];
		returnArray.push(tmpArray)
	}
	return returnArray;
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
	return upper.replace(/['!?.,:;"$\[\]{}|@#$%^&*()-=+\\\t]+/gi, "");
}
