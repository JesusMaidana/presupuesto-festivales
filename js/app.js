/**
 * Presupuesto Cobertura Muestra - Interacciones Dinámicas
 * Autor: Antigravity AI
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración del Desarrollador / Contacto
  const CONFIG = {
    whatsappNumber: '5491162458428', // Número de WhatsApp para recibir confirmaciones
    defaultName: 'Juli'
  };

  // Estado del simulador
  let state = {
    earlyBird: true, // Reserva anticipada activa por defecto
    paidInstallments: [false, false, false] // Estado de simulación de pago para las 3 cuotas
  };

  // Elementos del DOM
  const earlyBirdToggle = document.getElementById('earlyBirdToggle');
  const valueReservaRow = document.getElementById('valueReservaRow');
  const valueFinal = document.getElementById('valueFinal');
  
  // Elementos de Cuotas
  const cuota1Monto = document.getElementById('cuota1Monto');
  const cuota2Monto = document.getElementById('cuota2Monto');
  const saldoFinalMonto = document.getElementById('saldoFinalMonto');
  const remainingBalanceEl = document.getElementById('remainingBalance');
  const totalBalanceLabelEl = document.getElementById('totalBalanceLabel');
  
  // Elementos de Barra de Progreso
  const progressFill = document.getElementById('progressFill');
  const progressPercentText = document.getElementById('progressPercentText');
  const paymentCheckboxes = document.querySelectorAll('.payment-checkbox');
  const planCards = document.querySelectorAll('.plan-card');

  // Elementos del Modal de Reserva
  const btnBooking = document.getElementById('btnBooking');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const btnSubmitBooking = document.getElementById('btnSubmitBooking');
  const inputClientName = document.getElementById('clientName');

  // ==========================================================================
  // 1. SIMULADOR DE DESCUENTO (RESERVA ANTICIPADA)
  // ==========================================================================
  function updatePricingDOM() {
    if (state.earlyBird) {
      // Activar visualmente la fila de Reserva Anticipada
      valueReservaRow.classList.remove('crossed');
      valueReservaRow.classList.add('highlight');
      
      // Inversión final a $1.000.000
      valueFinal.textContent = '$1.000.000';
      totalBalanceLabelEl.textContent = '$1.000.000';
      
      // Actualizar montos de cuotas en el Plan de Pagos
      cuota1Monto.textContent = '$100.000';
      cuota2Monto.textContent = '$400.000';
      saldoFinalMonto.textContent = '$500.000';
    } else {
      // Desactivar visualmente la fila de Reserva Anticipada
      valueReservaRow.classList.add('crossed');
      valueReservaRow.classList.remove('highlight');
      
      // Inversión final sube al precio del paquete regular: $1.250.000
      valueFinal.textContent = '$1.250.000';
      totalBalanceLabelEl.textContent = '$1.250.000';
      
      // Actualizar montos de cuotas en el Plan de Pagos (Proporción Regular)
      cuota1Monto.textContent = '$125.000';
      cuota2Monto.textContent = '$500.000';
      saldoFinalMonto.textContent = '$625.000';
    }

    // Re-calcular el saldo restante con los nuevos montos
    calculateRemainingBalance();
  }

  if (earlyBirdToggle) {
    earlyBirdToggle.addEventListener('click', () => {
      state.earlyBird = !state.earlyBird;
      
      // Alternar clases visuales del switch
      const container = earlyBirdToggle.closest('.pricing-toggle-container');
      if (state.earlyBird) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
      }
      
      // Efecto de transición sutil
      valueFinal.style.transform = 'scale(0.95)';
      setTimeout(() => {
        updatePricingDOM();
        valueFinal.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // ==========================================================================
  // 2. CHECKLIST DE PAGOS & PROGRESO
  // ==========================================================================
  function calculateRemainingBalance() {
    const total = state.earlyBird ? 1000000 : 1250000;
    
    // Obtener los valores de cada cuota actuales del DOM
    const parseVal = (str) => parseInt(str.replace(/[^0-9]/g, ''), 10);
    const val1 = parseVal(cuota1Monto.textContent);
    const val2 = parseVal(cuota2Monto.textContent);
    const val3 = parseVal(saldoFinalMonto.textContent);
    
    let paidAmount = 0;
    let checkedCount = 0;

    paymentCheckboxes.forEach((checkbox, index) => {
      const isChecked = checkbox.checked;
      state.paidInstallments[index] = isChecked;
      
      const card = planCards[index];
      if (isChecked) {
        card.classList.add('completed');
        checkedCount++;
        if (index === 0) paidAmount += val1;
        if (index === 1) paidAmount += val2;
        if (index === 2) paidAmount += val3;
      } else {
        card.classList.remove('completed');
      }
    });

    // Calcular restante
    const remaining = total - paidAmount;
    remainingBalanceEl.textContent = `$${remaining.toLocaleString('es-AR')}`;

    // Actualizar barra de progreso
    const progressPercent = Math.round((checkedCount / 3) * 100);
    progressFill.style.width = `${progressPercent}%`;
    progressPercentText.textContent = `${progressPercent}% pagado`;
  }

  paymentCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      calculateRemainingBalance();
    });
  });

  // ==========================================================================
  // 3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Dejar de observar una vez revelado
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de entrar completo
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores antiguos
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // 4. MODAL & CONFIRMAR RESERVA (WHATSAPP + CONFETTI)
  // ==========================================================================
  function openModal() {
    modalOverlay.classList.add('active');
    inputClientName.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  if (btnBooking) {
    btnBooking.addEventListener('click', openModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Cerrar al hacer clic fuera del modal
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Procesar reserva
  if (btnSubmitBooking) {
    btnSubmitBooking.addEventListener('click', () => {
      const name = inputClientName.value.trim() || CONFIG.defaultName;
      const optionText = state.earlyBird 
        ? 'Reserva Anticipada (Inversión Congelada a $1.000.000)' 
        : 'Paquete de 3 Jornadas ($1.250.000)';
      
      const cuotasTexto = state.paidInstallments.map((paid, i) => {
        const cuotaN = i + 1;
        return `Cuota ${cuotaN}: ${paid ? 'Simulado Pago' : 'Pendiente'}`;
      }).join(', ');

      // Lanzar confeti si está disponible la librería CDN
      if (typeof confetti === 'function') {
        // Ráfaga 1
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Ráfaga 2 lateral después de un instante
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 250);
      }

      // Desactivar botón temporalmente
      btnSubmitBooking.disabled = true;
      btnSubmitBooking.textContent = 'Enviando...';

      // Construir mensaje de WhatsApp
      const mensaje = `Hola! Soy ${name}. Acabo de revisar la propuesta interactiva de cobertura para la muestra del festival 📸.
      
Quiero confirmar la reserva en la modalidad: *${optionText}*.
${state.paidInstallments.some(p => p) ? `(Simulación de pagos: ${cuotasTexto})` : ''}

¿Me pasás los datos para realizar la transferencia de la seña? ¡Muchas gracias!`;

      const whatsappURL = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodeURIComponent(mensaje)}`;
      
      // Abrir en nueva ventana tras breve delay para la animación
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        closeModal();
        // Resetear botón
        btnSubmitBooking.disabled = false;
        btnSubmitBooking.textContent = 'Confirmar y Enviar por WhatsApp';
      }, 1000);
    });
  }

  // Inicializar vista de precios
  updatePricingDOM();
});
