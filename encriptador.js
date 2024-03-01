// Ajuste dinámico de cuadros de texto
function autoAdjustHeight(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight + 10) + 'px';
}
const messageInputLeft = document.getElementById('message-input-left');
const messageInputRight = document.getElementById('message-input-right');

messageInputLeft.addEventListener('input', function() {
    autoAdjustHeight(this);
});
messageInputRight.addEventListener('input', function() {
    autoAdjustHeight(this);
});

// Verificación para ingresar solo en minúsculas, sin caracteres especiales y sin números
messageInputLeft.addEventListener('input', function() {
    const inputValue = this.value;
    const regex = /^[a-z\s\n]*$/;

    if (!regex.test(inputValue)) {
        alert('No se permiten caracteres especiales, y solo debes ingresar letras minúsculas');
        this.value = inputValue.replace(/[^a-z\s\n]/g, '');
    }
});

// Función para encriptar el mensaje
function encriptarMensaje(mensaje) {
    let resultado = '';
    for (let i = 0; i < mensaje.length; i++) {
        let charCode = mensaje.charCodeAt(i);
        // Sustituir cada letra por la siguiente en el alfabeto
        if (charCode >= 97 && charCode <= 122) {
            charCode = ((charCode - 97 + 1) % 26) + 97;
        }
        resultado += String.fromCharCode(charCode);
    }
    return resultado;
}

// Función para desencriptar el mensaje
function desencriptarMensaje(mensajeEncriptado) {
    let resultado = '';
    for (let i = 0; i < mensajeEncriptado.length; i++) {
        let charCode = mensajeEncriptado.charCodeAt(i);
        // Sustituir cada letra por la anterior en el alfabeto
        if (charCode >= 97 && charCode <= 122) {
            charCode = ((charCode - 97 - 1 + 26) % 26) + 97;
        }
        resultado += String.fromCharCode(charCode);
    }
    return resultado;
}

const encryptButton = document.getElementById('encrypt-button');
const decryptButton = document.getElementById('decrypt-button');
const resultDisplay = document.getElementById('resultDisplay');

// Función para manejar el evento de encriptar
function handleEncrypt() {
    const mensaje = messageInputLeft.value.toLowerCase();
    const mensajeEncriptado = encriptarMensaje(mensaje);
    messageInputRight.value = mensajeEncriptado;
}

// Función para manejar el evento de desencriptar
function handleDecrypt() {
    const mensajeEncriptado = messageInputRight.value.toLowerCase();
    const mensajeDesencriptado = desencriptarMensaje(mensajeEncriptado);
    messageInputLeft.value = mensajeDesencriptado;
}

const copyButton = document.getElementById('copy-button');

// Función para copiar el mensaje encriptado
function copyEncryptedMessage() {
    const encryptedMessage = document.getElementById('message-input-right');
    encryptedMessage.select();
    encryptedMessage.setSelectionRange(0, 99999);
    
    try {
        navigator.clipboard.writeText(encryptedMessage.value);
        alert('Mensaje copiado al portapapeles');
    } catch (err) {
        console.error('Error al intentar copiar el texto:', err);
        alert('Ocurrió un error al intentar copiar el mensaje');
    }
}


// Agregar event listeners a los botones
encryptButton.addEventListener('click', handleEncrypt);
decryptButton.addEventListener('click', handleDecrypt);
copyButton.addEventListener('click', copyEncryptedMessage);
