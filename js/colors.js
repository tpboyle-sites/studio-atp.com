// DEFINITIONS

let colors = {
    "blue": "#0c132a",
    "cyan": "#70c8b9",
    "orange": "#febf10",
    "pink": "#ee4699",
    "white": "#ffffff"
};


// COLORS

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


// RANDOM

function getRandomColor(colorPalette) {
    return colorPalette[getRandomInt(0, colorPalette.length)];
}