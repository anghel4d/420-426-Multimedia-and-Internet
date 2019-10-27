"use strict";

function multiplyTwoNumbers(x, y){
	return x * y;
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