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

// Create an array of rectangle objects
const RECTNUM = 1;
const RECTSIZE = 50;
let rectArr = [];
for(let i = 0; i < RECTNUM; i++){
    const randomX = getRandomInteger(0, GAMEWIDTH);
    const randomY = getRandomInteger(0, GAMEHEIGHT);
    const rectangle = new Rectangle(randomX, randomY, RECTSIZE, RECTSIZE);
    console.log(rectangle);
    rectArr.push(rectangle);
}

// Create Timer
const timer = new GameTimer();

// Get things moving
let request;
function animate(){
    context.clearRect(0, 0, GAMEHEIGHT, GAMEWIDTH);
    
    // Print time
    timer.update();
    timer.printTime();

    // Entity Actions
    for(square of rectArr){
        square.update();
    }
    request = requestAnimationFrame(animate);
}

function logKey(e){
    console.log(e);
    if(e.key === " " || e.code === "Space"){
        clearQuadrant();
    }
}

function clearQuadrant(){
    console.log("Cleared Yellow Quadrant 4");
    rectArr = rectArr.filter(rect => rect.quadrant != 4);
    console.log(rectArr.length);
    if(rectArr.length == 0){
        gameEnd();
    }
}

function gameEnd(){
    // stop requesting animation frames
    cancelAnimationFrame(request);
    context.clearRect(0, 0, GAMEHEIGHT, GAMEWIDTH);
    timer.printTimeBold();
}

animate();
canvas.focus();