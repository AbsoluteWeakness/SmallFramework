class UI {
    constructor({ addFunction, delFunction, setColor, startIntegral, endIntegral, setIntegral, inputZeros }) {
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.setColor = setColor;
        this.startIntegral = startIntegral;
        this.endIntegral = endIntegral;
        this.setIntegral = setIntegral;
        this.inputZeros = inputZeros;
        this.num = 0;
        document.getElementById('addFunction').addEventListener('click', this.addClickHandler);
    }
    addClickHandler() {
    const input = document.createElement('input');
    input.setAttribute('placeholder', 'Функция №' + this.num);
    input.dataset.num =this.num;
    input.addEventListener('keyup', this.keyupHandler);

    const inputColor = document.createElement('input');
    inputColor.dataset.num = this.num;
    inputColor.setAttribute('placeholder', 'Цвет');
    inputColor.addEventListener('keyup', this.setColorHandler);

    const integralLable = document.createElement('label');
    integralLable.innerHTML = 'Отобразить интеграл';

    const zerosLable = document.createElement('label');
    zerosLable.innerHTML = 'Отобразить нули функции';

    const inputZerosCheckbox = document.createElement('input');
    inputZerosCheckbox.setAttribute('type', 'checkbox');
    inputZerosCheckbox.dataset.num =this.num;
    inputZerosCheckbox.addEventListener('change', this.inputZerosHandler);

    const startIntegralInput = document.createElement('input');
    startIntegralInput.setAttribute('placeholder', 'Начало отрезка');
    startIntegralInput.addEventListener('keyup', this.startIntegralHandler);
    startIntegralInput.dataset.num =this.num;

    const endIntegralInput = document.createElement('input');
    endIntegralInput.setAttribute('placeholder', 'Конец отрезка');
    endIntegralInput.addEventListener('keyup', this.endIntegralHandler);
    endIntegralInput.dataset.num =this.num;

    const inputIntegral = document.createElement('input');
    inputIntegral.setAttribute('type', 'checkbox');
    inputIntegral.dataset.num =this.num;
    inputIntegral.addEventListener('change', this.inputIntegralHandler);

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del');
    buttonDel.innerHTML = 'Удалить';
    buttonDel.addEventListener('click', () => {
        delFunction(input.dataset.num - 0);
        funcInputs.removeChild(input);
        funcInputs.removeChild(inputColor);
        funcInputs.removeChild(buttonDel);
        funcInputs.removeChild(zerosLable);
        funcInputs.removeChild(inputZerosCheckbox);
        funcInputs.removeChild(startIntegralInput);
        funcInputs.removeChild(endIntegralInput);
        funcInputs.removeChild(integralLable);
        funcInputs.removeChild(inputIntegral);
    });

    const funcInputs = document.getElementById('funcInputs');
    funcInputs.appendChild(input);
    funcInputs.appendChild(inputColor);
    funcInputs.appendChild(buttonDel);
    funcInputs.appendChild(inputZerosCheckbox);
    funcInputs.appendChild(zerosLable);
    funcInputs.appendChild(startIntegralInput);
    funcInputs.appendChild(endIntegralInput);
    funcInputs.appendChild(integralLable);
    funcInputs.appendChild(inputIntegral);

   this.num++;
}

keyupHandler = () => {
    try {
        let f;
        eval(`f=function(x){return ${this.value};}`);
        addFunction(f, this.dataset.num - 0);
    } catch (e) {
        console.log('Ошибка ввода', e);
    }
}

setColorHandler = () => {
    this.setColor(this.value, this.dataset.num - 0);
}

startIntegralHandler = () => {
    startIntegral(this.value - 0, this.dataset.num - 0);
}

endIntegralHandler = () => {
    endIntegral(this.value - 0, this.dataset.num - 0);
}

inputIntegralHandler = () => {
    setIntegral(this.checked, this.dataset.num - 0);
}

inputZerosHandler = () => {
    inputZeros(this.checked, this.dataset.num - 0)
}
}
// function UI({ addFunction, delFunction, setColor, startIntegral, endIntegral, setIntegral, inputZeros }) {
//     letthis.num = 0;
//     document.getElementById('addFunction').addEventListener('click', addClickHandler);

