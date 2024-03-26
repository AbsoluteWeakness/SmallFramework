Template.prototype.graph3DTemplate = () => `
<select id = 'selectSurface'>
        <option value="cube">Кубик</option>
        <option value="thor">Бублик</option>
        <option value="sphere">Шар</option>
        <option value="ellipsoid">Эллипсоид</option>
         <option value='cone'>Конус</option>
        <option value="kleinBottle">Бутылка Клейна</option>
        <option value='hyperbolicCylinder'>Гиперболический цилиндр</option>
        <option value='parabolicCylinder'>Параболический цилиндр</option>
        <option value='ellipticalCylinder'>Эллиптический цилиндр</option>
        <option value='singleLineHyperboloid'>Однополосной гиперболоид</option>
        <option value='twoLineHyperboloid'>Двуполосной гиперболоид</option>
        <option value='ellipticalParaboloid'>Эллиптический параболоид</option>
        <option value='hyperbolicParaboloid'> Гиперболический параболоид</option>
    </select>
<div class = 'result'>
<span id = 'FPS'></span>
<canvas id='canvas3D'></canvas>
</div>
`;