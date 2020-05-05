let canvas;
let bg;
var ww = 1440;
var hh = 900;
let d = 5;
let zoom = 2;
let locationsObject=[];
let locationsData;
let locationsArray;
var lon;
var lat;
var place;
var x;
var y;


let ballX;
let ballY;

let ballXSpeed = 1;
let ballYSpeed = 1;

function preload() {
  locationsData = loadJSON("cities.json");
}
function setup() {
  canvas = createCanvas(ww, hh);
  canvas.style("z-index", "-2");
  canvas.position(0, 0);
  background(255);
  locationsArray = locationsData.cities;
  translate(width/2, height/2);
  ballX = -80;
  ballY = -height/2;

  for (var i = 0; i < locationsArray.length; i++) {
    lon = locationsArray[i].longitude;
    lat = locationsArray[i].latitude;

    place = locationsArray[i].name;

    locationsObject.push(new Locations(lat, lon, place));

  }

}

function draw() {
  background(120);
  translate(width/2, height/2);

  for (let i = 0; i < locationsObject.length; i++) {
    locationsObject[i].show();
  }

  ellipse(ballX, ballY, 30, 30);
  ballX = ballX + ballXSpeed;
  ballY = ballY + ballYSpeed;

}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;

}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


//Locations class
class Locations {

  //this data is being injected with the
  //locationsArray.push(new Locations(locationLong, locationLat, place, time));
  //code above to create a new and unique object for each location
  constructor(x, y, n) {
    this.cx = mercX(0);
    this.cy = mercY(0);

    this.x = x;
    this.y = y;
    this.n = n;

    this.newx = mercX(this.x) - this.cx;
    this.newy = mercY(this.y) - this.cy;
  }

  //the show function to show the objects
  show() {
    stroke(255, 0, 255);
    fill(255, 100, 255, 100);

    ellipse(this.newx, this.newy, 10, 10);

    //if the game object gets close to the cities, display text
    if(dist(ballX, ballY, this.newx, this.newy) < 10){
      text(this.n, this.newx+10, this.newy+10);
    }

    //this code will display the text data if the mouse hovers over cities
    if(dist(mouseX-width/2, mouseY-height/2, this.newx, this.newy) < 10){
      text(this.n, this.newx+10, this.newy+10);
    }
  }
}
