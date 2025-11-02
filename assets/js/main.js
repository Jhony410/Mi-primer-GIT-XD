// Funcionalidad principal del sitio

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar cálculo de cotizaciones
    initOrderForm();
    
    // Animaciones de scroll suave para enlaces internos
    initSmoothScroll();
});

function initOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Recoger datos del formulario
        const formData = new FormData(orderForm);
        const orderData = Object.fromEntries(formData.entries());
        
        // Aquí iría la lógica para enviar el pedido
        try {
            // Simular envío (reemplazar con llamada real al backend)
            await simulateOrderSubmission(orderData);
            
            // Mostrar mensaje de éxito
            showMessage('¡Pedido recibido! Te contactaremos pronto.', 'success');
            orderForm.reset();
        } catch (error) {
            showMessage('Error al enviar el pedido. Por favor, intenta de nuevo.', 'error');
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Simulación de envío de pedido (reemplazar con API real)
async function simulateOrderSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Pedido recibido:', data);
            resolve({ success: true });
        }, 1000);
    });
}

// Calculadora de presupuesto
function calculateEstimate(type, quantity, options = {}) {
    let basePrice = 0;
    
    switch(type) {
        case 'flyers':
            basePrice = quantity * 0.15; // Precio por unidad
            if (options.color) basePrice *= 1.5;
            if (options.doubleSided) basePrice *= 1.3;
            break;
            
        case 'business-cards':
            basePrice = quantity * 0.10;
            if (options.premium) basePrice *= 2;
            break;
            
        case 'books':
            basePrice = quantity * (options.pages * 0.05);
            if (options.hardcover) basePrice *= 1.5;
            break;
    }
    
    return basePrice;
}

// Validación de formularios
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            markInvalid(input, 'Este campo es requerido');
            isValid = false;
        } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            markInvalid(input, 'Email inválido');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function markInvalid(input, message) {
    input.classList.add('invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    
    // Limpiar error cuando el usuario corrija
    input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.remove();
    }, { once: true });
}