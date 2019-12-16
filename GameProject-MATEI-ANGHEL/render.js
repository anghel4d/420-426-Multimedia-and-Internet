function drawShape(entity){
    context.save();
    context.translate(entity.position.x, entity.position.y);
    context.rotate(-entity.rotation);
    context.translate(-(entity.width / 2), -(entity.height / 2));
    context.fillStyle = entity.shape.colour;
    context.fillRect(0, 0, entity.shape.width, entity.shape.height);
    context.restore();
}

function drawHealth(entity){
    context.save();
    context.translate(entity.position.x - entity.width / 2, entity.position.y + entity.height + HEALTHBAROFFSET);
    context.fillStyle = "Grey";
    context.fillRect(0, 0, entity.width, HEALTHBARHEIGHT);
    context.fillStyle = "Green";
    let healthRemaining = Math.floor((entity.hitpoints * entity.width) / entity.maxHP);
    context.fillRect(0, 0, healthRemaining, HEALTHBARHEIGHT);
    context.restore();
}

function printStats(player){
    context.font = "24px Trebuchet MS, Helvetica, sans-serif";
    context.fillStyle = "white";
    context.fillText(`${player.traveledDistance} / ${MARSDISTANCE}^10 km`, 40, 40);
}