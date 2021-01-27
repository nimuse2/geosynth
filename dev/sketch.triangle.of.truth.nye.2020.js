

function setup() {
  createCanvas(windowWidth, windowHeight);


}
function draw(){
  background(220);
  var x,y,dia;
  xa = 0;
  ya = 150;

  xb = 50;
  yb = 50;

  xc = 100;
  yc = 150;
  

  var side_ca = xc - xa;
  var side_height = 100;

  var xPos = (windowWidth/2)-(side_ca/2);//in middle
  // var xPos = windowWidth/2;
  var yPos = (windowHeight/2)-(side_height);//stay on same axis
  
  //triangle
  fill("rgba(255, 204, 0,0.1)"),
  triangle(xPos + xa,
            yPos + ya,
            xPos + xb,
            yPos + yb,
            xPos + xc,
            yPos + yc);

  //transform factor
  // var t = 3;
  //transform relative to windowWidth??
  var t = windowWidth/side_ca;
  //MAX HEIGHT LIMITER!!!!???
  //https://stackoverflow.com/questions/11671100/scale-path-from-center
  //(1-t)*xb - center point
  // yb?
  var xCenter = xb;
  var yCenter = (yc-yb);
  fill("rgba(255, 204, 0,0.1)"),
  triangle(xPos+((1-t)*xCenter)+(xa*t),
           yPos+((1-t)*yCenter)+(ya*t),
           xPos+((1-t)*xCenter)+(xb*t),
           yPos+((1-t)*yCenter)+(yb*t),
           xPos+((1-t)*xCenter)+(xc*t),
           yPos+((1-t)*yCenter)+(yc*t)
          );
  
  fill("rgba(0, 0, 0, 1)");
  text("Transform Scale Experiment 31| 12| 20 NY eve 2020!", 10, 10);
          
}

//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // setup();
}

