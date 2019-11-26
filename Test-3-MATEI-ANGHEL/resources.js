class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(Vector){
        this.x += Vector.x;
        this.y += Vector.y;
    }
}

class GameTimer{
    constructor(){
        this.elapsed = 0;
    }

    update(){
        this.elapsed++;
    }

    getTime(){
        return Math.floor(this.elapsed / 60);
    }

    printTime(){
        context.font = "12px Arial";
		context.fillStyle = "white";
		context.fillText(`${this.getTime()}s`, GAMEWIDTH - 30, 20);
    }

    printTimeBold(){
        context.font = "30px Arial Bold";
        context.fillStyle = "white";
        let endText = `You won in ${this.getTime()}s`;
		context.fillText(endText, GAMEWIDTH / 2, GAMEHEIGHT / 2);
    }
}

// Get a random integer, min and max inclusive
function getRandomInteger(min,max){
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    return x;
}

// Get a random integer, min and max inclusive, excluding the third parameter
function getRandomIntegerExcluding(min,max,excluded){
    let x = Math.floor(Math.random() * (max - min)) + min;
    while(x == excluded){
        x = Math.floor(Math.random() * (max - min)) + min;
    }
    return x;
}