let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio("music/move.mp3")

let speed = 12;
let score = 0;
let lastpaintTime = 0;
let snakeArr = [
    { x: 10, y: 13 }
];
let food = { x: 5, y: 7 };

// game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}
function iscollide(snake){
  // whene snake crash into yourself
  for (let i = 1;  i< snakeArr.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
  }
  // whene snake crash into the well
    if(snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <=0 ){
        return true;
    } 
    false;
}


function gameEngine() {
    // part 1 updeting the snake array & food
    if(iscollide(snakeArr)){
        gameOverSound.play();
        inputDir = {x: 0, y: 0};
        alert("Game Over . prees any key to plye againe");
        snakeArr = [{x: 10, y: 13}];
        score = 0;
    }
    // whene snake have  eaten  food then regenrate the food
    if(snakeArr[0].y ===food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
          let  hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify( hiscoreval));
            highscorebox.innerHTML = "High Score: "+ hiscoreval;
        }
        scorebox.innerHTML = "Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 18;
        food = {x: Math.round(a +(b -a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }
      
     //move the snake
     for (let i =snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};      
     } 
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

    // part 2 display the snake

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the snake
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


// main logi 

 let hiscore = localStorage.getItem("hiscore")
 if(hiscore === null){
    hiscoreval = 0;
    localStorage .setItem("hiscore", json.stringify(hiscoreval))
 }
 else{
    hiscoreval = JSON.parse(hiscore);
    highscorebox.innerHTML ="High Score: "+ hiscore;
 }

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});