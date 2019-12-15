class Entity{
    constructor(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints){
        this.position = new Vector2d(x, y);
        this.velocity = new Vector2d(vx, vy);
        this.rotation = rotation;
        this.shape = shape;
        this.sprite = sprite;
        this.height = height;
        this.width = width;
        this.hitpoints = hitpoints;
        this.isCollideable = true;
        this.isEnabled = true;
    }

    destructor(){
        console.log("Marked for removal: ", this);
        this.isEnabled = false;
    }

    move(){
        this.position.add(this.velocity);
    }

    onHit(collidedObject){
        if(this.isCollideable){
            console.log("Collision between: ", collidedObject, this);
            // Calculate Consequences
            if(collidedObject instanceof Projectile){
                this.hitpoints -= collidedObject.damage;
                collidedObject.hitpoints -= 1;
            }
            else if(collidedObject instanceof Enemy){
                this.hitpoints = Math.trunc(this.hitpoints / 2);
                collidedObject.hitpoints = Math.trunc(collidedObject.hitpoints / 2);
            }
            else if(collidedObject instanceof Asteroid && !(this instanceof Asteroid)){
                this.hitpoints -= Math.trunc(collidedObject.mass / ASTEROIDDAMAGEMOD);
            }
            this.isCollideable = false;
            setTimeout( () => {
                this.enableCollision()
            }, COLLISIONCOOLDOWN);
        }
    }

    enableCollision(){
        this.isCollideable = true;
    }

    update(){
        if(this.hitpoints <= 0){
            this.destructor();
        }
    }
}
