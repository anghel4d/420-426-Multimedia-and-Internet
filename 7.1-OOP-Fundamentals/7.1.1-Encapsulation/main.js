console.log("[Script Initialized]");

class Rectangle{
    constructor(height, width, colour){
        this.height = height;
        this.width = width;
        this.colour = colour;
    }
}

class Circle{
    constructor(radius, colour){
        this.radius = radius;
        this.colour = colour;
    }
}

class Triangle{
    constructor(base, height, colour){
        this.base = base;
        this.height = height;
        this.colour = colour;
    }
}

let shapes = [new Circle(3, "red"), new Rectangle(3, 4, "blue"), new Triangle(2, 5, "green")];

for(shape of shapes){
    if(shape instanceof Circle){
        let area = Math.PI * Math.pow(shape.radius, 2);
        console.log("Circle Area: " + area);
    }
    if(shape instanceof Rectangle){
        let area = shape.width * shape.height;
        console.log("Rectangle Area: " + area);
    }
    if(shape instanceof Triangle){
        let area = (shape.base * shape.height) / 2;
        console.log("Triangle Area: " +  area);
    }
}