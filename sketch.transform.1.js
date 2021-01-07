

function setup() {
  createCanvas(windowWidth, windowHeight);

}
function draw(){
  background(220);
  //triangle matrix
  const tMatrix = {
    "xa":0,
    "ya":150,
    "xb":50,
    "yb":50,
    "xc":100,
    "yc":150
  }
  
  const side_ca = tMatrix.xc - tMatrix.xa;
  const side_height = tMatrix.yc - tMatrix.yb;

  const xPos = (windowWidth/2)-(side_ca/2);//in middle
  // var xPos = windowWidth/2;
  const yPos = (windowHeight/2)-(side_height);//stay on same axis
 
  const coors1 = {
    "ax": xPos + tMatrix.xa,
    "ay": yPos + tMatrix.ya,
    "bx": xPos + tMatrix.xb,
    "by": yPos + tMatrix.yb,
    "cx": xPos + tMatrix.xc,
    "cy": yPos + tMatrix.yc
  };
  //transform factor

  const tx = windowWidth/side_ca;
  const ty = windowHeight/side_height;

  const xCenter = tMatrix.xb;
  const yCenter = (tMatrix.yc-tMatrix.yb);
  const coors2 = {
      "ax":xPos+((1-tx)*xCenter)+(tMatrix.xa*tx),
      "ay":yPos+((1-ty)*yCenter)+(tMatrix.ya*ty),
      "bx":xPos+((1-tx)*xCenter)+(tMatrix.xb*tx),
      "by":yPos+((1-ty)*yCenter)+(tMatrix.yb*ty),
      "cx":xPos+((1-tx)*xCenter)+(tMatrix.xc*tx),
      "cy":yPos+((1-ty)*yCenter)+(tMatrix.yc*ty)
  };

  //draw
  drawToCanvas(coors1,coors2);
          
}
//
//draw
function drawToCanvas(_coors1,_coors2){
//triangle 1
  fill("rgba(255, 204, 0,0.1)"),
  triangle(_coors1.ax,
          _coors1.ay,
          _coors1.bx,
          _coors1.by,
          _coors1.cx,
          _coors1 .cy
            );
  // triangle 2
  fill("rgba(255, 204, 0,0.1)"),
  triangle(_coors2.ax,
          _coors2.ay,
          _coors2.bx,
          _coors2.by,
          _coors2.cx,
          _coors2.cy
          );

  fill("rgba(0, 0, 0, 1)");
  text("Transform Scale Experiment 01| 01| 21 NY eve 2021!", 10, 10);
  text("Transformation using longest sides mapped to screen height/width", 10, 20);
}
//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // setup();
}

