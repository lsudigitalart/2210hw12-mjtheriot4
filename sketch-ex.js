var sound, amplitude;

function preload(){
  sound = loadSound('RocketSoul.mp3');
}
function setup() {
  createCanvas(100,100);
  amplitude = new p5.Amplitude();
  sound.play();

}
function draw() {
  background(0);
  fill(255);
  var scale = map(amplitude.getLevel(), 0, 1, 0, width);
  ellipse(width/2, height/2, scale);
}
