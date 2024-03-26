class UI3D extends Component {
    constructor(options) {
        super(options);

        this.drawPoints = true;
        this.drawEdges = true;
        this.drawPolygons = true;

        this.colorPoints = 'black';
        this.colorEdges = 'black';
        this.colorPolygons = 'yellow';

        this.sizePoints = 1;
        this.sizeEdges = 1;

        this.LIGHT = new Light(-40, 15, 0, 1500);
    }

    addEventListeners() {
        document.querySelectorAll('.customSurface').forEach(checkbox => {
            checkbox.addEventListener('click', (event) => {
                this[event.target.dataset.custom] = !!event.target.checked;
            })
        });

        document.getElementById('colorPoints').addEventListener('change', (e) => {
            this.colorPoints = e.target.value;
        });

        document.getElementById('colorEdges').addEventListener('change', (e) => {
            this.colorEdges = e.target.value;
        });

        document.getElementById('colorPolygons').addEventListener('change', (e) => {
            this.colorPolygons = e.target.value
        });

        document.querySelectorAll('.customSizeRange').forEach(input => {
            input.addEventListener('change', (event) => {
                pointsSizeInput.value = pointsSizeRange.value;
                edgesSizeInput.value = edgesSizeRange.value;
                this[event.target.dataset.custom] = event.target.value;
            });
        });

        document.querySelectorAll('.customSizeInput').forEach(input => {
            input.addEventListener('input', (event) => {
                if (event.target.value > 0) {
                    pointsSizeRange.value = pointsSizeInput.value;
                    edgesSizeRange.value = edgesSizeInput.value;
                    this[event.target.dataset.custom] = event.target.value;
                }
            });
        });

        document.getElementById('powerBrightnessRange').addEventListener('change', (e) => {
            this.LIGHT.lumen = e.target.value;
            powerBrightnessInput.value = e.target.value
        });

        document.getElementById('powerBrightnessInput').addEventListener('input', (e) => {
            powerBrightnessRange.value = e.target.value;
            this.LIGHT.lumen = e.target.value
        });
    
    } 
}
