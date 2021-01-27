/* https://p5js.org/reference/#/p5.FFT */
//Sort of works
// gets lat, long,
// converts to scrn coords using a transformation from internet
// its too small - does whole world as scrn
// so works with 'big' distances - but not small
// so tried to write transformation
// based on bounding box sizes
// get max distances
// use them as bounding box - map to window
// had to use factors and offsets to get it to poistion correct..
// doesn't work brilliantly
// more learning required about transforming, scaling x,y and origin points..

/*
1. test read/write to server
{
  usrID:798707,
  name: "nigel",
  lat: "50.44",
  long: -03.71
}
2. graph x,y points

*/

// must be in HTTPS

//
var lat = 0.0;
var long = 0.0;
//

//firebase??
console.log("firebase");

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
//globals
var m1Lat = 0; 
var m1Long = 0;
var center_x = 0;
var center_y = 0;
var center_x_offset = 0;
var center_y_offset = 0;

// database
/*manually write to database
  // nick : 50.43, -3.67
  // adge : 51.7294951,-2.2950816
  // glyn : 50.7986126,-3.2010403

  let firstname = "glyn";
  let lastname = "jones";
  lat = 50.7986126;
  lng = -3.2010403;
  
  writeDataBase(firstname,
                lastname,
                lat,
                lng);
*/
function writeDataBase(_firstname, _lastname, _lat, _long){
  db.collection("users").add({
    first: _firstname,
    last: _lastname,
    lat: _lat,
    long: _long
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}
//
// var MAP_WIDTH = windowWidth;
// var MAP_HEIGHT = windowHeight;


function latLongtoxy(_w,_h, lat, lon){
  // https://stackoverflow.com/questions/1019997/convert-lat-longs-to-x-y-co-ordinates
    var y = ((-1 * lat) + 90) * ((_w) / 180);
    var x = ((lon) + 180) * ((_h) / 360);
    // return {x:x,y:y};
    return[(x * 1),(y * 1)];
}
function getMaxWandH(_xyObj){
  //
  var xMax = 0;
  var yMax = 0;
  var xMin = 0;
  var yMin = 0;
  // console.log("MAX", _xyObj)
  //max
  _xyObj.forEach((m) => {
    m.xy[0] > xMax ? xMax = m.xy[0] : null;
    m.xy[1] > yMax ? yMax = m.xy[1]: null;
  });
  // min
  xMin = xMax;
  yMin = yMax;

  _xyObj.forEach((mi) => {
    mi.xy[0] < xMin ? xMin = mi.xy[0] : null;
    mi.xy[1] < yMin ? yMin = mi.xy[1] : null;
  })
  // console.log("MAX===>",xMax, " - MIN===>", xMin);

  return [(xMax - xMin), (yMax - yMin)];
}
//
function getXYStartPoint(_scrnObj){
  // console.log("-> scrnObj: ",_scrnObj);
  // get lowest x,y
  let xList = [];
  let yList = [];
  let xMin = 0;
  let yMin = 0;

  _scrnObj.forEach((min) => {
    xList.push(min.xy[0]) 
    yList.push(min.xy[1]);
  })
  xMin = Math.min(... xList);
  yMin = Math.min(... yList);

  // console.log("MIN->", xMin,yMin);
  return [xMin,yMin];
}
//
function mapScrnToWindow(
                    _scrnW,
                    _scrnH,
                    _windowW,
                    _windowH
                    ){                
    var _xFactor = _windowW/_scrnW;
    var _yFactor = _windowH/_scrnH;

    // return [(_xFactor * 0.95), (_yFactor * 0.6)];//bodge?
    return [(_xFactor), (_yFactor)];//bodge?
} 
//
function getData() {
  // let snapShot = {}
  db.collection("users").get().then((querySnapshot) => {
      let latLongObj = [];
      let xyObj = [];
      let scrnObj = [];
      let scrnWH = [];
      let scrnXY = [];
      let transformxyFactor = 0.0;
      let transObj = [];

      querySnapshot.forEach((doc) => {
            latLongObj.push(doc.data());
        });
      //sortData 
      //convert lat long to xy 
      //FOR WHOLE WORLD - FROM GLOBE TO COMPUTER SCREEN
      // starting at 0,0
      latLongObj.forEach((o) => {
        xyObj.push({"name": o.last,
                    "xy": latLongtoxy(
                                windowWidth,
                                windowHeight,
                                o.lat,
                                o.long)
                  });
      });
      //got the max distances from cluster as a square!
      scrnWH = getMaxWandH(xyObj);
      
      
      //transformed x,y coordinates to just use max width, height
      // by subtracting biggest distances
      xyObj.forEach((s,i) => {
        scrnObj.push({
          "name": s.name,
          "xy": [
            (s.xy[0] - scrnWH[0]),
            (s.xy[1] - scrnWH[1])
          ]
        })
      });

      //got starting point of square by getting minimum distance
      scrnXY = getXYStartPoint(scrnObj);

      //next

      //map sml screen to big screen?
      transformxyFactor = mapScrnToWindow(
        scrnWH[0].toFixed(2),
        scrnWH[1].toFixed(2),
        windowWidth,
        windowHeight
      );
      // console.log("-> transformFactor: ", transformxyFactor);

      scrnObj.forEach((t) => {
        transObj.push({
            "name": t.name,
            "xy": [
              // t.xy[0]*transformxyFactor[0],
              // t.xy[1]*transformxyFactor[1]
              t.xy[0],
              t.xy[1]
            ]
        })
      });

      console.log("-> trans obj -> ", transObj );
      // drawForeGround(transObj);//think x correct but not y
      // drawForeGround(scrnObj);
      // drawBoundingBoxTemp([windowWidth, windowHeight], [0,0]);
      drawBoundingBoxTemp(scrnWH, scrnXY, transObj);
  });
  //return snapShot;
}

// transform

//main p5 methods
console.log("p5");

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  console.log('starting');
	// noStroke();
  // get position once
  /*
  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(setPos);
  */
  //draw background
  drawBackground();
  //get position info from dbase
  getData();
  //draw foreground
  ////plot dots from dbase

}
//DRAW TO SCREEN///////////////////////////////
function drawBoundingBoxTemp(_scrnWH, _scrnXY, _obj){
   //draw rectangle
  stroke("rgba(255, 204, 0,0.5)");
  fill(255, 0, 0, 0.1);
  // var scrnXstart = 0;// min
  // var scrnYstart = 0;
  //console.log("scrn width: ", windowWidth);
  // applyMatrix(4, 0, 0, 4, -800, -300);
  
  var array_1 = [_scrnXY[0], _scrnXY[1], _scrnWH[0], _scrnWH[1]];
  console.log("rect 1: ", array_1);
  rect(_scrnXY[0], _scrnXY[1], _scrnWH[0], _scrnWH[1]);
  // transform
  // draw target rectangle
   //draw rectangle
   stroke('rgba(0,255,0,1)');
   fill(255, 0, 0, 0.1);
   var array_2 = [0, 0, windowWidth, windowHeight];
   console.log("rect 2: ", array_2);
   
   rect(0, 0, windowWidth, windowHeight);

   var array_offset = [];
   for(var i = 0; i<=array_2.length-1; i++)
      array_offset.push(array_2[i] - array_1[i]);
   console.log("difference: ", array_offset);
   stroke('rgba(0,0,255,1)');
   fill(255, 0, 0, 0.1);
  //  console.log("test x ", _scrnWH[0]/array_x[2]);
   var transformRec_x = _scrnWH[0] *((array_offset[2]/_scrnWH[0]) );//sml scrn coords x (difference coords / scrnwidth
   var transformRec_y = _scrnWH[1] *((array_offset[3]/_scrnWH[1]) );
   console.log("transform x: ", transformRec_x);
   rect(0, 0, transformRec_x, transformRec_y );
   //
   //try dots - erk!
   drawForeGround(_obj, array_offset, _scrnWH);
  
}
//draw background
function drawBackground(){
  //set background
  background(0);

  //draw grid
  for (var x = 0; x < windowWidth; x += windowWidth / 20) {
		for (var y = 0; y < windowHeight; y += windowHeight / 20) {
			stroke('rgba(64,64,64,0.25)');
			strokeWeight(1);
			line(x, 0, x, windowHeight);
			line(0, y, windowWidth, y);
		}
  }

}

//draw foreground
//loop through object with dot co-ords..?
function drawForeGround(_obj, _array_offSet, _scrnWH){
  // console.log("--> ", _obj);
  // console.log( "magic formula from 130 --->: ", (130 * (_array_offSet[2]/_scrnWH[0]) * 0.1 ) );
  // console.log("vars", _array_offSet[3],_scrnWH[1], windowHeight);
  _obj.forEach((node) => {
    //original
    drawNode(
      color("rgba(255, 204, 0,0.5)"),
      node.name,
      node.xy[0],
      node.xy[1]
    )
    drawText(
      color("rgba(255, 255, 255,0.5)"),
      node.name,
      node.xy[0],
      node.xy[1]
    );

    // console.log("-x-> ", (node.xy[0] * ((_array_offSet[2]/_scrnWH[0]) * 0.25) -(windowWidth * 4.5 )) );
    // console.log("-y-> ", (node.xy[1] * ((_array_offSet[3]/_scrnWH[1]) * 0.25) -(windowHeight * 1) ));
    // transform
    var tX = (node.xy[0] * ((_array_offSet[2]/_scrnWH[0]) * 0.8) - (windowWidth * 14.9 ) );
    var tY = (node.xy[1] * ((_array_offSet[3]/_scrnWH[1]) * 0.5) -(windowHeight * 3.4) );
    drawNode( 
              color(160, 160, 160),
              node.name,
              tX,// sml scrn coords x (difference coords / scrnwidth
              tY
              // sort of right
              // (node.xy[0] * ((_scrnWH[0]/_array_offSet[2])*100 )-200),// sml scrn coords x (difference coords / scrnwidth
              // (node.xy[1] * ((_scrnWH[1]/_array_offSet[3])*100 )-200)// sort of right

    )
    drawText(
      color("rgba(255, 255, 255,1)"),
      node.name,
      tX,
      tY
    );
  });
}

//draw circle on screen
function drawNode(
                  _color,
                  _name, 
                  _x,//_lat 
                  _y){//_long
  //plot circle
  // let c = color(255, 204, 0);
  // let m = color(160, 160, 160);
  // _name == "nick walters" ? fill(c) : fill(m);//lead - or user choose color from dbase? 
  fill(_color);
  noStroke();
  let _dia = 10;
  
  //draw circle 
  circle(_x, _y, _dia);
  
  
}

function drawText(
                _color,
                _name, 
                _x,//_lat 
                _y){//_long
    
      //write name
  
  fill(_color);
  textSize(11);
  var xOffset = 0;
  _x > windowWidth/2 ? xOffset = _x - 30 : xOffset = _x + 10;
  // console.log("??>>", _name, " - y: ", _y, " - h: ", windowHeight);
  text(_name, (xOffset), _y);
}


function setPos(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  
  ////LATER - DON'T KEEP WRITING///
  drawScrn(nf(lat,2,2), 
           nf(lng,2,2));
}


//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // setup();
}

