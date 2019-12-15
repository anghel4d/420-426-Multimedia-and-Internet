console.log("[Initialized Main]");

// Intialization
let player = new Player(canvasMiddleX - 50, canvasMiddleY - 50, 0, 0, new Rectangle(100, 100, "Blue"), null, 0, 100, 100, 50, 10, 1);
let testAsteroid = new Asteroid();
let entities = [player, testAsteroid];
console.log(entities);

// Game Tick Timer
let timer = new GameTimer();
let isFullTick = timer.elapsed % 60 == 0;

// Main Loop
function main(){  
    // Clear the canvas
    requestAnimationFrame(main);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update Timer
    timer.update();
    isFullTick = timer.elapsed % 60 == 0;

    // Point Player in Direction of Mouse
    setShipAngle();
    // Accept Regular Player Controls
    playerControls();

    // Spawn wave of asteroids
    if(isFullTick){
        for(let i = 0; i < NUMASTEROIDS; i++){
            //entities.push(new Asteroid());
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

main();
canvas.focus();