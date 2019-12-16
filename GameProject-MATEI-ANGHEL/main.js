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
let states = Object.freeze({"startMenu":1, "aliens":2, "asteroids":3, "loss":4, "win":5})
let state = states.startMenu;

// Trackers
let alienWavesLeft = NUMENEMYWAVES;
let aliensLeft = 0;

startMenu();

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
        case states.aliens:
            // Spawn some aliens
            if(timer.elapsed % (TICKLENGTH * 10) == 0 && alienWavesLeft > 0){
                for(let i = 0; i < NUMENEMYWAVES; i++){
                    entities.push(new Enemy());
                    aliensLeft++;
                }
                if(aliensLeft <= 0){
                    state = states.asteroids;
                }
            }
            break;
        case states.asteroids:
            // Spawn wave of asteroids
            if(isFullTick){
                for(let i = 0; i < NUMASTEROIDS; i++){
                    entities.push(new Asteroid());
                }
            }
            // Check if win
            if(player.traveledDistance >= MARSDISTANCE){
                state = states.win;
            }
            break;
        case states.loss:
            entities = [];
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
}

main();
canvas.focus();