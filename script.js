function drawTitle(ctx) {
    // Set the font and color
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#401e62';

    // Draw the title text
    ctx.fillText('MAKE IT', 7, 30);
    ctx.fillText('FAST!', 15, 45);
}

function drawEgg(canvas, fryingEgg, ctx, event) {
    // Translate mouse X & Y into 64x64 X & Y
    var x = (event.clientX - canvas.offset().left)
        / canvas.width() * 64;
    var y = (event.clientY - canvas.offset().top)
        / canvas.height() * 64;

    // If on the griddle...
    if (x >= 7 && y >= 27 && x <= 47 && y <= 52) {
        // Draw the egg
        ctx.drawImage(
            fryingEgg,
            Math.floor(x) - 4,
            Math.floor(y) - 2);
    }
}

$(document).ready(function () {
    // Get images
    var fryingEgg=$('#frying-egg').get(0)

    // Prepare the canvas and context
    var canvas = $('#canvas');
    var ctx= canvas.get(0).getContext('2d');

    // Draw the title
    drawTitle(ctx);

    // When the player clicks the first time...
    canvas.one('click', function () {
        // Show an empty restaurant
        canvas.addClass('show-restaurant');
        ctx.clearRect(0, 0, 64, 64);
        drawPlate(ctx);
        drawBox(ctx);
        drawBacon(ctx);
        drawBread(ctx);

        // When the player clicks inside the restaurant...
        canvas.click(function (event) {
            // Draw an egg
            drawEgg(canvas, fryingEgg, ctx, event);

        })
    });
});
       // add plates
function drawPlate(ctx) {
    var customerPlate=$('#customer-plate').get(0);
    var canvas=$('#canvas');
    ctx.drawImage(customerPlate,5,11);
    ctx.drawImage(customerPlate,20,11);
    ctx.drawImage(customerPlate,35,11);
    ctx.drawImage(customerPlate,50,11);
}

      // add egg box
function drawBox(ctx) {
    var eggBox=$('#egg-box').get(0);
    var canvas=$('#canvas');
    ctx.drawImage(eggBox,55,50);
}

      // add bacon
function drawBacon(ctx) {
    var bacon=$('#bacon').get(0);
    var canvas=$('#canvas');
    ctx.drawImage(bacon,55,37);
}

      // add bread
function drawBread(ctx) {
    var bread=$('#bread').get(0);
    var canvas=$('#canvas');
    ctx.drawImage(bread,55,24);
}