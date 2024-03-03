class Graph3D extends Component {
    constructor(options) {
        super(options);
        const WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CENTER: new Point(0, 0, -30),
            CAMERA:new Point(0,0,-50),
        }
        this.graph = new Graph({ id: 'canvas3D', width: 600, height: 600, WIN, callbacks:{
            wheel: (event) => this.wheel(event),
            mousemove: (event) => this.mousemove(event),
            mouseup: () => this.mouseup(),
            mousedown:() => this.mousedown(),
        }
        });
        this.dx = 0;
        this.dy = 0;
        this.canMove = false;
        this.math3D = new Math3D({ WIN });
        const surfaces = new Surfaces;
        const selectSurface = document.getElementById('selectSurface');

        selectSurface.addEventListener('change', () => {
            const selectedSurface = selectSurface.value;
            this.graph.clear();
            switch (selectedSurface) {
                case 'cube':
                    this.scene = surfaces.cube();
                    break;
                case 'thor':
                    this.scene = surfaces.thor();
                    break;
                case 'sphere':
                    this.scene = surfaces.sphere();
                    break
                case 'ellispoid':
                    this.scene = surfaces.ellipsoid()
                    break
                default:
                    console.error('Выбранная фигура не распознана');
                    break;
            }
            this.renderScene();
        });
        
        const drawPointsCheckbox = document.getElementById('drawPoints');
        const drawEdgesCheckbox = document.getElementById('drawEdges');

        if (drawPointsCheckbox && drawEdgesCheckbox) {
            drawPointsCheckbox.addEventListener('click', (event) => {
                this.togglePoints(event.target.checked);
            });

            drawEdgesCheckbox.addEventListener('click', (event) => {
                this.toggleEdges(event.target.checked);
            });
        } else {
            console.error('Не удалось найти один из чекбоксов');
        }
    }

    togglePoints(checked) {
        const selectedSurface = selectSurface.value;
        if (selectedSurface === "") {
            drawPoints.checked = false;
            alert("Выберите фигуру в селекте!");
            return;
        }
        if (checked) {
            this.drawPoints();
        } else {
            this.clearGraph();
        }
        
    }

    toggleEdges(checked) {
        const selectedSurface = selectSurface.value;
        if (selectedSurface === "") {
            drawEdges.checked = false;
            alert("Выберите фигуру в селекте!");
            return;
        }
        if (checked) {
            this.drawEdges();
        } else {
            this.clearGraph();
        }
    }
    renderScene() {
        if (drawPoints.checked) {
            this.drawPoints();
        }
        if (drawEdges.checked) {
            this.drawEdges();
        }
    }

    clearGraph() {
        this.graph.clear();
    }

    drawPoints() {
        this.scene.points.forEach(point => this.graph.point(this.math3D.xs(point), this.math3D.ys(point)));
    }

    drawEdges() {
        this.scene.edges.forEach(edge => {
            const point1 = this.scene.points[edge.p1];
            const point2 = this.scene.points[edge.p2];
            this.graph.line(this.math3D.xs(point1), this.math3D.ys(point1), this.math3D.xs(point2), this.math3D.ys(point2));
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
        const delta = (event.wheelDelta > 0) ? -0.3 : 0.3;
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

    
}