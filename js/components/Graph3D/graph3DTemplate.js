Template.prototype.graph3DTemplate = () => `
    <label for="drawPoints">Нарисовать точки</label>
    <input type='checkbox' id='drawPoints' checked> 
    <label for="drawEdges">Нарисовать ребра</label>
    <input type='checkbox' id='drawEdges' checked>
    <select id = 'selectSurface'>
        <option value="cube">Кубик</option>
        <option value="thor">Бублик</option>
        <option value="sphere">Шар</option>
        <option value="ellipsoid">Эллипсоид</option>
        <option value="kleinBottle">Бутылка Клейна</option>
    </select> 
    <canvas id='canvas3D'></canvas>
`;