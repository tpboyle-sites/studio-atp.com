

// CONSTANTS & SETTINGS

let INITIAL_PANEL_ORDER = ["blue", "cyan", "orange", "pink", "white"];
let NEVER_GENERATE = ["blue", "white"];

let MIN_ADDL_PANELS = 1;
let MAX_ADDL_PANELS = 4;


// VARIABLES

var heroCanvas;


// SETUP

function setupHero() {
    heroCanvas = new Canvas("#hero-canvas");
    var heroPanels = createHeroAnimPanelSet(generateColorOrder());
    heroCanvas.addLayer(new Layer("default", 0, heroPanels));
    setupEvents();
    heroCanvas.draw();
}


// EVENTS

function setupEvents() {
    $("#pulldown-btn").click(pullDown);
    $("#close-btn").click(closeHero);
}

function hideHeroControls() {
    $("#pulldown-btn").fadeOut("slow", function() {});
    $("#close-btn").fadeOut("slow", function() {});
}

function closeHero() {
    $(".hero").fadeOut("slow", function() {});
    showNavBar();
}

function pullDown() {
    var msPerFrame = 10;
    var msElapsed = 0;
    var acceleration = new NormalCurve(2, 1.3);

    var panels = heroCanvas.getLayer("default")[0].getObjects();
    var heroAnim = setInterval(function() { 
        var offset = 20 * acceleration.f(msElapsed / 1000.0);
        panels.forEach(function(panel) { 
            panel.y = panel.y - offset; 
            if (allPanelsHaveBeenShown(panels)) {
                setTimeout(function() { showNavBar(); }, 500);
                clearInterval(heroAnim);
            }
        });
        msElapsed = msElapsed + msPerFrame;
        heroCanvas.draw(); 
    }, msPerFrame); 
    hideHeroControls();
}

function allPanelsHaveBeenShown(panels) {
    for(var i = 0; i < panels.length; i++) {
        if (panels[i].y < (-1 * panels.length * heroCanvas.height()))
            return true;
    }
    return false;
}



// INTRO ANIMATION

function createHeroAnimPanelSet(colorOrder) {
    var panels = [];
    var bottomY = 0;
    colorOrder.forEach(function(color) {
        panels.push(createHeroAnimPanel(bottomY, color));
        bottomY = bottomY + panels[panels.length-1].height;
    });
    return panels;
}

function createHeroAnimPanel(y, color) {
    return new Panel(heroCanvas.width(), heroCanvas.height(), 0, y, color);
}

function generateColorOrder() {
    var totalPanels = INITIAL_PANEL_ORDER.length + getNumAddlPanels();
    var colorOrder = INITIAL_PANEL_ORDER;
    getAddlPanelColors(totalPanels, colorOrder);
    return colorOrder;
}

function getNumAddlPanels() {
    return getRandomInt(MIN_ADDL_PANELS, MAX_ADDL_PANELS);
}

function getAddlPanelColors(totalPanels, colorOrder) {
    for(var i = colorOrder.length; i < totalPanels - 1; i++) {
        var availableColors = getAllPermittedColorsExcept(colorOrder[colorOrder.length-1]);
        colorOrder.push(getRandomColor(availableColors));
    }
}
