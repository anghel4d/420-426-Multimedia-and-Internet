let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let car;
let keys = {};

canvas.height = 500;
canvas.width = 500;

car = new Car(canvas.width / 2, canvas.height / 2);

canvas.addEventListener('keydown', event => {
	console.log("key down");
	keys[event.key] = true; // Remember that you can refer to a key in an object by using a string index.
});

canvas.addEventListener('keyup', event => {
	console.log("key up");
	keys[event.key] = false;
});

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (keys.ArrowUp) {
		car.accelerate();
	}
	else if (keys.ArrowDown) {
		car.reverse();
	}
	else {
		car.decelerate();
	}

	if (keys.ArrowLeft) {
		car.turnLeft();
	}

	if (keys.ArrowRight) {
		car.turnRight();
	}

	car.update();
}

animate();

canvas.focus();
