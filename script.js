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
    // Evitar agregar operadores al inicio de la expresión
    if (expression === '' && operators.includes(value)) return;

    // Evitar operadores consecutivos
    if (operators.includes(value) && operators.includes(expression.slice(-1))) {
        // Reemplazar el operador anterior por el nuevo
        expression = expression.slice(0, -1) + value;
    } else {
        // Agregar el valor a la expresión
        expression += value;
    }

    // Actualizar el display con la expresión actualizada
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
    // Verificar si la expresión está vacía
    if (expression === '') {
        // No hay nada que calcular
        return;
    }

    // Verificar si la expresión termina con un operador
    if (operators.includes(expression.slice(-1))) {
        // No hacer nada si la expresión termina con un operador
        return;
    }

    try {
        // Evaluar la expresión matemática
        const result = eval(expression);

        // Actualizar el historial con la expresión
        lastExpression = expression + ' = ';
        historyElement.innerText = lastExpression;

        // Actualizar la expresión actual con el resultado obtenido
        expression = result.toString();
        displayElement.innerText = expression;

    } catch (error) {
        // Mostrar mensaje de error y reiniciar la expresión
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

    // Lista de teclas permitidas
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Delete'];

    // Si la tecla presionada está permitida
    if (allowedKeys.includes(key)) {
        event.preventDefault(); // Prevenir acciones predeterminadas del navegador

        if (key >= '0' && key <= '9') {
            // Agregar el número a la expresión
            appendValue(key);
        } else if (operators.includes(key)) {
            // Agregar el operador a la expresión
            appendValue(key);
        } else if (key === '.') {
            // Agregar el punto decimal a la expresión
            appendValue(key);
        } else if (key === 'Enter') {
            // Calcular el resultado de la expresión
            calculate();
        } else if (key === 'Backspace') {
            // Eliminar el último dígito de la expresión
            deleteLastDigit();
        } else if (key === 'Delete') {
            // Limpiar la expresión y el historial
            clearDisplay();
        }
    }
}
