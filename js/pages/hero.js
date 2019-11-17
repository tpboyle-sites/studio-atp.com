

// CONSTANTS & SETTINGS

let INITIAL_PANEL_ORDER = ["blue", "cyan", "orange", "pink", "white"];

let MIN_ADDL_PANELS = 1;
let MAX_ADDL_PANELS = 4;


// VARIABLES

var heroCanvas;


// SETUP

function setupHero() {
    heroCanvas = new Canvas("#hero-canvas");
    var heroPanels = createHeroAnimPanelSet(generateColorOrder());
    heroCanvas.addLayer(new Layer("default", 0, heroPanels));
    setupHeroEvents();
    heroCanvas.draw();
}


// EVENTS

function setupHeroEvents() {
    $("#pulldown-btn").click(pullDown);
    $("#close-btn").click(closeHero);
}

function hideHeroControls() {
    $("#pulldown-btn").fadeOut("slow", function() {});
    $("#close-btn").fadeOut("slow", function() {});
}

function closeHero() {
    pullUpAfterHero();
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
                pullUpAfterHero();
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
        if (panels[i].y < ((-1 * panels.length) * heroCanvas.height()))
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
    return INITIAL_PANEL_ORDER;
}

function getNumAddlPanels() {
    return getRandomInt(MIN_ADDL_PANELS, MAX_ADDL_PANELS);
}
