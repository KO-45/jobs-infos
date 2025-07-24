let attempts = 3;
let currentCaptchaAnswer;

// Función para generar un CAPTCHA simple
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 9) + 1; // 1-9 para evitar división por cero
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let question, answer;
    switch(op) {
        case '+':
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
            break;
        case '-':
            answer = num1 - num2;
            question = `${num1} - ${num2} = ?`;
            break;
        case '*':
            answer = num1 * num2;
            question = `${num1} × ${num2} = ?`;
            break;
    }
    
    document.getElementById('captchaQuestion').textContent = question;
    return answer;
}

// Generar el CAPTCHA al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    currentCaptchaAnswer = generateCaptcha();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const attemptsCounter = document.getElementById('attemptsCounter');
    const captchaInput = parseInt(document.getElementById('captchaAnswer').value); // Obtener la respuesta del CAPTCHA

    // Definir ambas expresiones regulares
    const securePasswordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/; // Al menos 8 caracteres y al menos un símbolo especial
    const vulnerablePasswordRegex = /^(?=.{4,})/; // Al menos 4 caracteres, sin requisitos adicionales

    // Obtener el tipo de validación seleccionado
    const validationType = document.getElementById('validationType').value;
    const passwordRegex = validationType === 'vulnerable' ? vulnerablePasswordRegex : securePasswordRegex;

    // Validar las credenciales y el CAPTCHA
    if (username === "admin" && password.match(passwordRegex) && captchaInput === currentCaptchaAnswer) {
        alert("Acceso concedido");
        // Redirigir a la página principal o realizar otra acción
    } else {
        attempts--;
        let errorMsg = "Credenciales incorrectas. ";
        
        if (captchaInput !== currentCaptchaAnswer) {
            errorMsg += "Respuesta CAPTCHA incorrecta. ";
        }
        
        errorMessage.textContent = errorMsg + "Intente de nuevo.";
        attemptsCounter.textContent = `Intentos restantes: ${attempts}`;

        if (attempts === 0) {
            alert("Demasiados intentos. Acceso bloqueado.");
            document.getElementById('loginButton').disabled = true; // Bloquear el botón
        } else {
            currentCaptchaAnswer = generateCaptcha(); // Generar un nuevo CAPTCHA después de un intento fallido
        }
    }
});
