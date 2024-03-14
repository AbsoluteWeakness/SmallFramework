Surfaces.prototype.hyperbolicCylinder = (count = 20, a = 2, b = 2, c = 2) => {
    const points = [];
    const edges = [];
    const polygons = []
    const da = Math.PI*2/ count;
    
    for (let phi = -Math.PI * 2; phi < Math.PI * 2; phi += da) {
        for (let psi = -Math.PI * 2; psi < Math.PI * 2; psi += da) {
            const x = a * Math.cosh(phi) * Math.cos(psi);
            const y = b * Math.sinh(phi);
            const z = c * Math.sinh(psi);

            points.push(new Point(x, y, z));
        }
    }


    for (let i = 0; i < points.length; i++) {
        if (points[i + 1]) {
            if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        } else {
            edges.push(new Edge(i, i % count));
        }


    }


    for (let i = 0; i < points.length; i++) {
        if (points[i + count + 1]) {
            polygons.push(new Polygon([
                i,
                i + 1,
                i + count + 1,
                i + count
            ], '#ffff00'));
        } else if (points[i + 1]) {
            polygons.push(new Polygon([
                i,
                i + 1,
                (i + 1) % count,
                i % count
            ], '#00ff00'));
        }
    }

    return new Surface(points, edges, polygons);
}