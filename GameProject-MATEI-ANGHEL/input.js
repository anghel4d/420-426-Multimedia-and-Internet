function setShipAngle(entity, target){
    let dx = target.x - entity.position.x;
    let dy = target.y - entity.position.y;
    let angle = Math.atan2(dx, dy);
    entity.rotation = angle;
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
    epicMusic.cloneNode(true).play();;
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