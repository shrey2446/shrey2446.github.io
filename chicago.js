var capture;
var x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  pixelDensity(1);
  capture.size(windowWidth, windowHeight);
  capture.hide();
  // 30-50 fps
}

function draw() {
  capture.loadPixels();

  let w = capture.width;
  let h = capture.height;

  copy(capture, w/2, 0, 1, h, x, 0, 1, h);
  x = x+1;
  if(x>width){
    x=0;
  }
}
