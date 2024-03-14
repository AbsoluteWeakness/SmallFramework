// class UI extends Component {
//     constructor({ addFunction, delFunction, setColor, startIntegral, endIntegral, setIntegral, inputZeros }) {
//         this.num = 0;
//         this.addFunction = addFunction;
//         this.delFunction = delFunction;
//         this.setColor = setColor;
//         this.startIntegral = startIntegral;
//         this.endIntegral = endIntegral;
//         this.setIntegral = setIntegral;
//         this.inputZeros = inputZeros;

//         const addButton = document.getElementById('addFunction');
//         addButton.addEventListener('click', () => this.addClickHandler());
//     }

//     addClickHandler() {
//         const input = document.createElement('input');
//         input.setAttribute('placeholder', 'Функция №' + this.num);
//         input.dataset.num = this.num;
//         input.addEventListener('keyup', () => this.keyupHandler());

//         const inputColor = document.createElement('input');
//         inputColor.dataset.num = this.num;
//         inputColor.setAttribute('placeholder', 'Цвет');
//         inputColor.addEventListener('keyup', () => this.setColorHandler());

//         const integralLabel = document.createElement('label');
//         integralLabel.innerHTML = 'Отобразить интеграл';

//         const zerosLabel = document.createElement('label');
//         zerosLabel.innerHTML = 'Отобразить нули функции';

//         const inputZerosCheckbox = document.createElement('input');
//         inputZerosCheckbox.setAttribute('type', 'checkbox');
//         inputZerosCheckbox.dataset.num = this.num;
//         inputZerosCheckbox.addEventListener('change', () => this.inputZerosHandler());

//         const startIntegralInput = document.createElement('input');
//         startIntegralInput.setAttribute('placeholder', 'Начало отрезка');
//         startIntegralInput.addEventListener('keyup', () => this.startIntegralHandler());
//         startIntegralInput.dataset.num = this.num;

//         const endIntegralInput = document.createElement('input');
//         endIntegralInput.setAttribute('placeholder', 'Конец отрезка');
//         endIntegralInput.addEventListener('keyup', () => this.endIntegralHandler());
//         endIntegralInput.dataset.num = this.num;

//         const inputIntegral = document.createElement('input');
//         inputIntegral.setAttribute('type', 'checkbox');
//         inputIntegral.dataset.num = this.num;
//         inputIntegral.addEventListener('change', () => this.inputIntegralHandler());

//         const buttonDel = document.createElement('button');
//         buttonDel.classList.add('del');
//         buttonDel.innerHTML = 'Удалить';
//         buttonDel.addEventListener('click', () => this.deleteFunction(input.dataset.num - 0));

//         const funcInputs = document.getElementById('funcInputs');
//         funcInputs.appendChild(input);
//         funcInputs.appendChild(inputColor);
//         funcInputs.appendChild(buttonDel);
//         funcInputs.appendChild(inputZerosCheckbox);
//         funcInputs.appendChild(zerosLabel);
//         funcInputs.appendChild(startIntegralInput);
//         funcInputs.appendChild(endIntegralInput);
//         funcInputs.appendChild(integralLabel);
//         funcInputs.appendChild(inputIntegral);

//         this.num++;
//     }

//     keyupHandler() {
//         try {
//             let f;
//             eval(`f=function(x){return ${this.value};}`);
//             this.addFunction(f, this.dataset.num - 0);
//         } catch (e) {
//             console.log('Ошибка ввода', e);
//         }
//     }

//     setColorHandler=(event)=> {
//         this.setColor(event.target.value, event.target.dataset.num - 0);
//     }

//     startIntegralHandler() {
//         this.startIntegral(this.value - 0, this.dataset.num - 0);
//     }

//     endIntegralHandler() {
//         this.endIntegral(this.value - 0, this.dataset.num - 0);
//     }

//     inputIntegralHandler() {
//         this.setIntegral(this.checked, this.dataset.num - 0);
//     }

//     inputZerosHandler() {
//         this.inputZeros(this.checked, this.dataset.num - 0);
//     }

