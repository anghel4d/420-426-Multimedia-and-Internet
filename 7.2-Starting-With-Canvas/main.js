console.log("[Script Initialized]");

const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
console.log(canvas.height + "  " + canvas.width);
console.log(context);

let squareX = 0;
let squareY = 0;

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e){
    let relativeX = e.clientX - canvas.offsetLeft;
    let relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeY > 0){
        squareX = relativeX - 100 / 2;
        squareY = relativeY - 100 / 2;
    }
}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillRect(squareX, squareY, 100, 100);
    context.clearRect(squareX, squareY, 80, 80);
    context.strokeRect(squareX, squareY, 60, 60)
}

animate();
