# 🎬 Plataforma de Streaming - Web UI

<!-- ![Vista previa del proyecto](https://via.placeholder.com/800x400?text=Captura+de+Pantalla+del+Proyecto)
*(Nota para Matías: Aquí puedes reemplazar este enlace por una captura real de tu página)* -->

## 📝 Sobre el Proyecto

Esta es una interfaz web dinámica y responsiva para una plataforma de catálogo de series y películas. El proyecto se centra en ofrecer una experiencia de usuario (UX) moderna, similar a las plataformas de streaming actuales (como Netflix o HBO Max), optimizando la presentación visual y la interactividad.

Este repositorio representa una **refactorización y rediseño personal** de un proyecto académico colaborativo original. Se mejoró la arquitectura del código, se optimizó la manipulación del DOM y se rediseñó por completo la interfaz de usuario con CSS moderno.

### 🚀 Demo en Vivo
[🔗 Ver la plataforma funcionando aquí]([https://matiascantoni.github.io/plataforma-streaming/])

---

## ✨ Características Principales

* **Renderizado Dinámico:** Las tarjetas de películas y series se generan dinámicamente mediante JavaScript (`Template Literals`) a partir de una base de datos local (JSON/LocalStorage).
* **Sistema de Filtros en Tiempo Real:** Búsqueda combinada por nombre y filtrado por categorías (Acción, Drama, Comedia, Terror) sin necesidad de recargar la página.
* **Gestión de Favoritos:** Funcionalidad para marcar contenido como favorito (❤), guardando las preferencias del usuario en el `localStorage` para mantener la persistencia de datos.
* **Diseño UI/UX Premium:** * Uso de `CSS Grid` y `Flexbox` para un diseño 100% responsivo (Mobile First).
  * Micro-interacciones (efectos de hover, transiciones suaves, fundidos con `mask-image`).
  * Paleta de colores optimizada para "Modo Oscuro".

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Estilos puros, CSS Grid, Flexbox, variables personalizadas y animaciones sin frameworks.
* **Vanilla JavaScript (ES6+):** Lógica de renderizado, filtrado de arrays (`filter`, `includes`), manejo de eventos (`addEventListener`, delegación de eventos) y uso de `localStorage`.

---

## ⚙️ Instalación y Uso Local

Al ser un proyecto estático puro (Frontend), no requiere de la instalación de dependencias ni servidores complejos de Node.js.

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/MatiasCantoni/plataforma-streaming.git](https://github.com/MatiasCantoni/plataforma-streaming.git)