console.log("[Script Initialized]");

const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
console.log(canvas.height + "  " + canvas.width);
console.log(context);

context.fillRect((canvas.width - 100) / 2, (canvas.height - 100) / 2, 100, 100);
context.clearRect((canvas.width - 80) / 2, (canvas.height - 80) / 2, 80, 80);
context.strokeRect((canvas.width - 60) / 2, (canvas.height - 60) / 2, 60, 60)