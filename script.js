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

function isInside(position, boxTopLeft, boxSize) {
    var boxBottomRight = {
        x: boxTopLeft.x + boxSize.x,
        y: boxTopLeft.y + boxSize.y
    }
    return (position.x >= boxTopLeft.x
        && position.y >= boxTopLeft.y
        && position.x <= boxBottomRight.x
        && position.y <= boxBottomRight.y);
}

function isInsideBox(position, box) {
    return isInside(position, box.position, box.size);
}

function translateToTopLeft(position, boxSize) {
    return {
        x: position.x - Math.floor(boxSize.x / 2),
        y: position.y - Math.floor(boxSize.y / 2)
    };
}

function addCurrentTime(position) {
    return {
        x: position.x,
        y: position.y,
        cookingStartTime: window.performance.now()
    };
}

var eggInfo = {
    size: {x: 9, y: 6},
    times: {perfectTime: 2000, burnedTime:3500}
};

var baconInfo = {
    size: {x: 10, y: 5},
    times: {perfectTime: 4500, burnedTime:6500}
};

var breadInfo = {
    size: {x: 8, y: 9},
    times: {perfectTime: 7000, burnedTime:10000}
};

var eggBox = {
    position: { x: 55, y: 50 },
    size: { x: 8, y: 8 }
}
var baconPlate = {
    position: { x: 55, y: 37 },
    size: { x: 8, y: 11 }
}
var breadPlate = {
    position: { x: 55, y: 24 },
    size: { x: 8, y: 11 }
}
var griddle = {
    position: { x: 8, y: 29 },
    size: { x: 39, y: 21 }
}

var dragging = false;
var eggs = [];
var bacons = [];
var breads= [];

function onMouseDown(canvas, event) {
    var mouse = translateXY(canvas, event);
    var x = mouse.x;
    var y = mouse.y;
    if (eggs.length < 6 && isInsideBox(mouse, eggBox)) {
        dragging = 'egg';
    } else if (bacons.length < 5 && isInsideBox(mouse, baconPlate)) {
        dragging = 'bacon';
    } else if (breads.length < 3 && isInsideBox(mouse, breadPlate)) {
        dragging = 'bread';
    } else {
        var draggingEgg = eggs.find(function (egg) {
            return isInside(mouse, egg, eggInfo.size);
        });
        if (draggingEgg !== undefined) {
            var i = eggs.indexOf(draggingEgg);
            eggs.splice(i, 1);
            dragging = 'egg';
        } else {
            var draggingBacon = bacons.find(function (bacon) {
                return isInside(mouse, bacon, baconInfo.size);
            });
            if (draggingBacon !== undefined) {
                var i = bacons.indexOf(draggingBacon);
                bacons.splice(i, 1);
                dragging = 'bacon';
            } else {
                var draggingBread = breads.find(function (bread) {
                    return isInside(mouse, bread, breadInfo.size);
                });
                if (draggingBread !== undefined) {
                    var i = breads.indexOf(draggingBread);
                    breads.splice(i, 1);
                    dragging = 'bread';
                }
            }
        }
    }
}

function onMouseMove(ctx, canvas, event) {
    var mouse = translateXY(canvas, event);

    if (dragging === 'egg') {
        drawRestaurant(ctx);
        drawEgg(ctx, addCurrentTime(translateToTopLeft(mouse, eggInfo.size)));
    } else if (dragging === 'bacon') {
        drawRestaurant(ctx);
        drawBacon(ctx, addCurrentTime(translateToTopLeft(mouse, baconInfo.size)));
    } else if(dragging === 'bread') {
        drawRestaurant(ctx);
        drawBread(ctx, addCurrentTime(translateToTopLeft(mouse, breadInfo.size)));
    }
}

function onMouseUp(ctx, canvas, event) {
    var mouse = translateXY(canvas, event);
    var x = mouse.x;
    var y = mouse.y;

    if (isInsideBox(mouse, griddle)) {

        // x and y are inside the griddle
        console.log('Dropped on griddle');
        if (dragging === 'egg') {
            var newEgg = addCurrentTime(translateToTopLeft(mouse, eggInfo.size));
            eggs.push(newEgg);
        } else if (dragging === 'bacon') {
            var newBacon = addCurrentTime(translateToTopLeft(mouse, baconInfo.size));
            bacons.push(newBacon);
        } else if(dragging === 'bread') {
            var newBread = addCurrentTime(translateToTopLeft(mouse, breadInfo.size));
            breads.push(newBread);
        }
    }
    drawRestaurant(ctx);
    dragging = false;
}

//  Find a position on canvas
function translateXY(canvas,event) {
    var canvasX = (event.clientX - canvas.offset().left)
        / canvas.width() * 64;
    var canvasY = (event.clientY - canvas.offset().top)
        / canvas.height() * 64;
    return {
        x: Math.floor(canvasX),
        y: Math.floor(canvasY)
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
    console.log('drawRestaurant')
    for(var i = 0; i < breads.length; i++) {
        drawBread(ctx, breads[i]);
    }
    for (var i = 0; i < bacons.length; i++) {
        drawBacon(ctx, bacons[i]);
    }
    for (var i = 0; i < eggs.length; i++) {
        drawEgg(ctx, eggs[i]);
    }
}

function drawEgg(ctx, egg) {
    var fryingEgg = $('#frying-egg').get(0);
    drawIngredient(ctx, fryingEgg, egg, eggInfo);
}

function drawBacon(ctx, bacon) {
    var smallBacon = $('#small-bacon').get(0);
    drawIngredient(ctx, smallBacon, bacon, baconInfo);
}

function drawBread(ctx, bread) {
    var oneBread = $('#one-bread').get(0);
    drawIngredient(ctx, oneBread, bread, breadInfo);
}

function drawIngredient(ctx, image, ingredient, ingredientInfo) {
    var currentTime = window.performance.now();
    var cookingTime = currentTime - ingredient.cookingStartTime;
    var i;
    var progress;
    if (cookingTime < ingredientInfo.times.perfectTime){
        i = 0;
        progress = cookingTime / ingredientInfo.times.perfectTime;
    } else if (cookingTime < ingredientInfo.times.burnedTime) {
        i = 1;
        progress = (cookingTime - ingredientInfo.times.perfectTime)
            / (ingredientInfo.times.burnedTime - ingredientInfo.times.perfectTime);
    } else {
        i = 2;
    }

    function drawIngredientImage(i) {
        ctx.drawImage(
            image,
            0, i * ingredientInfo.size.y,
            ingredientInfo.size.x, ingredientInfo.size.y,
            ingredient.x, ingredient.y,
            ingredientInfo.size.x, ingredientInfo.size.y);
    }

    drawIngredientImage(i);

    if (i < 2) {
        ctx.globalAlpha = progress;

        drawIngredientImage(i + 1);

        ctx.globalAlpha = 1.0;
    }
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
    var bacon = $('#bacon-plate').get(0);
    ctx.drawImage(bacon, 55, 37);
}

function drawBreadPlate(ctx) {
    var bread = $('#bread-plate').get(0);
    ctx.drawImage(bread, 55, 24);
}
