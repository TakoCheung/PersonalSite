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
    const col = 15;
    const row = 20
    let sketch = null;
    let ch = null;
    let target = null;
    let count = 0;
    let desired = null;
    const side = 32;
    let height = side * row;
    let width = side * col;
    let pathC;
    let pfC;
    let root = null;
    let myList = [];
    
    const Steering = function (x, y, p) {
      this.p = p;
      this.location = this.p.createVector(x, y);
      this.velocity = this.p.createVector(0, 0);
      this.acceleration = this.p.createVector(0, 0);
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
        if (normalPoint.x < this.p.min(a.x, b.x) || normalPoint.x > this.p.max(a.x, b.x) || normalPoint.y < this.p.min(a.y, b.y) || normalPoint.y > this.p.max(a.y, b.y)) {
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
        let m = this.p.map(d, 0, 100, 0, this.maxspeed);
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
      this.p.noStroke();
      this.p.fill(135, 206, 250, 30);
      for (let i = 0; i < this.history.length; i++) {
        this.p.radius1 = 5 + 5 * this.p.sin(this.p.frameCount-- * 0.05);
        this.p.radius2 = 5 + 5 * this.p.sin(this.p.frameCount-- * 0.05);
        this.p.fill(135, 206, 250, 70);
        this.p.ellipse(this.history[i].x, this.history[i].y, this.p.radius1, this.p.radius2);
        this.p.fill(99, 199, 178, 70);
        this.p.ellipse(this.p.mouseX, this.p.mouseY, this.p.radius2, this.p.radius1);
      }
      this.orientation = this.p.atan2(this.velocity.y, this.velocity.x) + this.p.PI / 2;
      this.p.push();
      this.p.translate(this.location.x, this.location.y);
      this.p.rotate(this.orientation);
      this.p.noStroke();
      this.p.fill(135, 206, 250);
      this.p.triangle(10, -2, 0, -18, -10, -2);
      this.p.noStroke();
      this.p.fill(135, 206, 250);
      this.p.ellipse(0, 0, row, row);
      this.p.pop();
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
      this.p.noStroke(0);
      if (this.isStart == true) this.p.fill(0, 150, 0, 100);
      else if (this.isEnd == true) this.p.fill(150, 0, 0, 100);
      else if (this.isPath == true) this.p.noFill();
      else if (this.isWalked == true) { this.p.stroke(50); this.p.fill(80, 150, 200, 10); }
      else if (this.isWall == true) this.p.fill(150);
      else if (this.isBlocked == true) this.p.fill(255, 0, 0);
      else this.p.noFill();
      this.p.rectMode(this.p.CENTER);
      // this.p.textSize(12);
      // this.p.text(this.id, this.x, this.y, this.r, this.r)
      this.p.rect(this.x, this.y, this.r, this.r);
    }
    Tile.prototype.calcHwithManhattan = function (n) {
      this.f = parseInt(((this.p.abs(this.x - n.x) + this.p.abs(this.y - n.y)) / this.r));
    }
    Tile.prototype.calcHwithEuclidean = function (n) {
      this.h = parseInt(this.p.sqrt(this.p.sq((this.x - n.x)) + this.p.sq((this.y - n.y))));
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
      let point = this.p.createVector(x, y);
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
      this.p.stroke(0);
      this.p.strokeWeight(1);
      this.p.noFill();
      this.p.beginShape();
      for (let i in this.points) {
        this.p.vertex(this.points[i].x, this.points[i].y);
      }
      this.p.endShape();
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
      this.sta = parseInt(this.p.random(0, myList.length - 1));
      this.setStartNode();
      this.end = this.sta;
      while (this.sta == this.end)
        this.end = parseInt(this.p.random(0, myList.length - 1));
      this.setEndNode();
      this.timeP();
    }
    PathFind.prototype.setWall = function () {
      let t = [0,1,2,16,31];
      let a = [35,49,50,51,64,66];
      let k = [68,70,83,84,98,100];
      let o = [102,103,104,117,119,132,133,134];
      let d = [135,136,150,152,165,167,180,181];
      let e = [169,170,171,184,199,200,201,214,229,230,231];
      let m = [203,205,218,219,220,233,248,235,250];
      let o2 = [237,238,239,252,254,267,269,282,283,284];
      let blocked = [118,151,166,253,268];
      for (let each in blocked) {
        myList[blocked[each]].isBlocked = true;
        myList[blocked[each]].inClosedList = true;
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
      for (let each in o2) {
        myList[o2[each]].isWall = true;
        myList[o2[each]].inClosedList = true;
      }
      for (let each in d) {
        myList[d[each]].isWall = true;
        myList[d[each]].inClosedList = true;
      }
      for (let each in e) {
        myList[e[each]].isWall = true;
        myList[e[each]].inClosedList = true;
      }
      for (let each in m) {
        myList[m[each]].isWall = true;
        myList[m[each]].inClosedList = true;
      }
    }
    PathFind.prototype.setEndNode = function () {
      if (myList[this.end].isWall == false && myList[this.end].isStart == false ) {
        myList[this.end].isEnd = true;
        this.endNode = myList[this.end];
      }
      else {
        this.end = parseInt(this.p.random(0, myList.length - 1));
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
        this.sta = parseInt(this.p.random(0, myList.length - 1));
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
        let r1 = this.p.dist(s.x, s.y, n.x, n.y);
        let r2 = this.p.dist(e.x, e.y, n.x, n.y);
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
          let dis = this.p.dist(n.x, n.y, myList[i].x, myList[i].y);//api ref?
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
      this.p = p;
      this.trueNode = new TrueTargetAction(p);
      this.falseNode = new FalseTargetAction();
      this.teleport = new TeleportAction(p);
    }
    DecisionTarget.prototype.getBranch = function () {
      const curLocation = parseInt(this.p.floor(ch.location.y / side)) * col + parseInt(this.p.floor(ch.location.x / side));
      if (myList[curLocation].isEnd)
        return this.trueNode;
      else if( myList[pfC.end].isBlocked){
        return this.teleport;
      }
      else
        return this.falseNode;
    }
    DecisionTarget.prototype.makeDecision = function () {
      return this.getBranch().makeDecision();
    }

    const TrueTargetAction = function (p) {
      this.p = p;
    }
    TrueTargetAction.prototype.makeDecision = function () {
      var here = parseInt(this.p.random(0, myList.length - 1));
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

    const TeleportAction = function (p) {
      this.p = p;
    }
    TeleportAction.prototype.makeDecision = function () {
      const rand = parseInt(this.p.random(0, myList.length - 1));
      ch = new Steering(myList[rand].x, myList[rand].y, this.p);
      goTo(rand, pfC);
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
      pfC.sta = parseInt(pfC.p.floor(ch.location.y / side)) * col + parseInt(pfC.p.floor(ch.location.x / side));
      pfC.walked = 0;
      // updateNodes();
      pfC.setStartNode();
      pfC.setEndNode();
      pfC.timeP();
    }

    const p5Sketch = (p) => {
      let c = 0;
      for (var j = side / 2; j < height; j += side)
        for (var i = side / 2; i < width; i += side) {
          myList.push(new Tile(i, j, c, p));
          c++;
        }
      p.createCanvas(640, 480);
      root = new DecisionTarget(p);
      pathC = new Path(p);
      pfC = new PathFind(pathC, p);
      pfC.initializeNodes();
      ch = new Steering(myList[pfC.sta].x, myList[pfC.sta].y, p);
      root = new DecisionTarget(p);
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
        const ended = parseInt(p.floor(p.mouseY / side)) * col + parseInt(p.floor(p.mouseX / side));
        if (!myList[ended].isWall) {
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
