var MANDALA_LEVEL = 140;
var BASE_ROTATION = 30;
var SEGMENT_LIMIT = 2000;
var MOUSE_AMP = 5;
var CURSOR_RATE = 1;
var MANDALA_LIMIT = view.size.width*.45;

var frame = 0;
var mouseDelta = 0;

var dir = 1;
var kill_rate = 5;

var start = new Point(view.size.width/2, 0);
var cursor = start.clone();

var rect = new Path.Rectangle({
    point: [0, 0],
    size: [view.size.width, view.size.height],
    fillColor: {
        gradient: {
            stops: ['#009fff', '#ec2f4b']
        },
        origin: new Point(view.size.width/2,0),
        destination: new Point(view.size.width/2,view.size.height)
    },
});
rect.sendToBack();

var path = new Path();
path.strokeColor = '#7ac9ff';
path.strokeWidth = 1;
path.dashArray = [50, 100];

function onMouseMove(event) {
    mouseDelta = event.delta.length*MOUSE_AMP;
}

function onFrame(event) {
    frame++;
    path.rotate(BASE_ROTATION + mouseDelta);
    path.scale(0.999);
    cursor.x += CURSOR_RATE*dir;
    if (cursor.x > start.x + MANDALA_LIMIT) {
        dir = -1;
    }
    if (cursor.x < start.x - MANDALA_LIMIT) {
        dir = 1;
    }
    if (path.segments.length > SEGMENT_LIMIT) {
        kill_rate = 1;
    }
    path.add(cursor.x,MANDALA_LEVEL);
    if (frame % kill_rate == 0) path.segments[0].remove();
    path.smooth();
    mouseDelta = 0;
    path.position.x = view.size.width/2;
    path.position.y = MANDALA_LEVEL;
}

