console.log("[Initialized Main]");

// Linking dom element to data object
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

// Setting canvas size
const GAMEHEIGHT = 500;
const GAMEWIDTH = 500;
canvas.height = GAMEHEIGHT;
canvas.width = GAMEWIDTH;

// Add event listener for key presses
document.addEventListener('keypress', logKey);