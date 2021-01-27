

function setup() {
  createCanvas(windowWidth, windowHeight);

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

function draw(){
  background(220);
  //triangle matrix
  // const tMatrix = {
  //   "xa":0,
  //   "ya":150,
  //   "xb":50,
  //   "yb":50,
  //   "xc":100,
  //   "yc":150
  // }
  // original set of data
  // one x,y point has to be 0???
  let plotMatrix = [
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
   
  // console.log("> rightMax: ", rightMax);
  const rightMax = getMax(plotMatrix, "x");
  const side_max_width = getMaxDistance(plotMatrix, "x", rightMax );
  
  const heightMax = getMax(plotMatrix, "y");
  const side_max_height = getMaxDistance(plotMatrix, "y", heightMax );
  
  const xPos = (windowWidth/2)-(side_max_width/2);//in middle
  const yPos = (windowHeight/2)-(side_max_height/2);//stay on same axis

  // build coordinate object
  const coors1 = [];
  plotMatrix.forEach((p,i) => {
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
  plotMatrix.forEach((p,i) => {
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
  text("nickwalters.co.uk", 10, 10);
  text("geo-synth display development v.1.0", 10, 25);
  text("Transform a local cluster of geo points to fit in screen", 10, 40);
  text("01| 01| 21 NY day 2021!", 10, 55);
}
//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // setup();
}

