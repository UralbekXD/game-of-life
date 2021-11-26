let arr = [];
let size = 10;

/*
RULES:

    Survivals:
        Every counter with two or three neighboring
        counters survives for the next generation.
    
    Deaths:
        Each counter with four or more neighbors
        dies (is removed) from overpopulation.
        Every counter with one neighbor or none
        dies from isolation.

    Births:
        Each empty cell adjacent to exactly three
        neighbors-no more, no fewer-is a birch cell.
        A counter is placed on it at the next move.

    
    Alive = 1
    Dead  = 0

*/


for (let i = 0; i < size; i++) {
    arr[i] = [];
    for (let j = 0; j < size; j++) {
        arr[i][j] = 0;
    }
}

// starship
arr[1][1] = 1;
arr[2][2] = 1;
arr[3][2] = 1;
arr[3][1] = 1;
arr[3][0] = 1;

let newest = [];

for (let i = 0; i < size; i++) {
    newest[i] = [];
    for (let j = 0; j < size; j++) {
        newest[i][j] = arr[i][j];
    }
}

for (let i = 0; i < size; i++) {

    for (let j = 0; j < size; j++) {

        let cell = arr[i][j];

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

            if ( (x >= 0 && x <= size - 1) && (y >= 0 && y <= size - 1) ) {
                // console.log(`row: ${x}, col:${y}`);
                if (arr[x][y] == 1) {
                    return true;
                }
            }
        }).length;
        

        if (cell) {

            if (valid >= 4 || valid <= 1) {
                newest[i][j] = 0;
            }


        } else {

            if (valid == 3) {
                newest[i][j] = 1;
            }
        }
    }

}


arr = newest;
console.table(arr)