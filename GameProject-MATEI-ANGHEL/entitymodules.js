class Projectile extends Entity{
    constructor(x, y, vx, vy, damage){
        super(x, y, vx, vy, new Rectangle(PROJECTILESIZE, PROJECTILESIZE, "Pink"), null, 0, PROJECTILESIZE, PROJECTILESIZE, 1);
        this.damage = damage;
        this.isCollideable = false;
        setTimeout( () => {
            this.enableCollision()
        }, PROJECTILEDELAY);
    }

    enforceBounds(){
        if(this.position.x < 0
        || this.position.x > canvas.width
        || this.position.y < 0
        || this.position.y > canvas.height){
            this.isEnabled = false;
        } 
    }

    update(){
        super.update();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.enforceBounds();
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
        let temp = [];
        for(let i = 0; i < this.count; i++){
            let headingVector = new Vector2d(Math.sin(this.direction), Math.cos(this.direction));
            headingVector + getRandomDouble(-this.spread / 2, this.spread / 2);
            temp.push(new Projectile(this.origin.x, this.origin.y, this.velocity * headingVector.x, this.velocity * headingVector.y, this.damage));
        }
        entities = entities.concat(temp);
    }
}

class Player extends Entity{
    constructor(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints, baseSpeed, thrustMod){
        super(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints)
        this.travelSpeed = 0;
        this.traveledDistance = 0;
        this.baseSpeed = baseSpeed;
        this.thrustMod = thrustMod;
        this.weapon = new Weapon(0, 1, 1, new Vector2d(this.position.x, this.position.y), this.rotation, PLAYERBASEDAMAGE);
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
        let l = this.height / 2 + PROJECTILEOFFSET;
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

class Asteroid extends Entity{
    constructor(){
        super();
        this.mass = getRandomInt(100, 500);
        this.spawn();
    }

    spawn(){
        // Give it some coords and some movement
        let xSize = Math.trunc(this.mass / 2 + getRandomInt(-50, 100));
        let ySize = Math.trunc(this.mass / 2 + getRandomInt(-50, 100));
        this.width = xSize;
        this.height = ySize;
        this.position.x = getRandomInt(0, canvas.width);
        this.position.y = getRandomInt(-canvas.height, -this.height);
        this.velocity.x = 0;
        this.velocity.y = getRandomInt(5, 15);
        this.shape = new Rectangle(xSize, ySize, "purple");
        this.hitpoints = Math.trunc(this.mass / 10);
    }

    enforceBounds(){
        if(this.position.y > canvas.height){
            this.isEnabled = false;
        } 
    }

    update(){
        super.update();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.enforceBounds();
    }
}