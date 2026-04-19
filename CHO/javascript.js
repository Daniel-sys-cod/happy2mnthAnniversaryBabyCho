
/* ---------------- BACKGROUND FALLING WORDS ---------------- */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const words = [
"I love u",
"I love Cho",
"I love cho hay thi chan"
];

const items = [];

for (let i = 0; i < 40; i++) {
  items.push({
    text: words[Math.floor(Math.random()*words.length)],
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    speed: 1 + Math.random()*2,
    size: 18 + Math.random()*15
  });
}

let mouse = {x:0,y:0};

document.addEventListener("mousemove", e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  items.forEach(w=>{
    w.y += w.speed;

    let dx = mouse.x - w.x;
    let dy = mouse.y - w.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 120){
      w.x -= dx/dist * 2;
      w.y -= dy/dist * 2;
    }

    if(w.y > canvas.height + 50){
      w.y = -50;
      w.x = Math.random()*canvas.width;
    }

    ctx.fillStyle = "white";
    ctx.font = w.size + "px Arial";
    ctx.fillText(w.text, w.x, w.y);
  });

  requestAnimationFrame(draw);
}
draw();


/* ---------------- QUIZ + FADE ---------------- */

let step = 1;

function fadeText(text){
  const q = document.getElementById("question");
  q.classList.remove("fade");
  void q.offsetWidth;
  q.classList.add("fade");
  q.innerText = text;
}

function checkAnswer(){
  let a = document.getElementById("answer").value.toLowerCase();

  if(step === 1){
    fadeText("What do you love about me?");
    step = 2;
  }

  else if(step === 2){
    fadeText("Why do you feel that way?");
    step = 3;
  }

  else if(step === 3){
    fadeText("5️⃣ I LOVE U SOOOOOO MUCHHH MY LOVE ❤️");
    step = 4;
  }

  else if(step === 4){
    fadeText("Happy 2 Month Anniversary Baby (Cho) ❤️");

    document.getElementById("answer").style.display = "none";
    document.querySelector("button").style.display = "none";

    loadMedia();
  }

  document.getElementById("answer").value = "";
}


/* ---------------- GALLERY ---------------- */

const media = [
  {type:"img", src:"Photo1.png"},
  {type:"img", src:"Photo2.png"},
  {type:"img", src:"Photo3.png"},
  {type:"vid", src:"Video1.mp4"},
  {type:"vid", src:"Video2.mp4"}
];

let index = 0;

function loadMedia(){
  show();
}

function show(){
  let img = document.getElementById("img");
  let vid = document.getElementById("vid");

  let item = media[index];

  img.style.display = "none";
  vid.style.display = "none";

  if(item.type === "img"){
    img.src = item.src;
    img.style.display = "block";
    img.classList.add("fade");
  } else {
    vid.src = item.src;
    vid.style.display = "block";
    vid.classList.add("fade");
  }
}

function next(){
  index++;
  if(index >= media.length) index = 0;
  show();
}

function prev(){
  index--;
  if(index < 0) index = media.length - 1;
  show();
}