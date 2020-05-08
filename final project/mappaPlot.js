// Options for map
let options = {
  lat: 41.8781,
  lng: -87.6298,
  zoom: 3,
  //style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  //  style: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
  //style: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
  style: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
  // style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
let mappa = new Mappa('Leaflet');
let myMap;

let canvas;
let bg;

let locationsObject=[];
let locationsData;
let locationsArray;
var lon;
var lat;
var place;
let link;
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
  canvas = createCanvas(windowWidth, windowHeight);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawLocations);


}

function draw() {
  if(locationsObject.length > 0){
    drawLocations();
  }

  for (let i = 0; i < locationsObject.length; i++) {
    locationsObject[i].hover();
  }

}

//whenver the mapped is moved or scaled this function triggers
//to redraw the points
function drawLocations() {

  locationsObject.splice(0,locationsObject.length);

  // Clear the canvas
  clear();

  locationsArray = locationsData.cities;


  for (var i = 0; i < locationsArray.length; i++) {
    lon = locationsArray[i].longitude;
    lat = locationsArray[i].latitude;

    place = locationsArray[i].name;

    link = locationsArray[i].link;

    if (myMap.map.getBounds().contains({lat: lat, lng: lon})) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(lat, lon);
      //  const posPick = myMap.latLngToPixel(latitudePick, longitudePick);
      //populate the ridesArray with Rides objects for each ride
      locationsObject.push(new Locations(pos.x, pos.y, place, link));
      //ridesArray.push(new Rides(posPick.x, posPick.y, posDrop.x, posDrop.y, pickupTime));
    }

  }

  for(let i = 0; i < locationsObject.length; i++){
    locationsObject[i].show();
  }

}

function mouseReleased() {
  for(let i = 0; i < locationsObject.length; i++){
    if(dist(mouseX, mouseY, locationsObject[i].x, locationsObject[i].y) < 10){
      window.open(locationsObject[i].l, "_blank");
    }

  }

}

//Locations class
class Locations {

  //this data is being injected with the
  //locationsArray.push(new Locations(pos.x, pos.y, place));
  //code above to create a new and unique object for each location
  constructor(x, y, n, l) {
    this.x = x;
    this.y = y;
    this.n = n;
    this.l = l;

  }

  //the show function to show the objects
  show() {
    stroke(255, 0, 255);
    fill(255, 100, 255, 100);

    ellipse(this.x, this.y, 10, 10);

  }

  hover(){
    //this code will display the text data if the mouse hovers over cities
    if(dist(mouseX, mouseY, this.x, this.y) < 10){
      text(this.n, this.x+10, this.y+10);
    }

  }


}
