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
const canvasMiddleX = canvas.width / 2;

// Add event listener for singular  key presses
let keys = {};
canvas.addEventListener('keypress', registerKeyPress);

// Event listener for holding down key press
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

// Event listener for letting go of a key
canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

// Track Mouse Movements
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e){
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;

    mouseX = Math.trunc((e.clientX - rect.left) * scaleX);
    mouseY = Math.trunc((e.clientY - rect.top) * scaleY);
}

// Intialization
player = new Player(canvasMiddleX - 50, canvasMiddleY - 50, 0, 0, new Rectangle(100, 100, "Blue"), null, 0, 100, 100, 20, 15);
testEnemy = new Enemy(50, 50, 0, 0, new Rectangle(50, 50, "Red"), null, 0, 50, 50, 1, null, 800, 800, null, null, null);
let entities = [player, testEnemy];
console.log(entities);

// Main Loop
function main(){  
    // Clear the canvas
    requestAnimationFrame(main);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Collision Detection
    //
    // rofllmao
    //
    //

    // Point Player in Direction of Mouse
    setShipAngle();

    // Accept Regular Player Controls
    playerControls();

    // Go through the entities and proceed with their actions
    for(entity of entities){
        // AI decision making
        if(entity instanceof Enemy){
            entity.moveTarget.x = player.position.x;
            entity.moveTarget.y = player.position.y;
            //console.log(player.position.x);
            //console.log(entity.moveTarget.x);
            //console.log(entity);
        }

        //console.log(entity);
        entity.update();

        // Draw Entities to Screen
        drawShape(entity);
    }

    
}

function setShipAngle(){
    let dx = mouseX - player.position.x;
    let dy = mouseY - player.position.y;
    let angle = Math.atan2(dx, dy);
    player.rotation = -angle;
}

function playerControls(){
    // Up-Down Movement
    if(keys.w){
        player.moveUp();
    }
    else if(keys.s){
        player.moveDown();
    }

    // Horizontal Movement
    if(keys.a){
        player.moveLeft();
    }
    else if(keys.d){
        player.moveRight();
    }

    // Testing Rotation
    if(keys.ArrowRight){
        player.rotateRight();
    }
    else if(keys.ArrowLeft){
        player.rotateLeft();
    }
}

function playerAction(e){
    if(e.code == "Space"){
        console.log(player);
    } 
}

function registerKeyPress(e){
    //console.log(e);
    playerAction(e);
}

main();
canvas.focus();