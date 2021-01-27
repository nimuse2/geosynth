
//firebase
/*
const firebaseConfig = {
  apiKey: "AIzaSyDK3k50MfL9rxfGi0uqKql5GaAgFMr4ajU",
  authDomain: "geosynth-39a78.firebaseapp.com",
  databaseURL: "https://geosynth-39a78.firebaseio.com",
  projectId: "geosynth-39a78",
  storageBucket: "geosynth-39a78.appspot.com",
  messagingSenderId: "1048064109355",
  appId: "1:1048064109355:web:6e6a484c2c77b17473f36e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
*/
//globals
let latLongObj = [];
let xyObj = [];
let xyObj1 = [];
// let _xyObj = [];
// console
let input, 
    button, 
    log1,
    log2,
    log3,
    myLat,
    myLong,
    title,
    topnav;

//utility functions///////////////////////////////////////////////////////
function getMin(_o, _xy, _max){
  let min = _max;
  _o.forEach((m) => {
    min = (m[_xy] <=min) ? m[_xy] : min;
  });
  // console.log("lefttopMin", min);
  return min
}
function getMax(_o, _xy){
  let max = 0;
  _o.forEach((m) => {
    max = (m[_xy] >= max) ? m[_xy] : max;
  });
  return max;
}
function getMaxDistance(_o, _xy, _maxNum){
  let max = 0;
  _o.forEach((m) => {
    max = (_maxNum - m[_xy]) >= max ? _maxNum - m[_xy] : max;
  });
  return max;
}
function lon2x(long){ return ((long) + 180) * ((windowWidth) / 360) };
function lat2y(lat){ return ((-1 * lat) + 90) * ((windowHeight) / 180) }; 

//firebase data////////////////////////////////////////////////////////////

//put
/*
function writeDataBase(_firstname, _lastname, _lat, _long){
  db.collection("users").add({
    first: _firstname,
    last: _lastname,
    lat: _lat,
    long: _long
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    getData();
    log2.html(' ');
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    log2.html('Error ');
  });
}
*/
//get
function getData() {
  // xyObj1 = {};
  //clear arrays
  latLongObj = [];
  xyObj = [];
  xyObj1 = [];
  axios.get(`https://firestore.googleapis.com/v1/projects/geosynth-39a78/databases/(default)/documents/users`)
    .then(response => { 
            console.log(response); 
            response.data.documents.forEach((doc) => {
              // console.log("->", i, "-", doc.fields.lat.doubleValue);
              latLongObj.push(doc);
            });

            latLongObj.forEach((o) => {
              xyObj1.push({ 
                        "name": o.fields.last.stringValue ,
                        "x":lon2x(o.fields.long.doubleValue),
                        "y":lat2y(o.fields.lat.doubleValue)
              });
            });
    })
    .catch(error => { 
            console.log(error); 
    });
/*
  db.collection("users").get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
            latLongObj.push(doc.data());
        });
      
      latLongObj.forEach((o) => {
        xyObj1.push({ 
                  "name": o.last ,
                  "x":lon2x(o.long),
                  "y":lat2y(o.lat)
        });

  
      });

  });
  */

}

//p5/////////////////////////////////////////////////////////////////
function makeTopnav() {
  topnav = createDiv('geo.synth v.1.0 data collection');
  topnav.addClass('topnav');
}

function makeConsole() {
  uiXpos = windowWidth - (300/windowWidth*100);
  
  input = createInput().attribute('placeholder', 'Add to database');;
  // input.position(uiXpos, 50);

  button = createButton('submit');
  // button.position(input.x + input.width, 50);
  button.mousePressed(putLocation);
//log console - rh 
  // log1 = createElement('div', 'This device lat/long:');
  // log1.position(uiXpos, 5);
  log2 = createElement('div', '');
  // log2.position(uiXpos, 20);
  // log3 = createElement('div', 'Data Cloeection');
  // log3.position(uiXpos, 35);
//title console - lh
  // title = createElement('div', 'nickwalters.co.uk<br/>geo.synth v1.0');
  // title.position(5, 5);

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  getData();
  // makeTopnav();
  // makeConsole();
  /*
  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(setPos);
  */
}
/*
function setPos(position) {
  myLat = position.coords.latitude;
  myLong  = position.coords.longitude;

  log2.html(' lat: ' + myLat + ' long:' + myLong);//not update

}
*/

