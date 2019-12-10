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
document.addEventListener('keypress', logKey);