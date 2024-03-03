Template.prototype.graph3DTemplate = () => `<label>Нарисовать точки</label> <input type='checkbox' id='drawPoints'> 
<label>Нарисовать ребра</label><input type='checkbox' id='drawEdges'>
<select id = 'selectSurface'>
<option value="">?</option>
<option value="cube">Кубик</option>
<option value="thor">Бублик</option>
<option value="sphere">Шар</option>
<option value="ellispoid">Эллипсоид</option>
</select> 
<canvas id='canvas3D'></canvas>`;