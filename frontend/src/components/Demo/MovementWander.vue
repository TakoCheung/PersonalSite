<template>
  <div ref="canvasParent"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

export default {
  name: "MovementWander",
  setup() {
    const canvasParent = ref(null);
    let sketch = null;
    let ch = null;
    let count = 0;
    let desired = null;
    let height = 640;
    let width = 480;
    let debug = true;
    let wander = true;

    const Steering = function (x, y, p) {
      this.p = p;
      this.location = this.p.createVector(x, y);
      this.velocity = this.p.createVector(0, 0);
      this.acceleration = this.p.createVector(0, 0);
      this.orientation = 0;
      this.maxspeed = 2.9;
      this.maxforce = 0.1;
      this.history = [];
    };

    Steering.prototype.boundary = function (r) {
      if (this.location.x < r) {
        desired = this.p.createVector(this.maxspeed, this.velocity.y);
      }
      else if (this.location.x > width - r) {
        desired = this.p.createVector(-this.maxspeed, this.velocity.y);
      }

      if (this.location.y < r) {
        desired = this.p.createVector(this.velocity.x, this.maxspeed);
      }
      else if (this.location.y > height - r) {
        desired = this.p.createVector(this.velocity.x, -this.maxspeed);
      }

      if (desired != undefined) {
        desired.normalize();
        desired.mult(this.maxspeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce * 2);
        this.applyForce(steer);
      }

      if (debug) {
        this.p.stroke(0);
        this.p.noFill();
        this.p.line(r, r, width - r, r);
        this.p.line(width - r, r, width - r, height - r);
        this.p.line(width - r, height - r, r, height - r);
        this.p.line(r, height - r, r, r);
      }
    }

    Steering.prototype.wander = function () {
      var wanderR = 25;
      var wanderD = 80;
      var change = 3.14;
      var wandertheta = this.p.random(-change, change);
      var circlepos = this.velocity.copy();
      circlepos.normalize();
      circlepos.mult(wanderD);
      circlepos.add(this.location);
      var h = this.velocity.heading();
      var circleOffSet = this.p.createVector(wanderR * this.p.cos(wandertheta + h), wanderR * this.p.sin(wandertheta + h));
      var target = p5.Vector.add(circlepos, circleOffSet);
      this.seek(target);
      if (debug) {
        this.p.stroke(0);
        this.p.noFill();
        this.p.ellipseMode(this.p.CENTER);
        this.p.ellipse(circlepos.x, circlepos.y, wanderR * 2, wanderR * 2);
        this.p.ellipse(target.x, target.y, 4, 4);
        this.p.line(this.location.x, this.location.y, circlepos.x, circlepos.y);
        this.p.line(circlepos.x, circlepos.y, target.x, target.y);
      }
    }

    Steering.prototype.wander2 = function () {
      var wanderR = 80;
      var change = 3.14;
      var wandertheta = this.p.random(-change, change);
      var circlepos = this.velocity.copy();
      circlepos.normalize();
      circlepos.add(this.location);
      var h = this.velocity.heading();
      var circleOffSet = this.p.createVector(wanderR * this.p.cos(wandertheta + h), wanderR * this.p.sin(wandertheta + h));
      var target = p5.Vector.add(circlepos, circleOffSet);
      this.seek(target);
      if (debug) {
        this.p.stroke(0);
        this.p.noFill();
        this.p.ellipseMode(this.p.CENTER);
        this.p.ellipse(circlepos.x, circlepos.y, wanderR * 2, wanderR * 2);
        this.p.ellipse(target.x, target.y, 4, 4);
        this.p.line(this.location.x, this.location.y, circlepos.x, circlepos.y);
        this.p.line(circlepos.x, circlepos.y, target.x, target.y);
      }
    }

    Steering.prototype.seek = function (target) {
      var desired = p5.Vector.sub(target, this.location); // A vector pointing from the location to the target
      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxspeed);
      // Steering = Desired minus Velocity
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce); // Limit to maximum steering force
      this.applyForce(steer);
    }

    // Forces go into acceleration
    Steering.prototype.applyForce = function (force) {
      this.acceleration.add(force);
    }

    Steering.prototype.update = function () {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
      if ((count % 10) == 0 && this.velocity.mag() != 0) {
        this.history.unshift(this.location.copy());
      }
      if (this.history.length > 10) {
        this.history.pop();
      }
    }

    // Draw boid as a circle
    Steering.prototype.render = function () {
      this.p.noStroke();
      this.p.fill(135, 206, 250, 30);
      for (var i = 0; i < this.history.length; i++) {
        this.p.radius1 = 10 + 5 * this.p.sin(this.p.frameCount-- * 0.05);
        this.p.radius2 = 10 + 5 * this.p.sin(this.p.frameCount-- * 0.05);
        this.p.ellipse(this.history[i].x, this.history[i].y, this.p.radius1, this.p.radius2);
      }
      this.orientation = this.p.atan2(this.velocity.y, this.velocity.x) + this.p.PI / 2;
      this.p.push();
      this.p.translate(this.location.x, this.location.y);
      this.p.rotate(this.orientation);
      this.p.noStroke();
      this.p.fill(135, 206, 250);
      this.p.triangle(20, 15, 0, -40, -20, 15);
      this.p.noStroke();
      this.p.fill(135, 206, 250);
      this.p.ellipse(0, 20, 40, 40);
      this.p.pop();
    }

    const p5Sketch = (p) => {
      ch = new Steering(20, height - 20, p);
      // Here you can add your p.js sketch
      p.setup = function () {
        p.createCanvas(width, height);
      };

      p.draw = function () {
        p.background(255);
        ch.render();
        ch.boundary(40);
        if (wander) {
          ch.wander();
        } else {
          ch.wander2();
        }
        ch.update();
        count = count + 1;
      };

      p.mousePressed = function () {
        debug = !debug;
      };

      p.keyPressed = function () {
        wander = !wander;
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
