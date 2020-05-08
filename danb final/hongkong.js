// Bouncing DVD Logo
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/131-bouncing-dvd-logo.html
// https://youtu.be/0j86zuqqTlQ
// https://editor.p5js.org/codingtrain/sketches/Ya1K1ngtFk

let x;
let y;

let xspeed;
let yspeed;

let fish;

let r, g, b;

function preload() {
  fish = loadImage('images/hongkongfish.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  xspeed = 5;
  yspeed = 5;
  pickColor();
}

function pickColor() {
  r = random(100, 256);
  g = random(100, 256);
  b = random(100, 256);
}

function draw() {
  background(0);
  tint(r, g, b);
  image(fish, x, y, 100, 100);

  x = x + xspeed;
  y = y + yspeed;

  if (x + fish.width >= 2000) {
    xspeed = -xspeed;
    x = windowWidth - fish.width;
    pickColor();
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
    pickColor();
  }

  if (y + fish.height >= 1000) {
    yspeed = -yspeed;
    y = windowHeight - fish.height;
    pickColor();
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
    pickColor();
  }
}
