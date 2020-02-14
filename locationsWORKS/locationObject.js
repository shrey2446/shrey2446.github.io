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
var cx;
var cy;

function preload() {
  locationsData = loadJSON("cities.json");
  //loadImage

}



function setup() {

  // put setup code here
  canvas = createCanvas(ww, hh);
  canvas.style("z-index", "-2");
  canvas.position(0, 0);
  background(255);
  locationsArray = locationsData.cities;
   cx = mercX(0);
   cy = mercY(0);

  translate(width/2, height/2);
  for (var i = 0; i < locationsArray.length; i++) {
     lon = locationsArray[i].longitude;
     lat = locationsArray[i].latitude;

     place = locationsArray[i].name;



     x = mercX(lat) - cx;
     y = mercY(lon) - cy;

    locationsObject.push(new Locations(x, y, place));

    stroke(255, 0, 255);
    fill(255, 100, 255, 100);

    // ellipse(x, y, 10, 10);
    // text(place, x+10, y+10);


  }
    print(locationsObject[1]);

}




function draw() {
  //background(120);
  for (let i = 0; i < locationsObject.length; i++) {

    //show all location objects in the array
    locationsObject[i].show();
    //print("location");
  }
//  locationsObject[0].show();
  // put drawing code here
}


//Locations class
class Locations {

  //this data is being injected with the
  //locationsArray.push(new Locations(locationLong, locationLat, place, time));
  //code above to create a new and unique object for each location
  constructor(x, y, n) {
    this.x = x;
    this.y = y;
    this.n = n;
    this.newx = mercX(this.x) - cx;
    this.newy = mercY(this.y) - cy;
  //  this.t = t;
  }

  //the show function to show the objects
  show() {

    //translate(width/2, height/2);
    stroke(255, 0, 255);
    fill(255, 100, 255, 100);
    //text(this.n + " " + this.t, this.x+30, this.y);
    //strokeWeight(4);
  //  ellipse(this.x, this.y, 20);

    ellipse(this.newx, this.newy, 10, 10);
    text(this.n, this.x+10, this.y+10);
  }
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
