let size = 9;   // default values is easy mode so values
let mines = 10;
let pixel_size = 40;

const build_new_board = () => {
    let tabparent = document.getElementById("tabparent");
    let existingTable = document.getElementById("tab");
    if (existingTable) {
        tabparent.removeChild(existingTable); // Remove existing table if it exists
    }
    let tab = document.createElement("table");
    tab.setAttribute("id", "tab");
    for (let i = 0; i < size; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            let col = document.createElement("td");
            let img = document.createElement("img");
            img.height=pixel_size;
            img.setAttribute("src", "assets/blank.jpg");
            img.setAttribute("class", "imgb");
            img.setAttribute("id", i + "" + j);
            col.appendChild(img);
            row.appendChild(col);
        }
        tab.appendChild(row);
    }
    tabparent.appendChild(tab); // Add the new table to the parent element
}
const get_random_mines = (mines,range) => { //function will return the random position of mines 
    let random_mine_pos = [];
    for (let i = 0; i < mines; i++) {
        let a = Math.ceil(Math.random() * range);
        random_mine_pos.includes(a) ? i-- : random_mine_pos.push(a);
    }
    return random_mine_pos;
}
const playboard = (mines,range) => { //function will return the board with mines
    let bomb_pos = get_random_mines(mines,range);
    let set_board = [];
    let temp = 1 ;
    for (let i = 0; i < size; i++) {
        let temparr = [];
        for (let j = 0; j < size; j++) {
            bomb_pos.includes(temp) ? temparr.push(9) : temparr.push(0);
            temp++;
        }
        set_board.push(temparr);
    }
    return set_board;
}
const calc = (mines,range)=>{ //function will return the board with final calculations and numbers calculations
    let board = playboard(mines,range);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] != 9) {
                if ((j - 1) > 0 && board[i][j - 1] == 9) board[i][j]++;
                if ((j + 1) < size && board[i][j + 1] == 9) board[i][j]++;
                if ((i - 1) > 0 && board[i - 1][j] == 9) board[i][j]++;
                if ((i + 1) < size && board[i + 1][j] == 9) board[i][j]++;
                if ((i - 1) > 0 && (j + 1) < size && board[i - 1][j + 1] == 9) board[i][j]++;
                if ((i + 1) < size && (j + 1) < size && board[i + 1][j + 1] == 9) board[i][j]++;
                if ((i - 1) > 0 && (j - 1) > 0 && board[i - 1][j - 1] == 9) board[i][j]++;
                if ((i + 1) < size && (j - 1) > 0 && board[i + 1][j - 1] == 9) board[i][j]++;
            }
        }
    }
    return board;
}



document.getElementById("EASY").addEventListener("click", () => {
    size=9; 
    mines=10; 
    pixel_size = 40; 
    build_new_board();
});
document.getElementById("MEDIUM").addEventListener("click", () => {
    size=16; 
    mines=40; 
    pixel_size = 30; 
    build_new_board();
});
document.getElementById("HARD").addEventListener("click", () => {
    size=23; 
    mines=99; 
    pixel_size = 25; 
    build_new_board();
});
// document.getElementById("go").addEventListener("click",build_new_board());


document.getElementById("show").addEventListener("click", () => {
    let yoyo = calc(mines,size*size)
    console.log(yoyo)
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let img = document.getElementById(i+""+j);
            img.setAttribute("src", "assets/"+yoyo[i][j]+".jpg");
        }
    }
});


// let flag = 0;
// let a = document.getElementById("11").addEventListener("contextmenu", () => {
//     document.getElementById("11").setAttribute("src", flag % 2 == 0 ? "assets/blank.jpg" : "assets/redflag.jpg");
//     flag++;
// });