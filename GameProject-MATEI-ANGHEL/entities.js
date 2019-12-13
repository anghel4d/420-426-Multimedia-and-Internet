class Entity{
    constructor(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints){
        this.position = new Vector2d(x, y);
        this.velocity = new Vector2d(vx, vy);
        this.rotation = rotation;
        this.shape = shape;
        this.sprite = sprite;
        // this.colour = colour;
        this.height = height;
        this.width = width;
        this.hitpoints = hitpoints;
    }

    move(){
        this.position.add(this.velocity);
    }

    onHit(collidedObject){
        if(typeof collidedObject == Projectile || typeof collidedObject == Asteroid){
            this.hitpoints -= collidedObject.damage;
        }
    }

    update(){
        this.move();
    }
}

class Projectile extends Entity{
    constructor(damage, range, trajectory){
        super();
        this.damage = damage;
        this.range = range;
        this.trajectory = trajectory;
    }

    nextPosition(){
        // do some stuff with trajectory to determine next position
    }

    update(){
        this.nextPosition();
        super.update();
    }
}

class Weapon{
    constructor(spread, count, cooldown, direction){
        this.projectile = new Projectile();
        this.spread = spread;
        this.count = count;
        this.cooldown = cooldown;
        this.direction = direction;
    }

    shoot(){
        // spawn the projectiles and fire them in the direction specified
    }
}

class Player extends Entity{
    constructor(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints, thrust){
        super(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints)
        this.travelSpeed = 0 + this.velocity.y;
        this.traveledDistance = 0;
        this.thrust = thrust;
        this.weapon = new Weapon("default");
    }

    // Player Control Actions
    moveUp(){
        //console.log("moving player up");
        this.position.y -= this.thrust;  // Remember that in higher y means lower on the 2d plane
    }

    moveDown(){
        this.position.y += this.thrust;
    }

    moveLeft(){
        this.position.x -= this.thrust;
    }

    moveRight(){
        this.position.x += this.thrust;
    }

    rotateRight(){
        this.rotation += 10;
    }

    rotateLeft(){
        this.rotation -= 10;
    }

    travel(){
        this.travelSpeed += this.velocity.y;
        this.traveledDistance += this.travelSpeed;
    }

    update(){
        super.update();
        this.travel();
    }
}

class Enemy extends Entity{
    constructor(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints, behaviour, mX, mY, atkX, atkY, weaponType){
        super(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints);
        this.behaviour = behaviour;
        this.moveTarget = new Vector2d(mX, mY);
        this.atkTarget = new Vector2d(atkX, atkY);
        this.weapon = new Weapon(weaponType);
    }

    turn(){
        // logic for changing move and atk targets
        if(this.position.x < this.moveTarget.x){
            this.position.x += 2;
        }
        else if(this.position.x > this.moveTarget.x){
            this.position.x -= 2;
        }

        if(this.position.y < this.moveTarget.y){
            this.position.y += 2;
        }
        else if(this.position.y > this.moveTarget.y){
            this.position.y -= 2;
        }
        //
        //
        //
        // 
        // 
    }

    update(){
        this.turn();
        super.update();
    }
}

class Boss extends Enemy{
    constructor(shieldHealth, mana){
        super();
        this.shieldHealth = shieldHealth;
        this.mana = mana;
    }
    
    turn(){
        // boss logic
        //
        //
        //
        //
        //
    }

    spawnEnemy(){
        // Make an enemy come out at the expense of mana
    }
}

class Asteroid extends Entity{
    spawn(){
        // Give it some coords and some movement
        //
        //
        //
    }
}

