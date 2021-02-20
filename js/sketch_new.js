var MANDALA_LEVEL = 0;
var SEGMENT_LIMIT = 2000;
var AMP = 500;
var PI = 3.14;
var KILL_RATE = 20;

var _mouseX = 0;
var _mouseY = 0;

var mouseX = 1;
var mouseY = 1;
var mouseEasing = 0.05;

var frame = 0;

var dir = 1;
var cursor = new Point(view.size.width, 0) * Point.random();

var currPath = 0;

var paths = [];
paths.push(createPath());

function easin(x) {
    return 1 - Math.cos((cursor.x*PI)/2);
}


/* background */
// var bg = new Path.Rectangle({
//     point: [0, 0],
//     size: [view.size.width, view.size.height],
//     //fillColor: '#000ead',
//     fillColor: '#000'
// });
// bg.sendToBack();


function onMouseMove(event) {
    paths[currPath].add(event.point.x,event.point.y);
}

function onMouseDown(event) {
    paths.push(createPath());
    currPath++;
}

function createPath() {
    var path = new Path();
    //path.strokeColor = new Color(Math.random(255),Math.random(255),Math.random(255));
    path.strokeColor = '#eee';
    //path.fillColor = new Color(Math.random(255),Math.random(255),Math.random(255));
    //path.blendMode = 'multiply';
    path.opacity = 0.8;
    path.strokeWidth = 1;
    //path.dashArray = [50, 20];
    return path;
}

function onFrame(event) {
    frame++;

    for (var i = 0; i < paths.length; i++) {
        paths[i].rotate(30);
        paths[i].scale(0.999);
        if (i != currPath) paths[i].segments.splice(0,1);
    }

    cursor.x += dir;
    if (cursor.x > view.size.width) {
        dir = -1;
    }
    if (cursor.x < 0) {
        dir = 1;
    }

    var y = easin(cursor.x/view.size.width)*AMP;
    paths[currPath].add(cursor.x,y);
    if (frame % KILL_RATE == 0) paths[currPath].segments.splice(0,2);
    paths[currPath].smooth();

}

