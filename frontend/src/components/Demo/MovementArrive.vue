<template>
  <div ref="canvasParent"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

export default {
  name: "MovementArrive",
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
    Steering.prototype.arrive = function (target) {
      desired = p5.Vector.sub(target, this.location);

      var d = desired.mag();
      desired.normalize();
      if (d < 300) {
        var m = this.p.map(d, 0, 100, 0, this.maxspeed);
        desired.mult(m);
      } else {
        desired.mult(this.maxspeed);
      }

      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }

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

    Steering.prototype.render = function () {
      this.p.noStroke();
      this.p.fill(135, 206, 250, 30);
      for (var i = 0; i < this.history.length; i++) {
        this.p.radius1 = 10 + 5 * this.p.sin(this.p.frameCount-- * 0.05);
        this.p.radius2 = 10 + 5 * this.p.sin(this.p.frameCount-- * 0.05);
        this.p.fill(135, 206, 250, 30);
        this.p.ellipse(this.history[i].x, this.history[i].y, this.p.radius1, this.p.adius2);
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
      ch = new Steering(width/2,height/2, p);
      target = p.createVector(20, 20);
      // Here you can add your p.js sketch
      p.setup = function () {
        p.createCanvas(width, height);
      };

      p.draw = function () {
        p.background(255);
        ch.render();
        ch.arrive(target);
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
