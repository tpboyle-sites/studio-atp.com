

// DEFINITIONS

let colors = {
    "blue": "#0c132a",
    "cyan": "#70c8b9",
    "orange": "#febf10",
    "pink": "#ee4699",
    "white": "#ffffff"
};

let order = ["blue", "cyan", "orange", "pink", "white", "cyan"];

var ctx, panels;


// CLASSES

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

class NormalCurve {
    constructor(mean, stdDev) {
        this.mean = mean;
        this.stdDev = stdDev;
    }

    f(x) {
        var ePower = Math.pow(Math.E, (-1 * Math.pow((x - this.mean), 2) / (2 * Math.pow(this.stdDev, 2))));
        var coeff = 1 / (this.stdDev * Math.sqrt(2 * Math.PI))
        return coeff * ePower;
    }
}


// ANIMATION

function draw(ctx, panels) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    panels.forEach(function(panel) {
        panel.draw(ctx);
    });
}


// EVENTS

function setupEvents(ctx, panels) {
    $("#pulldown-btn").click(pullDown);
    $("#close-btn").click(closeHero);
}

function hideHeroControls() {
    $("#pulldown-btn").fadeOut("slow", function() {});
    $("#close-btn").fadeOut("slow", function() {});
}

function closeHero() {
    $(".hero").fadeOut("slow", function() {});
}

function pullDown() {
    var msPerFrame = 10;
    var msElapsed = 0;
    var acceleration = new NormalCurve(2, 1);
    setInterval(function() { 
        draw(ctx, panels); 
        panels.forEach(function(panel) { panel.y = panel.y - 20 * acceleration.f(msElapsed / 1000.0); });
        msElapsed = msElapsed + msPerFrame;
    }, msPerFrame); 
    hideHeroControls();
}


// SETUP

function setupHero() {
    ctx = $('#hero-canvas')[0].getContext('2d');
    panels = createPanels(ctx);
    setupEvents(ctx, panels);
    draw(ctx, panels);
}

function createPanels(ctx) {
    var panels = [];
    var bottomY = 0;
    order.forEach(function(color) {
        var height = ctx.canvas.height;
        panels.push(new Panel(ctx.canvas.width, height, 0, bottomY, colors[color]));
        bottomY = bottomY + height;
    });
    return panels;
}


// DOCUMENT READY

$(function () { setupHero(); });