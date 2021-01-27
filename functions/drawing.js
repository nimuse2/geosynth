
function makeTopnav() {
    topnav = createDiv('geo.synth v.1.0');
    topnav.addClass('topnav');
    // info_btn = new Button(100, 200, img);
    
  }
  //draw to screen - called from draw()
  //plotOriginalPoints
function drawToCanvas(_coors1,_coors2){
    
    _coors1.forEach((l,i) => {
      stroke("rgba(0, 0, 0,0.1)");
      line(l.x,l.y,_coors2[i].x,_coors2[i].y);
    });
    
    _dia = 10;

    //original lat, long polar
    
    _coors1.forEach((c) => {
      fill("rgba(255, 255, 255,0.1)");
      circle(c.x,c.y, _dia);
      // fill("rgba(0, 0, 0,0.1)");
      // textSize(11);
      // var xOffset = 0;
      // c.x > windowWidth/2 ? xOffset = c.x - _dia*2 : xOffset = c.x + _dia*1;//word width
      // text(c.name, (xOffset), c.y);
    });
    
    //converted to x,y - using mercator transform
    
    _coors2.forEach((c) => {
      fill("rgba(255, 0, 0,0.2)");
      circle(c.x,c.y, _dia*2);
      // fill("rgba(0, 0, 0,0.5)");
      // textSize(11);
      // var xOffset = 0;
      // c.x > windowWidth/2 ? xOffset = c.x - _dia*5 : xOffset = c.x + _dia*2;//word width
      // c.y < 20 ? yOffset = c.y + 10 : yOffset = c.y;
      // text(c.name+"'", xOffset, yOffset);
    });
    
    // console.log(_coors2);
  }
  //plot circles
  //grid
  function plotCircleGrid(){
    x = windowWidth/2;
    y = windowHeight/2;
    // middle dot
    // stroke("rgba(100, 100, 100,0.7)");
    let s = color('magenta');
    fill(s);
    circle(x, y, d+5 );//middle
    stroke("rgba(100, 100, 100,0.4)");
    line(x, 0, x, windowHeight);
    line(0, y, windowWidth, y);
    // xRange = [];
    // for(i = 0; i < xRange.length; i++){
    xRange.forEach((o,i) => {
      o = d + (i * windowWidth/xfactor);
      // console.log("->", o);
      noFill();
      stroke("rgba(100, 100, 100,0.4)");
      circle(x,y,o);
    });
  }

  function plotCircle(_x, _y){
    cx = windowWidth/2;
    cy = windowHeight/2;
    // middle dot
    stroke("rgba(100, 100, 100, 0.7)");
    
    circle(cx + _x, cy + _y, d+5 );//middle
    
    stroke("rgba(100, 100, 100,0.7)");
    line(cx + _x, cy + _y, cx, cy);
  }

  function makeHeading(c1,c2,c3,t){
    // fill(c1);
    // circle(10, 10, 10);
    // fill(t);
    // text("Original Mercantile coordinates translated from global polar", 25,15);
    // fill(c2);
    // circle(10,30,10);
    // fill(t);
    // text("Transformation to put 'me' in center using x,y offset", 25,35);
    fill(c3);
    circle(10,10,10);
    fill(t);
    text("Transform to reduce all points keeping 'me' in center - scale and offset", 25, 15);

  }
  /*
  //polar coords investigation
  let r = windowWidth/xfactor;
  for(i= 0; i < 6; i++){
      
      let circleDia = 20;
      let angle = (TWO_PI/6)*i;
      translate(
          sin(angle)*r,
          cos(angle)*r
      )
      circle(
            (windowWidth/2) - (r) ,///?
            (windowHeight/2) - (r/2),
            circleDia);//-radius
  }
  */