function drawShape(entity){
    //console.log('drawing entity');
    context.save();
    context.translate(entity.position.x, entity.position.y);
    context.rotate(entity.rotation);
    context.translate(-(entity.width / 2), -(entity.height / 2));
    context.fillStyle = entity.shape.colour;
    context.fillRect(0, 0, entity.shape.width, entity.shape.height);
    context.restore();
}