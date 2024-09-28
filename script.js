// Variables globales para almacenar la expresión actual y la última expresión evaluada
let expression = '';
let lastExpression = '';

// Referencias a los elementos del DOM
const displayElement = document.getElementById('display');
const historyElement = document.getElementById('history');

// Operadores permitidos (faltante %)
const operators = ['+', '-', '*', '/'];

/**
 * Función para agregar un valor (número u operador) a la expresión actual.
 * @param {string} value - El valor a agregar a la expresión.
 */
function appendValue(value) {
    // Evitar operadores al inicio de la expresión o consecutivos
    if ((expression === '' && operators.includes(value)) || 
        (operators.includes(value) && operators.includes(expression.slice(-1)))) {
        return;
    }
    expression += value;
    updateDisplay();
}

/**
 * Función para actualizar el contenido del display con la expresión actual.
 */
function updateDisplay() {
    displayElement.innerText = expression;
}

/**
 * Función para limpiar la expresión actual y el historial.
 */
function clearDisplay() {
    expression = '';
    lastExpression = '';
    displayElement.innerText = '';
    historyElement.innerText = '';
}

/**
 * Función para eliminar el último carácter de la expresión actual.
 */
function deleteLastDigit() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

/**
 * Función para evaluar la expresión actual y mostrar el resultado.
 */
function calculate() {
    if (expression === '' || operators.includes(expression.slice(-1))) return;

    try {
        // Evaluar la expresión matemática de manera segura
        const result = new Function('return ' + expression)();

        // Actualizar el historial y el display
        lastExpression = `${expression} =`;
        historyElement.innerText = lastExpression;
        expression = result.toString();
        updateDisplay();
    } catch {
        displayElement.innerText = 'Error';
        expression = '';
    }
}

/**
 * Event Listener para capturar eventos de teclado y manejar la entrada del usuario.
 */
document.addEventListener('keydown', handleKeyPress);

/**
 * Función para manejar la entrada del teclado y realizar las acciones correspondientes.
 * @param {KeyboardEvent} event - El evento de teclado.
 */
function handleKeyPress(event) {
    const key = event.key;

    // Si la tecla presionada está permitida
    if (/^[0-9+\-*/.]$/.test(key)) {
        appendValue(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLastDigit();
    } else if (key === 'Delete') {
        clearDisplay();
    }
}

/**
 * Función para alternar entre modos claro y oscuro. temas
 */
function toggleTheme() {
    const calculator = document.getElementById('calculator');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const svgIcon = themeToggleBtn.querySelector('svg');
    const textSpan = themeToggleBtn.querySelector('span');

    // Alternar la clase 'dark-mode' en el contenedor de la calculadora
    calculator.classList.toggle('dark-mode');

    // Cambiar el ícono y el texto según el tema actual
    if (calculator.classList.contains('dark-mode')) {
        svgIcon.innerHTML = `
            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
        `;
        textSpan.innerText = 'Dark';
    } else {
        svgIcon.innerHTML = `
            <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
        `;
        textSpan.innerText = 'Claro';
    }
}

// Event Listener para el botón de cambio de tema
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
