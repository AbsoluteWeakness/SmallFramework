Surfaces.prototype.thor = (count = 20, R = 10,r=5) => {
    const points = [];
    const edges = [];
    const da = Math.PI * 2 / count;
    for (let phi = 0; phi < Math.PI * 2; phi += da) { //psi => -Pi ... Pi //phi => 0 ... 2Pi
        for (let psi = -Math.PI; psi < Math.PI; psi += da) {
            const x = (R + r * Math.cos(psi)) * Math.cos(phi);
            const y = (R + r * Math.cos(psi)) * Math.sin(phi);
            const z = r * Math.sin(psi);
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

    return new Surface(points, edges);
}