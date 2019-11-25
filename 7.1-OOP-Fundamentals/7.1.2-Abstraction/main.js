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

    calculateRectangleArea(){
        return this.height * this.width;
    }
}

class Circle extends Shape{
    constructor(radius, colour){
        super(colour);
        this.radius = radius;
        }

        calculateCircleArea(){
            return Math.PI * Math.pow(this.radius, 2);
        }
}

class Triangle extends Shape{
    constructor(base, height, colour){
        super(colour);
        this.base = base;
        this.height = height;
        }

        calculateTriangleArea(){
            return (this.height * this.base) / 2;
        }
}

let shapes = [new Circle(3, "red"), new Rectangle(3, 4, "blue"), new Triangle(2, 5, "green")];

for(shape of shapes){
    if(shape instanceof Circle){
        let area = shape.calculateCircleArea();
        console.log("Circle Area: " + area);
    }
    if(shape instanceof Rectangle){
        let area = shape.calculateRectangleArea();
        console.log("Rectangle Area: " + area);
    }
    if(shape instanceof Triangle){
        let area = shape.calculateTriangleArea();
        console.log("Triangle Area: " +  area);
    }
    shape.displayColour();
}