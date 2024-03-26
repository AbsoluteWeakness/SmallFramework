window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

class Graph3D extends Component {
    constructor(options) {
        super(options);

        this.WIN = {
            LEFT: -12.5,
            BOTTOM: -12.5,
            WIDTH: 25,
            HEIGHT: 25,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50),
        }

        this.graph = new Graph({
            id: 'canvas3D',
            width: 600,
            height: 600,
            WIN: this.WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mousemove: (event) => this.mousemove(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
            }
        });

        this.ui3D = new UI3D({
            id: 'ui3D',
            parent: this.id,
            template: template.ui3DTemplate,
            callbacks: {
                
            }
        });

        this.math3D = new Math3D({ WIN: this.WIN });
        this.surfaces = new Surfaces;
        
        this.scene = this.SolarSystem();

        this.dx = 0;
        this.dy = 0;

        this.canMove = false;

        // setInterval(() => {
        //     this.scene.forEach(surface => surface.doAnimation(this.math3D));
        // }, 50);

        let FPS = 0;
        let countFPS = 0;
        let timestamp = Date.now();

        const renderLoop = () => {
            countFPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                FPS = countFPS;
                countFPS = 0;
                timestamp = currentTimestamp;
            }

            this.renderScene(FPS);
            requestAnimFrame(renderLoop);
        }
        renderLoop();
    }

    addEventListeners() {
        document.getElementById('selectSurface')
            .addEventListener('change', (event) => {
                this.scene = [this.surfaces[event.target.value]({})];
            });
    }

    mouseup() {
        this.canMove = false;
    }

    mousedown() {
        this.canMove = true;
    }

    wheel(event) {
        event.preventDefault();
        const delta = (event.wheelDelta > 0) ? 0.9 : 1.1;
        const matrix = this.math3D.zoom(delta)
        this.scene.forEach(surface =>
            surface.points.forEach(point => this.math3D.transform(matrix, point))
        );
    }

    mousemove(event) {
        if (this.canMove) {
            const alpha = Math.PI / 180 / 4;
            const matrix1 = this.math3D.rotateOx((this.dy - event.offsetY) * alpha);
            const matrix2 = this.math3D.rotateOy((this.dx - event.offsetX) * alpha);
            const matrix = this.math3D.getTransform(matrix1, matrix2);
            this.scene.forEach(surface =>
                surface.points.forEach(point => this.math3D.transform(matrix, point))
            );
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;

    }

    SolarSystem() {
        const Sun = this.surfaces.sphere({ r: 10, color: '#ffcf48' });
        Sun.addAnimation('rotateOy', 0.004);
        
        const Earth = this.surfaces.sphere({ r: 6, color: '#a2653e',x0:18});
        Earth.addAnimation('rotateOy', 0.1);
        Earth.addAnimation('rotateOy', 0.02, Sun.center);
        
        const Moon = this.surfaces.sphere({ r: 3, x0:20,y0: 11, color: '#bdd0e4' });
        Moon.addAnimation('rotateOx', 0.2);
        Moon.addAnimation('rotateOz', 0.02, Earth.center);

        return [Sun,Earth, Moon];
    }

    renderScene(FPS) {
        this.graph.clear();
        document.getElementById('FPS').innerHTML = "FPS: " + FPS
        if (this.ui3D.drawPolygons) {
            const polygons = [];
            this.scene.forEach((surface, index) => {
                this.math3D.calcDistance(surface, this.WIN.CAMERA, `distance`);
                this.math3D.calcDistance(surface, this.ui3D.LIGHT, `lumen`);
                surface.polygons.forEach(polygon => {
                    polygon.index = index
                    polygons.push(polygon);
                });
            });

            this.math3D.sortByArtistAlgorithm(polygons);

            polygons.forEach(polygon => {
                const points = polygon.points.map(index =>
                    new Point(
                        this.math3D.xs(this.scene[polygon.index].points[index]),
                        this.math3D.ys(this.scene[polygon.index].points[index])
                    )
                );
                const lumen = this.math3D.calcIllumination(polygon.lumen, this.ui3D.LIGHT.lumen);
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph.polygon(points, polygon.rgbToHex(r, g, b));
            });
        }

        if (this.ui3D.drawPoints) {
            this.scene.forEach(surface => {
                surface.points.forEach(point =>
                    this.graph.point(this.math3D.xs(point), this.math3D.ys(point), this.ui3D.colorPoints, this.ui3D.sizePoints)
                )
            });
        }

        if (this.ui3D.drawEdges) {
            this.scene.forEach(surface => {
                surface.edges.forEach(edge => {
                    const point1 = surface.points[edge.p1];
                    const point2 = surface.points[edge.p2];
                    this.graph.line(
                        this.math3D.xs(point1), this.math3D.ys(point1),
                        this.math3D.xs(point2), this.math3D.ys(point2), this.ui3D.colorEdges, this.ui3D.sizeEdges
                    );
                })
            });
        }

    }

}