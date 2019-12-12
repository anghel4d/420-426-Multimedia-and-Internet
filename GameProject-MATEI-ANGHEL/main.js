console.log("[Initialized Main]");

// Linking dom element to data object
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

// Setting canvas size
const GAMEHEIGHT = 1000;
const GAMEWIDTH = 1800;
canvas.height = GAMEHEIGHT;
canvas.width = GAMEWIDTH;

// Add event listener for key presses
//document.addEventListener('keypress', logKey);

// Game Logic
let player = new Player(50, 50, 0, 0, new Circle(5, "blue"), null, "blue", 0,  1);
let enemies = [new Enemy(), new Enemy(), new Enemy()];
console.log(player);
console.log(enemies);