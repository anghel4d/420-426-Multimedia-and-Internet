// Spatial Information
class Vector2d{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(vector2d){
        this.x += vector2d.x;
        this.y += vector2d.y;
    }
}

// Time Calclation
class GameTimer{
    constructor(){
        this.elapsed = 0;
    }

    update(){
        this.elapsed++;
    }
}

// RMG
function getRandomInt(min, max){
    if(min === 0 && max === 0){
        return 0;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomDouble(min, max){
    if(min === 0 && max === 0){
        return 0;
    }
    return (Math.random() * (max - min + 1) + min);
}

// Geometry Data
class Shape{    // has to be updated to remove redundant color tag
    constructor(colour){
        this.colour = colour;
    }

    displayColour(){
        console.log(this.colour);
    }
}

class Rectangle extends Shape{
    constructor(width, height, colour){
        super(colour);
        this.height = height;
        this.width = width;
    }

    calculateArea(){
        return this.height * this.width;
    }
}

class Circle extends Shape{
    constructor(radius, colour){
        super(colour);
        this.radius = radius;
        }

        calculateArea(){
            return Math.PI * Math.pow(this.radius, 2);
        }
}

class Triangle extends Shape{
    constructor(base, height, colour){
        super(colour);
        this.base = base;
        this.height = height;
        }

        calculateArea(){
            return (this.height * this.base) / 2;
        }
}
