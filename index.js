let size = 9;   // default values is easy mode so values
let leng = 9;
let heig = 9;
let mines = 10;
let pixel_size = 50;
let global_board = [];
let flag = 0;

const refresh_board = () => {
    for (let i = 0; i < heig; i++) {
        for (let j = 0; j < leng; j++) {
            let img = document.getElementById(i + "x" + j);
            if(global_board[i][j].hide == false){
                img.setAttribute("src", "assets/" + global_board[i][j].slot + ".jpg");
            }
            else{
                if(global_board[i][j].flag==1){
                    img.setAttribute("src", "assets/redflag.jpg");
                }
            }
        }
    }
}
const red_flag = (id) => {
    const [i, j] = id.split("x");
    if(global_board[i][j].flag == 0){
        global_board[i][j].flag++;
        refresh_board();
        // document.getElementById(id).setAttribute("src", flag % 2 == 0 ? "assets/blank.jpg" : "assets/redflag.jpg");
        // flag++;
    }
    else if(global_board[i][j].flag==1){
        global_board[i][j].flag--;
        refresh_board();
    }
}
const gameover = () => {
    for (let i = 0; i < heig; i++) {
        for (let j = 0; j < leng; j++) {
            let img = document.getElementById(i + "x" + j);
            if(global_board[i][j].slot == 9){
                global_board[i][j].hide = false;
            }
        }
    }
    refresh_board();
}
const explore = (i, j) => {
    console.log("Exploring:", i, j);
    console.log("Board:", global_board);
    if (i < 0 || i >= heig || j < 0 || j >= leng) {
        console.error("Indices out of bounds:", i, j);
        return;
    }
    if (global_board[i][j].slot == 0) {
        let temp = 0;
        global_board[i][j].hide = false
        if ((j - 1) >= 0 && global_board[i][j - 1].hide == true) {
            global_board[i][j - 1].hide = false;
            temp++;
        }
        if ((i - 1) >= 0 && global_board[i - 1][j].hide == true) {
            global_board[i - 1][j].hide = false;
            temp++;
        }
        if ((j + 1) < leng && global_board[i][j + 1].hide == true) {
            global_board[i][j + 1].hide = false;
            temp++;
        }
        if ((i + 1) < heig && global_board[i + 1][j].hide == true) {
            global_board[i + 1][j].hide = false;
            temp++;
        }
        if ((i - 1) >= 0 && (j - 1) >= 0 && global_board[i - 1][j - 1].hide == true) {
            global_board[i - 1][j - 1].hide = false;
            temp++;
        }
        if ((i - 1) >= 0 && (j + 1) < size && global_board[i - 1][j + 1].hide == true) {
            global_board[i - 1][j + 1].hide = false;
            temp++;
        }
        if ((i + 1) < heig && (j - 1) >= 0 && global_board[i + 1][j - 1].hide == true) {
            global_board[i + 1][j - 1].hide = false;
            temp++;
        }
        if ((i + 1) < heig && (j + 1) < leng && global_board[i + 1][j + 1].hide == true) {
            global_board[i + 1][j + 1].hide = false;
            temp++;
        }
        if (temp == 0) {
            refresh_board();
        }
        else {
            if ((j - 1) >= 0 && global_board[i][j - 1].slot == 0) {
                explore((i), (j - 1));
            }
            if ((i - 1) >= 0 && global_board[i - 1][j].slot == 0) {
                explore((i - 1), (j));
            }
            if ((j + 1) < leng && global_board[i][j + 1].slot == 0) {
                explore((i), (j + 1));
            }
            if ((i + 1) < heig && global_board[i + 1][j].slot == 0) {
                explore((i + 1), (j));
            }
            if ((i - 1) >= 0 && (j - 1) >= 0 && global_board[i - 1][j - 1].slot == 0) {
                explore((i - 1), (j - 1))
            }
            if ((i - 1) >= 0 && (j + 1) < size && global_board[i - 1][j + 1].slot == 0) {
                explore((i - 1), (j + 1))
            }
            if ((i + 1) < heig && (j - 1) >= 0 && global_board[i + 1][j - 1].slot == 0) {
                explore((i + 1), (j - 1))
            }
            if ((i + 1) < heig && (j + 1) < leng && global_board[i + 1][j + 1].slot == 0) {
                explore((i + 1), (j + 1))
            }
        }
    }
    else if (global_board[i][j].slot == 9){
        gameover();
    }
    else {
        global_board[i][j].hide = false;
        refresh_board();
    }
    refresh_board();
}

