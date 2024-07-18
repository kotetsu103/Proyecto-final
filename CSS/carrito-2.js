let carrito = [];
let total = 0;

// Función para calcular el total del carrito
function calcularTotal() {
    total = 0;
    carrito.forEach(curso => {
        total += curso.precio * curso.cantidad;
    });
    // Actualizar el total en el HTML
    document.getElementById('total').textContent = total.toFixed(2);
}

// Función para agregar un curso al carrito
function agregarCursoAlCarrito(event) {
    event.preventDefault();
    const card = event.target.parentElement.parentElement;
    const imagen = card.querySelector('img').src;
    const nombre = card.querySelector('h3').textContent;
    const precio = parseFloat(card.querySelector('h3').nextElementSibling.textContent.replace('$', ''));
    const curso = {
        imagen,
        nombre,
        precio,
        cantidad: 1
    };

    // Verificar si el curso ya está en el carrito
    const encontrado = carrito.find(item => item.nombre === curso.nombre);
    if (encontrado) {
        encontrado.cantidad++;
    } else {
        carrito.push(curso);
    }
    
    // Mostrar carrito actualizado
    mostrarCarrito();
    // Calcular y mostrar el total
    calcularTotal();
}

// Función para eliminar un curso del carrito
function eliminarCursoDelCarrito(nombre) {
    carrito = carrito.filter(curso => curso.nombre !== nombre);
    // Mostrar carrito actualizado
    mostrarCarrito();
    // Calcular y mostrar el total
    calcularTotal();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    // Mostrar carrito vacío
    mostrarCarrito();
    // Reiniciar total
    total = 0;
    document.getElementById('total').textContent = total.toFixed(2);
}

// Función para mostrar el carrito en el HTML
function mostrarCarrito() {
    const tbody = document.querySelector('#lista-carrito tbody');
    tbody.innerHTML = '';
    carrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="50"></td>
            <td>${curso.nombre}</td>
            <td>$${curso.precio.toFixed(2)}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-nombre="${curso.nombre}">X</a></td>
        `;
        tbody.appendChild(row);
    });
}

// Eventos

// Evento para agregar un curso al carrito
document.querySelectorAll('.card a').forEach(enlace => {
    enlace.addEventListener('click', agregarCursoAlCarrito);
});

// Evento para eliminar un curso del carrito
document.getElementById('lista-carrito').addEventListener('click', e => {
    if (e.target.classList.contains('borrar-curso')) {
        const nombre = e.target.getAttribute('data-nombre');
        eliminarCursoDelCarrito(nombre);
    }
});

// Evento para vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

// Inicialización de la página
function inicializar() {
    // Cargar los cursos inicialmente
    const contenedores = document.querySelectorAll('.card');
    contenedores.forEach(contenedor => {
        contenedor.querySelector('a').addEventListener('click', agregarCursoAlCarrito);
    });
}

// Inicializar la página
inicializar();