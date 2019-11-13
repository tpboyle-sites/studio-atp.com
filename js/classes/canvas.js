class Canvas {
    constructor(idCanvas) {
        this.ctx = $(idCanvas)[0].getContext('2d');
        this.layers = [];
    }

    addLayer(layer) {
        this.layers.push(layer);
        this._sortLayers();
    }

    draw() {
        var ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.layers.forEach(function(layer) {
            layer.draw(ctx);
        });
    }

    getLayer(name) {
        return this.layers.filter(function(layer) { return layer.name == name; })
    }

    width() { return this.ctx.canvas.width; }
    height() { return this.ctx.canvas.height; }

    _sortLayers() {
        this.layers.sort(function(a, b) {
            return a.zIndex - b.zIndex;
        });
    }
}