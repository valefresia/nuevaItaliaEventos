/**
 * Nueva Italia Eventos — script.js
 * Cada función se ocupa de UNA sola cosa (principio de responsabilidad única).
 * Se inicializan todas al final, en initApp().
 */
(function () {
  "use strict";

  /**
   * Escribe el año actual en el footer (#anio).
   * Evita tener que actualizar el copyright a mano cada enero.
   */
  function initAnioFooter() {
    var anio = document.getElementById("anio");
    if (!anio) return;
    anio.textContent = new Date().getFullYear();
  }

  /**
   * Maneja la apertura/cierre del menú mobile a pantalla completa.
   * Usa aria-expanded para accesibilidad y bloquea el scroll del body
   * mientras el menú está abierto.
   */
  function initMenuMobile() {
    var abrirMenu = document.getElementById("abrirMenu");
    var cerrarMenu = document.getElementById("cerrarMenu");
    var menuMobile = document.getElementById("menuMobile");

    if (!abrirMenu || !cerrarMenu || !menuMobile) return;

    function abrir() {
      menuMobile.classList.add("abierto");
      abrirMenu.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function cerrar() {
      menuMobile.classList.remove("abierto");
      abrirMenu.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    abrirMenu.addEventListener("click", abrir);
    cerrarMenu.addEventListener("click", cerrar);

    // Cerrar el menú automáticamente al tocar cualquier link (mejor UX mobile)
    menuMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", cerrar);
    });
  }

  /** Alterna el submenú compacto del encabezado. */
  function initSubmenuNavegacion() {
    var menu = document.querySelector(".nav-mas");
    var boton = document.querySelector(".nav-mas-boton");
    if (!menu || !boton) return;

    function cerrar() {
      menu.classList.remove("abierto");
      boton.setAttribute("aria-expanded", "false");
    }

    boton.addEventListener("click", function () {
      var estaAbierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", String(estaAbierto));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", cerrar);
    });

    document.addEventListener("click", function (evento) {
      if (!menu.contains(evento.target)) cerrar();
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") {
        cerrar();
        boton.focus();
      }
    });
  }

  /**
   * Acordeón de preguntas frecuentes.
   * Solo permite una pregunta abierta a la vez (comportamiento tipo acordeón).
   */
  function initFaqAcordeon() {
    var faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var boton = item.querySelector(".faq-pregunta");
      if (!boton) return;

      boton.addEventListener("click", function () {
        var estaAbierto = item.getAttribute("data-abierto") === "true";

        // Cierra todas las preguntas antes de abrir la que se tocó
        faqItems.forEach(function (otroItem) {
          otroItem.setAttribute("data-abierto", "false");
          var otroBoton = otroItem.querySelector(".faq-pregunta");
          if (otroBoton) otroBoton.setAttribute("aria-expanded", "false");
        });

        if (!estaAbierto) {
          item.setAttribute("data-abierto", "true");
          boton.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /**
   * Animación de aparición al hacer scroll (fade + slide-up).
   * Usa IntersectionObserver; si el navegador no lo soporta,
   * muestra todo directamente sin animar (progressive enhancement).
   */
  function initScrollReveal() {
    var elementos = document.querySelectorAll(".reveal");
    if (!elementos.length) return;

    if (!("IntersectionObserver" in window)) {
      elementos.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elementos.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Punto de entrada: acá se prenden todos los módulos de la página.
   */
  function initApp() {
    initAnioFooter();
    initMenuMobile();
    initSubmenuNavegacion();
    initFaqAcordeon();
    initScrollReveal();
  }

  document.addEventListener("DOMContentLoaded", initApp);
})();
