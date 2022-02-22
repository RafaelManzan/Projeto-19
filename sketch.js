var towerImg, tower;
var gameOver,gameOverImg;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  towerImg = loadImage("tower.png");
  gameOverImg = loadImage("fimdejogo.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;

  //generateDoors();

  ghost = createSprite(400,10,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.42;       
  gameOver = createSprite(300,300);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.depth = ghost.depth - 100;

}

function draw() {
  background(200);

  if(ghost.isTouching(invisibleBlockGroup)){
    gameOver.depth = ghost.depth + 110;
  }

  if(keyDown("space")){
    ghost.velocityY = -5;
  }

  if(keyDown("left_arrow")){
    ghost.x = ghost.x -5;
  }

  if(keyDown("right_arrow")){
    ghost.x = ghost.x +5;
  }

  ghost.velocityY = ghost.velocityY +0.8;  
  
  if(tower.y > 410){
      tower.y = 300;
  }
  
  generateDoors();

  drawSprites();
}

function generateDoors(){

  if(frameCount % 310 === 0){
    invisibleBlock = createSprite(200,5);
    climber = createSprite(200,10);
    door = createSprite(200,-50);
    climber.addImage(climberImg);
    door.addImage(doorImg);
    invisibleBlock.velocityY = 2;
    climber.velocityY = 2;
    door.velocityY = 2;
    door.x = Math.round(random(120,400));
    invisibleBlock.x = door.x;
    climber.x = door.x;
    invisibleBlock.lifetime = 800;
    climber.lifetime = 800;
    door.lifetime = 800;
    ghost.depth = climber.depth + 10; 
    climber.depth = door.depth;
    climber.depth = climber.depth +10;
    invisibleBlock.depth = door.depth;
    invisibleBlock.depth = invisibleBlock.depth -1000;
    invisibleBlockGroup.add(invisibleBlock);
    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
}
