console.log("[Initialized Main]");

// Linking dom element to data object
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Setting canvas size
const GAMEHEIGHT = 1000;
const GAMEWIDTH = 1800;
canvas.height = GAMEHEIGHT;
canvas.width = GAMEWIDTH;
const canvasMiddleY = canvas.height / 2;
const canvasMiddleX = canvas.height / 2;

// Add event listener for key presses
canvas.addEventListener('keypress', logKey);

// Intialization
player = new Player(canvasMiddleX, canvasMiddleY, 0, 0, new Rectangle(10, 10), null, 0, 1, 1);
let entities = [player];
console.log(entities);

// Main Loop
function main(){
    // Clear the canvas
    requestAnimationFrame(main);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Collision Detection
    //
    //
    //
    //

    // Go through the entities and proceed with their actions
    for(entity of entities){
        //console.log(entity);
        entity.update();
    }

    // Draw Entities to Screen
    drawShape(entity);
}

function playerControls(e){
    switch(e.code){
        case "Space":
            console.log(player);
            break;
        case "KeyA":
            console.log("Moving Left");
            break;
        case "KeyD":
            console.log("Moving Right");
            break;
        case "KeyW":
            console.log("Moving Up");
            break;
        case "KeyS":
            console.log("Moving Down");
            break;
    }
}

function logKey(e){
    console.log(e);
    playerControls(e);
}

main();
canvas.focus();