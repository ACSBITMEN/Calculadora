// Variables globales para almacenar la expresión actual y la última expresión evaluada
let expression = '';
let lastExpression = '';

// Referencias a los elementos del DOM
const displayElement = document.getElementById('display');
const historyElement = document.getElementById('history');

// Operadores permitidos
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
 * Función para alternar entre modos claro y oscuro.
 */
function toggleTheme() {
    const calculator = document.getElementById('calculator');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Alternar la clase 'dark-mode' en el contenedor de la calculadora
    calculator.classList.toggle('dark-mode');

    // Cambiar el texto del botón según el tema actual
    themeToggleBtn.innerText = calculator.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
}

// Event Listener para el botón de cambio de tema
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
