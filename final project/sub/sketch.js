let canvas;

var ww = 1440;
var hh = 900;
let d = 5;
let zoom = 2;


var time;
var wait = 1000; // change this to change the 'ticking'
var c;
var cx;
var cy ;
//let images = [];

let locationsData;
let locationsArray;
function preload() {
  locationsData = loadJSON("cities.json");
  //loadImage
  //for(let i = 0; i < 16; i++){
  //  images[i] = loadImage('images/'+ i + 'jpg');
//  }

}



function setup() {

  // put setup code here
  canvas = createCanvas(ww, hh);
  //canvas.style("z-index", "-1");
  canvas.position(0, 0);
  //time = millis();

  //c = color(255);

  //bg.style("z-index", "-1");


//c = int(random(images.length));


}



function draw() {
  // put drawing code here


 // stroke(255, 0, 255);
 // fill(255, 100, 255, 100);
 // ellipse(x, y, d, d);
 // text(place, x+ 10, y+10)

 //background(c);

//image(images[c], width, height);
 //if ((millis() - time) >= wait) {
   //c = int(random(images.length));
   //c = color(random(255), random(255), random(255))
   //time = millis();
 //}
 //text("Milliseconds \nrunning: \n" + millis(), 5, 40);
 locationsArray = locationsData.cities;

  cx = mercX(0);
  cy = mercY(0);

 translate(width/2, height/2);
 for (var i = 0; i < locationsArray.length; i++) {
   var lon = locationsArray[i].longitude;
   var lat = locationsArray[i].latitude;

   var place = locationsArray[i].name;


   var x = mercX(lat) - cx;
   var y = mercY(lon) - cy;

   stroke(255, 0, 255);
   fill(255, 100, 255, 100);
   ellipse(x, y, d, d);
   text(place, x+ 10, y+10)
 }
 ellipse(width/2, height/2, 60, 60);
 // for (var i = 0; i < locationsArray.length; i++) {
 //   var lon = locationsArray[i].longitude;
 //   var lat = locationsArray[i].latitude;
 //
 //   var place = locationsArray[i].name;
 //
 //
 //   var x = mercX(lat) - cx;
 //   var y = mercY(lon) - cy;
 //
 //   stroke(255, 0, 255);
 //   fill(255, 100, 255, 100);
 //   ellipse(x, y, d, d);
 //   text(place, x+ 10, y+10)
 // }

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
