class Graph3D extends Component {
    constructor(options) {
        super(options);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50),
        }
        
        this.graph = new Graph({
            id: 'canvas3D',
            width: 600,
            height: 600,
            WIN:this.WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mousemove: (event) => this.mousemove(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
            }
        });
        this.math3D = new Math3D({ WIN:this.WIN });
        this.surfaces = new Surfaces;
        this.LIGHT = new Light(-40, 15, 0, 1500);
        
        // this.scene = [
        //     this.surfaces.hyperbolicCylinder({}),
        //     this.surfaces.thor({}),
        // ];
        this.scene = this.SolarSystem();

        setInterval(() => {
            this.scene.forEach(surface => surface.doAnimation(this.math3D));
            this.renderScene();
        }, 50);

        this.dx = 0;
        this.dy = 0;
        

        this.canMove = false;
        this.drawPoints = true;
        this.drawEdges = true;
        this.drawPolygons = true;
        
        this.colorPoints = 'black';
        this.colorEdges = 'black';
        this.colorPolygons = {r:255,g:255,b:0};

        this.sizePoints = 1;
        this.sizeEdges = 1;
        
        this.renderScene();
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
            surface.points.forEach(point => this.math3D.transform(matrix, point)));
        this.graph.clear();
        this.renderScene();
    }

    mousemove(event) {
        if (this.canMove) {
            const alpha = Math.PI / 180 / 4;
            const matrix1 = this.math3D.rotateOx((this.dy - event.offsetY) * alpha);
            const matrix2 = this.math3D.rotateOy((this.dx - event.offsetX) * alpha);
            this.scene.forEach(surface => {
                surface.points.forEach(point => {
                    this.math3D.transform(matrix1, point);
                    this.math3D.transform(matrix2, point);
                })
            });
            this.graph.clear();
            this.renderScene();
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;

    }

    addEventListeners() {
        document.getElementById('selectSurface')
            .addEventListener('change', (event) => {
                this.scene = [this.surfaces[event.target.value]({})];
                this.renderScene();
            });
        
        document.querySelectorAll('.customSurface').forEach(checkbox => {
            checkbox.addEventListener('click', (event) => {
                this[event.target.dataset.custom] = !!event.target.checked;
                this.renderScene();
            })
        });
        
        document.getElementById('colorPoints').addEventListener('change', (e) => {
            this.colorPoints = e.target.value;
            this.renderScene();
        });

        document.getElementById('colorEdges').addEventListener('change', (e) => {
                this.colorEdges = e.target.value;
                this.renderScene();
            });
        
        document.getElementById('colorPolygons').addEventListener('change', (e) => {
            const r = parseInt(e.target.value.substring(1, 3), 16);
            const g = parseInt(e.target.value.substring(3, 5), 16);
            const b = parseInt(e.target.value.substring(5, 7), 16);
            const rgb = { r, g, b };
            this.colorPolygons = rgb
            this.renderScene();
            });
        
        document.querySelectorAll('.customSizeRange').forEach(input => {
            input.addEventListener('change', (event) => {
                pointsSizeInput.value = pointsSizeRange.value;
                edgesSizeInput.value = edgesSizeRange.value;
                this[event.target.dataset.custom] = event.target.value;
                this.renderScene();
            });
        });

        document.querySelectorAll('.customSizeInput').forEach(input => {
            input.addEventListener('input', (event) => {
                if (event.target.value > 0) {
                    pointsSizeRange.value = pointsSizeInput.value;
                    edgesSizeRange.value = edgesSizeInput.value;
                    this[event.target.dataset.custom] = event.target.value;
                    this.renderScene();
                }
            });
        });
        
        document.getElementById('powerBrightnessRange').addEventListener('change', (e) => {
            this.LIGHT.lumen = e.target.value;
            powerBrightnessInput.value = e.target.value
            this.renderScene();
        });

        document.getElementById('powerBrightnessInput').addEventListener('input', (e) => {
            powerBrightnessRange.value = e.target.value;
            this.LIGHT.lumen = e.target.value
        });

    }
    SolarSystem() {
        const Earth = this.surfaces.sphere({});
        Earth.addAnimation('rotateOy', 0.1);
        const Moon = this.surfaces.cube({});
        Moon.addAnimation('rotateOx', 0.2);
        Moon.addAnimation('rotateOz', 0.05);
        return [Earth, Moon];
    }

    renderScene() {
        this.graph.clear();
        if (this.drawPolygons) {
            const polygons = [];
            this.scene.forEach((surface, index) => {
                this.math3D.calcDistance(surface, this.WIN.CAMERA, `distance`);
                this.math3D.calcDistance(surface, this.LIGHT, `lumen`);
                surface.polygons.forEach(polygon => {
                    polygon.index = index
                    polygons.push(polygon);
                });
            });

            this.math3D.sortByArtistAlgorithm(polygons);

            polygons.forEach(polygon => {
                polygon.color = this.colorPolygons;
                    const points = polygon.points.map(index => new Point(
                        this.math3D.xs(this.scene[polygon.index].points[index]),
                        this.math3D.ys(this.scene[polygon.index].points[index])
                    )
                    );
                const lumen = this.math3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                let { r, g, b } = polygon.color
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    this.graph.polygon(points, polygon.rgbToHex(r, g, b));

                });
        }

        if (this.drawPoints) {
            this.scene.forEach(surface => {
                surface.points.forEach(point =>
                    this.graph.point(this.math3D.xs(point), this.math3D.ys(point), this.colorPoints, this.sizePoints)
                )
            });
        }
        
        if (this.drawEdges) {
            this.scene.forEach(surface => {
                surface.edges.forEach(edge => {
                    const point1 = surface.points[edge.p1];
                    const point2 = surface.points[edge.p2];
                    this.graph.line(
                        this.math3D.xs(point1), this.math3D.ys(point1),
                        this.math3D.xs(point2), this.math3D.ys(point2), this.colorEdges, this.sizeEdges
                    );
                })
            });
        }
       
    }

}