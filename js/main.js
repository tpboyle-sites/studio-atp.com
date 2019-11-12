

// DEFINITIONS

let colors = {
    "blue": "#0c132a",
    "cyan": "#70c8b9",
    "orange": "#febf10",
    "pink": "#ee4699",
    "white": "#ffffff"
};

let INITIAL_PANEL_ORDER = ["blue", "cyan", "orange", "pink", "white"];
let NEVER_GENERATE = ["blue", "white"];

let MIN_ADDL_PANELS = 1
let MAX_ADDL_PANELS = 4;

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
    var acceleration = new NormalCurve(2, 1.3);

    setInterval(function() { 
        draw(ctx, panels); 
        panels.forEach(function(panel) { panel.y = panel.y - 20 * acceleration.f(msElapsed / 1000.0); });
        msElapsed = msElapsed + msPerFrame;
    }, msPerFrame); 
    hideHeroControls();
}


// SETUP

function setup() {
    setupDetail();
    setupHero();
}

function setupDetail() {
    updateDetailColorScheme();
}

function setupHero() {
    ctx = $('#hero-canvas')[0].getContext('2d');
    panels = createPanelSet(ctx, generateColorOrder());
    setupEvents(ctx, panels);
    draw(ctx, panels);
}


// DETAIL

function updateDetailColorScheme() {
    var topColor = getRandomColor(getAllPermittedColorsExcept("blue")); 
    $(".detail").addClass("bg-" + topColor);
    // var bottomColor = getRandomColor(getAllPermittedColorsExcept(topColor));
    // $(".detail .navbar").addClass("bg-" + bottomColor);
}

function showNavBar() {
    $(".detail .navbar").fadeIn(700);
}


// PANELS

function createPanelSet(ctx, colorOrder) {
    var panels = [];
    var bottomY = 0;
    colorOrder.forEach(function(color) {
        panels.push(createPanel(bottomY, color));
        bottomY = bottomY + panels[panels.length-1].height;
    });
    return panels;
}

function createPanel(y, color) {
    return new Panel(ctx.canvas.width, ctx.canvas.height, 0, y, colors[color]);
}

function generateColorOrder() {
    var totalPanels = INITIAL_PANEL_ORDER.length + getNumAddlPanels();
    var colorOrder = INITIAL_PANEL_ORDER;
    getAddlPanelColors(totalPanels, colorOrder);
    return colorOrder;
}

function getAddlPanelColors(totalPanels, colorOrder) {
    for(var i = colorOrder.length; i < totalPanels - 1; i++) {
        var availableColors = getAllPermittedColorsExcept(colorOrder[colorOrder.length-1]);
        colorOrder.push(getRandomColor(availableColors));
    }
    // last panel matches detail bg
    colorOrder.push(getDetailColors());
}

function getDetailColors(className) {
    var classes = $(".detail").attr("class").split(/\s+/);
    var bgRegex = /^bg-(\w+)/i;
    var color = "";
    classes.forEach(function(cls) {
        if (bgRegex.test(cls))
            color = cls.match(bgRegex)[1];
    });
    return color;
}

function getAllColors() {
    return Object.keys(colors);
}

function getAllPermittedColors() {
    var permittedColors = getAllColors();
    NEVER_GENERATE.forEach(function(bannedColor) {
        permittedColors.splice(permittedColors.indexOf(bannedColor), 1);
    });
    return permittedColors;
}

function getAllPermittedColorsExcept(colorName) {
    var colorNames = getAllPermittedColors();
    var i = colorNames.indexOf(colorName);
    colorNames.splice(i, 1);
    return colorNames;
}

function getRandomColor(colorPalette) {
    return colorPalette[getRandomInt(0, colorPalette.length)];
}

function getNumAddlPanels() {
    return getRandomInt(MIN_ADDL_PANELS, MAX_ADDL_PANELS);
}


// UTILITY

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max));
}


// DOCUMENT READY

$(function () { setup(); });