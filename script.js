$(document).ready(main);

function main() {
    // Prepare the canvas and context
    var canvas = $('#canvas');
    var ctx= canvas.get(0).getContext('2d');

    // Draw the title
    drawTitle(ctx);

    // When the player clicks the first time...
    canvas.one('click', function () {
        // Show an empty restaurant
        canvas.addClass('show-restaurant');
        drawRestaurant(ctx);

        // When the player clicks inside the restaurant...
        canvas.mousedown(function (event) {
            onMouseDown(canvas, event);
        })
        canvas.mousemove(function (event) {
            onMouseMove(ctx, canvas, event);
        })
        canvas.mouseup(function (event) {
            onMouseUp(ctx, canvas, event);
        })
    });
}

var dragging = false;
var eggs = [];
var bacons = [];
var breads= [];

function onMouseDown(canvas, event) {
    var translatedEvent = translateXY(canvas, event);
    var x = translatedEvent.x;
    var y = translatedEvent.y;
    if (eggs.length < 6 && x >= 55 && y >= 50 && x <= 63 && y <= 58) {
        dragging = 'egg';
    }
    else if (bacons.length < 5 && x >= 55 && y >= 37 && x <= 63 && y <= 48) {
        dragging = 'bacon';
    }
    else if (breads.length < 3 && x >= 55 && y >= 24 && x <= 63 && y <= 35) {
        dragging = 'bread';
    }
}

function onMouseMove(ctx, canvas, event) {
    var translatedEvent = translateXY(canvas, event);
    var x = translatedEvent.x;
    var y = translatedEvent.y;

    if (dragging === 'egg') {
        drawRestaurant(ctx);
        drawEgg(ctx, x, y);
    } else if (dragging === 'bacon') {
        drawRestaurant(ctx);
        drawBacon(ctx, x, y);
    } else if(dragging === 'bread') {
        drawRestaurant(ctx);
        drawBread(ctx, x, y);
    }
}

function onMouseUp(ctx, canvas, event) {
    var translatedEvent = translateXY(canvas, event);
    var x = translatedEvent.x;
    var y = translatedEvent.y;
    if (x >= 7 && y >= 27 && x <= 47 && y <= 52) {

        // x and y are inside the griddle
        console.log('Dropped on griddle');
        if (dragging === 'egg') {
            var newEgg = {
                x: x,
                y: y
            };
            eggs.push(newEgg);
        } else if (dragging === 'bacon') {
            var newBacon = {
                x: x,
                y: y
            };
            bacons.push(newBacon);
        } else if(dragging === 'bread') {
            var newBread = {
                x: x,
                y: y
            };
            breads.push(newBread);
        }
    } else {
        drawRestaurant(ctx)
    }
    dragging = false;
}

//  Find a position on canvas
function translateXY(canvas,event) {
    var canvasX = (event.clientX - canvas.offset().left)
        / canvas.width() * 64;
    var canvasY = (event.clientY - canvas.offset().top)
        / canvas.height() * 64;
    return {
        x: canvasX,
        y: canvasY
    }
}

function drawTitle(ctx) {
    // Set the font and color
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#401e62';

    // Draw the title text
    ctx.fillText('MAKE IT', 7, 30);
    ctx.fillText('FAST!', 15, 45);
}

function drawRestaurant(ctx) {
    ctx.clearRect(0, 0, 64, 64);
    drawPlate(ctx);
    drawEggBox(ctx);
    drawBaconPlate(ctx);
    drawBreadPlate(ctx);
    for (var i = 0; i < eggs.length; i++) {
        var egg = eggs[i];
        drawEgg(ctx, egg.x, egg.y);
    }
    for (var i = 0; i < bacons.length; i++) {
        var bacon = bacons[i];
        drawBacon(ctx, bacon.x, bacon.y);
    }
    for(var i = 0; i < breads.length; i++) {
        var bread = breads[i];
        drawBread(ctx, bread.x, bread.y);
    }
}

function drawEgg(ctx, x, y) {
    // Match cursor and images
    x = Math.floor(x) - 4
    y = Math.floor(y) - 2

    var fryingEgg = $('#frying-egg').get(0);
    ctx.drawImage(fryingEgg, x, y);
}

function drawBacon(ctx, x, y) {
    // Match cursor and images
    x = Math.floor(x) - 5
    y = Math.floor(y) - 2

    var smallBacon = $('#small-bacon').get(0);
    ctx.drawImage(smallBacon, x , y);
}

function drawBread(ctx, x, y) {
    // Match cursor and images
    x = Math.floor(x) - 4
    y = Math.floor(y) - 3

    var oneBread = $('#one-bread').get(0);
    ctx.drawImage(oneBread, x , y);
}

function drawPlate(ctx) {
    var customerPlate = $('#customer-plate').get(0);
    ctx.drawImage(customerPlate, 5, 11);
    ctx.drawImage(customerPlate, 20, 11);
    ctx.drawImage(customerPlate, 35, 11);
    ctx.drawImage(customerPlate, 50, 11);
}

function drawEggBox(ctx) {
    var eggBox = $('#egg-box').get(0);
    ctx.drawImage(eggBox, 55, 50);
}

function drawBaconPlate(ctx) {
    var bacon = $('#bacon').get(0);
    ctx.drawImage(bacon, 55, 37);
}

function drawBreadPlate(ctx) {
    var bread = $('#bread').get(0);
    ctx.drawImage(bread, 55, 24);
}
