

const c = document.getElementById("gcanvas")
const ctx = c.getContext("2d")
const liveselement = document.getElementById("lives")
const pointselement = document.getElementById("points")

//c.height=window.innerHeight-20;

document.body.onkeyup = function(e) {
    if(e.keyCode == 32)
        {if (canplay ===true) {button()}}
    if(e.keyCode == 13)
        {if (canplay ===false&&isdead===false) {button(),canplay=true,gameon=true} 
        else if (isdead===true) {resetvariables(),
            startscreen(),canplay=false,isdead=false,gameon=false}}
    if(e.keyCode == 81) 
        {
            if (cheat===false){cheat=true}
            else if (cheat===true){cheat=false}
        }   
}

function clicked() {
    console.log("asdf")
    if (canplay ===true) {button()}
    else if (canplay ===false&&isdead===false) {button(),canplay=true,gameon=true} 
    else if (isdead===true) {resetvariables(),
        startscreen(),canplay=false,isdead=false,gameon=false}
    
        
}

function beep(frequency,miliseconds,type) {
    var context = new AudioContext();
        var oscillator = context.createOscillator();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        oscillator.connect(context.destination);
        oscillator.start();
        // Beep for 500 milliseconds
        setTimeout(function () {
            oscillator.stop();
        }, miliseconds);
}

function resetvariables () {
     x = c.width/2;
     y = c.height/2;
     dx = 2;
     dy = -8;
     gravity = 0.2
     dragmultiplier = 0.98
     points = 0;
     dead =false;
     lives = 3;
     gameon = false;
     canscore = true;
     greeny = c.height*0.7
     redy = c.height-radius*3
     yellowy = c.height*0.2+radius;
     difmult = 1;
     difspeed = 0.2;
     isdead = false ;
     canplay = false;
}

var x = c.width/2;
var y = c.height/2;
var dx = 2;
var dy = -8;
const radius = 10;
var gravity = 0.2
var dragmultiplier = 0.98
let points = 0;
let dead =false;
let lives = 3;
let gameon = false;
let canscore = true;
var greeny = c.height*0.7
var redy = c.height-radius*3
var yellowy = c.height*0.2+radius;
var difmult = 1
var difspeed = 0.2
const flashdelay = 200;
const colcanscore = "#76ec55";
const colcantscore = "#ece255";
const scored = "#71c936";
const collife = "#ec7355";
const colfill = "rgb(200,0,200)";
var isdead = false ;
const font = "bold 25px Arial"
const font2 = "bold italic 18px Arial"
var canplay = false;
var cheat = false;

function button() {
    if (gameon) {randomlaunch()} else if (gameon === false) {startgame()}
}

function startgame() {
    animation();
    gameon = true;
}

function animation() {
    if (isdead===false) {
    collisions();
    clearcanvas();
    drawball();
    collisions();
    drag();
    gravityadd();
    updatehud();
    tryscore();
    handlelives();
    colorcanvas();
    drawcheat();
    } else {deathscreen()}
    
}

function drawcheat() {
    if (cheat===true){
    ctx.beginPath();
    ctx.arc(20, y+dy, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colfill
    ctx.fill();
    }
}

function updatehud() {

    if (canscore === true) {
        ctx.beginPath();
        ctx.moveTo(0, greeny);
        ctx.lineTo(c.width, greeny);
        ctx.strokeStyle = "green";
        ctx.lineWidth = 5;
        ctx.stroke();}
    ctx.beginPath();
    ctx.moveTo(0, redy);
    ctx.lineTo(c.width, redy);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, c.height*0.2+radius);
    ctx.lineTo(c.width, c.height*0.2+radius);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.font = font;
    ctx.fillText("BALL BREAKER 2000",110,30)
    ctx.fillText("lives: "+lives,5,60)
    ctx.fillText("points: "+points,5,90)
    
}

function colorcanvas(color) {
    c.style.background = color
}

function handlelives() {
    if (y>=redy) {lives = lives-1,autolaunch(),colorcanvas(collife)
     if (lives>0) {setTimeout(function() {colorcanvas(colcantscore); },flashdelay);beep(150,100,"square")} else if (lives<=0){ isdead=true,beep(100,300,"square"),beep(150,300,"sawtooth")}}}
    


function autolaunch() {
    if (lives>0) {randomlaunch()}
}

function tryscore() {
    if (canscore === true) {addpoint()} else if (y<yellowy) {canscore = true,randomgreen(),colorcanvas(colcanscore);}
}

function addpoint() {
    if (y>greeny) {points = points+1, canscore = false, difmult = difmult+difspeed,colorcanvas("#33ff33"),beep(300,100,"sine"),setTimeout(function() {colorcanvas(colcantscore); },flashdelay);}
}

function collisions() {
    if (y+dy>c.height-radius) {dy=-dy}
    if (y+dy<radius) {dy=0}
    if (x+dx>c.width-radius||x+dx<radius) {dx=-dx, collisionbeep()}
}

function collisionbeep() {
    beep(250,100,"sine")
}

function drag() {
    dx=dx*dragmultiplier;
    dy=dy*dragmultiplier;
}
function gravityadd() {
    if (Math.abs(dy)<gravity && y>c.height-radius*1.5) {dy=0,y=c.height-radius} else {dy=dy+gravity*difmult}
    //dy=dy+gravity
   
}

function clearcanvas() {
    ctx.clearRect(0,0,c.width,c.height);
}

function drawball() {
    ctx.beginPath();
    ctx.arc(x+dx, y+dy, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colfill
    ctx.fill();
    x +=dx;
    y +=dy;
   
    if (lives > 0) {requestAnimationFrame(animation)} 

}

function randomlaunch() {
    dy = -10*(1+difmult/3);
    if (dx>0){dx = dx+3*(1+difmult/2);} else {dx=dx-3*(1+difmult/2)};
}

function deathscreen() {
    ctx.clearRect(0,0,c.width,c.height);
    colorcanvas(colcantscore)
    ctx.fillText("BALL BREAKER 2000",120,200)
    ctx.fillText("YOU FCKN DEAD",140,300)
    ctx.fillText("Final Score: "+points,140,360)
    ctx.fillText("Press ENTER to restart",100,600)
    canplay=false;
}

function startscreen() {
    clearcanvas();
    colorcanvas(colcantscore)
    ctx.fillStyle = colfill
    ctx.clearRect(0,0,c.width,c.height);
    ctx.font = font;
    ctx.fillText("BALL BREAKER 2000",120,200)
    ctx.font = font2;
    ctx.fillText("Press SPACE to bounce the ball",50,360)
    ctx.fillText("Pass GREEN line to score",140,420)
    ctx.fillText("Pass YELLOW line for a new green",100,450)
    ctx.fillText("Avoid RED line or you will loose a life",85,480)
    ctx.fillText("Press ENTER to Start",250,550)

}

function randomgreen() {
    let rand = Math.random() *0.7 +0.2;
    greeny = c.height*rand;
    beep(150,100,"sine")
}




startscreen()
window.onload = (startscreen)