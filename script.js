const canvas = document.getElementById("canvas");
const score = document.getElementById("score");
const days = document.getElementById("days");
const endscreen = document.getElementById("endScreen");
let count;
daysLeft = 60;
gameOverNumber = 50;
loopPlay=false;
//apartir de cette function
function start() {
  count = 0;
  getFaster = 6000;
  daysRemaining = daysLeft;
  score.innerHTML = count;
  canvas.innerHTML = "";
  days.innerHTML = daysRemaining;
  loopPlay ? '': game()
  loopPlay=true;
  game()
  function game() {
      let randomTime=Math.round(Math.random()*getFaster);
      getFaster>700 ? getFaster=(getFaster*0.9):'';
    setTimeout(() => {
        if (daysRemaining===0){
            youWin()
        }else if(canvas.childElementCount<gameOverNumber){
            virusPop();
            game();
        }else{
            gameOver();
        }
      
    },randomTime);
  }
}
function gameOver() {
    endscreen.innerHTML=`<div class='gameOver'>GAME OVER <br/>Score: ${count}</div>`
    endscreen.style.visibility='visible';
    endscreen.style.opacity='1';
    loopPlay=false;
}

function youWin() {
    let accuracy=Math.round(count/daysLeft *100)
    endscreen.innerHTML=`<div class='youWin'>Bravo! ta atomisé cette merde</br><span>précision: ${accuracy}%</span></div>`;
    endscreen.style.visibility='visible';
    endscreen.style.opacity='1';
    loopPlay=false;
    
}

function virusPop() {
  let virus = new Image();
  virus.src = "./media/basic-pics/pngwave.png";
  console.log(virus);
  virus.classList.add("virus");
  virus.style.top = Math.random() * 500 + "px";
  virus.style.left = Math.random() * 500 + "px";

  let x, y;
  x = y = Math.random() * (50 - 30 + 1) + 30;
  console.log(x);
  virus.style.setProperty("--x", `${x}px`);
  virus.style.setProperty("--y", `${y}px`);
  let plusMinus = Math.random() < 0.5 ? -1 : 1;
  let trX = Math.random() * 500 * plusMinus;
  let trY = Math.random() * 500 * plusMinus;
  virus.style.setProperty("--trX", `${trX}%`);
  virus.style.setProperty("--trY", `${trY}%`);

  canvas.appendChild(virus);
}

//REMOVE ELEMENT CLICKED
document.addEventListener("click", function (e) {
  let targetElement = e.target || e.srcElement;
  if (targetElement.classList.contains("virus")) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  }
});
canvas.addEventListener('click',()=>{
    if (daysRemaining>0){
        daysRemaining--;
        days.innerHTML=daysRemaining;
    }
})
