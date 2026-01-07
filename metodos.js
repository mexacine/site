let currentMovieUrl = '';
let currentTrailerUrl = '';

/**
 * Muestra el modal de detalles de la película.
 * @param {HTMLElement} card - El elemento de la tarjeta de película que fue clickeado.
 */
function mostrarDetalle(card) {
    // 1. Obtener datos
    const title = card.getAttribute('data-title');
    const year = card.getAttribute('data-year');
    const director = card.getAttribute('data-director');
    const genre = card.getAttribute('data-genre');
    const sinopsis = card.getAttribute('data-sinopsis');

    // 2. Guardar URLs globales
    // Nota: Se usa la URL del 'data-movie-url' tal cual para abrir la pestaña
    currentTrailerUrl = card.getAttribute('data-trailer-url') + '?mute=0&controls=0';
    currentMovieUrl = card.getAttribute('data-movie-url');

    // 3. Cargar información estática y el tráiler
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-year').textContent = year;
    document.getElementById('modal-director').textContent = director;
    document.getElementById('modal-genre').textContent = genre;
    document.getElementById('modal-sinopsis').textContent = sinopsis;

    document.getElementById('modal-trailer-iframe').src = currentTrailerUrl;

    
    // ...
    // 5. a. Lógica para el botón 'Ver Película'
        // Desactivar el botón y cambiar texto/estilo
         // Clase para estilos
     
    
    // Obtener la referencia al botón de acción
const btnVerPelicula = document.getElementById('btn-ver-pelicula');

// 5. a. Lógica para el botón 'Ver Película' usando if/else if
if (currentMovieUrl === 'SOLO EN CINES') {
    // Caso especial: No está disponible en casa
    btnVerPelicula.textContent = 'SOLO EN CINES ';
    btnVerPelicula.disabled = true;
    btnVerPelicula.classList.add('disabled-cines');
    // Nota: Aquí data-movie-url debe ser "SOLO EN CINES"

} else if (currentMovieUrl.includes('primevideo.com') || currentMovieUrl === 'amazon') { 
    // Si la URL contiene el dominio o es el marcador 'amazon'
    btnVerPelicula.textContent = 'DISPONIBLE EN PRIME VIDEO ';
    btnVerPelicula.disabled = false; // HABILITADO
    btnVerPelicula.classList.remove('disabled-cines'); 
    // Habilitado, no necesita estilo de deshabilitado

} else if (currentMovieUrl.includes('mubi.com') ) { 
    // Si la URL contiene el dominio o es el marcador 'amazon'
    btnVerPelicula.textContent = 'DISPONIBLE EN MUBI';
    btnVerPelicula.disabled = false; // HABILITADO
    btnVerPelicula.classList.remove('disabled-cines');  

    
} else if (currentMovieUrl.includes('netflix.com') || currentMovieUrl === 'netflix') {
    btnVerPelicula.textContent = 'DISPONIBLE EN NETFLIX ';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');

} else if (currentMovieUrl.includes('max.com') || currentMovieUrl === 'hbo') {
    btnVerPelicula.textContent = 'DISPONIBLE EN HBO MAX ';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');
    
} else if (currentMovieUrl.includes('disneyplus.com') || currentMovieUrl === 'disney') {
    btnVerPelicula.textContent = 'DISPONIBLE EN DISNEY+ ';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');

} else if (currentMovieUrl === 'NO') {
    // Si es una URL de YouTube válida o cualquier otra URL (el caso genérico de streaming)
    btnVerPelicula.textContent = 'PELICULA NO DISPONIBLE';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');

} else {
   
    btnVerPelicula.textContent = 'VER PELÍCULA';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');
}
    // 4. Mostrar el modal
    document.getElementById('movie-modal').classList.add('is-active');
    //document.body.style.overflow = 'hidden';

    // 5. Ocultar la vista del player que no se usa, asegurando que solo el tráiler se vea
    document.getElementById('movie-player-container').style.display = 'none';
    document.getElementById('trailer-container').style.display = 'flex';
}

function cerrarDetalle() {
    const modal = document.getElementById('movie-modal');
    const trailerIframe = document.getElementById('modal-trailer-iframe');

    // Pausar el tráiler
    trailerIframe.src = '';

    // Ocultar el modal
    modal.classList.remove('is-active');

    // Habilitar el scroll del body principal
    // document.body.style.overflow = 'auto';
}

// Función NUEVA: Abrir la URL de la película en una nueva pestaña
function abrirPelicula() {
    // Se asume que el data-movie-url contiene una URL de YouTube que se puede abrir

    if (currentMovieUrl === 'SOLO EN CINES') {
        alert('Esta película se encuentra SOLO EN CINES actualmente.');
        return;}
    if (currentMovieUrl) {
        // Abre el enlace en una nueva pestaña
        window.open(currentMovieUrl, '_blank');

        // Opcional: Cerrar el modal
        cerrarDetalle();
        
    } else {
        alert('Lo sentimos, aun no esta disponible la pelicula completa :´(');
    }
}

// Permitir cerrar al hacer clic fuera del contenido
document.getElementById('movie-modal').addEventListener('click', function (e) {
    if (e.target.id === 'movie-modal') {
        cerrarDetalle();
    }
})


;