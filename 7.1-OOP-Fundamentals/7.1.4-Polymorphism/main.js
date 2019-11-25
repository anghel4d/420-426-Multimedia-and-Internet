console.log("[Script Initialized]");

class Shape{
    constructor(colour){
        this.colour = colour;
    }

    displayColour(){
        console.log(this.colour);
    }
}

class Rectangle extends Shape{
    constructor(height, width, colour){
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

let shapes = [new Circle(3, "red"), new Rectangle(3, 4, "blue"), new Triangle(2, 5, "green")];

for(shape of shapes){
    area = shape.calculateArea();
    console.log(shape.constructor.name + " Area: " + area);
    shape.displayColour();
}