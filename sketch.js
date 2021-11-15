
var bob,block,total,bobSensor,idle,walk,jump;
var block,grassImg,dirtImg,blockGroup,smallBlock,coin,coinImg,spikesImg,spikeGroup,bounceImg,bounceGroup,heart,heartImg,lives;
var sky,skyImg;
var gameState = 0
var musica,jump,hurt,title,titleImg;
function preload(){
  grassImg = loadImage("grass.png");
  dirtImg = loadImage("dirt.png");
  skyImg = loadImage("sky.jpg");
  idle = loadImage("costume1 (3).png");
  smallBlock = loadImage("pixil-frame-0 (3).png")
  musica  = loadSound("Sound1.mp3")
  // musica = new Audio('Sound1.mp3');
  coinImg = loadAnimation("coin.png");
  spikesImg = loadImage("spikes.png");
  //   if (typeof musica.loop == 'boolean')
  // {
  //     musica.loop = true;
  // }

  bounceImg = loadImage("bounce_orb.png")
  jump = loadSound("mixkit-quick-jump-arcade-game-239.mp3")
  hurt = loadSound("minecraft_hit_soundmp3converter.mp3")
  titleImg = loadImage("Super-Stickman-Land.png")
}

function setup(){
musica.play();
musica.loop = true;
  createCanvas(windowWidth,windowHeight)
  bob = createSprite(130,50,10,10)
  bob.addImage(idle)
  title = createSprite(bob.x, bob.y - 200)
  title.addImage(titleImg)
  bobSensor = createSprite(bob.x,bob.y + 10,5,1)
  // sky = createSprite(bob.x,bob.y)
  // sky.addImage(skyImg)
  blockGroup = createGroup()
  spikeGroup = createGroup()
  bounceGroup = createGroup()
  createLevel()
}

function draw() {
  background("#87CEEB");
  musica.setVolume(0.5)
  //sky.depth -=1
  // restart.deph +=5
  // sky.x = camera.x
  // sky.y = camera.y
  // sky.scale = 1.5
  camera.x = bob.x
  camera.y = bob.y
  bobSensor.x = bob.x
  bobSensor.y = bob.y + 25
  if (spikeGroup.isTouching(bob) || bob.y > 200){
    bob.x = 130
    bob.y = 50
    hurt.play()
    title.visible = (gameState === 0);
  }
  // restart.x = camera.x - 700
  // restart.y = camera.y - 300
  // restart.scale = 0.5
  // restart.angle -= 5;
  drawSprites()
  handleMouvement()
}

function CreateBlock(x,y,type){
  block = createSprite(x*120,y*120,130,130);
  if(type == "grass"){
    block.addImage(grassImg)
  } else if (type == "dirt") {
    block.addImage(dirtImg)
  } else if (type == "small"){
    block.addImage(smallBlock);
    block.x = block.x + 30
    block.y = block.y + 30
  }
  blockGroup.add(block)
}

function handleMouvement(){
  if (keyDown("left")&&(gameState = 1)){
    bob.velocityX = -8
  } else if (keyDown("right") && (gameState = 1)){
    bob.velocityX = 8
  } else {
    bob.velocityX = 0
  }
  if (keyWentDown("space") && (bobSensor.isTouching(blockGroup)||bobSensor.isTouching(bounceGroup))){
    bob.velocityY = -12
    jump.play()
    gameState = 1
  }
  if (!bobSensor.isTouching(blockGroup)){
    bob.velocityY = bob.velocityY + 1.6
  }
  bob.collide(blockGroup) 
}

function CreateBlock(x,y,type){
  block = createSprite(x*120,y*120,130,130);
  if(type == "grass"){
    block.addImage(grassImg)
  } else if (type == "dirt") {
    block.addImage(dirtImg)
  } else if (type == "small"){
    block.addImage(smallBlock);
    block.x = block.x + 30
    block.y = block.y + 30
  }
  blockGroup.add(block)
}

function CreateSpikes(x,y){
  var spike = createSprite(x*120,y*120-10,130,130);
  spike.addImage(spikesImg)
  spike.setCollider("rectangle",0,45,130,40)
  spikeGroup.add(spike);
}

function CreateBounceOrb(x,y){
  var bounceorb = createSprite(x*120,y*120-10,130,130);
  bounceorb.addImage(bounceImg)
  bounceorb.scale = 0.5
  bounceGroup.add(bounceorb);
}

function createLevel(){
  //This can be edited!
  for(var i = 1; i <= 10; i++){
    CreateBlock(i,1,"grass")
  }
  for(var i = 1; i <= 10; i++){
    CreateBlock(i,2,"dirt")
  }
  CreateSpikes(4,0)
  CreateSpikes(3,0)
  CreateBlock(2,0,"small")
  CreateBlock(2.5,-0.5,"small")
  CreateBlock(3,-0.5,"small")
  CreateBlock(5)
  CreateBounceOrb(4,-0.5)
}