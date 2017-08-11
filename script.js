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

function onMouseDown(canvas, event) {
    var translatedEvent = translateXY(canvas, event);
    var x = translatedEvent.x;
    var y = translatedEvent.y;
    if (x >= 55 && y >= 50 && x <= 63 && y <= 58) {
        dragging = true;
    }
}

function onMouseMove(ctx, canvas, event) {
    var translatedEvent = translateXY(canvas, event);
    var x = translatedEvent.x;
    var y = translatedEvent.y;
    if (dragging) {
        drawRestaurant(ctx);
        drawEgg(ctx, x, y);
    }
}

function onMouseUp(ctx, canvas, event) {
    var translatedEvent = translateXY(canvas, event);
    var x = translatedEvent.x;
    var y = translatedEvent.y;
    if (x >= 7 && y >= 27 && x <= 47 && y <= 52) {
        console.log('Dropped on griddle');
    } else {
        drawRestaurant(ctx);
    }
    dragging = false;
}

function translateXY (canvas,event) {
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
    drawBacon(ctx);
    drawBread(ctx);
}

function drawEgg(ctx, x, y) {
    var fryingEgg=$('#frying-egg').get(0);
    ctx.drawImage(
        fryingEgg,
        Math.floor(x) - 4,
        Math.floor(y) - 2);
}

function drawPlate(ctx) {
    var customerPlate=$('#customer-plate').get(0);
    ctx.drawImage(customerPlate, 5, 11);
    ctx.drawImage(customerPlate, 20, 11);
    ctx.drawImage(customerPlate, 35, 11);
    ctx.drawImage(customerPlate, 50, 11);
}

function drawEggBox(ctx) {
    var eggBox=$('#egg-box').get(0);
    ctx.drawImage(eggBox, 55, 50);
}

function drawBacon(ctx) {
    var bacon=$('#bacon').get(0);
    ctx.drawImage(bacon, 55, 37);
}

function drawBread(ctx) {
    var bread=$('#bread').get(0);
    ctx.drawImage(bread, 55, 24);
}
