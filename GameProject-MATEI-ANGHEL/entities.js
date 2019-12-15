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
        this.isCollideable = true;
        this.isEnabled = true;
    }

    destructor(){
        console.log("An Entity has been marked for Removal");
        this.isEnabled = false;
    }

    move(){
        this.position.add(this.velocity);
    }

    onHit(collidedObject){
        if(this.isCollideable){
            console.log(collidedObject);
            // Calculate Consequences
            if(collidedObject instanceof Projectile){
                this.hitpoints -= collidedObject.damage;
                collidedObject.hitpoints -= 1;
            }
            else if(collidedObject instanceof Enemy){
                this.hitpoints = Math.trunc(this.hitpoints / 2);
                collidedObject.hitpoints = Math.trunc(collidedObject.hitpoints / 2);
            }
            else if(collidedObject instanceof Asteroid){
                this.hitpoints -= Math.trunc(collidedObject.mass / 10);
            }
            this.isCollideable = false;
            setTimeout( () => {
                this.enableCollision()
            }, 1000);
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

class Projectile extends Entity{
    constructor(x, y, vx, vy, damage, range){
        super(x, y, vx, vy, new Rectangle(10, 10, "Pink"), null, 1, 10, 10, 1);
        this.damage = damage;
        this.range = range;
    }

    update(){
        super.update();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Weapon{
    constructor(spread, count, cooldown, origin, direction, velocity){
        this.projectile = new Projectile();
        this.spread = spread;
        this.count = count;
        this.cooldown = cooldown;
        this.origin = origin;
        this.direction = direction;
        this.velocity = velocity;
    }

    shoot(){
        // spawn the projectiles and fire them in the direction specified
        console.log(entities);
        console.log(this.direction);
        let headingVector = new Vector2d(Math.sin(this.direction), Math.cos(this.direction));
        console.log(headingVector);
        let temp = [new Projectile(this.origin.x, this.origin.y, this.velocity * headingVector.x, this.velocity * headingVector.y,
            20, null )];
        entities = entities.concat(temp);
    }
}

class Player extends Entity{
    constructor(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints, baseSpeed, thrustMod){
        super(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints)
        this.travelSpeed = 0 + this.velocity.y;
        this.traveledDistance = 0;
        this.baseSpeed = baseSpeed;
        this.thrustMod = thrustMod;
        this.weapon = new Weapon(0, 1, 1, new Vector2d(this.position.x, this.position.y), this.rotation, 20);
    }

    // Player Control Actions
    moveUp(){
        this.position.y -= this.baseSpeed * this.thrustMod;
    }

    moveDown(){
        this.position.y += this.baseSpeed * this.thrustMod;
    }

    moveLeft(){
        this.position.x -= this.baseSpeed * this.thrustMod;
    }

    moveRight(){
        this.position.x += this.baseSpeed * this.thrustMod;
    }

    rotateRight(){
        this.rotation += 10;
    }

    rotateLeft(){
        this.rotation -= 10;
    }

    shoot(){
        this.weapon.direction = this.rotation;
        let l = this.height / 2 + 30;
        let wepX = this.position.x + l * Math.sin(this.rotation);
        let wepY = this.position.y + l * Math.cos(this.rotation);
        console.log(l, this.rotation, wepX, wepY);
        this.weapon.origin = new Vector2d(wepX, wepY);
        this.weapon.shoot();
    }

    enforceBounds(){
        if(this.position.x - this.width / 2 <= 0){
            this.position.x = 0 + this.width / 2;
        }
        if(this.position.x + this.width / 2 >= canvas.width){
            this.position.x = canvas.width - this.width / 2;
        }
        if(this.position.y - this.height / 2 <= 0){
            this.position.y = 0 + this.height / 2;
        }
        if(this.position.y + this.height / 2 >= canvas.height){
            this.position.y = canvas.height - this.height / 2;
        }
    }

    travel(){
        this.traveledDistance += this.travelSpeed;
    }

    update(){
        this.enforceBounds();
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
            this.position.x += 5;
        }
        else if(this.position.x > this.moveTarget.x){
            this.position.x -= 5;
        }

        if(this.position.y < this.moveTarget.y){
            this.position.y += 5;
        }
        else if(this.position.y > this.moveTarget.y){
            this.position.y -= 5;
        }
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
    constructor(){
        this.mass = getRandomInt(100, 500);
        this.spawn();
    }

    spawn(){
        // Give it some coords and some movement
        //
        //
        //
    }
}

