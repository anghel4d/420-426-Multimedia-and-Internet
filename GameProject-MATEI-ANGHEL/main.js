console.log("[Initialized Main]");

// Intialization
let player = new Player(canvasMiddleX - PLAYERBOXSIZE / 2, canvasMiddleY - PLAYERBOXSIZE / 2, 0, 0, 
    new Rectangle(PLAYERBOXSIZE, PLAYERBOXSIZE, PLAYERCOLOR), 
    null, 0, PLAYERBOXSIZE, PLAYERBOXSIZE, PLAYERMAXHP, PLAYERSPEED, PLAYERSPEEDMOD, PLAYERTRAVELSPEED);
let entities = [player, new Enemy(), new Enemy()];

// Game Tick Timer
let timer = new GameTimer();
let isFullTick = timer.elapsed % TICKLENGTH == 0;

// Game states switch
let states = Object.freeze({"active":1, "loss":2, "win":3})
let state = states.active;

// Main Loop
function main(){  
    // Clear the canvas
    requestAnimationFrame(main);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update Timer
    timer.update();
    isFullTick = timer.elapsed % TICKLENGTH == 0;

    // Point Player in Direction of Mouse
    setShipAngle(player, mousePos);
    // Accept Regular Player Controls
    playerControls();

    switch(state){
        case states.active:
            if(isFullTick){
                for(let i = 0; i < NUMASTEROIDS; i++){
                    entities.push(new Asteroid());
                }
                for(let j = 0; j < NUMALIENS; j++){
                    entities.push(new Enemy());
                }
            }
            // Check if win
            if(player.traveledDistance >= MARSDISTANCE){
                state = states.win;
            }
            break;
        case states.loss:
            entities = [];
            document.location.href = "gameover.html";
            break;
        case states.win:
            entities = [];
            break;
    }

    for(entity of entities){
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

        // Draw Healthbar and Stat
        if(entity instanceof Player){
            drawHealth(entity);
            printStats(entity);
        }
    }
    // Remove Disabled Entities
    entities = entities.filter(entity => entity.isEnabled);

    // Check for player status
    if(!player.isEnabled){
        state = states.loss;
    }
}

main();
canvas.focus();