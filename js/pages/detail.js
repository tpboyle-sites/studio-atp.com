

var detailCanvas;


// DETAIL

function setupDetail() {
    detailCanvas = new Canvas("#detail-canvas");
    buildPanels();
    detailCanvas.draw();
}

function buildPanels() {
    var contentColor = getRandomColor(getAllPermittedColors()); 
    var detailContent = new Panel(detailCanvas.width(), detailCanvas.height(), 0, 0, contentColor);
    detailCanvas.addLayer(new Layer("content", 0, [detailContent]));
    var navbarColor = getRandomColor(getAllPermittedColorsExcept(contentColor));
    var detailNavbar = new Panel(detailCanvas.width(), 30, 0, detailCanvas.height(), navbarColor);
    detailCanvas.addLayer(new Layer("navbar", 1, [detailNavbar]));
}

function showNavBar() {
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


