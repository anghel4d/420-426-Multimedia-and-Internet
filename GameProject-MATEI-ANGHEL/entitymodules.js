class Projectile extends Entity{
    constructor(x, y, vx, vy, damage){
        super(x, y, vx, vy, new Rectangle(PROJECTILESIZE, PROJECTILESIZE, PROJECTILECOLOR), null, 0, PROJECTILESIZE, PROJECTILESIZE, 1);
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
    constructor(spread, count, cooldown, damage, origin, direction, velocity){
        this.projectile = new Projectile();
        this.spread = spread;
        this.count = count;
        this.damage = damage;
        this.cooldown = cooldown;
        this.origin = origin;
        this.direction = direction;
        this.velocity = velocity;
        this.canShoot = true;
    }

    reload(){
        this.canShoot = true;
    }

    shoot(){
        // spawn the projectiles and fire them in the direction specified
        if(this.canShoot){
            let temp = [];
            for(let i = 0; i < this.count; i++){
                let headingVector = new Vector2d(Math.sin(this.direction), Math.cos(this.direction));
                headingVector + getRandomDouble(-this.spread / 2, this.spread / 2);
                temp.push(new Projectile(this.origin.x, this.origin.y, this.velocity * headingVector.x, this.velocity * headingVector.y, this.damage));
            }
            entities = entities.concat(temp);
            this.canShoot = false;
            setTimeout( () => {
                this.reload()
            }, this.cooldown);
        }
    }
}

class Player extends Entity{
    constructor(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints, baseSpeed, thrustMod, travelSpeed){
        super(x, y, vx, vy, shape, sprite, rotation, height, width, hitpoints)
        this.travelSpeed = travelSpeed;
        this.traveledDistance = 0;
        this.baseSpeed = baseSpeed;
        this.thrustMod = thrustMod;
        this.hitSound = new Audio("data/music/scream.mp3");
        // spread, count, cooldown, damage, origin, direction, velocity
        this.weapon = new Weapon(0, 1, PLAYERBASECOOLDOWN, PLAYERBASEDAMAGE, new Vector2d(this.position.x, this.position.y), this.rotation, PROJECTILESPEED);
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
        this.weapon.origin = new Vector2d(wepX, wepY);
        this.weapon.shoot();
    }

    onHit(entityThatHitThisOne){
        this.hitSound.play();
        super.onHit(entityThatHitThisOne);
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

// After running out of ammunition, the aliens became an army of kamikazes
class Enemy extends Entity{
    constructor(){
        super();
        this.moveTarget = new Vector2d(getRandomInt(0, canvas.width), getRandomInt(0, canvas.width));
        this.atkTarget = new Vector2d(null, null);
        this.rotation = 0;
        this.maxHP = ENEMYMAXHP;
        this.hitpoints = this.maxHP;
        //this.weapon = new Weapon(0, 1, ENEMYWEPDELAY, ENEMYBASEDAMAGE, new Vector2d(this.position.x, this.position.y), this.rotation, PROJECTILESPEED);
        this.spawn();
    }

    spawn(){
        this.width = ENEMYMAXSIZE;
        this.height = ENEMYMAXSIZE;
        this.position.x = getRandomInt(0, canvas.width);
        this.position.y = getRandomInt(0, canvas.height);
        this.shape = new Rectangle(ENEMYMAXSIZE, ENEMYMAXSIZE, ENEMYCOLOUR);
    }

    pickMoveTarget(){
        this.moveTarget.x = player.position.x;
        this.moveTarget.y = player.position.y;
    }

    /* pickAttackTarget(){
        this.atkTarget.x = player.position.x;
        this.atkTarget.y = player.position.y;
    } */

    turn(){
        // Pick a new movement target
        this.pickMoveTarget()

        // Move to target spot on screen
        if(this.position.x < this.moveTarget.x){
            this.position.x += ENEMYSPEED;
        }
        else if(this.position.x > this.moveTarget.x){
            this.position.x -= ENEMYSPEED;
        }

        if(this.position.y < this.moveTarget.y){
            this.position.y += ENEMYSPEED;
        }
        else if(this.position.y > this.moveTarget.y){
            this.position.y -= ENEMYSPEED;
        }

       /*  this.pickAttackTarget(); */

        // Rotate to attack target
        /* setShipAngle(this, this.atkTarget); */

        // Attempt to fire weapon
        /* this.weapon.shoot(); */
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
        this.shape = new Rectangle(xSize, ySize, ASTEROIDCOLOUR);
        this.maxHP  = Math.floor(this.mass / 10);
        this.hitpoints = this.maxHP;
        //console.log("Hitpoints: ", this.hitpoints);
    }

    enforceBounds(){
        if(this.position.y - this.height > canvas.height){
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