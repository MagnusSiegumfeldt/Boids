let maxFlocksize = 200;
let radius = 25;
let flock = [];

let alignSlider, cohereSlider, separateSlider, flocksizeSlider, radiusSlider, speedSlider;


function setActive(flock, flocksize) {
    for (let i = 0; i < flocksize; i++) {
        flock[i].active = true;
    }
    for (let i = flocksize; i < maxFlocksize; i++) {
        flock[i].active = false;
    }

}

function calcAcc(flock, radius, speed) {
    for (let i = 0; i < maxFlocksize; i++) {
        flock[i].calc(flock, radius, speed);       
    }
}

function updatePos() {
    for (let i = 0; i < flocksizeSlider.value(); i++) {
        flock[i].update();       
    }
}

function showFlock() {
    for (let i = 0; i < flocksizeSlider.value(); i++) {
        flock[i].show();
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    alignSlider = createSlider(0, 2, 1, 0.1);
    cohereSlider = createSlider(0, 2, 1, 0.1);
    separateSlider = createSlider(0, 2, 1, 0.1);
    flocksizeSlider = createSlider(0, maxFlocksize, maxFlocksize / 2, 5);
    speedSlider = createSlider(1, 11, 6, 0.2); 
    radiusSlider = createSlider(10, 100, 55, 5); 

    radiusSlider.position(10, windowHeight - 150);
    radiusLabel = createDiv("vision");
    radiusLabel.class("label");
    radiusLabel.position(150, windowHeight - 150);

    speedSlider.position(10, windowHeight - 125);
    speedLabel = createDiv("speed");
    speedLabel.class("label");
    speedLabel.position(150, windowHeight - 125);

    alignSlider.position(10, windowHeight - 100);
    alignLabel = createDiv("align");
    alignLabel.class("label");
    alignLabel.position(150, windowHeight - 100);
    
    cohereSlider.position(10, windowHeight - 75);
    cohereLabel = createDiv("cohere");
    cohereLabel.class("label");
    cohereLabel.position(150, windowHeight - 75);
    
    separateSlider.position(10, windowHeight - 50);
    separateLabel = createDiv("separate");
    separateLabel.class("label");
    separateLabel.position(150, windowHeight - 50);
    
    flocksizeSlider.position(10, windowHeight - 25);
    flocksizeLabel = createDiv("flocksize");
    flocksizeLabel.class("label");
    flocksizeLabel.position(150, windowHeight - 25);



    for (let i = 0; i < maxFlocksize; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(26,32,43);

    setActive(flock, flocksizeSlider.value());
    calcAcc(flock, radiusSlider.value(), speedSlider.value());
    updatePos(flock);
    showFlock(flock);

}