Template.prototype.graph3DTemplate = () => `
<div class='controls-container'>
    <label for="drawPoints">Нарисовать точки</label>
    <input type='checkbox' id='drawPoints' checked> 
   
    <label for="drawEdges">Нарисовать ребра</label>
    <input type='checkbox' id='drawEdges' checked>
    
    <label for="drawPolygons">Нарисовать полигоны</label>
    <input type='checkbox' id='drawPolygons' checked>

    <select id = 'selectSurface'>
        <option value="cube">Кубик</option>
        <option value="thor">Бублик</option>
        <option value="sphere">Шар</option>
        <option value="ellipsoid">Эллипсоид</option>
        <option value="kleinBottle">Бутылка Клейна</option>
    </select>

    <div>
      <label for 'colorPoints'>Цвет точек</label>
      <input type='color' id='colorPoints'>
      
      <label for 'colorEdges'>Цвет ребер</label>
      <input type='color' id='colorEdges'>
    </div>

    <div>
     <label for="pointsSizeRange">Размер точек</label>
     <input type="range" min="1" max="25" value="2" id="pointsSizeRange">
     <input type="number" min="1" max="25" value="2" id="pointsSizeInput"> px
    </div>

    <div>
     <label for="edgesSizeRange">Размер ребер</label>
     <input type="range" min="1" max="25" value="2" id="edgesSizeRange">
     <input type="number" min="1" max="25" value="2" id="edgesSizeInput"> px
    </div>
</div>
    <canvas id='canvas3D'></canvas>
`;