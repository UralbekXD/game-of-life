const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const nextBtn = document.querySelector("#next");
const gen = document.querySelector("#gen");


let config = {
    cellSize : 10,
    canvasWidth : canvas.width, // width must be higher or equal to 340px
    canvasHeight : canvas.height,
    generation : 0,
    isStarted : false,
    time : 100, // in ms
    liveCellColor : "white",
    deadCellColor : "black"
};

let interval;

let arr = [];


class Rect {

    constructor(y, x, color="black") {
        this.x = x * config.cellSize,
        this.y = y * config.cellSize,
        this.width = config.cellSize - 1,
        this.height = config.cellSize - 1,
        this.color = color;
    }

    draw(context) {

        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = (this.color == "black") ? "grey" : "white";
        context.fillStyle = this.color;

        context.rect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        context.stroke();
        context.fill()
    }

    clear(context) {
        
        context.beginPath();
        ctx.clearRect(
            this.x,
            this.y,
            this.width,
            this.height
        )

    }

}


function drawWorld() {
    for (let i = 0; i < config.canvasHeight / config.cellSize; i++) {
        for (let j = 0; j < config.canvasWidth / config.cellSize; j++) {
            let rect = new Rect(i, j);
            rect.draw(ctx);
        }
    }
}


function draw(array) {

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let white = new Rect(i, j, "white");
            let black = new Rect(i, j);

            if (array[i][j] == 1) {
                white.clear(ctx);
                white.draw(ctx);
            } else {
                black.clear(ctx);
                black.draw(ctx);
            }
        }
    }

}


function init() {
    for (let i = 0; i < config.canvasHeight / config.cellSize; i++) {
        arr[i] = [];
        for (let j = 0; j < config.canvasWidth / config.cellSize; j++) {
            arr[i][j] = 0;
        }
    }
}


// this function will increment value of generation property by one
function increment() {
    config.generation++;
}


function reset() {
    drawWorld();
    init();

    clearInterval(interval);

    config.generation = 0;
    gen.innerHTML = `<b>Generation: ${config.generation}</b>`;
    // startBtn.disabled = false;
}


function next() {
    let temp = [];

    for (let a = 0; a < arr.length; a++) {
        temp[a] = [];
        for (let b = 0; b < arr[a].length; b++) {
            temp[a][b] = arr[a][b];
        }
    }


    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {

            let nn = [
                [i - 1, j - 1],
                [i, j - 1],
                [i + 1, j - 1],
                [i - 1, j],
                [i + 1, j],
                [i - 1, j + 1],
                [i, j + 1],
                [i + 1, j + 1]
            ];

            let valid = nn.filter(function(cord) {
                let x = cord[0], y = cord[1];

                if ( (x >= 0 && x < arr.length) && (y >= 0 && y < arr[i].length) ) {
                    if (arr[x][y] == 1) {
                        return true;
                    }
                }
            }).length;
            
            let cell = arr[i][j];

            if (cell == 1 && valid < 2 || valid > 3) {
                temp[i][j] = 0;
            }
            else if (cell == 0 && valid == 3) {
                temp[i][j] = 1;
            } else {
                temp[i][j] = cell;
            }
        }
    }

    arr = temp;
}


// this function will update cells of world every n second
// and will increment generation by one
function update() {
    next();
    draw(arr);

    increment();
    gen.innerHTML = `<b>Generation: ${config.generation}</b>`;
}


function loop() {

    interval = setInterval(function() {
        update();
    }, config.time);
}


function main() {
    drawWorld();
    init();
    draw(arr);

}

main();


resetBtn.addEventListener("click", reset);


startBtn.addEventListener("click", loop);


nextBtn.addEventListener("click", update);


canvas.addEventListener("click", function(event) {
    let x = event.offsetX;
    let y = event.offsetY;


    x = Math.floor(x / config.cellSize);
    y = Math.floor(y / config.cellSize);

    console.log(config.canvasWidth, config.canvasHeight);;


    switch (arr[y][x]) {
        case 0:
            let false_ = new Rect(y, x, "white");

            arr[y][x] = 1;

            false_.clear(ctx);
            false_.draw(ctx);
            break;

        case 1:
            let true_ = new Rect(y, x);

            arr[y][x] = 0;

    
            true_.clear(ctx);
            true_.draw(ctx);
            break;
    }

});
