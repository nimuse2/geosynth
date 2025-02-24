const maxApi = require("max-api");
const utils = require("./utils");
const d3 = require("./d3.v5.16");
//LOCAL///////////////////////////

const fs = require("fs");

//max
outlets = 1;
maxApi.post("Hello World!");

fs.readFile("./database_nbn.json", "utf8", (err, data) => {
  if (err) {
    maxApi.post(err);
    return;
  }
  // maxApi.post(`Raw_> ${data}`);

  response = JSON.parse(data);
  // maxApi.post(`Parse level 1 -> ${response.glossary.title}`);
  // maxApi.post(`Parse level 1 -> ${response.localbirds.location}`);
  /*next
  maxApi.post(`Parse level 2 -> ${response.localbirds.results[1].name}`);
  */

  //lat long, mercantile
  maxApi.post(`Lat -> ${response.localbirds[1].lat} `);
  let wWidth = 1000; //pseudo - think ok?
  let wHeight = 800;

  var projection = d3
    .geoMercator()
    .angle(90)
    .reflectY(true)
    // .scale(1800000) //700000-smaller - 1900000 - bigger - 3000000
    .center([response.localbirds[1].lat, response.localbirds[1].long]);
  var distList = [];
  var centerArr = projection([
    response.localbirds[1].lat,
    response.localbirds[1].long,
  ]);
  for (i = 0; i < response.localbirds.length; i++) {
    var mArr = projection([
      response.localbirds[i].lat,
      response.localbirds[i].long,
    ]);
    // distList.push(mArr[0], mArr[1]);
    distList.push(
      utils.dist(mArr[0], mArr[1], centerArr[0], centerArr[1]) * 300
    );
  }

  maxApi.post(`distList -> ${distList} `);
  maxApi.outlet("distList " + distList);
  // jsui: arguments:   jsobject  -1266631902332072  ->   0  39.19  51.40  24.23  1.21  33.41  70.31  338.76  427.11  407.65
});

//translate bat data into this format
// convert values using mercantile transformation
// send back to max
/*
var xhr = new XMLHttpRequest();
maxApi.addHandler("makeRequest", (number) => {
  xhr.open("GET", "./test.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      // Do something with the data
      //   console.log(data);
      maxApi.post(data);
    }
  };
  xhr.send();
});
*/
// const data = require("./database.js"); //copy from internet
// maxApi.post(data, 2);

///ORIGINAL////////////////////////
// const result = utils.add(4, 4);
// maxApi.post(`The result is: ${result}`);
// maxApi.post("ciao");
/*
var XMLhttprequest = require("xmlhttprequest").XMLHttpRequest;

let xhttp = new XMLhttprequest();

let response;

let url = "./test.json";

// let latLongObj = [];
// let xyObj = [];
// let xyObj1 = [];
// //other functions
// let windowWidth = 1000; //pseudo - think ok?
// let windowHeight = 800;

maxApi.addHandler("makeRequest", (number) => {
  // maxApi.post(url+city);

  //--SAVE HITTING THE SERVER----//
  maxApi.post(url);
  xhttp.open("GET", url, false);
  // xhttp.open('GET', url + city, false);
  //   xhttp.setRequestHeader("Content-type", "application/json");
  //   xhttp.setRequestHeader("apiKey", "AIzaSyDK3k50MfL9rxfGi0uqKql5GaAgFMr4ajU");
  xhttp.send();

  //conversion engine - copy from p5
  //   let distList = [];
  //   let xyObj1 = [];
  //   //STEP 1////mercantile transform
  //   response.documents.forEach((o) => {
  //     xyObj1.push({
  //       name: o.fields.last.stringValue,
  //       x: utils.lon2x(o.fields.long.doubleValue, windowWidth),
  //       y: utils.lat2y(o.fields.lat.doubleValue, windowHeight),
  //     });
  //   });

  //STEP 2 //PLOT WITH MAX/MIN
  //   const rightMax = utils.getMax(xyObj1, "x");
  //   const side_max_width = utils.getMaxDistance(xyObj1, "x", rightMax);

  //   const heightMax = utils.getMax(xyObj1, "y");
  //   const side_max_height = utils.getMaxDistance(xyObj1, "y", heightMax);

  //   let xyObj = [];
  //   xyObj1.forEach((p) => {
  //     xyObj.push({
  //       name: p.name,
  //       x: p.x - (rightMax - side_max_width),
  //       y: p.y - (heightMax - side_max_height),
  //     });
  //   });
  //STEP 3////////////
  //   const xPos = windowWidth / 2 - side_max_width / 2; //in middle
  //   const yPos = windowHeight / 2 - side_max_height / 2; //sta

  //   const tx = windowWidth / side_max_width;
  //   const ty = windowHeight / side_max_height;

  //   const xCenter = side_max_width / 2; // center relative to scrn
  //   const yCenter = side_max_height / 2; //?

  //   const coors2 = [];
  //   xyObj.forEach((p, i) => {
  //     coors2.push({
  //       name: p.name,
  //       x: xPos + (1 - tx) * xCenter + p.x * tx,
  //       y: yPos + (1 - ty) * yCenter + p.y * ty,
  //     });
  //   });
  //   // STEP 4 ///////////////////////////
  //   let tempObj = [];
  //   let newObj1 = [];
  //   tempObj = [...coors2];
  //   newObj1 = [...coors2];
  //   // maxApi.post("--->STEP 3-->", tempObj);

  //   //next transform from sketch.polar
  //   let cX = windowWidth / 2;
  //   let cY = windowHeight / 2;
  //   let offSetX = cX - tempObj[0].x;
  //   let offSetY = cY - tempObj[0].y;
  //   //
  //   // for(i = 0; i < tempObj.length; i++){
  //   tempObj.forEach((o) => {
  //     o.x = o.x + offSetX;
  //     o.y = o.y + offSetY;
  //   });

  //   //simple scale - but through me point
  //   let shrinkFactor = 0.4;
  //   let xOff = cX - newObj1[0].x * shrinkFactor;
  //   let yOff = cY - newObj1[0].y * shrinkFactor;
  //   // console.log("-->", newObj2);
  //   distArr = [];
  //   // for(i = 0; i < newObj1.length; i++){
  //   newObj1.forEach((o) => {
  //     let x1 = o.x * shrinkFactor + xOff;
  //     let y1 = o.y * shrinkFactor + yOff;
  //     // dist(x1,y1,cX,cY);
  //     distArr.push(parseFloat(utils.dist(x1, y1, cX, cY)));
  //   }); //end for

  //   // maxApi.post("-> distArr->",distArr);
  //   distList = [...distArr];

  // maxApi.post("-> GOT ->", xhttp);
  // maxApi.post("-> GOT ->", xhttp);
  //   maxApi.outlet("distList " + distList);
});
*/
/*
xhttp.onreadystatechange = function () {
  // response = JSON.parse(this.responseText);
  if (this.readyState == 4 && this.status == 200) {
    maxApi.post("not happening");
    // response = JSON.parse(this.responseText);
    // maxApi.post("-> RESPONSE ->", response);
    // let firstEntry = response[0];
    // maxApi.outlet(firstEntry['woeid']);
  }
};
*/