function putLocation(){
  
  //
  const name = input.value();
  if(name == ''){
    log2.html('Please add a name...');
  }else{
    log2.html('sending ... ');
    input.value('');
    writeDataBase(
      "live",
      name,
      myLat,
      myLong);
      
  
  }
}

// function updateConsole(){
//   uiXpos = (uiXpos <= 0) ? 10 : windowWidth - (300);
//   input.position(uiXpos, 5);
//   // log1.position(uiXpos, 5);
//   log2.position(5, 20);
//   // log3.position(uiXpos, 35);
//   button.position(input.x + input.width, 5);
// }
function draw(_obj){
  background(220);
  // updateConsole();
  
  const rightMax = getMax(xyObj1, "x");
  const side_max_width = getMaxDistance(xyObj1, "x", rightMax );

  const heightMax = getMax(xyObj1, "y");
  const side_max_height = getMaxDistance(xyObj1, "y", heightMax );

  let xyObj = []
  xyObj1.forEach((p) => {
    xyObj.push({
      "name":p.name,
      "x": (p.x - (rightMax - side_max_width)),
      "y": (p.y - (heightMax - side_max_height))
    })
  });

  const leftMin = getMin(xyObj, "x", rightMax);
  const topMin = getMin(xyObj, "y", heightMax);
  
  const xPos = (windowWidth/2)-(side_max_width/2);//in middle
  const yPos = (windowHeight/2)-(side_max_height/2);//sta

  const coors1 = [];
  xyObj.forEach((p) => {
    coors1.push({
      "name":p.name,
      "x": xPos + (p.x ),
      "y": yPos + (p.y )
    });
  });
  
  //transform factors
  const tx = (windowWidth/side_max_width) ;
  const ty = (windowHeight/side_max_height) ;

  const xCenter = (side_max_width/2);// center relative to scrn
  const yCenter = (side_max_height/2);//?

  // build transform object
  const coors2 = [];
  xyObj.forEach((p,i) => {
    coors2.push({
      "name": p.name,
      "x":  xPos+((1-tx)*xCenter)+((p.x )*tx),
      "y":  yPos+((1-ty)*yCenter)+((p.y )*ty),
    });
  });
  
  //draw
  drawToCanvas(coors1,coors2);
          
}
//
//draw to screen - called from draw()
function drawToCanvas(_coors1,_coors2){

  _coors1.forEach((l,i) => {
    stroke("rgba(0, 0, 0,0.1)");
    line(l.x,l.y,_coors2[i].x,_coors2[i].y);
  });
  
  _dia = 10;
  
  _coors1.forEach((c) => {
    fill("rgba(255, 255, 255,0.1)");
    circle(c.x,c.y, _dia);
    fill("rgba(0, 0, 0,0.1)");
    textSize(11);
    var xOffset = 0;
    c.x > windowWidth/2 ? xOffset = c.x - _dia*2 : xOffset = c.x + _dia*1;//word width
    text(c.name, (xOffset), c.y);
  });
  
  _coors2.forEach((c) => {
    fill("rgba(255, 0, 0,0.4)");
    circle(c.x,c.y, _dia*2);
    fill("rgba(0, 0, 0,0.5)");
    textSize(11);
    var xOffset = 0;
    c.x > windowWidth/2 ? xOffset = c.x - _dia*5 : xOffset = c.x + _dia*2;//word width
    c.y < 20 ? yOffset = c.y + 10 : yOffset = c.y;
    text(c.name+"'", xOffset, yOffset);
  });
  // text
  
  // fill("rgba(0, 0, 0, 1)");
  // text("nickwalters.co.uk", 10, 10);
  // text("geo-synth display development v.1.0", 10, 25);
  // text("using live data from server", 10, 40);
  // text("mapping geo cluster to fill screen", 10, 55);
  // text("01| 01| 21", 10, 70);
}
//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