const build_new_board = () => {
    let tabparent = document.getElementById("tabparent");
    let existingTable = document.getElementById("tab");
    if (existingTable) {
        tabparent.removeChild(existingTable); // Remove existing table if it exists
    }
    let tab = document.createElement("table");
    tab.setAttribute("id", "tab");
    for (let i = 0; i < heig; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < leng; j++) {
            let col = document.createElement("td");
            let img = document.createElement("img");
            img.height = pixel_size;
            img.setAttribute("src", "assets/blank.jpg");
            img.setAttribute("class", "imgb");
            img.setAttribute("id", i + "x" + j);
            img.addEventListener("contextmenu", () => red_flag(i + "x" + j));
            img.addEventListener("click", () => explore(i , j));
            col.appendChild(img);
            row.appendChild(col);
        }
        tab.appendChild(row);
    }
    tabparent.appendChild(tab); // Add the new table to the parent element
}
const get_random_mines = (mines, range) => { //function will return the random position of mines 
    let random_mine_pos = [];
    for (let i = 0; i < mines; i++) {
        let a = Math.ceil(Math.random() * range);
        random_mine_pos.includes(a) ? i-- : random_mine_pos.push(a);
    }
    return random_mine_pos;
}
const playboard = (mines, range) => { //function will return the board with mines
    let bomb_pos = get_random_mines(mines, range);
    let set_board = [];
    let temp = 1;
    for (let i = 0; i < heig; i++) {
        let temparr = [];
        for (let j = 0; j < leng; j++) {
            bomb_pos.includes(temp) ? temparr.push({ "slot": 9, "hide": true ,"flag":0}) : temparr.push({ "slot": 0, "hide": true ,"flag":0});
            temp++;
        }
        set_board.push(temparr);
    }
    return set_board;
}
const calc = (mines, range) => { //function will return the board with final calculations and numbers calculations
    let board = playboard(mines, range);
    for (let i = 0; i < heig; i++) {
        for (let j = 0; j < leng; j++) {
            if (board[i][j].slot != 9) {
                if ((j - 1) >= 0 && board[i][j - 1].slot == 9) board[i][j].slot++;
                if ((i - 1) >= 0 && board[i - 1][j].slot == 9) board[i][j].slot++;
                if ((j + 1) < leng && board[i][j + 1].slot == 9) board[i][j].slot++;
                if ((i + 1) < heig && board[i + 1][j].slot == 9) board[i][j].slot++;
                if ((i - 1) >= 0 && (j - 1) >= 0 && board[i - 1][j - 1].slot == 9) board[i][j].slot++;
                if ((i - 1) >= 0 && (j + 1) < size && board[i - 1][j + 1].slot == 9) board[i][j].slot++;
                if ((i + 1) < heig && (j - 1) >= 0 && board[i + 1][j - 1].slot == 9) board[i][j].slot++;
                if ((i + 1) < heig && (j + 1) < leng && board[i + 1][j + 1].slot == 9) board[i][j].slot++;
            }
        }
    }
    return board;
}

document.getElementById("EASY").addEventListener("click", () => {
    size = 9;
    leng = 9;
    heig = 9;
    mines = 10;
    pixel_size = 55;
    global_board = calc(mines, leng * heig)
    build_new_board();
});
document.getElementById("MEDIUM").addEventListener("click", () => {
    size = 16;
    leng = 16;
    heig = 16;
    mines = 40;
    pixel_size = 30;
    global_board = calc(mines, leng * heig)
    build_new_board();
});
document.getElementById("HARD").addEventListener("click", () => {
    size = 23;
    leng = 30;
    heig = 16;
    mines = 99;
    pixel_size = 30;
    global_board = calc(mines, leng * heig)
    build_new_board();
});
// document.getElementById("go").addEventListener("click",build_new_board());

document.getElementById("show").addEventListener("click", () => {
    global_board = calc(mines, leng * heig)
    console.log(global_board)
    for (let i = 0; i < heig; i++) {
        for (let j = 0; j < leng; j++) {
            let img = document.getElementById(i + "x" + j);
            img.setAttribute("src", "assets/" + global_board[i][j].slot + ".jpg");
        }
    }
});
