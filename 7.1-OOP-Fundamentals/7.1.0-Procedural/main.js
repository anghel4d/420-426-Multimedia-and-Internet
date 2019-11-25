console.log("[Script Initialized]");

let shapes =
    [{
        type: "circle",
        colour: "red",
        size: 3
    },
    {
        type: "rectangle",
        colour: "blue",
        size: [3, 4]
    },
    {
        type: "triangle",
        colour: "green",
        size: [2, 5]
    }];

for(x of shapes){
    if(x.type == "circle"){
        console.log("Circle Area: " + Math.PI * Math.pow(x.size, 2));
    }
    if(x.type == "rectangle"){
        console.log("Rectangle Area: " + x.size[0] * x.size[1]);
    }
    if(x.type == "triangle"){
        console.log("Triangle Area: " + (x.size[0] * x.size[1]) / 2);
    }
}