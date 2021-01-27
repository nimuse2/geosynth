class Button {
  
    constructor(inImg, inX, inY,  inW, inH) {
      this.x = inX;
      this.y = inY;
      this.w = inW;
      this.h = inH;
      this.img = inImg;
    }
    
    display(_x,_y) {
      stroke(0);
      
      // tint the image on mouse hover
      
      if (this.over(_x,_y)) {
        noTint();
        cursor('pointer'); 
      } else {
        // noTint();
        cursor();
        tint(255, 90);
      }
      image(this.img, _x, _y, this.w, this.h);
      
    }
  
    mouseClick(_x,_y){
      if(this.over(_x,_y)){
        window.open("https://nimuse2.github.io/geodata/");
      }
    }
    over(_x,_y) {
      if (mouseX > _x && mouseX < _x + this.w && mouseY > _y && mouseY < _y + this.h) {
        return true;
      } else {
        return false;
      }
    }
  
  }