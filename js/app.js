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
    packSelected: false, // Pack deshabilitado por defecto
    earlyBird: false, // Reserva anticipada deshabilitada por defecto
    paidInstallments: [false, false, false] // Estado de simulación de pago para las 3 cuotas
  };

  // Elementos del DOM
  const packToggle = document.getElementById('packToggle');
  const earlyBirdToggle = document.getElementById('earlyBirdToggle');
  
  const individualPriceRow = document.getElementById('individualPriceRow');
  const packPriceRow = document.getElementById('packPriceRow');
  const packPriceValue = document.getElementById('packPriceValue');
  const valueReservaRow = document.getElementById('valueReservaRow');
  const reservaPriceValue = document.getElementById('reservaPriceValue');
  const valueFinal = document.getElementById('valueFinal');
  const finalSavingTag = document.getElementById('finalSavingTag');
  
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

  // Secciones que se ocultan cuando no hay pack seleccionado
  const pricingBenefitsMsg = document.getElementById('pricingBenefitsMsg');
  const paymentPlanSection = document.getElementById('paymentPlanSection');

  // Elementos del Modal de Reserva
  const btnBooking = document.getElementById('btnBooking');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const btnSubmitBooking = document.getElementById('btnSubmitBooking');
  const inputClientName = document.getElementById('clientName');

  // ==========================================================================
  // 1. SIMULADOR DE DESCUENTO (PAQUETE & RESERVA ANTICIPADA)
  // ==========================================================================
  function updatePricingDOM() {
    // Sincronizar clases active de los toggles según el estado actual
    if (packToggle) {
      if (state.packSelected) {
        packToggle.classList.add('active');
      } else {
        packToggle.classList.remove('active');
      }
    }
    if (earlyBirdToggle) {
      if (state.earlyBird) {
        earlyBirdToggle.classList.add('active');
      } else {
        earlyBirdToggle.classList.remove('active');
      }
    }

    if (state.packSelected) {
      // Cruzar / tachar el precio de arriba 1881000
      if (individualPriceRow) {
        individualPriceRow.classList.add('crossed');
      }
      
      // Mostrar y activar filas del paquete
      if (packPriceRow) {
        packPriceRow.classList.remove('crossed');
      }
      
      // Habilitar la tarjeta de Reserva Anticipada
      if (valueReservaRow) {
        valueReservaRow.style.opacity = '1';
        valueReservaRow.style.pointerEvents = 'all';
      }

      // Mostrar sección de plan de pagos y mensaje de beneficios
      if (pricingBenefitsMsg) pricingBenefitsMsg.style.display = '';
      if (paymentPlanSection) paymentPlanSection.style.display = '';

      if (state.earlyBird) {
        // Activar visualmente la fila de Reserva Anticipada
        if (valueReservaRow) {
          valueReservaRow.classList.remove('crossed');
          valueReservaRow.classList.add('highlight');
        }
        
        // Tachar el valor de 1.250.000 del paquete
        if (packPriceValue) {
          packPriceValue.classList.add('strike');
        }
        
        // Destachar el valor de 1.150.000 de Reserva Anticipada
        if (reservaPriceValue) {
          reservaPriceValue.classList.remove('strike');
        }
        
        // Inversión final a $1.150.000
        if (valueFinal) valueFinal.textContent = '$1.150.000';
        totalBalanceLabelEl.textContent = '$1.150.000';
        if (finalSavingTag) {
          finalSavingTag.textContent = 'Mejor Opción';
          finalSavingTag.style.display = 'inline-block';
        }
        
        // Actualizar montos de cuotas en el Plan de Pagos
        cuota1Monto.textContent = '$110.000';
        cuota2Monto.textContent = '$460.000';
        saldoFinalMonto.textContent = '$580.000';
      } else {
        // Desactivar visualmente la fila de Reserva Anticipada (más apagado si no se activó la pastilla)
        if (valueReservaRow) {
          valueReservaRow.classList.add('crossed');
          valueReservaRow.classList.remove('highlight');
        }
        
        // Quitar tachado del valor de 1.250.000 del paquete
        if (packPriceValue) {
          packPriceValue.classList.remove('strike');
        }
        
        // Tachar el valor de 1.150.000 de Reserva Anticipada
        if (reservaPriceValue) {
          reservaPriceValue.classList.add('strike');
        }
        
        // Inversión final sube al precio del paquete regular: $1.250.000
        if (valueFinal) valueFinal.textContent = '$1.250.000';
        totalBalanceLabelEl.textContent = '$1.250.000';
        if (finalSavingTag) {
          finalSavingTag.textContent = 'Ahorro Pack';
          finalSavingTag.style.display = 'inline-block';
        }
        
        // Actualizar montos de cuotas en el Plan de Pagos (Proporción Regular)
        cuota1Monto.textContent = '$125.000';
        cuota2Monto.textContent = '$500.000';
        saldoFinalMonto.textContent = '$625.000';
      }
    } else {
      // Destachar / activar el precio de arriba 1881000
      if (individualPriceRow) {
        individualPriceRow.classList.remove('crossed');
      }
      
      // Cruzar y desactivar filas del paquete
      if (packPriceRow) {
        packPriceRow.classList.add('crossed');
      }
      if (packPriceValue) {
        packPriceValue.classList.add('strike');
      }
      if (valueReservaRow) {
        valueReservaRow.classList.add('crossed');
        valueReservaRow.classList.remove('highlight');
        valueReservaRow.style.opacity = '0.4';
        valueReservaRow.style.pointerEvents = 'none';
      }
      if (reservaPriceValue) {
        reservaPriceValue.classList.add('strike');
      }
      
      // Forzar apagar el toggle de Reserva Anticipada visualmente
      state.earlyBird = false;
      
      // Inversión final es el precio regular de jornadas individuales: $1.881.000
      if (valueFinal) valueFinal.textContent = '$1.881.000';
      totalBalanceLabelEl.textContent = '$1.881.000';
      if (finalSavingTag) {
        finalSavingTag.style.display = 'none';
      }
      
      // Actualizar montos de cuotas en el Plan de Pagos
      cuota1Monto.textContent = '$188.100';
      cuota2Monto.textContent = '$752.400';
      saldoFinalMonto.textContent = '$940.500';

      // Ocultar sección de plan de pagos y beneficios
      if (pricingBenefitsMsg) pricingBenefitsMsg.style.display = 'none';
      if (paymentPlanSection) paymentPlanSection.style.display = 'none';
    }

    // Re-calcular el saldo restante con los nuevos montos
    calculateRemainingBalance();
  }

  if (packPriceRow) {
    packPriceRow.addEventListener('click', (e) => {
      state.packSelected = !state.packSelected;
      
      // Efecto de transición sutil
      if (valueFinal) {
        valueFinal.style.transform = 'scale(0.95)';
        setTimeout(() => {
          updatePricingDOM();
          valueFinal.style.transform = 'scale(1)';
        }, 150);
      } else {
        updatePricingDOM();
      }
    });
  }

  if (valueReservaRow) {
    valueReservaRow.addEventListener('click', (e) => {
      if (!state.packSelected) return; // No hacer nada si el pack no está seleccionado
      
      state.earlyBird = !state.earlyBird;
      
      // Efecto de transición sutil
      if (valueFinal) {
        valueFinal.style.transform = 'scale(0.95)';
        setTimeout(() => {
          updatePricingDOM();
          valueFinal.style.transform = 'scale(1)';
        }, 150);
      } else {
        updatePricingDOM();
      }
    });
  }

  // ==========================================================================
  // 2. CHECKLIST DE PAGOS & PROGRESO
  // ==========================================================================
  function calculateRemainingBalance() {
    let total = 1881000;
    if (state.packSelected) {
      total = state.earlyBird ? 1150000 : 1250000;
    }
    
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
      let optionText = '';
      if (state.packSelected) {
        optionText = state.earlyBird 
          ? 'Paquete 3 Jornadas + Reserva Anticipada ($1.150.000)' 
          : 'Paquete de 3 Jornadas ($1.250.000)';
      } else {
        optionText = 'Cobertura por Jornada Individual ($1.881.000)';
      }
      
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
