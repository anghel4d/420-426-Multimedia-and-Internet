function drawShape(entity){
    //console.log('drawing entity');
    context.save();
    context.translate(entity.position.x, entity.position.y);
    context.fillStyle = entity.shape.colour;
}