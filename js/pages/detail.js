

var detailCanvas;


// SETUP

function setupDetail() {
    applyColors(randomizeColors());
    setupDetailEvents();
    $('.content').hide();
}

// COLORS

function randomizeColors() {
    var backgroundColor = getRandomColor(getAllPermittedColors()); 
    var navbarColor = getRandomColor(getAllPermittedColorsExcept(backgroundColor));
    var shadowColor = getRandomColor(getAllPermittedColorsExcept([backgroundColor, navbarColor]));
    return {"background" : backgroundColor, "navbar" : navbarColor, "shadow" : shadowColor};
}

function applyColors(colors) {
    $(".detail > .background").addClass("bg-" + colors['background']);
    $(".detail > .navbar").addClass("bg-" + colors['navbar']);
}

// NAME

function showDetailName() {
    $('.detail .name').fadeIn('medium');
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
    navbar.addClass('background-size');
}

function hideNavBarLinks() {
    $(".detail > .navbar > a").fadeOut("fast", function() {});
}

function afterExpansion() {
    var colorClass = getOldbackgroundColor();
    deleteOldbackground();
    transformOldNavBarTobackground();
    createNavBar(colorClass);
    moveNavBarContents();
    setTimeout(showNavBar, 1); // kludge -- only animates if timed out
}

function getOldbackgroundColor() {
    return getColorClass($(".background"));
}

function deleteOldbackground() {
    $(".detail > .background").remove();
}

function createNavBar(colorClass) {
    $(".detail").append("<div class='navbar navbar-anim float hideBottom " + colorClass + "'></div>");
}

function moveNavBarContents() {
    $(".background").children().clone().appendTo($(".navbar"));
    $(".background").children().remove();
    setupNavBarEvents(); // set up clickies
}

function transformOldNavBarTobackground() {
    var navbar = $('.background-size'); // kludge
    navbar.addClass("background");
    navbar.removeClass("navbar");
}

// EVENTS

function setupDetailEvents() {
    setupNavBarEvents();
}

function setupNavBarEvents() {
    // Content
    $("a:contains(About)").click(function() { displayContent("about.html"); });
    $("a:contains(Contact)").click(function() { displayContent("contact.html"); });
}

function displayContent(file) {
    pullUpNavBar();
    if (contentIsVisible())
        $('.content').fadeOut('fast', function() { loadAndRevealContent(file); });
    else
        loadAndRevealContent(file);
}

function loadAndRevealContent(file) {
    var content = $('.content');
    content.load(file);
    setTimeout(function() {
        content.fadeIn("fast");
    }, 400);
}

function contentIsVisible() {
    return $('.content').css('display') != "none";
}

