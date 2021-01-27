//OLD CODE

/*
function preload(){
  // getAudioContext().resume()
    sound = loadSound('sounds/200731_0129_HVAC_chippy.mp3');
  }
  
  function setup(){
    let cnv = createCanvas(windowWidth,windowHeight);
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT();
    sound.amp(0.2);
  }
  
  function draw(){
    background(220);
  
    let spectrum = fft.analyze();
    noStroke();
    fill(255, 0, 255);
    for (let i = 0; i< spectrum.length; i++){
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      rect(x, height, width / spectrum.length, h )
    }
  
    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++){
      let x = map(i, 0, waveform.length, 0, width);
      let y = map( waveform[i], -1, 1, 0, height);
      vertex(x,y);
    }
    endShape();

    let fps = 0;
    if(sound.isPlaying()){
        fps = getFrameRate();
    }else{
        fps = 0;
    }
    
    let lhmargin = 20;
    let vSentences =[20,40,60,80, 100];

    text('nickwalters.co.uk -> please tap screen', lhmargin, vSentences[0]);
    text('fps -> ', lhmargin, vSentences[1])
    text(fps,(lhmargin + 40), vSentences[1]);
    text('sound -> 200731_0129_HVAC_chippy.mp3', lhmargin, vSentences[2]);
    text('///skirting.implanted.leathers',(lhmargin), vSentences[3]);
    
    text('email -> nick@nickwalters.co.uk',(lhmargin), vSentences[4]);
    
    // console.log(getFrameRate());
    // text(createA('http://p5js.org/', 'this is a link'), lhmargin , 60);
  }
  
  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop();
      
    }
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
*/

/*simple playback
let song;

function setup() {
  song = loadSound('sounds/200731_0129_HVAC_chippy.mp3');
  createCanvas(720, 200);
  background(255, 0, 0);
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}
*/

/*mic
let mic, fft;

function setup() {
  createCanvas(710, 400);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(200);

  let spectrum = fft.analyze();

  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
}*/

/* simple start
function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
function draw() {
    background(0);
    ellipse(width/2 , height/2 ,100,100);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
*/