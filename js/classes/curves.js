

class NormalCurve {
    constructor(mean, stdDev) {
        this.mean = mean;
        this.stdDev = stdDev;
    }

    f(x) {
        var ePower = Math.pow(Math.E, (-1 * Math.pow((x - this.mean), 2) / (2 * Math.pow(this.stdDev, 2))));
        var coeff = 1 / (this.stdDev * Math.sqrt(2 * Math.PI))
        return coeff * ePower;
    }
}

