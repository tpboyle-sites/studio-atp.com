

// DOCUMENT READY

$(function () { setup(); });


// SETUP

function setup() {
    setupDetail();
    setupHero();
}


// UTILITY

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max));
}


