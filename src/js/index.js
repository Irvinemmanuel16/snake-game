import '../styles/index.scss';

let canvas, ctx, juego;
let defaultTailSize = 3;
let tailSize = defaultTailSize;
let [tileSize, gridSize] = Array(2).fill(20);
let snakeTrail = [];
let [snakeX, snakeY] = Array(2).fill(10);
let [nextX, nextY] = Array(2).fill(0);
let [appleX, appleY] = Array(2).fill(15);

const btn = document.createElement('button');
const para = document.getElementById('para');
const div = document.querySelector('.container')


window.onload = () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  btn.addEventListener('click', tooglePlay);
  tooglePlay()
}


function tooglePlay(){
  let x = 8;
  if(!juego){ 
    juego = setInterval(draw, 1000 / x);
    document.addEventListener("keyup", keyupEvent);
  }
  else{
    clearInterval(juego);
    juego = null
    document.removeEventListener("keyup", keyupEvent);
  }
  (!juego) ? btn.textContent = 'Jugar' : btn.textContent = 'Pausar'
}

function draw(){
  snakeX += nextX;
  snakeY += nextY;
  para.textContent = `Su puntuación es: ${tailSize - defaultTailSize}`
  if(snakeX < 0){
    snakeX = gridSize - 1;
  }
  if(snakeX > gridSize - 1){
    snakeX = 0;
  }
  if(snakeY < 0){
    snakeY = gridSize - 1;
  }
  if(snakeY > gridSize - 1){
    snakeY = 0;
  }
  if(snakeX == appleX && snakeY == appleY){
    tailSize++;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  for(let i = 0; i < snakeTrail.length; i++){
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );
    if(snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY){
      tailSize = defaultTailSize;
    }
  }
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize)
  snakeTrail.push({ x: snakeX, y: snakeY });
  while(snakeTrail.length > tailSize){
    snakeTrail.shift();
  }
}

function keyupEvent(e){
  switch(e.keyCode){
    case 37: 
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}

div.append(btn);
document.body.append(div);
