
//globals
let latLongObj = [];
let xyObj = [];
let xyObj1 = [];
let input, 
    button, 
    log1,
    log2,
    log3,
    myLat,
    myLong,
    title,
    topnav;
// info btn
let info_btn;
let info_img;
let info_size = 10;
//polar
let x = 0;
let y = 0;
let d = 10;
let xRange = [0,0,0,0];
let xfactor = 4;

let tempObj = [];
let newObj1 = [];

let debugDraw = true;//boolean to only print once

////p5 CORE FUNCTIONS////////////////////////////////
function preload() {
  img = loadImage('img/480px_info_icon.png');
}
////
function setup() {
  createCanvas(windowWidth, windowHeight);
  getData();
  makeTopnav();
  
  info_btn = new Button(img,
                        (windowWidth-(this.img.width/info_size)),
                        0, 
                        this.img.width/info_size,
                        this.img.height/info_size);                     
}
//
function mousePressed() {
  info_btn.mouseClick((windowWidth-(this.img.width/info_size)),0);
}
//
function draw(_obj){
  background(220);
  info_btn.display((windowWidth-(this.img.width/info_size)),0);
  plotCircleGrid();

  let c1 = color(255, 204, 0);
  let c2 = color(0, 255, 0);
  let c3 = color(0, 255, 255);
  let t = color(128, 128, 128);

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
  tempObj = [...coors2];
  newObj1 = [...coors2];
  //draw
  drawToCanvas(coors1,coors2);

  if(tempObj.length > 1){

        //next transform from sketch.polar
        let cX = windowWidth/2;
        let cY = windowHeight/2;
        let offSetX = cX - tempObj[0].x;
        let offSetY = cY - tempObj[0].y;
        //
        // for(i = 0; i < tempObj.length; i++){  
        tempObj.forEach((o) => {  
          o.x = o.x + offSetX;
          o.y = o.y + offSetY;
        });

        //simple scale - but through me point
        let shrinkFactor = 0.4;
        let xOff = cX -(newObj1[0].x * shrinkFactor );
        let yOff = cY -(newObj1[0].y * shrinkFactor );
        // console.log("-->", newObj2);
        distArr = [];
        // for(i = 0; i < newObj1.length; i++){ 
        newObj1.forEach((o) =>{   
            let x1 = (o.x * shrinkFactor) + xOff;
            let y1 = (o.y * shrinkFactor) + yOff
            
            line(x1,
                y1,
                cX,
                cY
            );
            fill(c3);   
            circle( x1, 
                    y1, 
                    10
            );
            //text
            textSize(11);
            fill(t);
            let xOffset = 0;
            let _dia = 10;
            x1 > windowWidth/2 ? xOffset = x1 - _dia*5 : xOffset = x1 + _dia*2;//word width
            y1 < 20 ? yOffset = y1 + 10 : yOffset = y1;

            text(o.name, xOffset, yOffset);
            //synth
            distArr.push(dist(
              x1,
              y1,
              cX,
              cY
            ).toFixed(2));
        });//end for

        let ty = 20;
 
        distArr.forEach((o,i) => {
            fill(t);
            ty = ty + 20;
            text(" > distance from : "
                + newObj1[i].name + " to : " 
                + newObj1[0].name + ": "
                + distArr[i] + " px",
                25,
                ty);

              });
            
  }//end if
          
}
//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

