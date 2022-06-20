var energy = 100;
var mouthOpen = false;
var characterText = "";
var talkingTime = 0;

function fmod(a, b) {
  var tmp = a - Math.floor(a/b)*b;
  return tmp;
}

function setup() {
  var canvas = createCanvas(700,500);
  canvas.parent('sketch-holder');
  textAlign(LEFT);
  textSize(20);
  textWrap(WORD);
}

function characterTalk(message, duration) {
  characterText = message;
  talkingTime = duration;
}

function draw() {
  background("#142F98");

  console.log(talkingTime);
  if (talkingTime > 0) {
    var animationLength = 0.5; // seconds
    var elapsedTime = fmod(millis()/1000.0, animationLength); 
    mouthOpen = elapsedTime < animationLength * 0.5;

    drawText();
    talkingTime -= deltaTime/1000.0;

  } else {
    mouthOpen = false;
  }

  drawCharacter();
}

function drawText() {
  var boxWidth = width - 20;
  var boxHeight = height * 0.4;
  stroke(0);
  fill(255);
  rect(10, 10, boxWidth, boxHeight, 20);

  noStroke();
  var triCenter = boxWidth*0.5;
  var size = 20;
  triangle(triCenter-size, boxHeight, 
           triCenter+size, boxHeight, 
           triCenter, boxHeight+size*2);
  stroke(0);
  line(triCenter-size, boxHeight, triCenter, boxHeight+size*2); 
  line(triCenter+size, boxHeight, triCenter, boxHeight+size*2); 

  strokeWeight(1);
  fill(0);
  text(characterText, 20, 20, boxWidth-40);
}

function drawCharacter() {  
  var posX = 0.35 * width;
  var posY = 0.75 * height;

  var Y = posY + 10 * sin(millis()/1000.0);
  var size = 150;
  noStroke();
  fill("#DCE6F5"); // fluffy cloud
  ellipse(posX,          Y,           size, size);
  ellipse(posX+size*0.5, Y-size*0.25, size, size);
  ellipse(posX+size*0.5, Y+size*0.35, size, size);
  ellipse(posX+size,     Y-size*0.30, size, size);
  ellipse(posX+size,     Y+size*0.40, size, size);
  ellipse(posX+size*1.5, Y,           size, size);

  stroke("#92B9ED"); // cloud shadows
  strokeWeight(5);
  noFill();
  arc(posX+size*0.5, Y-size*0.25, size, size, PI*0.1, PI*0.6);
  arc(posX+size*0.5, Y+size*0.35, size, size, PI*0.1, PI*0.6);
  arc(posX+size,     Y-size*0.30, size, size, PI*0.1, PI*0.6);
  arc(posX+size,     Y+size*0.40, size, size, PI*0.1, PI*0.6);
  arc(posX+size*1.5, Y,           size, size, PI*0.1, PI*0.6);

  stroke(0); // eyes
  ellipse(posX+size*0.3, Y-size*0.45, size*0.05, size*0.05);
  ellipse(posX+size*0.7, Y-size*0.45, size*0.05, size*0.05);
  
  if (mouthOpen) {
    fill(0);  // mouth
    noStroke();
    arc(posX+size*0.5, Y-size*0.4, size*0.25, size*0.25, 0, PI);
    fill(255,0,0);
    ellipse(posX+size*0.5, Y-size*0.3, size*0.1, size*0.05);
  }
  else {
    noFill();  // mouth
    stroke(0);
    strokeWeight(5);
    arc(posX+size*0.5, Y-size*0.4, size*0.25, size*0.25, PI/6, 5*PI/6);
  }
}
