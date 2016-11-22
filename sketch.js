// copwright Micah Theriot
var song;
var scale;
var amp;
var fft;
function preload() {
  song = loadSound('RocketSoul.mp3');
}

function setup() {
  createCanvas(1100,700);
  background(0);
  song.play();
  amp = new p5.Amplitude(.97);
  fft = new p5.FFT(.0);

  // client = new Client(this, "127.0.0.1", 4000);
  // client.write("CreatePolygonSphere;\n");

  sl = new SockLib("127.0.0.1", 9999);
  sl.sendmsg("sphere -n \"new_sphere\";");
}

function draw() {
  fft.analyze();
  var totalAmp = map(amp.getLevel(), 0, 1, 0, 50);
  var bassAmp = map(fft.getEnergy("bass"), 0, 255, 10, height)
  var lowMidAmp = map(fft.getEnergy("lowMid"), 0, 255, 10, height)
  var midAmp = map(fft.getEnergy("mid"), 0, 255, 10, height)
  var highMidAmp = map(fft.getEnergy("highMid"), 0, 255, 10, height)
  var trebleAmp = map(fft.getEnergy("treble"), 0, 255, 10, height)

  background(0);
  noStroke();
  fill(255, 0, 0, 80);
  ellipse(width/6,height/2,bassAmp);
  //moveMaya(-20,0);
  fill(125, 125, 0, 100);
  ellipse(width/6 * 2,height/2,lowMidAmp);
  //moveMaya(-10,0);
  fill(0, 255, 0, 60);
  ellipse(width/6 * 3,height/2,midAmp);
  fill(0, 125, 125, 100);
  ellipse(width/6 * 4,height/2,highMidAmp);
  // moveMaya(10,0);
  fill(0, 0, 255, 80);
  ellipse(width/6 * 5,height/2,trebleAmp);
  //moveMaya(20,0);

  moveMaya(0,totalAmp);
}
function moveMaya(x, y) {
  sl.sendmsg("move -a -os -wd "+x+" "+y+" 0 \"new_sphere\";");
}
