class Layer {
    constructor(name, zIndex, objects = []) {
        this.name = name;
        this.zIndex = zIndex;
        this.objects = objects;
    }

    addObject(object) {
        this.objects.push(object);
        this.objects.sort(function(a, b) {
            return a.zIndex - b.zIndex;
        });
    }

    draw(ctx) {
        this.objects.forEach(function(object) {
            object.draw(ctx);
        });
    }

    getObjects() {
        return this.objects;
    }
}