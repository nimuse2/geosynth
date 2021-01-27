//utility functions///////////////////////////////////////////////////////
function getMin(_o, _xy, _max){
    let min = _max;
    _o.forEach((m) => {
      min = (m[_xy] <=min) ? m[_xy] : min;
    });
  
    return min
  }
  function getMax(_o, _xy){//_xy = .x or .y
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
  //mercator transform
  function lon2x(long){ return ((long) + 180) * ((windowWidth) / 360) };
  function lat2y(lat){ return ((-1 * lat) + 90) * ((windowHeight) / 180) }; 

  //debgugdraw

  function deBug(_msg){
    // debugDraw = true;
    if(debugDraw){
      console.log(_msg);
      debugDraw = false;
    }
  }