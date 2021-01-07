
//
function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
}
//other funcs

// RAD2DEG = 180 / Math.PI;
// PI_4 = Math.PI / 4;

// /* The following functions take or return their results in degrees */

// function y2lat(y) { return (Math.atan(Math.exp(y / RAD2DEG)) / PI_4 - 1) * 90; }
// function x2lon(x) { return x; }

// function lat2y(lat) { return Math.log(Math.tan((lat / 90 + 1) * PI_4 )) * RAD2DEG; }
// function lon2x(lon) { return lon; }
function lon2x(long){ return ((windowWidth/360) * (180 + long)) - 9 };
function lat2y(lat){ return ((windowHeight/180) * (90 - lat)) - 18 };

//
function draw(){
  let latLong = [
    {
      "name": "dublin",
      "lat": 53.3242381, 
      "long": -6.3857868
    },
    {
    "name": "totnes",
    "lat": 50.4305187,
    "long": -3.6779552000000004
    },
    {
      "name": "paris",
      "lat": 48.8608706,
      "long": 2.2857748,
    },
    {
      "name":"penznace",
      "lat": 50.1195971,
      "long": -5.5606844
    }
  ];

  latLong.forEach((o) => {
    circle(lon2x(o.long), lat2y(o.lat), 10);
    fill("rgba(255,255,255,0.5)");
    text(o.name,lon2x(o.long), lat2y(o.lat));
  })
}
