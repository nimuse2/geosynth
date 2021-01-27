//data conversion
function latLongtoxy(_w,_h, lat, lon){
  // https://stackoverflow.com/questions/1019997/convert-lat-longs-to-x-y-co-ordinates
    var y = ((-1 * lat) + 90) * ((_h) / 180);
    var x = ((lon) + 180) * ((_w) / 360);
    // return {x:x,y:y};
    return[x,y];
}
//firebase
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

let latLongObj = [];
let xyObj = [];
let _xyObj = [];

function altlatLong(_lat,_long){

  var R = 6371;//approx radius of earth
  var x = R * cos(_lat) * cos(_long);
  var y = R * cos(_lat) * sin(_long);
  console.log("---> ", R,x,y);
  return [Math.abs(x),y];
}
//straw grasping
function deg_rad(ang) {
  return ang * (Math.PI/180.0)
}
function merc_x(lon) {
  var r_major = 6378137.000;
  return r_major * deg_rad(lon);
}
function merc_y(lat) {
  if (lat > 89.5)
      lat = 89.5;
  if (lat < -89.5)
      lat = -89.5;
  var r_major = 6378137.000;
  var r_minor = 6356752.3142;
  var temp = r_minor / r_major;
  var es = 1.0 - (temp * temp);
  var eccent = Math.sqrt(es);
  var phi = deg_rad(lat);
  var sinphi = Math.sin(phi);
  var con = eccent * sinphi;
  var com = .5 * eccent;
  con = Math.pow((1.0-con)/(1.0+con), com);
  var ts = Math.tan(.5 * (Math.PI*0.5 - phi))/con;
  var y = 0 - r_major * Math.log(ts);
  return y;
}
function merc(x,y) {
  return [merc_x(x),merc_y(y)];
}

RAD2DEG = 180 / Math.PI;
PI_4 = Math.PI / 4;

/* The following functions take or return their results in degrees */

function y2lat(y) { return (Math.atan(Math.exp(y / RAD2DEG)) / PI_4 - 1) * 90; }
function x2lon(x) { return x; }

function lat2y(lat) { return Math.log(Math.tan((lat / 90 + 1) * PI_4 )) * RAD2DEG; }
function lon2x(lon) { return lon; }
////
function getX(long) { return windowWidth * long / 360 }//givenLng*widthOfContainerElement)/360
function getY(lat) {return windowHeight * lat / 180}//(givenLat*heightOfContainerElement)/180

// function getX(long){ return ((windowWidth/360) * (180 + long)) - 9 };
// function getY(lat){ return ((windowHeight/180) * (90 - lat)) - 18 };

function getData() {
  // let snapShot = {}
  db.collection("users").get().then((querySnapshot) => {
      
      // let scrnObj = [];
      // let scrnWH = [];
      // let scrnXY = [];
      // let transformxyFactor = 0.0;
      // let transObj = [];

      querySnapshot.forEach((doc) => {
            latLongObj.push(doc.data());
        });
      console.log("--> latLong: ", latLongObj);//correct
      //sortData 
      //convert lat long to xy 
      //FOR WHOLE WORLD - FROM GLOBE TO COMPUTER SCREEN
      // starting at 0,0
      xyObj.push({ 
        "name": "test",
        "x":0,
        "y":0
      });
      

      latLongObj.forEach((o) => {
        var latXY = latLongtoxy(
                        windowWidth,
                        windowHeight,
                        o.lat,
                        o.long);
        // var altLatLong = altlatLong(o.lat,o.long);//sort of
        // var alt = merc(x,y)
        xyObj.push({ 
                  "name": o.last,
                  "x":Math.abs(getX(o.long)),
                  "y":Math.abs(getY(o.lat))
        });
        // xyObj.forEach((s,i) => {
        //   scrnObj.push({
        //     "name": s.name,
        //     "x": s.xy[0] - scrnWH[0],
        //       (s.xy[1] - scrnWH[1])
        //     ]
        //   })
        // });
  
      });
      
      console.log("--> _xyObj" , xyObj);
      // draw(xyObj);
  });
  //return snapShot;
}
//p5
// var theObj;

