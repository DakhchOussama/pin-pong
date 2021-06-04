const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

const user = {
    x : 0,
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}


const com = {
    x : cvs.width - 10,
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}
const ball = {
    x : cvs.width/2,
    y : cvs.height/2,
    radius : 10,
    speed : 5,
    velocityX : 5, // speed + direction
    velocityY : 5,
    color : "WHITE",
    score : 0
   
}
// draw net = lkhotot lmota9ati3a

const net = {
    x : cvs.width/2 - 2/2,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE"
}

function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}



function drawNet(){
    for(let i = 0; i <= cvs.height; i+=15){
        drawRect(net.x,net.y +i,net.width,net.height,net.color);
    } 
}


cvs.addEventListener("mousemove",movepaddle);

function movepaddle(evt){
    let rect = cvs.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2; //dik rect.top bach i7bas la wsal l top dyal canvas
}

function drawCircle(x,y,r,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.fill();
}

function drawText(text,x,y,color){
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text,x,y);
}

function resetBall(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;
    
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

function render(){
    drawRect(0,0,cvs.width,cvs.height,"BLACK");
    
    // draw net
    
    drawNet();
    
    // draw score
    drawText(user.score,cvs.width/4,cvs.height/5,"WHITE");
    drawText(user.score,3*cvs.width/4,cvs.height/5,"WHITE");
    
    // draw user and com
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);
    
    // draw the ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
}
function collision(b,p){ // https://www.youtube.com/watch?v=nl0KXCa5pJk min 21:00
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    p.top = p.y;
    p.button = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    return b.right > p.left && b.bottom > p.top &&  b.left < p.right &&
        b.top < p.button;
    
}
function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    let computerlevel = 0.1;
    com.y += (ball.y - (com.y + com.height/2)) * computerlevel;
    
    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
        
        ball.velocityY = -ball.velocityY // imchi l3aks dyal l2itijah
    }
    
    let player = (ball.x < cvs.width/2) ? user : com; // ila knt ball 9bal mn cvs.width/2 farah player howa user o ila knt moraha fa rah howa computer
    
    if(collision(ball,player)){
        let collidPoint = ball.y - (player.y + player.height/2); // wa9t l2istidam rah bhala ball katdkhol f dak mostatil li knl3bo fih o lwast dyal dk lmostatil howa 
        
        collidPoint = collidPoint/(player.height/2); // hadi darnaha f zawia bach la jat f zawia lfo9 atraja3 lk -1  lwast 0 hit atkhtazal o lta7t 1
        
        let angleRad = collidPoint * Math.PI/4; // ila kant f l9ont khasha dor b zawia 45 ama f last rah lfo9 katkon 0 y3ni mam7sobach
        
         let direction = (ball.x < cvs.width/2) ? 1 : -1; // la kant fat jiha dyal comp
        
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad); // nfs blan ba9in f zawia
        
       
        
        ball.speed += 0.5; // speed dyal koora
    }
    if(ball.x - ball.radius < 0){ // 0 kat3ni lbadya dyal canvas
        com.score++;
        resetBall();
    }else if(ball.x + ball.radius > cvs.width){
        user.score++;
        resetBall();
    }
}
function game(){
    update();
    render();
}
const framePerSecond = 50;
setInterval(game,1000/framePerSecond);
