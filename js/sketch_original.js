var CLOUD_LEVEL = 300;
var SEGMENT_LIMIT = 2000;
var KILL_RATE = 20;

var dir = 1;
var cursor = new Point(view.size.width, 0) * Point.random();

var path = new Path();
path.strokeColor = '#fff';
path.strokeWidth = 1;
path.dashArray = [50, 30];

function onMouseMove(event) {
    path.add(event.point.x,CLOUD_LEVEL);
}

function onFrame(event) {
    path.rotate(30);
    cursor.x += dir;
    if (cursor.x > view.size.width) {
        dir = -1;
    }
    if (cursor < 0) {
        dir = 1;
    }
    if (path.segments.length < SEGMENT_LIMIT) {
        path.add(cursor.x,CLOUD_LEVEL);
    }
    path.smooth();
}
