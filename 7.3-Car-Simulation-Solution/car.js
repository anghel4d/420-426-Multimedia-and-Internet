class Car {
	constructor(x, y) {
		this.position = new Vector(x, y);
		this.width = 50;
		this.height = 25;
		this.speed = 0;
		this.maxSpeed = 5;
		this.rotation = 0;
		this.friction = 0.95;
	}

	draw() {
		this.drawCar();
		this.displayStatus();
	}

	update() {
		this.checkBounds();
		this.updatePosition();
		this.draw();
	}

	drawCar() {
		context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation * Math.PI / 180);
		context.fillStyle = "MediumPurple";
		context.fillRect(-this.width * 0.75, -this.height * 0.5, this.width, this.height);
		context.fillStyle = "Yellow";
		context.fillRect(this.width / 4, 4, 2, 6);
		context.fillRect(this.width / 4, -8, 2, 6);
		context.fillStyle = "Gray";
		context.fillRect(-this.width + 10, 6, 3, 3);
		context.restore();
	}

	displayStatus() {
		context.save();
		context.font = "12px Arial";
		context.fillStyle = "white";
		context.fillText(`Position: (${this.position.x.toFixed(0)}, ${this.position.y.toFixed(0)})`, 10, 20);
		context.fillText(`Rotation: ${this.rotation.toFixed(2)}`, 10, 40);
		context.fillText(`Speed: ${this.speed.toFixed(2)}`, 10, 60);
		context.restore();
	}

	updatePosition() {
		const velocityX = Math.cos(this.rotation * Math.PI / 180) * this.speed;
		const velocityY = Math.sin(this.rotation * Math.PI / 180) * this.speed;
		const velocity = new Vector(velocityX, velocityY);

		this.position.add(velocity);
	}

	checkBounds() {
		if ((this.position.x - this.width) > canvas.width) {
			this.position.x = -this.width;
		}

		if ((this.position.x + this.width) < 0) {
			this.position.x = canvas.width + this.width;
		}

		if ((this.position.y - this.height) > canvas.height) {
			this.position.y = -this.height;
		}

		if ((this.position.y + this.height) < 0) {
			this.position.y = canvas.height + this.height;
		}
	}

	accelerate() {
		if (this.isGoingFullSpeed()) {
			this.speed = this.maxSpeed;
		}
		else {
			this.speed += 0.1;
		}
	}

	reverse() {
		if (this.isGoingFullSpeed()) {
			this.speed = -this.maxSpeed;
		}
		else {
			this.speed -= 0.1;
		}
	}

	decelerate() {
		// Only slow down if moving.
		if (this.speed !== 0) {
			this.speed *= this.friction;
		}

		// Without this, the car will never reach a speed of zero since you're just multiplying by the friction constantly.
		if (this.speed < 0.01 && this.speed > -0.01) {
			this.speed = 0;
		}
	}

	turnRight() {
		// Only allow turning if moving. A car cannot turn about itself.
		if (this.speed !== 0) {
			this.rotation += (this.speed * 0.9);
			this.rotation %= 360;
		}
	}

	// Both turning functions could probably be reduced to one.
	turnLeft() {
		if (this.speed !== 0) {
			this.rotation -= (this.speed * 0.9);
			this.rotation %= 360;
		}
	}

	// An example of abstraction for the sake of better readability.
	isGoingFullSpeed() {
		return this.speed >= this.maxSpeed || this.speed <= -this.maxSpeed;
	}
}
