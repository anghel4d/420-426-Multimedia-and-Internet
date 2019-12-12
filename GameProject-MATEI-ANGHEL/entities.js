class Entity{
    constructor(x, y, vx, vy, shape, sprite, colour, angle, hitpoints){
        this.position = new Vector2d(x, y);
        this.velocity = new Vector2d(vx, vy);
        this.angle = angle;
        this.shape = shape;
        this.sprite = sprite;
        // this.colour = colour;
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
    constructor(x, y, vx, vy, shape, sprite, colour, angle, hitpoints, thrustMod){
        super(x, y, vx, vy, shape, sprite, colour, angle, hitpoints)
        this.travelSpeed = 0 + this.velocity.y;
        this.traveledDistance = 0;
        this.thrustMod = thrustMod;
        this.weapon = new Weapon("default");
    }

    // Player Control Actions
    moveUp(){
        this.velocity.y -= this.thrustMod;  // Remember that in higher y means lower on the 2d plane
    }

    moveDown(){
        this.velocity.y += this.thrustMod;
    }

    moveLeft(){
        this.velocity.x -= this.thrustMod;
    }

    moveRight(){
        this.velocity += this.thrustMod;
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
    constructor(behaviour, mX, mY, atkX, atkY, weaponType){
        super();
        this.behaviour = behaviour;
        this.moveTarget = new Vector2d(mX, mY);
        this.atkTarget = new Vector2d(atkX, atkY);
        this.weapon = new Weapon(weaponType);
    }

    turn(){
        // logic for changing move and atk targets
        //
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

