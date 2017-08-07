function drawTitle(ctx){
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#401e62';
    ctx.fillText('MAKE IT', 7, 30);
    ctx.fillText('FAST!', 15, 45);
}

$(document).ready(function () {
    var canvas = $('#canvas');
    var ctx= canvas.get(0).getContext('2d');

    drawTitle(ctx);
    canvas.click(function () {
        canvas.addClass('show-restaurant');
        ctx.clearRect(0,0,64,64);
    });
});
