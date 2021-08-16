//IDEAS:
//if ballon touches a bird, game is over


var hotAirBalloon, hotAirBalloonImage
var sky, backgroundImage
var bird, birdImage, birdImage2
var rand
var flame, flameImage
var birdGroup, flameGroup
var score
var gameState
var gameOver, gameOverImage
var start, startImage
var edge1, edge2
var clouds, cloudImage, cloudGroup;

function preload(){

  hotAirBalloonImage = loadImage("hotAirBalloon.png");
  
  backgroundImage = loadImage("bluesky.jpg");
  
  birdImage = loadImage("bird1.png");
  birdImage2 = loadImage("bird2.png");
  
  flameImage = loadImage("flames.png");
  
  gameOverImage = loadImage("game-over-1.webp");
  
  startImage = loadImage("start.jpg");

  cloudImage = loadImage("Clouds-10.png");
  
}

function setup() {
  createCanvas(400, 600);
  
  hotAirBalloon = createSprite(200,300,20,20);
  hotAirBalloon.addImage(hotAirBalloonImage);
  hotAirBalloon.scale = 0.1;
  
  hotAirBalloon.setCollider("circle",0,20,500)
  
  /*sky = createSprite(200,120,20,20);
  sky.addImage(backgroundImage);
  sky.scale = 1.2;*/
  
  birdGroup = createGroup();
  flameGroup = createGroup();
  cloudGroup = createGroup();
  
  score = 0;
  
  gameState = "start";
  
  start = createSprite(200,camera.y+300,100,100);
  start.scale = 1.2; 
  start.addImage(startImage);
  
  gameOver = createSprite(200,camera.y-100,20,20);
  gameOver.scale = 0.8;
  gameOver.addImage(gameOverImage);
  
  edge1 = createSprite(-20,300,30,600);
  edge1.visible = false;
  
  edge2 = createSprite(420,300,30,600);
  edge2.visible = false;
  
}

function draw() {
  
  background(backgroundImage);
 //image(backgroundImage, 0, -300, 400, 600*5);

  if(gameState == "start"){
    start.visible = true;
    gameOver.visible = false;
    
    if(keyDown("space")){
      gameState = "play";
    }
    
  }else if(gameState == "play"){  

    start.visible = false; 
    gameOver.visible = false;

  /*  sky.velocityY = 0.2;
    if (sky.y > 500){
      sky.y = sky.height/2;
    }*/

   // console.log(hotAirBalloon);

    if(keyDown("left")){
    hotAirBalloon.x = hotAirBalloon.x -3;
  }
  
    if(keyDown("right")){
    hotAirBalloon.x = hotAirBalloon.x +3;
  }

    if(keyDown("up")){
      hotAirBalloon.y = hotAirBalloon.y -3;

    camera.position.x = 200;
    camera.position.y = hotAirBalloon.y;  

    }
    
  //  hotAirBalloon.bounceOff(edge1);
    //hotAirBalloon.bounceOff(edge2);
    
    cloud();
    birds();
    flames();
    
    if(hotAirBalloon.isTouching(flameGroup)){
    flameGroup.destroyEach();
    score = score+1;
  }

  if(keyWentUp("up")){
    hotAirBalloon.velocityY = 0;
  }
    
    if(hotAirBalloon.isTouching(birdGroup)){
      birdGroup.destroyEach();
      score = 0;
      hotAirBalloon.velocityX = 0;
      hotAirBalloon.velocityY = 0;
      gameState = "end";
    }
    
    
  }else if(gameState == "end"){
    flameGroup.destroyEach();
    birdGroup.destroyEach();
  //  flameGroup.setVelocityYEach(0);
    //birdGroup.setVelocityYEach(0);
    start.visible = true;
    gameOver.visible = true;
    gameState = "over";
  
  }else if(gameState == "over"){
    start.visible = true;
    gameOver.visible = true;
    
    gameState = "start"
   /* if(keyDown("space")){
      gameState = "play";
    }*/
  }

  drawSprites();

  textSize(30);
  text("Score: "+score, 150, camera.y-255);

}

function birds(){
  if(frameCount%300 == 0){
    bird = createSprite(200,hotAirBalloon.y-300,20,20);
    
    bird.x = Math.round(random(30,370));
    
    rand = Math.round(random(1,2));
    switch(rand){
      case 1: bird.addImage(birdImage);
        break;
      case 2: bird.addImage(birdImage2);
        break;
      default: break;
    }
    
    bird.scale = 0.03;

    birdGroup.add(bird);
    
  }
  
}

function flames(){
  if(frameCount%250 == 0){
    flame = createSprite(200,hotAirBalloon.y-300,20,20);
    
    flame.x = Math.round(random(30,370));
    
    flame.addImage(flameImage);
    flame.scale = 0.1;
    
    flameGroup.add(flame);
    
  }
}


function cloud(){
  if(frameCount%100 == 0){
    clouds = createSprite(200,hotAirBalloon.y-300,20,20);
    
    clouds.x = Math.round(random(30,370));
    
    clouds.addImage(cloudImage);
    clouds.scale = 0.2;
    
    hotAirBalloon.depth = clouds.depth;
    hotAirBalloon.depth = hotAirBalloon.depth+1;

    cloudGroup.add(clouds);
    
  }
}
