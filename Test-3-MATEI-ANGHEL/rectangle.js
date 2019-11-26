class Rectangle{
    constructor(x, y, height, width){
        this.position = new Vector(x, y);
        this.height = height;
        this.width = width;
        this.maxSpeed = 5;
        this.velocity = this.setVelocity(-this.maxSpeed, this.maxSpeed);
        this.quadrant;
    }

    setVelocity(min, max){
        return new Vector(getRandomIntegerExcluding(min, max, 0), 
        getRandomIntegerExcluding(min, max, 0));
    }

    updateVelocity(minX, maxX, minY, maxY){
        this.velocity = new Vector(getRandomInteger(minX, maxX), 
        getRandomInteger(minY, maxY));
    }

    setQuadrant(){
        if(this.position.y < GAMEHEIGHT / 2){
            if(this.position.x > GAMEWIDTH / 2){
                this.quadrant = 1;
            }
            else{
                this.quadrant = 2;
            }
        }
        else{
            if(this.position.x < GAMEWIDTH / 2){
                this.quadrant = 3;
            }
            else{
                this.quadrant = 4;
            }
        }
    }

    updatePosition(){
        this.position.add(this.velocity);
    }

    checkBounds(){
        if ((this.position.x - this.width) < 0) {
			this.updateVelocity(1, this.maxSpeed, -this.maxSpeed, this.maxSpeed);
		}
        else if ((this.position.x) > GAMEWIDTH) {
			this.updateVelocity(-this.maxSpeed, -1, -this.maxSpeed, this.maxSpeed)
		}
		else if ((this.position.y - this.height) < 0) {
			this.updateVelocity(-this.maxSpeed, this.maxSpeed, 1, this.maxSpeed)
        }
        else if ((this.position.y) > GAMEHEIGHT) {
			this.updateVelocity(-this.maxSpeed, this.maxSpeed, -this.maxSpeed, -1)
        }
    }

    draw(){
        context.save();

        // Move context to position
        context.translate(this.position.x, this.position.y);

        // Color Changes based on quadrant
        switch(this.quadrant){
            case 1:
                context.fillStyle = "Red"
                break;
            case 2:
                context.fillStyle = "Blue"
                break;
            case 3:
                context.fillStyle = "Green"
                break;
            case 4:
                context.fillStyle = "Yellow"
                break;
        }

        // Draw the shape
        context.fillRect(-this.width, -this.height, this.width, this.height);

        context.restore();
    }

    update(){
        this.checkBounds();
        this.updatePosition();
        this.setQuadrant();
        this.draw();
    }
}