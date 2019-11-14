

var detailCanvas;


// SETUP

function setupDetail() {
    applyColors(randomizeColors());
}

// COLORS

function randomizeColors() {
    var contentColor = getRandomColor(getAllPermittedColors()); 
    var navbarColor = getRandomColor(getAllPermittedColorsExcept(contentColor));
    var shadowColor = getRandomColor(getAllPermittedColorsExcept([contentColor, navbarColor]));
    return {"content" : contentColor, "navbar" : navbarColor, "shadow" : shadowColor};
}

function applyColors(colors) {
    $(".detail > .content").addClass("bg-" + colors['content']);
    $(".detail > .navbar > .display").addClass("bg-" + colors['navbar']);
    $(".detail > .navbar > .shadow").addClass("bg-" + colors['shadow']);
}


// ANIMATION

function showNavBar() {}


function showNavBarAnim() {
    var msTotal = 1000.0;
    var msPerFrame = 20;
    var numFrames = msTotal / msPerFrame;

    var msElapsed = 0;

    var speedMult = 2;
    var yStart = detailCanvas.height();
    var yEnd = detailCanvas.height() - 20;
    var yTotalDelta = yStart - yEnd;
    var yCurrentDelta = 2;

    var navbar = detailCanvas.getLayer("navbar")[0].getObjects()[0];
    var navbarAnim = setInterval(
        function() { 
            var offset = speedMult * EasingFunctions.linear(yCurrentDelta / yTotalDelta);
            navbar.y = navbar.y - offset; 
            yCurrentDelta = yCurrentDelta + offset;
            if (yCurrentDelta >= yTotalDelta) {
                clearInterval(navbarAnim);
            }
            msElapsed = msElapsed + msPerFrame;
            detailCanvas.draw(); 
        }, 
        msPerFrame
    ); 
}


