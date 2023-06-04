<template>
  <div ref="canvasParent"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

export default {
  name: "SteeringComponent",
  setup() {
    const canvasParent = ref(null);
    let sketch = null;
    let ch = null;
    let target = null;
    let count = 0;
    let desired = null;
    let height = 640;
    let width = 480;
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

    const seekWithBreakPoint = () => {

      if (p5.mouseIsPressed) {
        target.set(p5.mouseX, p5.mouseY);
      }

      var d = p5.Vector.sub(target, ch.location);
      if (d.mag() < 2) {
        target.set(20, height - 20);
      }

      if (ch.location.x <= 50 && ch.location.y <= 85) {
        target.set(width - 20, 20);
      } else if (ch.location.x >= width - 85 && ch.location.y <= 50) {
        target.set(width - 20, height - 20);
      } else if (ch.location.x >= width - 50 && ch.location.y >= height - 85) {
        target.set(20, height - 20);
      } else if (ch.location.x <= 85 && ch.location.y >= height - 50) {
        target.set(20, 20);
      }
    }

    Steering.prototype.seek = function (target) {
      desired = p5.Vector.sub(target, this.location); // A vector pointing from the location to the target
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
        this.p.fill(135, 206, 250, 30);
        this.p.ellipse(this.history[i].x, this.history[i].y, this.p.radius1, this.p.radius2);
        this.p.fill(99, 199, 178, 30);
        this.p.ellipse(this.p.mouseX, this.p.mouseY, this.p.radius2, this.p.radius1);
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
      target = p.createVector(20, 20);

      p.setup = function () {
        p.createCanvas(width, height);
      };

      p.draw = function () {
        p.background(255);
        ch.render();
        ch.seek(target);
        seekWithBreakPoint();
        ch.update();

        count = count + 1;
      };

      p.mousePressed = function () {
        if(p.mouseX < width && p.mouseY < height && p.mouseX > 0 && p.mouseY > 0)
          target.set(p.mouseX, p.mouseY);
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