function setup() {
  createCanvas(windowWidth, windowHeight);
  getData();

}
//utility functions
function getMax(_o, _xy){
  let max = 0;
  _o.forEach((m) => {
    max = (m[_xy] >= max) ? m[_xy] : max;
  });
  return max;
}
function getMaxDistance(_o, _xy, _maxNum){
  // console.log("getMaxDistance: ", _xy, _maxNum);
  let max = 0;
  _o.forEach((m) => {
    max = (_maxNum - m[_xy]) >= max ? _maxNum - m[_xy] : max;
    // max = (m[_xy] >= max) ? m[_xy] : max;
  });
  return max;
}

function draw(_obj){
  background(220);
  //triangle matrix

  // original set of data
  // one x,y point has to be 0???

  let _xyObj = [
      { 
        "name": "a",
        "x":0,
        "y":150
      },
      {
        "name":"b",
        "x": 50, 
        "y": 0//50
      },
      {
        "name":"c",
        "x": 100, 
        "y": 150
      },
      {
        "name":"d",
        "x": 20, 
        "y": 180
      },
      {
        "name":"e",
        "x": 46, 
        "y": 297
      }
  ];
  console.log("--> xyObj: ", xyObj);
  //
  /*
  crazy numbers
  {long: -6.3857868, last: "dublin", first: "user1", lat: 53.3242381}
1: {last: "walters", lat: 50.4305187, long: -3.6779552000000004, first: "nick"}
2: {long: 2.2857748, last: "paris", lat: 48.8608706, first: "user3"}
3: {lat: 50.1195971, long: -5.5606844, last: "penz
  */
  /*
  let xyObj = [
    { 
      "name": "test",
      "x":0,
      "y":0
    },
    {
      "name":"dublin", 
      "x": 306.23618161666667, 
      "y": 152.61192035055555
    },
    {
      "name": "walters", 
      "x": 311.01249568888886, 
      "y": 164.65300829833333
    },
    {
      "name": "paris", 
      "x": 321.53185277222224, 
      "y": 171.1844884477778
    },
    {
      "name": "penznace", 
      "x": 307.6915705722222, 
      "y": 165.94678762277
    }
  ];
  */

  // console.log("--> xyObj" , xyObj);
  // if(xyObj!= 'undefined'){
  //   console.log("--> theObj", xyObj);
  // }
  
  // console.log("> rightMax: ", rightMax);
  const rightMax = getMax(xyObj, "x");
  const side_max_width = getMaxDistance(xyObj, "x", rightMax );
  
  const heightMax = getMax(xyObj, "y");
  const side_max_height = getMaxDistance(xyObj, "y", heightMax );
  
  const xPos = (windowWidth/2)-(side_max_width/2);//in middle
  const yPos = (windowHeight/2)-(side_max_height/2);//stay on same axis

  // build coordinate object
  const coors1 = [];
  xyObj.forEach((p,i) => {
    coors1.push({
      "name":p.name,
      "x": xPos + p.x,
      "y": yPos + p.y
    });
  });
  

  //transform factors
  const tx = windowWidth/side_max_width;
  const ty = windowHeight/side_max_height;

  // center point of shape
  const xCenter = side_max_width/2;
  const yCenter = side_max_height/2;

  // build transform object
  const coors2 = [];
  xyObj.forEach((p,i) => {
    coors2.push({
      "name": p.name,
      "x": xPos+((1-tx)*xCenter)+(p.x*tx),
      "y": yPos+((1-ty)*yCenter)+(p.y*ty),
    });
  });

  //draw
  drawToCanvas(coors1,coors2);
          
}
//
//draw
function drawToCanvas(_coors1,_coors2){
  // just for fun
  _coors1.forEach((l,i) => {
    stroke("rgba(0, 0, 0,0.1)");
    line(l.x,l.y,_coors2[i].x,_coors2[i].y);
  });

  _dia = 10;
  
  _coors1.forEach((c) => {
    fill("rgba(255, 255, 255,0.5)");
    circle(c.x,c.y, _dia);
    fill("rgba(0, 0, 0,0.5)");
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
    c.x > windowWidth/2 ? xOffset = c.x - _dia*3 : xOffset = c.x + _dia*2;//word width
    c.y < 20 ? yOffset = c.y + 10 : yOffset = c.y;
    text(c.name+"'", xOffset, yOffset);
  });
  

  fill("rgba(0, 0, 0, 1)");
  // text("nickwalters.co.uk", 10, 10);
  // text("geo-synth display development v.1.0", 10, 25);
  // text("Transform a local cluster of geo points to fit in screen", 10, 40);
  // text("01| 01| 21 NY day 2021!", 10, 55);
}
//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // setup();
}

