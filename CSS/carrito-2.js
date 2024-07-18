let carrito = [];
let total = 0;


function calcularTotal() {
    total = 0;
    carrito.forEach(curso => {
        total += curso.precio * curso.cantidad;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}


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


    const encontrado = carrito.find(item => item.nombre === curso.nombre);
    if (encontrado) {
        encontrado.cantidad++;
    } else {
        carrito.push(curso);
    }
    

    mostrarCarrito();

    calcularTotal();
}

function eliminarCursoDelCarrito(nombre) {
    carrito = carrito.filter(curso => curso.nombre !== nombre);
    // Mostrar carrito actualizado
    mostrarCarrito();
    // Calcular y mostrar el total
    calcularTotal();
}


function vaciarCarrito() {
    carrito = [];
    // Mostrar carrito vacío
    mostrarCarrito();
    // Reiniciar total
    total = 0;
    document.getElementById('total').textContent = total.toFixed(2);
}


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

document.querySelectorAll('.card a').forEach(enlace => {
    enlace.addEventListener('click', agregarCursoAlCarrito);
});


document.getElementById('lista-carrito').addEventListener('click', e => {
    if (e.target.classList.contains('borrar-curso')) {
        const nombre = e.target.getAttribute('data-nombre');
        eliminarCursoDelCarrito(nombre);
    }
});


document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);


function inicializar() {

    const contenedores = document.querySelectorAll('.card');
    contenedores.forEach(contenedor => {
        contenedor.querySelector('a').addEventListener('click', agregarCursoAlCarrito);
    });
}


inicializar();
