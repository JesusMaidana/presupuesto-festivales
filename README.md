# Presupuesto para Cobertura de Festivales y Muestras 📸🎬

Este repositorio contiene la versión completamente refactorizada, interactiva y con diseño **mobile-first** de la propuesta de presupuesto para coberturas audiovisuales de muestras de danza, teatro y festivales.

## Características de la Refactorización

1. **Diseño Mobile-First y Responsivo**:
   - Se eliminaron las columnas fijas y se reemplazaron con rejillas flexibles adaptadas a dispositivos móviles por defecto.
   - En pantallas pequeñas (móviles) los elementos se apilan en 1 sola columna.
   - En pantallas medianas y grandes (tablets y desktops) las tarjetas de cobertura, plan de pagos e inversión se reorganizan en 2 o 3 columnas mediante consultas de medios (`@media`).
2. **Estética Premium**:
   - **Esquema de colores**: Tonos negros profundos (`#0a0908`), dorados cálidos mate (`#b4895a` y `#c9a26a`) y cremas suaves (`#f7f3eb`), ideales para portafolios artísticos y fílmicos.
   - **Efecto Glassmorphic**: Tarjetas con fondos translúcidos y desenfoque (`backdrop-filter`) combinadas con bordes de luz tenue y sombras suaves al pasar el mouse (`hover`).
   - **Tipografía**: Importación elegante de *Cormorant Garamond* (para títulos y textos itálicos prémium) y *Inter* (para textos técnicos de lectura ágil).
3. **Interactividad Dinámica (JavaScript)**:
   - **Simulador de Reserva Anticipada**: Un interruptor dinámico que permite a Juli (o al cliente) ver el descuento de $250.000 si confirma antes del 10 de julio. Cambia los precios de cuotas e inversión total en tiempo real.
   - **Checklist de Pago Interactiva**: Permite tildar las cuotas simulando su pago, actualizando una barra de progreso porcentual y restando del saldo pendiente acumulado en vivo.
   - **Efecto Scroll Reveal**: Animaciones de desvanecimiento suave (`IntersectionObserver`) que revelan el contenido de forma fluida a medida que el usuario navega hacia abajo.
   - **Confirmación con Confeti y WhatsApp**: Al hacer clic en "Confirmar Propuesta", se abre un modal personalizable. Tras ingresar el nombre, lanza una ráfaga de confeti de celebración e inicia un chat directo de WhatsApp con el mensaje pre-cargado de la reserva y su estado simulado.

---

## Estructura del Proyecto

```bash
├── index.html                           # Página de entrada estándar (refactorizada)
├── presupuesto_cobertura_muestra.html   # Archivo HTML original (refactorizado e idéntico a index.html)
├── css/
│   └── styles.css                       # Diseño mobile-first, variables CSS y animaciones
└── js/
    └── app.js                           # Lógica de simulación, WhatsApp, confeti y scroll
```

---

## Cómo Visualizar Localmente

Simplemente abre el archivo `index.html` o `presupuesto_cobertura_muestra.html` en cualquier navegador web. No se requieren compiladores ni servidores de backend adicionales (funciona con Vanilla HTML/CSS/JS).

Para probar la respuesta móvil:
1. Haz clic derecho y selecciona **Inspeccionar**.
2. Presiona el icono de **Alternar dispositivo móvil** (o `Cmd + Shift + M` en Mac).
3. Selecciona algún teléfono de prueba (como iPhone o Pixel) y observa cómo el contenido se adapta con total fluidez.

---

## Cómo Vincular y Subir a GitHub

Ya hemos inicializado Git en este directorio y vinculado tu repositorio remoto (`https://github.com/JesusMaidana/presupuesto-festivales.git`).

Para subir este código a tu cuenta de GitHub, ejecuta los siguientes comandos en tu terminal:

```bash
# 1. Agregar todos los archivos al área de preparación
git add .

# 2. Hacer el primer commit
git commit -m "Refactorización completa: mobile-first, diseño premium e interactividad"

# 3. Asegurarse de estar en la rama 'main'
git branch -M main

# 4. Empujar el código a tu GitHub
git push -u origin main
```
