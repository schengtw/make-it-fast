function drawTitle(ctx) {
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#401e62';
    ctx.fillText('MAKE IT', 7, 30);
    ctx.fillText('FAST!', 15, 45);
}

function drawEgg(canvas, fryingEgg, ctx, event) {
    var x = (event.clientX - canvas.offset().left)
        / canvas.width() * 64;
    var y = (event.clientY - canvas.offset().top)
        / canvas.height() * 64;
    if (x >= 7 && y >= 27 && x <= 47 && y <= 52) {
        ctx.drawImage(
            fryingEgg,
            Math.floor(x) - 4,
            Math.floor(y) - 2);
    }
}

$(document).ready(function () {
    var fryingEgg=$('#frying-egg').get(0)
    var canvas = $('#canvas');
    var ctx= canvas.get(0).getContext('2d');

    drawTitle(ctx);
    canvas.one('click', function () {
        canvas.addClass('show-restaurant');
        ctx.clearRect(0, 0, 64, 64);
        canvas.click(function (event) {
            drawEgg(canvas, fryingEgg, ctx, event);
        })
    });
});
