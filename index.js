let size = 7;
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
let flag = 0;
let a = document.getElementById("11").addEventListener("contextmenu", () => {
    document.getElementById("11").setAttribute("src", flag % 2 == 0 ? "assets/blank.jpg" : "assets/redflag.jpg");
    flag++;
});
