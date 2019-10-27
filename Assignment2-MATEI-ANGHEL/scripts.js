"use strict";

function xoReferee(stringArr){
	let combination = "";

	// Check horizontals
	for(let i = 0; i < stringArr.length; i++){
		combination = stringArr[i];
		if(combination == "XXX")
			return "X";
		else if (combination == "OOO")
			return "O";
	}

	// Check verticals
	for(let i = 0; i < stringArr[0].length; i++){
		combination = "";
		for(let j = 0; j < stringArr.length; j++){
			combination += stringArr[j][i];
		}
		if(combination == "XXX")
			return "X";
		else if (combination == "OOO")
			return "O";
	}

	// Check diagonals
	combination = stringArr[0][0] + stringArr[1][1] + stringArr[2][2];
	if(combination == "XXX")
		return "X";
	else if (combination == "OOO")
		return "O";

	combination = stringArr[0][2] + stringArr[1][1] + stringArr[2][0];
	if(combination == "XXX")
		return "X";
	else if (combination == "OOO")
		return "O";

	return "D";
} // I'm sorry

function safePawns(pawnArr){
	let count = 0;
	for(let i of pawnArr){
		for(let j of pawnArr){
			if(j[1] == (i[1] - 1)){
				if(j[0] == String.fromCharCode(i.charCodeAt(0) - 1) || j[0] == String.fromCharCode(i.charCodeAt(i) + 1)){
					count = count + 1;
					break;
				}
			}
		}
	}

	return count;
}

function rectanglesUnion(rectCoords){
	let totalArea = (rectCoords[2] - rectCoords[0]) * (rectCoords[3] - rectCoords[1]);
	return totalArea;
}

function fastTrain(){

}