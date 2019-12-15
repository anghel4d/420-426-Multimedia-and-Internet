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
let player = new Player(canvasMiddleX - 50, canvasMiddleY - 50, 0, 0, new Rectangle(100, 100, "Blue"), null, 0, 100, 100, 50, 10, 1);
let testAsteroid = new Asteroid();
/* testEnemy = new Enemy(50, 50, 0, 0, new Rectangle(50, 50, "Red"), null, 0, 50, 50, 20, null, 800, 800, null, null, null);
testEnemy2 = new Enemy(300, 300, 0, 0, new Rectangle(50, 50, "Purple"), null, 0, 50, 50, 20, null, 800, 800, null, null, null);
let entities = [player, testEnemy, testEnemy2]; */
let entities = [player, testAsteroid];
console.log(entities);

const NUMASTEROIDS = 5;

// Game Tick Timer
let timer = new GameTimer();
let isSecondTick = timer.elapsed % 60 == 0;

// Main Loop
function main(){  
    // Clear the canvas
    requestAnimationFrame(main);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update Timer
    timer.update();
    isSecondTick = timer.elapsed % 60 == 0;

    // Point Player in Direction of Mouse
    setShipAngle();
    // Accept Regular Player Controls
    playerControls();

    // Spawn wave of asteroids
    if(isSecondTick){
        for(let i = 0; i < NUMASTEROIDS; i++){
            entities.push(new Asteroid());
        }
    }

    // Go through the entities and proceed with their actions
    for(entity of entities){
        // AI decision making
        if((entity instanceof Enemy) && player.isEnabled){
            entity.moveTarget.x = player.position.x;
            entity.moveTarget.y = player.position.y;
        }

        // Collision Detection
        for(other of entities){
            if(other != entity){
                if(other.position.x + other.width / 2 >= entity.position.x - entity.width / 2
                && other.position.x - other.width / 2 <= entity.position.x + entity.width / 2
                && other.position.y + other.height / 2 >= entity.position.y - entity.height / 2
                && other.position.y  - other.height / 2 <= entity.position.y + entity.height / 2){
                    //console.log("Collision between two entities: ", entity, other);
                    entity.onHit(other);
                }
            }
        }

        // Update Entity States
        entity.update();

        // Draw Entities to Screen
        drawShape(entity);

        // Remove Disabled Entities
        entities = entities.filter(entity => entity.isEnabled);
    }
}

function setShipAngle(){
    let dx = mouseX - player.position.x;
    let dy = mouseY - player.position.y;
    let angle = Math.atan2(dx, dy);
    player.rotation = angle;
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
        console.log(entities);
    } 
}

function playerShoot(){
    player.shoot();
}

function registerKeyPress(e){
    //console.log(e);
    playerAction(e);
}

function registerMouseClick(e){
    console.log(e);
    playerShoot();
}

main();
canvas.focus();