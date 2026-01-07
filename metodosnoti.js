// Variables globales para la Noticia
let currentNewsUrl = "";
let currentVideoUrl = "";

/**
 * Muestra el modal de detalles de la Noticia y deshabilita el scroll principal.
 * @param {HTMLElement} card - El elemento de la tarjeta de noticia que fue clickeado.
 */
function mostrarDetalleNoticia(card) {
    // 1. Obtener datos y cargar información estática
    const title = card.getAttribute("data-title");
    const source = card.getAttribute("data-director");
    const tags = card.getAttribute("data-genre");
    const description = card.getAttribute("data-sinopsis");

    currentVideoUrl = card.getAttribute("data-trailer-url");
    currentNewsUrl = card.getAttribute("data-movie-url");

    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-director").textContent = source;
    document.getElementById("modal-genre").textContent = tags;
    document.getElementById("modal-sinopsis").textContent = description;

    document.getElementById("modal-trailer-iframe").src = currentVideoUrl;

    // 2. Lógica para el botón
    const btnIrSitio = document.getElementById("btn-ir-sitio");

    if (currentNewsUrl) {
        btnIrSitio.textContent = "IR AL SITIO DE LA NOTICIA";
        btnIrSitio.disabled = false;
        btnIrSitio.classList.remove("disabled-cines");
    } else {
        btnIrSitio.textContent = "SITIO NO DISPONIBLE";
        btnIrSitio.disabled = true;
        btnIrSitio.classList.add("disabled-cines");
    }

    // 3. Mostrar el modal Y OCULTAR EL SCROLL DEL BODY
    document.getElementById("movie-modal").classList.add("is-active");

    // === LÍNEA CRUCIAL PARA DESHABILITAR EL SCROLL PRINCIPAL ===
    document.body.style.overflow = "hidden";
    // ==========================================================

    document.getElementById("trailer-container").style.display = "flex";
}

/**
 * Cierra el modal de detalles de la Noticia y vuelve a habilitar el scroll principal.
 */
function cerrarDetalleNoticia() {
    const modal = document.getElementById("movie-modal");
    const trailerIframe = document.getElementById("modal-trailer-iframe");

    // Pausar el video (vacía el src del iframe para detener la reproducción)
    trailerIframe.src = "";

    // Ocultar el modal
    modal.classList.remove("is-active");

    // === LÍNEA CRUCIAL PARA HABILITAR EL SCROLL PRINCIPAL ===
    document.body.style.overflow = "auto";
    // ========================================================
}

/**
 * Abre la URL de la Noticia en una nueva pestaña.
 */
function abrirSitioNoticia() {
    if (currentNewsUrl) {
        window.open(currentNewsUrl, "_blank");
        cerrarDetalleNoticia();
    } else {
        alert("URL del sitio de noticias no definida.");
    }
}

// -------------------------------------------------------------
// INICIALIZACIÓN: Asegura que los eventos se carguen correctamente
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    // Permitir cerrar al hacer clic fuera del contenido del modal
    document
        .getElementById("movie-modal")
        .addEventListener("click", function (e) {
            // Verifica que el clic sea exactamente sobre el overlay y no el contenido interno
            if (e.target.id === "movie-modal") {
                cerrarDetalleNoticia();
            }
        });
});


// Funciones de compatibilidad (necesarias si el HTML usa estos nombres de función)
function mostrarDetalle(card) {
    mostrarDetalleNoticia(card);
}
function cerrarDetalle() {
    cerrarDetalleNoticia();
}
function abrirPelicula() {
    abrirSitioNoticia();
}