//     function addClickHandler() {
//         const input = document.createElement('input');
//         input.setAttribute('placeholder', 'Функция №' +this.num);
//         input.dataset.num =this.num;
//         input.addEventListener('keyup', keyupHandler);

//         const inputColor = document.createElement('input');
//         inputColor.dataset.num =this.num;
//         inputColor.setAttribute('placeholder', 'Цвет');
//         inputColor.addEventListener('keyup', setColorHandler);

//         const integralLable = document.createElement('label');
//         integralLable.innerHTML = 'Отобразить интеграл';

//         const zerosLable = document.createElement('label');
//         zerosLable.innerHTML = 'Отобразить нули функции';

//         const inputZerosCheckbox = document.createElement('input');
//         inputZerosCheckbox.setAttribute('type', 'checkbox');
//         inputZerosCheckbox.dataset.num =this.num;
//         inputZerosCheckbox.addEventListener('change', inputZerosHandler);

//         const startIntegralInput = document.createElement('input');
//         startIntegralInput.setAttribute('placeholder', 'Начало отрезка');
//         startIntegralInput.addEventListener('keyup', startIntegralHandler);
//         startIntegralInput.dataset.num =this.num;

//         const endIntegralInput = document.createElement('input');
//         endIntegralInput.setAttribute('placeholder', 'Конец отрезка');
//         endIntegralInput.addEventListener('keyup', endIntegralHandler);
//         endIntegralInput.dataset.num =this.num;

//         const inputIntegral = document.createElement('input');
//         inputIntegral.setAttribute('type', 'checkbox');
//         inputIntegral.dataset.num =this.num;
//         inputIntegral.addEventListener('change', inputIntegralHandler);

//         const buttonDel = document.createElement('button');
//         buttonDel.classList.add('del');
//         buttonDel.innerHTML = 'Удалить';
//         buttonDel.addEventListener('click', () => {
//             delFunction(input.dataset.num - 0);
//             funcInputs.removeChild(input);
//             funcInputs.removeChild(inputColor);
//             funcInputs.removeChild(buttonDel);
//             funcInputs.removeChild(zerosLable);
//             funcInputs.removeChild(inputZerosCheckbox);
//             funcInputs.removeChild(startIntegralInput);
//             funcInputs.removeChild(endIntegralInput);
//             funcInputs.removeChild(integralLable);
//             funcInputs.removeChild(inputIntegral);
//         });

//         const funcInputs = document.getElementById('funcInputs');
//         funcInputs.appendChild(input);
//         funcInputs.appendChild(inputColor);
//         funcInputs.appendChild(buttonDel);
//         funcInputs.appendChild(inputZerosCheckbox);
//         funcInputs.appendChild(zerosLable);
//         funcInputs.appendChild(startIntegralInput);
//         funcInputs.appendChild(endIntegralInput);
//         funcInputs.appendChild(integralLable);
//         funcInputs.appendChild(inputIntegral);

//        this.num++;
//     }

//     function keyupHandler() {
//         try {
//             let f;
//             eval(`f=function(x){return ${this.value};}`);
//             addFunction(f, this.dataset.num - 0);
//         } catch (e) {
//             console.log('Ошибка ввода', e);
//         }
//     }

//     function setColorHandler() {
//         setColor(this.value, this.dataset.num - 0);
//     }

//     function startIntegralHandler() {
//         startIntegral(this.value - 0, this.dataset.num - 0);
//     }

//     function endIntegralHandler() {
//         endIntegral(this.value - 0, this.dataset.num - 0);
//     }

//     function inputIntegralHandler() {
//         setIntegral(this.checked, this.dataset.num - 0);
//     }

//     function inputZerosHandler() {
//         inputZeros(this.checked, this.dataset.num - 0)
//     }
// }
