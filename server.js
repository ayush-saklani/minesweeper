let size = 9;
let game = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]
const get_random_mines = (mines,range) => {
    let arr = [];
    for (let i = 0; i < mines; i++) {
        let a = Math.ceil(Math.random() * range);
        arr.includes(a) ? i-- : arr.push(a);
    }
    return arr;
}
const playboard = (mines,range) => {
    let bomb_pos = get_random_mines(mines,range);
    let arr = [];
    let temp = 1 ;
    for (let i = 0; i < size; i++) {
        let temparr = [];
        for (let j = 0; j < size; j++) {
            if(bomb_pos.includes(temp)){
                temparr.push(9);
            }
            else{
                temparr.push(0);
            }
            temp++;
        }
        arr.push(temparr);
    }
    return arr;
}

console.log(calc(9,81)); 
// console.log(Math.random()*10);

// console.log((Array.from({length: 40}, () => Math.floor(Math.random() * 40))).sort());
