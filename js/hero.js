
let colors = {
    "blue": "#0c132a",
    "cyan": "#70c8b9",
    "orange": "#febf10",
    "pink": "#ee4699",
    "white": "#ffffff"
};

let order = ["blue", "cyan", "orange", "pink", "white"];
let pullDownSpeed = -4;

var ctx, panels;

class Panel {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

$(function () {
    setupHero();
});

function draw(ctx, panels) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    panels.forEach(function(panel) {
        panel.draw(ctx);
    });
}

function pullDown() {
    setInterval(function() { 
        draw(ctx, panels); 
        panels.forEach(function(panel) { panel.y = panel.y + pullDownSpeed; });
    }, 10); 
}

function setupHero() {
    ctx = $('#hero-canvas')[0].getContext('2d');
    panels = createPanels(ctx);
    setupEvents(ctx, panels);
    draw(ctx, panels);
}

function setupEvents(ctx, panels) {
    $( "#pulldown-btn" ).click(function() {
        pullDown();
    });
}

function createPanels(ctx) {
    var panels = [], y = 0;
    order.forEach(function(color) {
        panels.push(new Panel(ctx.canvas.width, ctx.canvas.height, 0, y * ctx.canvas.height, colors[color]));
        y++;
    });
    return panels;
}