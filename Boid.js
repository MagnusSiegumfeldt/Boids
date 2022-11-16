

class Boid {
    constructor() {
        this.maxspeed = 4;
        this.maxforce = 0.2;
        this.maxangle = 90 / 2;
        this.active = true;
        this.color = color(random(60, 240), random(60, 240), random(60, 240));
        this.pos = createVector(random(width), random(height)); 
        this.vel = createVector(random(2 * this.maxspeed) - this.maxspeed, random(2 * this.maxspeed) - this.maxspeed);
        this.acc = createVector(0, 0);
        this.r = 6;
    }


    getFlockmates(flock, radius) {
        let flockmates = [];
        for (let i = 0; i < flock.length; i++) {
            if (flock[i] == this || !flock[i].active)
                continue;
            let d = this.pos.dist(flock[i].pos);
            let m1 = this.vel.y / this.vel.x;
            let diff = p5.Vector.sub(this.pos, flock[i].pos);
            let m2 = diff.y / diff.x;
            let a = atan((m1 - m2) / (1 + m1 * m2));
            if (d < radius && a < this.maxangle) {
                flockmates.push(flock[i]);
            }
        }
        return flockmates;
    }

    cohere(flockmates, speed) {
        let steer = createVector();
        if (flockmates.length == 0)
            return steer;

        for (let i = 0; i < flockmates.length; i++) {
            steer.add(flockmates[i].pos); 
        }
        steer.div(flockmates.length);
        steer.sub(this.pos);
        steer.setMag(speed);
        steer.sub(this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    separate(flockmates, speed) {
        let steer = createVector();
        if (flockmates.length == 0)
            return steer;

        for (let i = 0; i < flockmates.length; i++) {
            let d = dist(this.pos.x, this.pos.y, flockmates[i].pos.x, flockmates[i].pos.y);
            let diff = p5.Vector.sub(this.pos, flockmates[i].pos);
            diff.div(d * d);
            steer.add(diff);
        }

        steer.div(flockmates.length);
        steer.setMag(speed);
        steer.sub(this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    align(flockmates, speed) {
        let steer = createVector();
        if (flockmates.length == 0)
            return steer;

        for (let i = 0; i < flockmates.length; i++) {
            steer.add(flockmates[i].vel);
        }
        steer.div(flockmates.length);
        steer.setMag(speed);
        steer.sub(this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    calc(flock, radius, speed) {
        let flockmates = this.getFlockmates(flock, radius);
        let acc = createVector(0, 0);
        acc.add(this.cohere(flockmates, speed).mult(cohereSlider.value()));
        acc.add(this.separate(flockmates, speed).mult(separateSlider.value()));
        acc.add(this.align(flockmates, speed).mult(alignSlider.value()));
        

        this.acc = acc;
    }
     
    edges() {
        if (this.pos.x > width)
            this.pos.x -= width;
        if (this.pos.x < 0)
            this.pos.x += width;
        if (this.pos.y > height)
            this.pos.y -= height;
        if (this.pos.y < 0)
            this.pos.y += height;
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.setMag(0);
        this.edges();


    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        let a = this.vel.heading();
        noStroke();
        rotate(a);
        fill(this.color);
        triangle(-this.r, -this.r * 3 / 4, -this.r, this.r * 3 / 4, this.r, 0);
        pop();
    }
}