class Graph3D extends Component {
    constructor(options) {
        super(options);
        const WIN = {
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
            WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mousemove: (event) => this.mousemove(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
            }
        });
        this.math3D = new Math3D({ WIN });
        this.surfaces = new Surfaces;
        this.scene = this.surfaces.cube();
        this.dx = 0;
        this.dy = 0;
        this.canMove = false;
        this.drawPoints = true;
        this.drawEdges = true;
        this.drawPolygons = true;
        this.WIN = WIN; 
        this.colorPoints = 'black';
        this.colorEdges = 'black';
        this.sizePoints = 2;
        this.sizeEdges = 2;
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
        this.scene.points.forEach(point => this.math3D.zoom(point, delta));
        this.graph.clear();
        this.renderScene();
    }

    mousemove(event) {
        if (this.canMove) {
            const gradus = Math.PI / 180 / 4;
            this.scene.points.forEach(point => {
                this.math3D.rotateOx(point, (this.dy - event.offsetY) * gradus);
                this.math3D.rotateOy(point, (this.dx - event.offsetX) * gradus);
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
                this.scene = this.surfaces[event.target.value]();
                this.renderScene();
            });

        document.getElementById('drawPoints')
            .addEventListener('click', (event) => {
                this.drawPoints = !!event.target.checked;
                this.renderScene();
            });
        
        document.getElementById('drawEdges')
            .addEventListener('click', (event) => {
                this.drawEdges = !!event.target.checked;
                this.renderScene();
            });
        
        document.getElementById('drawPolygons')
            .addEventListener('click', (event) => {
                this.drawPolygons = !!event.target.checked;
                this.renderScene();
            });
        
        document.getElementById('colorPoints').addEventListener('change', () => {
            this.colorPoints = colorPoints.value;
            
            this.renderScene();
        });

        document.getElementById('colorEdges')
            .addEventListener('change', () => {
            this.colorEdges = colorEdges.value;
           this.renderScene();
        });

        document.getElementById("pointsSizeRange")
            .addEventListener('change', () => {
                pointsSizeInput.value = pointsSizeRange.value;
                this.sizePoints = pointsSizeRange.value;
                this.renderScene();
            });
        
        document.getElementById("pointsSizeInput")
            .addEventListener('input', () => {
                pointsSizeRange.value = pointsSizeInput.value;
                this.sizePoints = pointsSizeInput.value;
                this.renderScene();
            });
        
        document.getElementById("edgesSizeRange")
            .addEventListener('change', () => {
                edgesSizeInput.value = edgesSizeRange.value;
                this.sizeEdges = edgesSizeRange.value;
                this.renderScene();
            });

        document.getElementById("edgesSizeInput")
            .addEventListener('input', () => {
                edgesSizeRange.value = edgesSizeInput.value;
                this.sizeEdges = edgesSizeInput.value;
                this.renderScene();
            });
    }
    
    renderScene() {
        this.graph.clear();
        if (this.drawPoints) {
            this.scene.points.forEach(point =>
                this.graph.point(this.math3D.xs(point), this.math3D.ys(point), this.colorPoints, this.sizePoints )
            );
        }
        if (this.drawEdges) {
            this.scene.edges.forEach(edge => {
                const point1 = this.scene.points[edge.p1];
                const point2 = this.scene.points[edge.p2];
                this.graph.line(
                    this.math3D.xs(point1), this.math3D.ys(point1),
                    this.math3D.xs(point2), this.math3D.ys(point2),this.colorEdges, this.sizeEdges
                );
            });
        }
        if (this.drawPolygons) {
            this.math3D.calcDistance(this.scene, this.WIN.CAMERA, `distance`);
            this.math3D.sortByArtistAlgorithm(this.scene);
            this.scene.polygons.forEach(polygon => {
                const points = polygon.points.map(
                    index => new Point(this.math3D.xs(this.scene.points[index],
                        this.math3D.ys(this.scene.points[index]))));
                this.graph.polygon(points, polygon.color);
            });
        }
    }

}