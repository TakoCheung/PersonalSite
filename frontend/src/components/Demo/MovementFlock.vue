<template>
  <div ref="canvasParent"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

export default {
  name: "MovementFlock",
  setup() {
    const canvasParent = ref(null);
    let sketch = null;
    let flock = null;
    let count = 0;
    let height = 640;
    let width = 480;

    const Flock = function () {
      this.boids = [];
    };
    Flock.prototype.run = function () {
      for (var i = 0; i < this.boids.length; i++) {
        this.boids[i].run(this.boids);
      }
    }
    Flock.prototype.addBoid = function (b) {
      this.boids.push(b);
    }

    const Boid = function (x, y, p) {
      this.p = p;
      this.acceleration = this.p.createVector(0, 0);
      this.velocity = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1));
      this.position = this.p.createVector(x, y);
      this.r = 3.0;
      this.maxspeed = 3;    // Maximum speed
      this.maxforce = 0.05; // Maximum steering force
      this.history = [];
      this.red = this.p.random(1, 255);
      this.g = this.p.random(1, 255);
      this.b = this.p.random(1, 255);
      this.orientation = 0;
      
    };
    Boid.prototype.run = function (boids) {
      this.flock(boids);
      this.update();
      this.borders();
      this.render();
    }
    Boid.prototype.applyForce = function (force) {
      this.acceleration.add(force);
    }
    Boid.prototype.flock = function (boids) {
      var sep = this.separate(boids);
      var ali = this.align(boids);
      var coh = this.cohesion(boids);
      sep.mult(1.5);
      ali.mult(1.0);
      coh.mult(1.0);
      // Add the force vectors to acceleration
      this.applyForce(sep);
      this.applyForce(ali);
      this.applyForce(coh);
    }
    Boid.prototype.update = function () {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      if ((count % 10) == 0 && this.velocity.mag() != 0) {
        this.history.unshift(this.position.copy());
      }
      if (this.history.length > 10) {
        this.history.pop();
      }
    }
    Boid.prototype.seek = function (target) {
      var desired = p5.Vector.sub(target, this.position);
      desired.normalize();
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    }
    Boid.prototype.render = function () {
      this.p.noStroke();
      this.p.fill(this.red, this.g, this.b, 30);
      for (var i = 0; i < this.history.length; i++) {
        this.p.radius1 = 10 + 5 * this.p.sin(this.p.frameCount-- * 0.05);
        this.p.radius2 = 10 + 5 * this.p.sin(this.p.frameCount-- * 0.05);
        this.p.ellipse(this.history[i].x, this.history[i].y, this.p.radius1, this.p.radius2);
      }
      this.orientation = this.p.atan2(this.velocity.y, this.velocity.x) + this.p.PI / 2;
      this.p.push();
      this.p.translate(this.position.x, this.position.y);
      this.p.rotate(this.orientation);
      this.p.noStroke();
      this.p.fill(this.red, this.g, this.b);
      this.p.triangle(10, 7.5, 0, -20, -10, 7.5);
      this.p.noStroke();
      this.p.fill(this.red, this.g, this.b);
      this.p.ellipse(0, 10, 20, 20);
      this.p.pop();
    }
    Boid.prototype.borders = function () {
      if (this.position.x < -this.r) this.position.x = width + this.r;
      if (this.position.y < -this.r) this.position.y = height + this.r;
      if (this.position.x > width + this.r) this.position.x = -this.r;
      if (this.position.y > height + this.r) this.position.y = -this.r;
    }
    Boid.prototype.separate = function (boids) {
      var desiredseparation = 50.0;
      var steer = this.p.createVector(0, 0);
      var count = 0;
      for (var i = 0; i < boids.length; i++) {
        var d = p5.Vector.dist(this.position, boids[i].position);
        if ((d > 0) && (d < desiredseparation)) {
          var diff = p5.Vector.sub(this.position, boids[i].position);
          diff.normalize();
          diff.div(d);
          steer.add(diff);
          count++;
        }
      }
      if (count > 0) {
        steer.div(count);
      }
      if (steer.mag() > 0) {
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity);
        steer.limit(this.maxforce);
      }
      return steer;
    }
    Boid.prototype.align = function (boids) {
      var neighbordist = 80;
      var sum = this.p.createVector(0, 0);
      var count = 0;
      for (var i = 0; i < boids.length; i++) {
        var d = p5.Vector.dist(this.position, boids[i].position);
        if ((d > 0) && (d < neighbordist)) {
          sum.add(boids[i].velocity);
          count++;
        }
      }
      if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        var steer = p5.Vector.sub(sum, this.velocity);
        steer.limit(this.maxforce);
        return steer;
      } else {
        return this.p.createVector(0, 0);
      }
    }
    Boid.prototype.cohesion = function (boids) {
      var neighbordist = 80;
      var sum = this.p.createVector(0, 0);
      var count = 0;
      for (var i = 0; i < boids.length; i++) {
        var d = p5.Vector.dist(this.position, boids[i].position);
        if ((d > 0) && (d < neighbordist)) {
          sum.add(boids[i].position);
          count++;
        }
      }
      if (count > 0) {
        sum.div(count);
        return this.seek(sum);
      } else {
        return this.p.createVector(0, 0);
      }
    }

    const p5Sketch = (p) => {
      count = 0;
      flock = new Flock();
      for (var i = 0; i < 10; i++) {
        var b = new Boid(width / 2, height / 2, p);
        flock.addBoid(b);
      }
      // Here you can add your p.js sketch
      p.setup = function () {
        p.createCanvas(width, height);
      };

      p.draw = function () {
        p.background(255);
        flock.run();
        count = count + 1;
        p.noStroke();
        p.fill(this.red, this.g, this.b);
        p.triangle(p.mouseX + 10, p.mouseY + 7.5, p.mouseX, p.mouseY - 20, p.mouseX - 10, p.mouseY + 7.5);
        p.noStroke();
        p.fill(this.red, this.g, this.b);
        p.ellipse(p.mouseX, p.mouseY + 10, 20, 20);
      };

      p.mouseDragged = function () {
        if(p.mouseX < width && p.mouseY < height && p.mouseX > 0 && p.mouseY > 0)
          flock.addBoid(new Boid(p.mouseX,p.mouseY, p));
      };
      p.mousePressed = function () {
        if(p.mouseX < width && p.mouseY < height && p.mouseX > 0 && p.mouseY > 0)
          flock.addBoid(new Boid(p.mouseX,p.mouseY, p));
      };
    }

    onMounted(() => {
      sketch = new p5(p5Sketch, canvasParent.value);
    });

    onBeforeUnmount(() => {
      sketch.remove();
    });

    return {
      canvasParent,
    };
  },
};

</script>
