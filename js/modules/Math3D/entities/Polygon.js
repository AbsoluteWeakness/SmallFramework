class Polygon{
    constructor(points = [], color = '#ff0000') {
        this.points = points; // ссылки на номера точек поверхности 
        this.color = color;
        this.distance = 0;
    }
}
//будут четырехугольники
//Сложность отрисовки полигонов заключается в соблюдении правильного порядка в их рисовании, правильный порядок: сначала задние полигоны потом передние
//Проблема оптимизации, в среднем половина полигонов сцены перекрыты другими полигонами, пользователь их не видит 