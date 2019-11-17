

var detailCanvas;


// SETUP

function setupDetail() {
    applyColors(randomizeColors());
    setupDetailEvents();
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
    $(".detail > .navbar").addClass("bg-" + colors['navbar']);
}

// NAME

function showDetailName() {
    $('.detail > .name').fadeIn('medium');
}


// NAVBAR

function showNavBar() {
    var navbar = $(".detail > .navbar");
    navbar.removeClass("hideBottom");
    navbar.addClass("navbar-size")
    navbar.addClass("float");
    navbar.children().show();
}

// ANIMATION

function pullUpAfterHero() {
    pullUpDetail();
    setTimeout(function() { 
        $(".hero").hide();
        showNavBar();
        showDetailName();
    }, 500);
}

function pullUpNavBar() {
    hideNavBarLinks();
    expandNavBar();
    setTimeout(afterExpansion, 1000);
}

function pullUpDetail() {
    $('.detail').removeClass('hideBottom');
}

function expandNavBar() {
    var navbar = $('.navbar');
    navbar.removeClass('navbar-size');
    navbar.removeClass('float');
    navbar.addClass('content-size');
}

function hideNavBarLinks() {
    $(".detail > .navbar > a").fadeOut("fast", function() {});
}

function afterExpansion() {
    var colorClass = getOldContentsColor();
    deleteOldContent();
    transformOldNavBarToContent();
    createNavBar(colorClass);
    moveNavBarContents();
    setTimeout(showNavBar, 1); // kludge -- only animates if timed out
}

function getOldContentsColor() {
    return getColorClass($(".content"));
}

function deleteOldContent() {
    $(".detail > .content").remove();
}

function createNavBar(colorClass) {
    $(".detail").append("<div class='navbar navbar-anim float hideBottom " + colorClass + "'></div>");
}

function moveNavBarContents() {
    $(".content").children().clone().appendTo($(".navbar"));
    $(".content").children().remove();
    setupNavBarEvents(); // set up clickies
}

function transformOldNavBarToContent() {
    var navbar = $('.content-size'); // kludge
    navbar.addClass("content");
    navbar.removeClass("navbar");
}

// EVENTS

function setupDetailEvents() {
    setupNavBarEvents();
}

function setupNavBarEvents() {
    $(".navbar > a").click(pullUpNavBar);
}

