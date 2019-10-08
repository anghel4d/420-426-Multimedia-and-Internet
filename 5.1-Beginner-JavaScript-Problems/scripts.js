"use strict";

let vector2 = {
	x : 0,
	y : 0,
}

function multiplyTwoNumbers(vector2){
	return vector2.x * vector2.y;
}

function sayHi(name, age){
	return "Hi. My name is " + name + " and I'm " + age + " years old!";
}

function indexPower(array, N){
	let size = array.length;
	if(N > array.length || N < 0){
		return -1;
	}

	return array[N] ** N;
}

function fizzBuzz(n){
	const FIZZ = 3;
	const BUZZ = 5;
	if(n % FIZZ == 0 && n % BUZZ == 0){
		return "Fizz Buzz";
	}
	else if(n % FIZZ == 0){
		return "Fizz";
	}
	else if(n % BUZZ == 0){
		return "Buzz";
	}
	else{
		return String(n);
	}
}

function digitsMultiplication(n){
	let nString = String(n);
	let nProduct = 1;
	for(const num of nString){
		if(num != 0){
			nProduct *= num;
		}
	}
	return nProduct;
}

function secretCode(inputText){
	let result = "";
	for(let letter of String(inputText)){
		if(letter != letter.toLowerCase()){
			result += letter;
		}
	}
	return result;
}

function mostFrequent(stringArray){
	stringArray.sort();
	let max = 0;
	let index = 0;
	let count = 0;
	for(let i = 1; i < stringArray.length; i++){
		if(stringArray[i] == stringArray[i - 1]){
			count++;
			if(count > max){
				max = count;
				index = i;
			}
		}
		else{
			count = 0;
		}
	}
	return stringArray[index];
}

function nonUniqueElements(integerArray){
	for(let i = 0; i < integerArray.length; i++){
		let count = 0;
		for(let j = 0; j < integerArray.length; j++){
			if(integerArray[i] == integerArray[j]){
				count++;
			}
		}

		if(count < 2){
			integerArray.splice(i, 1);
		}
	}

	return integerArray;
}