let size = 9;
document.getElementById("go").addEventListener("click", () => {
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
            img.setAttribute("src", "assets/blank.jpg");
            img.setAttribute("id", i + "" + j);
            col.appendChild(img);
            row.appendChild(col);
        }
        tab.appendChild(row);
    }
    tabparent.appendChild(tab); // Add the new table to the parent element
});
// let flag = 0;
// let a = document.getElementById("11").addEventListener("contextmenu", () => {
//     document.getElementById("11").setAttribute("src", flag % 2 == 0 ? "assets/blank.jpg" : "assets/redflag.jpg");
//     flag++;
// });

let game = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 0, 0, 0, 0, 9, 0, 0],
    [0, 0, 9, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 9, 0, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let gamecal = [
    [1, 1, 1, 0, 0, 1, 1, 1, 0],
    [1, 9, 2, 1, 0, 1, 9, 1, 0],
    [1, 2, 9, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 1, 9, 1, 0, 0],
    [1, 9, 1, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0]
]
let calc = ()=>{
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (game[i][j] != 9) {
                if ((j - 1) > 0 && game[i][j - 1] == 9) game[i][j]++;
                if ((j + 1) < size && game[i][j + 1] == 9) game[i][j]++;
                if ((i - 1) > 0 && game[i - 1][j] == 9) game[i][j]++;
                if ((i + 1) < size && game[i + 1][j] == 9) game[i][j]++;
                if ((i - 1) > 0 && (j + 1) < size && game[i - 1][j + 1] == 9) game[i][j]++;
                if ((i + 1) < size && (j + 1) < size && game[i + 1][j + 1] == 9) game[i][j]++;
                if ((i - 1) > 0 && (j - 1) > 0 && game[i - 1][j - 1] == 9) game[i][j]++;
                if ((i + 1) < size && (j - 1) > 0 && game[i + 1][j - 1] == 9) game[i][j]++;
            }
        }
    }
}
document.getElementById("show").addEventListener("click", () => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let img = document.getElementById(i+""+j);
            img.setAttribute("src", "assets/"+gamecal[i][j]+".jpg");
        }
    }
});