//     deleteFunction(num) {
//         this.delFunction(num);
//         const funcInputs = document.getElementById('funcInputs');
//         const input = funcInputs.querySelector(`input[data-num="${num}"]`);
//         const inputColor = funcInputs.querySelector(`input[data-num="${num}"]`);
//         const buttonDel = funcInputs.querySelector(`button[data-num="${num}"]`);
//         const zerosLabel = funcInputs.querySelector(`label[data-num="${num}"]`);
//         const inputZerosCheckbox = funcInputs.querySelector(`input[type="checkbox"][data-num="${num}"]`);
//         const startIntegralInput = funcInputs.querySelector(`input[data-num="${num}"]`);
//         const endIntegralInput = funcInputs.querySelector(`input[data-num="${num}"]`);
//         const integralLabel = funcInputs.querySelector(`label[data-num="${num}"]`);
//         const inputIntegral = funcInputs.querySelector(`input[type="checkbox"][data-num="${num}"]`);

//         funcInputs.removeChild(input);
//         funcInputs.removeChild(inputColor);
//         funcInputs.removeChild(buttonDel);
//         funcInputs.removeChild(zerosLabel);
//         funcInputs.removeChild(inputZerosCheckbox);
//         funcInputs.removeChild(startIntegralInput);
//         funcInputs.removeChild(endIntegralInput);
//         funcInputs.removeChild(integralLabel);
//         funcInputs.removeChild(inputIntegral);
//     }
// }

function UI({ addFunction, delFunction, setColor, startIntegral, endIntegral, setIntegral, inputZeros }) {
    let num = 0;
    document.getElementById('addFunction').addEventListener('click', addClickHandler);

    function addClickHandler() {
        const input = document.createElement('input');
        input.setAttribute('placeholder', 'Функция №' + num);
        input.dataset.num = num;
        input.addEventListener('keyup', keyupHandler);

        const inputColor = document.createElement('input');
        inputColor.dataset.num = num;
        inputColor.setAttribute('placeholder', 'Цвет');
        inputColor.addEventListener('keyup', setColorHandler);

        const integralLable = document.createElement('label');
        integralLable.innerHTML = 'Отобразить интеграл';

        const zerosLable = document.createElement('label');
        zerosLable.innerHTML = 'Отобразить нули функции';

        const inputZerosCheckbox = document.createElement('input');
        inputZerosCheckbox.setAttribute('type', 'checkbox');
        inputZerosCheckbox.dataset.num = num;
        inputZerosCheckbox.addEventListener('change', inputZerosHandler);

        const startIntegralInput = document.createElement('input');
        startIntegralInput.setAttribute('placeholder', 'Начало отрезка');
        startIntegralInput.addEventListener('keyup', startIntegralHandler);
        startIntegralInput.dataset.num = num;

        const endIntegralInput = document.createElement('input');
        endIntegralInput.setAttribute('placeholder', 'Конец отрезка');
        endIntegralInput.addEventListener('keyup', endIntegralHandler);
        endIntegralInput.dataset.num = num;

        const inputIntegral = document.createElement('input');
        inputIntegral.setAttribute('type', 'checkbox');
        inputIntegral.dataset.num = num;
        inputIntegral.addEventListener('change', inputIntegralHandler);

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

        num++;
    }

    function keyupHandler() {
        try {
            let f;
            eval(`f=function(x){return ${this.value};}`);
            addFunction(f, this.dataset.num - 0);
        } catch (e) {
            console.log('Ошибка ввода', e);
        }
    }

    function setColorHandler() {
        setColor(this.value, this.dataset.num - 0);
    }

    function startIntegralHandler() {
        startIntegral(this.value - 0, this.dataset.num - 0);
    }

    function endIntegralHandler() {
        endIntegral(this.value - 0, this.dataset.num - 0);
    }

    function inputIntegralHandler() {
        setIntegral(this.checked, this.dataset.num - 0);
    }

    function inputZerosHandler() {
        inputZeros(this.checked, this.dataset.num - 0)
    }
}
