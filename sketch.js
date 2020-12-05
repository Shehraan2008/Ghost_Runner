// making the gameState
var gameState = "play";
// making the objects of the game 
var towerImage, tower, doorImage, door, doorsGroup, climberImage, climber 
// making the group
var climbersGroup, invBlockGroup, invBlock;
// making the player 
var ghost, ghostImage;

// loading the sound and image 
function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

// creating sprite 
function setup() {
  // creating the cnavas 
  createCanvas(600, 600);

  // creating the background
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;

  // creating the player
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;

  // creating the groups
  doorsGroup = new Group();
  climbersGroup = new Group();
  invBlockGroup = new Group();

  // playing the sound
  spookySound.loop();
}

function draw() {
  // background
  background(0);
  
  // PLAY
  if (gameState === "play") {
    // movement of the player
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    } else if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    // makng it jump 
    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
    
    // giving the ghost some gravity
    ghost.velocityY = ghost.velocityY + 0.8

    // infinite background 
    if (tower.y > 400) {
      tower.y = 300
    }
    // making the obsctacles 
    spawnDoors();
    climbersGroup.collide(ghost);

    // lossing the game 
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }

    // drawing the sprites 
    drawSprites();
  }

  // END
  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(79);
    textStyle(BOLD);
    text("GAME OVER", 70, 300)
  }

}

// spawning the doors, climbers and inv blocks
function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 150 === 0) {
    door = createSprite(Math.round(random(120, 400)), -50);
    door.addImage(doorImage);
    door.velocityY = 2;
    doorsGroup.add(door);
    door.lifetime = 300;

    climber = createSprite(200, 10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 300;
    climbersGroup.add(climber);

    invBlock = createSprite(200, 15);
    invBlock.width = climber.width;
    invBlock.height = 2;
    invBlock.x = door.x;
    invBlock.velocityY = 2;
    invBlock.lifetime = 300;
    invBlockGroup.add(invBlock);
  }
}