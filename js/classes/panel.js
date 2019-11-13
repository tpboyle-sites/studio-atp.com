

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
        ctx.fillStyle = colors[this.color];
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
