// =============== DOM AND EVENT HANDLERS =============== //
// ====================================================== //
// Linking dom element to data object
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Setting canvas size
const GAMEHEIGHT = 1000;
const GAMEWIDTH = 1800;
canvas.height = GAMEHEIGHT;
canvas.width = GAMEWIDTH;
const canvasMiddleY = canvas.height / 2;
const canvasMiddleX = canvas.width / 2;

// Add event listener for singular  key presses
let keys = {};
canvas.addEventListener('keypress', registerKeyPress);

// Event listener for hitting mouse1
canvas.addEventListener('click', registerMouseClick);

// Event listener for holding down key press
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

// Event listener for letting go of a key
canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

// Store Mouse Movements
let mouseX = 0;
let mouseY = 0;

// Event Listener for Mouse Movements
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e){
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;

    mouseX = Math.trunc((e.clientX - rect.left) * scaleX);
    mouseY = Math.trunc((e.clientY - rect.top) * scaleY);
}