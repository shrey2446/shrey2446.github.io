//variable sotring json data
let locationsData;

//the array of location objects/class
let locationsArray = [];

//long and lat arrays for lines
let prevLongArray = [];
let prevLatArray = [];

let canvas;

//stores locations array from json
let locations;

//stores place data from json
let name;

//stores times data from json
let time;

//stoes Long and Lat data from json
let locationLong;
let locationLat;


function preload(){
  //load json
  locationsData = loadJSON("location.json");

}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style("z-index", "-1");
    canvas.position(0, 0);

    //load locations array
    locations = locationsData.locations;

    //run through the locaitons array
    for(let i = 0; i < locations.length; i ++){
      //load each objects data
      locationLong = locations[i].longitude;
      locationLat = locations[i].latitude;
      place = locations[i].name;
      time = locations[i].time;

      //push a new object in the Locations class array
      locationsArray.push(new Locations(locationLong, locationLat, place, time));

      //store the long and lat info in their own array
      //to use them with the lines
      prevLongArray.push(locationLong);
      prevLatArray.push(locationLat);

  }

}


function draw(){
  background(0);
  fill(255);

  //run through the array
  for (let i = 0; i < locationsArray.length; i++) {

    //show all location objects in the array
    locationsArray[i].show();

    //connect each location object with a line
    //using the current objects location with the long and lat array
    //line(locationsArray[i].x, locationsArray[i].y, prevLongArray[i+1], prevLatArray[i+1]);

  }

}


//Locations class
class Locations {

  //this data is being injected with the
  //locationsArray.push(new Locations(locationLong, locationLat, place, time));
  //code above to create a new and unique object for each location
  constructor(x, y, n, t) {
    this.x = x;
    this.y = y;
    this.n = n;
    this.t = t;
  }

  //the show function to show the objects
  show() {
    stroke(255);
    strokeWeight(1);
    text(this.n + " " + this.t, this.x+30, this.y);
    strokeWeight(4);
    ellipse(this.x, this.y, 20);
  }
}
