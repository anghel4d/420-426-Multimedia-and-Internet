class Entity{
    constructor(x, y, vx, vy, shape, sprite, colour, angle, hitpoints){
        this.position = new Vector2d(x, y);
        this.velocity = new Vector2d(vx, vy);
        this.angle = angle;
        this.shape = shape;
        this.sprite = sprite;
        this.colour = colour;
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

class Player extends Entity{
    constructor(x, y, vx, vy, shape, sprite, colour, angle, hitpoints){
        super(x, y, vx, vy, shape, sprite, colour, angle, hitpoints)
        this.travelSpeed = 0 + this.velocity.y;
        this.traveledDistance = 0;
        this.weapon = new Weapon("default");
    }

    // Player Control Stuff
    // 
    //
    //
    // 

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
    constructor(behaviour){
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

class Weapon{
    constructor(){
        this.projectile = projectile;
        this.spread = spread;
        this.count = count;
        this.cooldown = cooldown;
        this.direction = direction;
    }

    shoot(){
        // spawn the projectiles and fire them in the direction specified
    }
}

class Projectile extends Entity(){
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
        super();
    }
}