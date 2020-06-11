const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var gameState="onSling"
var bgimg,score=0;
function preload() {
  //  backgroundImg = loadImage("sprites/bg.png");
  getbackgroundImage();
}

function setup(){
    var canvas = createCanvas(1700,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1640,20);
    platform = new Ground(150, 335, 300, 150);
    bird = new Bird(210,70);
   
    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);
    box6 = new Box(1225,320,70,70);
    box7 = new Box(965,320,70,70);
    box8 = new Box(965,240,70,70);
    box9 = new Box(1225,240,70,70);



    log1 = new Log(810,260,300, PI/2);
    log3 =  new Log(810,180,300, PI/2);
    log4 = new Log(1100,180,300,PI/2);
    log2=new Log(1100,295,300,PI/2);

    pig1 = new Pig(810, 350);
    pig3 = new Pig(810, 220);
pig2 = new Pig(1100,200);
pig4 = new Pig(1100,350);
pig5 = new Pig(1180,320);
pig6 = new Pig(1180,200);
    slingshot = new SlingShot(bird.body,{x:210, y:70});
}

function draw(){
    if (bgimg)
    background(bgimg);
    fill(255);
    text("score"+score,width-800,100);
    Engine.update(engine);
    //strokeWeight(4);
   box1.display(); 
   box2.display();
   box3.display();
   box4.display();
   box5.display();
   box6.display();
   box7.display();
   box8.display();
   box9.display();

   
   log1.display();
  log2.display();
   log3.display();
  log4.display();
   

   
 pig1.score();
 pig3.score();
 pig2.score();
 pig4.score();
 pig5.score();
 pig6.score(); 

 pig1.display();
 pig3.display();
pig4.display();
pig2.display();
pig5.display();
pig6.display();
    

    bird.display();
    platform.display();
 ground.display();
    slingshot.display();    
}

function mouseDragged(){
if(gameState=== "onSling")
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    
}


function mouseReleased(){
    gameState="launched";
    slingshot.fly();
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed<1){
        gameState="onSling";
        slingshot.attach(bird.body);
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body, {x: 200 , y: 50});

       }
       if(keyCode === 32 &&(bird.body.position.x<0 || bird.body.position.x>1200 || bird.body.position.y<0)){
        gameState="onSling";
        slingshot.attach(bird.body);
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body, {x: 200 , y: 50});

       }
}
async function getbackgroundImage(){
    var response=await fetch ("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responsejson=await response.json();
    var datetime=responsejson.datetime;
    var hour=datetime.slice(11,13);
    if (hour>=06 && hour<=18){
        bg="sprites/bg4.png";
    }
    else{
        bg="sprites/bg3.png";
    }
    bgimg=loadImage(bg);
    
}