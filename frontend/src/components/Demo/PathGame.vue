<template>
  <div ref="canvasParent"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

export default {
  name: "PathGame",
  setup() {
    const canvasParent = ref(null);
    let sketch = null;
    let ch = null;
    let target = null;
    let count = 0;
    let desired = null;
    const side = 32;
    let height = side * 15;
    let width = side * 20;
    let pathC;
    let pfC;
    let root = null;
    let myList = [];
    let p5Local = null;

    const Steering = function (x, y, p) {
      this.p = p;
      this.acceleration = p5Local.createVector(0, 0);
      this.location = this.pcreateVector(x, y);
      this.velocity = this.pcreateVector(0, 0);
      this.orientation = 0;
      this.maxspeed = 1.0;
      this.maxforce = 0.1;
      this.history = [];
    };
    Steering.prototype.follow = function () {
      let predict = this.velocity.copy();
      predict.normalize();
      predict.mult(16);
      let predictpos = p5.Vector.add(this.location, predict);
      let worldRecord = 1000000;
      for (let i = 0; i < pathC.points.length - 1; i++) {
        let a = pathC.points[i];
        let b = pathC.points[i + 1];
        let normalPoint = this.getNormalPoint(predictpos, a, b);
        if (normalPoint.x < p5Local.min(a.x, b.x) || normalPoint.x > p5Local.max(a.x, b.x) || normalPoint.y < p5Local.min(a.y, b.y) || normalPoint.y > p5Local.max(a.y, b.y)) {
          normalPoint = b.copy();
          a = pathC.points[(i + 1) % pathC.points.length];
          b = pathC.points[(i + 2) % pathC.points.length];  // Path wraps around
        }
        let distance = p5.Vector.dist(predictpos, normalPoint);
        if (distance < worldRecord) {
          worldRecord = distance;
          let dir = p5.Vector.sub(b, a);
          dir.normalize();
          dir.mult(8);
          target = normalPoint.copy();
          target.add(dir);
        }
      }
      // if (worldRecord > pathC.radius) {
      this.seek(target);
      // }
    }
    Steering.prototype.getNormalPoint = function (p, a, b) {
      let ap = p5.Vector.sub(p, a);
      let ab = p5.Vector.sub(b, a);
      ab.normalize();
      ab.mult(ap.dot(ab));
      return p5.Vector.add(a, ab);
    }
    Steering.prototype.arrive = function (target) {
      desired = p5.Vector.sub(target, this.location);
      let d = desired.mag();
      desired.normalize();
      if (d < 300) {
        let m = p5Local.map(d, 0, 100, 0, this.maxspeed);
        desired.mult(m);
      } else {
        desired.mult(this.maxspeed);
      }
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
    Steering.prototype.seek = function (target) {
      let desired = p5.Vector.sub(target, this.location); // A vector pointing from the location to the target
      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxspeed);
      // Steering = Desired minus Velocity
      let steer = p5.Vector.sub(desired, this.velocity);
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
      p5Local.noStroke();
      p5Local.fill(135, 206, 250, 30);
      for (let i = 0; i < this.history.length; i++) {
        p5Local.radius1 = 5 + 5 * p5Local.sin(p5Local.frameCount-- * 0.05);
        p5Local.radius2 = 5 + 5 * p5Local.sin(p5Local.frameCount-- * 0.05);
        p5Local.fill(135, 206, 250, 70);
        p5Local.ellipse(this.history[i].x, this.history[i].y, p5Local.radius1, p5Local.radius2);
        p5Local.fill(99, 199, 178, 70);
        p5Local.ellipse(p5Local.mouseX, p5Local.mouseY, p5Local.radius2, p5Local.radius1);
      }
      this.orientation = p5Local.atan2(this.velocity.y, this.velocity.x) + p5Local.PI / 2;
      p5Local.push();
      p5Local.translate(this.location.x, this.location.y);
      p5Local.rotate(this.orientation);
      p5Local.noStroke();
      p5Local.fill(135, 206, 250);
      p5Local.triangle(10, -2, 0, -18, -10, -2);
      p5Local.noStroke();
      p5Local.fill(135, 206, 250);
      p5Local.ellipse(0, 0, 20, 20);
      p5Local.pop();
    }

    const Tile = function (tx, ty, tid, p) {
      this.p = p;
      this.id = tid;
      this.parentID = -1;
      this.x = tx;
      this.y = ty;
      this.r = 32;
      this.f = -1;
      this.g = 1000;
      this.h = -1;
      this.isStart = false;
      this.isEnd = false;
      this.isWall = false;
      this.isWalked = false;
      this.isChecked = false;
      this.isBlocked = false;
      this.isPath = false;
      this.inOpenList = false;
      this.inClosedList = false;
    }
    Tile.prototype.render = function () {
      // p5Local.noStroke();
      if (this.isStart == true) p5Local.fill(0, 150, 0, 100);
      else if (this.isEnd == true) p5Local.fill(150, 0, 0, 100);
      else if (this.isPath == true) p5Local.noFill();
      // else if (this.isWalked == true) { p5Local.stroke(50); p5Local.fill(80, 150, 200, 10); }
      else if (this.isWall == true) p5Local.fill(150);
      else if (this.isBlocked == true) p5Local.fill(255, 0, 0);
      else p5Local.noFill();
      p5Local.rectMode(p5Local.CENTER);
      p5Local.rect(this.x, this.y, this.r, this.r);
    }
    Tile.prototype.calcHwithManhattan = function (n) {
      this.f = parseInt(((p5Local.abs(this.x - n.x) + p5Local.abs(this.y - n.y)) / this.r));
    }
    Tile.prototype.calcHwithEuclidean = function (n) {
      this.h = parseInt(p5Local.sqrt(p5Local.sq((this.x - n.x)) + p5Local.sq((this.y - n.y))));
    }
    Tile.prototype.calcF = function () {
      this.f = this.g + this.h;
    }
    Tile.prototype.dikastra = function () {
      this.f = this.g;
    }

    const Path = function (p) {
      this.p = p;
      this.points = [];
      this.radius = 1;
    }
    Path.prototype.addPoint = function (x, y) {
      let point = p5Local.createVector(x, y);
      this.points.push(point);
    }
    Path.prototype.render = function () {
      // stroke(175);
      // strokeWeight(this.radius);
      // noFill();
      // beginShape();
      // for(i in this.points){
      //   vertex(this.points[i].x, this.points[i].y);
      // }
      // // this.points.foreach (function(point){
      // //   vertex(point.x, point.y);
      // // });
      // endShape();
      // Draw thin line for center of path
      p5Local.stroke(0);
      p5Local.strokeWeight(1);
      p5Local.noFill();
      p5Local.beginShape();
      for (let i in this.points) {
        p5Local.vertex(this.points[i].x, this.points[i].y);
      }
      p5Local.endShape();
    }
    Path.prototype.reverses = function () {
      let j = 0;
      let pointsC = this.points.slice(0);
      for (let i = this.points.length - 1; i >= 0; i--) {
        this.points.splice(j, 0, pointsC.splice(i, 1)[0]);
        this.points.splice(this.points.length - 1, 1);
        j++;
      }
    }

    const PathFind = function (path, p) {
      this.p = p;
      this.sta = -1;
      this.end = -1;
      this.walked;
      this.path = path;
      this.endNode;
    }
    PathFind.prototype.clearPathNodes = function (i) {
      myList[i].isPath = false;
      myList[i].isWalked = false;
      myList[i].inOpenList = false;
      myList[i].g = 1000;
      myList[i].isChecked = false;
      myList[i].inClosedList = false;
      myList[i].parentID = -1;
    }
    PathFind.prototype.clearStartNode = function (i) {
      myList[i].g = 1000;
      myList[i].isPath = false;
      myList[i].isStart = false;
      myList[i].inOpenList = false;
      myList[i].isWalked = false;
    }
    PathFind.prototype.clearEndNode = function (i) {
      myList[i].isEnd = false;
      myList[i].isPath = false;
      myList[i].isWalked = false;
      myList[i].inOpenList = false;
      myList[i].g = 1000;
      myList[i].isChecked = false;
      myList[i].inClosedList = false;
      myList[i].parentID = -1;
    }
    PathFind.prototype.renderNodes = function () {
      for (let i = 0; i < myList.length; i++)
        myList[i].render();
    }
    PathFind.prototype.initializeNodes = function () {
      this.setWall();
      this.sta = parseInt(p5Local.random(0, myList.length - 1));
      this.setStartNode();
      this.end = this.sta;
      while (this.sta == this.end)
        this.end = parseInt(p5Local.random(0, myList.length - 1));
      this.setEndNode();
      this.timeP();
    }
    PathFind.prototype.setWall = function () {
      let t = [21, 22, 23, 24, 25, 43, 63, 83, 103];
      let a = [66, 86, 106, 87, 47, 68, 88, 108];
      let k = [30, 50, 70, 90, 110, 71, 52, 92, 33, 113];
      let o = [38, 37, 36, 35, 55, 75, 95, 115, 116, 117, 118, 98, 78, 58, 38];
      let h = [163, 183, 203, 223, 243, 204, 205, 166, 186, 206, 226, 246];
      let w = [168, 188, 208, 209, 229, 249, 230, 210, 190, 211, 231, 251, 212, 192, 172];
      let three = [194, 175, 176, 197, 216, 237, 234, 255, 256];
      let room = [57, 77, 97, 56, 76, 96, 67];
      for (let each in room) {
        myList[room[each]].isBlocked = true;
        myList[room[each]].inClosedList = true;
      }
      for (let each in t) {
        myList[t[each]].isWall = true;
        myList[t[each]].inClosedList = true;
      }
      for (let each in a) {
        myList[a[each]].isWall = true;
        myList[a[each]].inClosedList = true;
      }
      for (let each in k) {
        myList[k[each]].isWall = true;
        myList[k[each]].inClosedList = true;
      }
      for (let each in o) {
        myList[o[each]].isWall = true;
        myList[o[each]].inClosedList = true;
      }
      for (let each in h) {
        myList[h[each]].isWall = true;
        myList[h[each]].inClosedList = true;
      }
      for (let each in w) {
        myList[w[each]].isWall = true;
        myList[w[each]].inClosedList = true;
      }
      for (let each in three) {
        myList[three[each]].isWall = true;
        myList[three[each]].inClosedList = true;
      }
    }
    PathFind.prototype.setEndNode = function () {
      if (myList[this.end].isWall == false && myList[this.end].isStart == false && !myList[this.end].isBlocked) {
        myList[this.end].isEnd = true;
        this.endNode = myList[this.end];
      }
      else {
        this.end = parseInt(p5Local.random(0, myList.length - 1));
        this.setEndNode();
      }
    }
    PathFind.prototype.setStartNode = function () {
      if (myList[this.sta].isWall == false && myList[this.sta].isEnd == false) {
        myList[this.sta].g = 0;
        myList[this.sta].calcF();
        myList[this.sta].isStart = true;
        myList[this.sta].inOpenList = true;
      }
      else {
        this.sta = parseInt(p5Local.random(0, myList.length - 1));
        this.setStartNode();
      }
    }
    PathFind.prototype.timeP = function () {
      for (let i = 0; i < myList.length; i++) {
        if (myList[i].isWall) continue;
        if (myList[i].isBlocked) continue;
        else {
          myList[i].calcHwithEuclidean(this.endNode);
        }
      }
      if (this.isBlocked() == false) this.findPath();
    }
    PathFind.prototype.isWallBothering = function (s, e) {
      for (let i = 0; i < myList.length; i++) {
        let n = myList[i];
        let r1 = p5Local.dist(s.x, s.y, n.x, n.y);
        let r2 = p5Local.dist(e.x, e.y, n.x, n.y);
        if (r1 == side && r2 == side && n.isWall == true) return true;
      }
      return false;
    }
    PathFind.prototype.findPath = function () {
      let reachedTarget = false;
      while ((reachedTarget == false) && this.isBlocked() == false) {
        let small = this.smallestF_Index(myList);
        myList[small].isWalked = true;
        myList[small].inOpenList = false;
        myList[small].inClosedList = true;
        let n = myList[small];
        for (let i = 0; i < myList.length; i++) {
          let dis = p5Local.dist(n.x, n.y, myList[i].x, myList[i].y);//api ref?
          if (myList[i].isWall) continue;
          if (myList[i].isBlocked) continue;
          if (myList[i].inClosedList) continue;
          if (dis < side * 1.5) {
            if (dis > side && this.isWallBothering(n, myList[i])) continue;
            myList[i].inOpenList = true;
            myList[i].isChecked = true;
            myList[i].render();
            let tempG;
            if (dis > side) tempG = n.g + 45;
            else tempG = n.g + 32;
            if (tempG < myList[i].g) {
              myList[i].g = tempG;
              myList[i].parentID = n.id;
            }
            myList[i].calcF();
            if (myList[i].isEnd == true) {
              reachedTarget = true;
              break;
            }
          }
        }
      }
      let k = 0;
      for (let i = 0; i < myList.length; i++)
        if (myList[i].isEnd == true) k = i;
      // eslint-disable-next-line
      while (true) {
        let temp = myList[k];
        this.path.addPoint(temp.x, temp.y);
        temp.isPath = true;
        k = myList[k].parentID;
        if (k == -1) break;
      }
      this.path.reverses();
    }
    PathFind.prototype.isBlocked = function () {
      let blocked = true;
      for (let i = 0; i < myList.length; i++)
        if (myList[i].inOpenList == true) blocked = false;
      return blocked;
    }
    PathFind.prototype.smallestF_Index = function () {
      let openListID = [];
      for (let i = 0; i < myList.length; i++)
        if (myList[i].inOpenList) openListID.push(myList[i].id);
      let smallestFID = openListID[openListID.length - 1];
      for (let i = 0; i < openListID.length; i++) {
        let nID = openListID[i];
        myList[nID].calcF();
        if (myList[nID].f < myList[smallestFID].f) smallestFID = nID;
      }
      return smallestFID;
    }

    const DecisionTarget = function (p) {
      this.trueNode = new TrueTargetAction(p);
      this.falseNode = new FalseTargetAction();
    }

    const TrueTargetAction = function (p) {
      this.p = p;
    }

    TrueTargetAction.prototype.makeDecision = function () {
      var here = parseInt(p5Local.random(0, 299));
      if (!myList[here].isWall && !myList[here].isBlocked && !myList[here].isEnd) {
        goTo(here, pfC);
        return true;
      }
      else {
        //println("pick again");
        this.makeDecision();
        return false;
      }
    }

    const FalseTargetAction = function () {
    }

    FalseTargetAction.prototype.makeDecision = function () {
      ch.follow();
      return true;
    }

    function goTo(here) {
      pfC.clearStartNode(pfC.sta);
      pfC.clearEndNode(pfC.end);
      pathC.points = [];
      pfC.end = here;
      for (var i = 0; i < myList.length; i++) {
        pfC.clearPathNodes(i);
      }
      //sta = endNode.id;
      pfC.sta = parseInt(p5.floor(ch.location.y / side)) * 20 + parseInt(p5.floor(ch.location.x / side));
      pfC.walked = 0;
      //updateNodes();
      pfC.setStartNode();
      pfC.setEndNode();
      pfC.timeP();
    }

    const p5Sketch = (p) => {
      let c = 0;
      p5Local = p;
      for (var j = side / 2; j < height; j += side)
        for (var i = side / 2; i < width; i += side) {
          myList.push(new Tile(i, j, c, p));
          c++;
        }
      root = new DecisionTarget();
      pathC = new Path();
      pfC = new PathFind(pathC, );
      pfC.initializeNodes();
      ch = new Steering(myList[pfC.sta].x, myList[pfC.sta].y);
      target = p.createVector(20, 20);
      count = 0;
      // Here you can add your p.js sketch
      p.setup = function () {
        p.createCanvas(width, height);
      };

      p.draw = function () {
        p.background(255);
        pathC.render();

        ch.update();
        ch.render();
        if (p.frameCount % 2 == 0) {
          root.makeDecision();
        }
        pfC.renderNodes();
        count = count + 1;
      };

      p.mousePressed = function () {
        var ended = p.parseInt(p.floor(p.mouseY / side)) * 20 + p.parseInt(p.floor(p.mouseX / side));
        if (!myList[ended].isWall && !myList[ended].isBlocked) {
          goTo(ended);
        }
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
