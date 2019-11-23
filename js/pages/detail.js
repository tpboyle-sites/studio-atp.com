

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
        displayContent('pages/home.html');
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
    $("a:contains(About)").click(function() { pullUpNavBarAndDisplayContent("pages/about.html"); });
    $("a:contains(Contact)").click(function() { pullUpNavBarAndDisplayContent("pages/contact.html"); });
}

function pullUpNavBarAndDisplayContent(file) {
    pullUpNavBar();
    displayContent(file);
}

function displayContent(file) {
    if (contentIsVisible())
        $('.content').fadeOut('fast', function() { loadAndRevealContent(file); });
    else
        loadAndRevealContent(file);
}

function loadAndRevealContent(file) {
    var content = $('.content');
    content.load(file);
    setTimeout(function() {
        revealContent();       
    }, 400);
}

function contentIsVisible() {
    return $('.content').css('display') != "none";
}

function revealContent() {
    $('.content .scene').hide();
    $('.content').show();
    var scenes = $('.content .scene');
    revealScenes(scenes);
}


// SCENES

function revealScenes(scenes, prev = null) {
    if (scenes.length == 0)
        return;
    var next = scenes.pop();
    var waitTime = getWaitTime(next);
    setTimeout(function() { 
            transitionScenes(prev, next);
            revealScenes(scenes, next);
        }, 
        waitTime
    );
}

function transitionScenes(prev, next) {
    if (prev)
        $(prev).fadeOut("slow");
    revealSceneElements(next);
}

function revealSceneElements(scene) {
    var elements = $(scene).children();
    $(elements).attr("hidden", "true");
    $(scene).show();
    revealElements(elements);
}


// ELEMENTS

function revealElements(elements) {
    if (elements.length == 0)
        return;
    var next = elements.pop();
    var waitTime = getWaitTime(next);
    setTimeout(function() { 
            revealElement(next);
            revealElements(elements); // follow rest of chain
        }, 
        waitTime
    );
}

function revealElement(e) {
    var parts = $(e).children();
    parts.attr("hidden", "true");
    $(e).show();
    revealParts(parts);
}


// PARTS

function revealParts(parts) {
    $(parts).fadeIn("slow");
    parts.attr("hidden", "false");
}


// UTILITY

function getWaitTime(element) {
    var waitTime = 0;
    if (element.hasAttribute("class")) {
        var classes = $(element).attr('class').split(/\s+/);
        var waitClasses = classes.filter(function(cls) { return cls.match(/^wait-\d+/); });
        var waitClass = waitClasses[0];
        waitTime = parseInt(waitClass.substring(5));
    }
    return waitTime;
}


// JQUERY EXTENTIONS

(function( $ ) {
    $.fn.pop = function() {
        var top = this.get(0);
        this.splice(0,1);
        return top;
    };
})( jQuery );