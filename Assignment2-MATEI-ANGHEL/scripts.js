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

function rectanglesUnion(rectArr){
	let localTotal = 0;
	for(let i = 0; i < rectArr.length; i++){
		localTotal += rectangleArea(rectArr[i]);
		for(let j = i + 1; j < rectArr.length; j++){
			if(doOverlap(rectArr[i], rectArr[j])){
				let x1 = rectArr[i][0] >= rectArr[j][0] ? rectArr[i][0] : rectArr[j][0]
				let x2 = rectArr[i][2] <= rectArr[j][2] ? rectArr[i][2] : rectArr[j][2]
				let y1 = rectArr[i][1] >= rectArr[j][1] ? rectArr[i][1] : rectArr[j][1]
				let y2 = rectArr[i][3] <= rectArr[j][3] ? rectArr[i][3] : rectArr[j][3]
				localTotal -= rectangleArea([x1, y1, x2, y2]);
				break;
			}
		}
	}

	return localTotal;

	function rectangleArea(coords){
		return (coords[2] - coords[0]) * (coords[3] - coords[1]);
	}

	function doOverlap(rect1, rect2){
		if(rect1[0] > rect2[2] || rect2[0] > rect1[2])
			return false;
		if(rect1[1] > rect2[3] || rect2[1] > rect1[3])
			return false;
		return true;
	}
}

function fastTrain(rails){
	// Setup
	let arr = [];
	for(let i = 0; i < rails.length; i++){
		for(let j = 0; j < rails[i][0]; j++){
			arr.push(rails[i][1]);
		}
	}

	arr[0] = 1;
	arr[arr.length - 1] = 1;

	let isChanged = true;
	while(isChanged){
		isChanged = false;
		// Filter left to right
		for(let i = 0; i < arr.length - 1; i++){
			if(arr[i] + 1 < arr[i + 1]){
				arr[i + 1] = arr[i] + 1;
				isChanged = true;
			}
		}
		// Filter right to left
		for(let i = arr.length - 1; i > 0; i--){
			if(arr[i] > arr[i - 1] + 1){
				arr[i - 1] = arr[i] - 1;
				isChanged = true;
			}
		}
		// Filter num sequences
		for(let i = 0; i < arr.length - 1; i++){
			let k = i;
			for(let n = 0; n < arr[i] - 1; n++){
				i++;
				if(arr[k] < arr[i]){
					arr[i] = arr[k];
					isChanged = true;
				}
				else if(arr[k] > arr[i]){
					arr[k]--;
					isChanged = true;
				}
			}
		}
	}

	let sum = 0;
	for(let i = 0; i < arr.length; i++){
		sum += 1 / arr[i];
	}

	return sum;
}