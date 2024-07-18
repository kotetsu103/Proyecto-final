const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');


document.querySelectorAll('.agregar-carrito').forEach((boton) => {
    boton.addEventListener('click', agregarProducto);
});


function agregarProducto(evento) {
    evento.preventDefault();
    const boton = evento.target;
    const producto = boton.parentElement;
    const productoSeleccionado = {
        imagen: producto.querySelector('#img-c').src,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('span').textContent,
        id: boton.getAttribute('data-id'),
        cantidad: 1
    };


    const existe = carrito.querySelector(`#producto-${productoSeleccionado.id}`);
    if (existe) {
        const cantidad = existe.querySelector('.cantidad');
        cantidad.value++;
        actualizarTotal();
        return;
    }


    const fila = document.createElement('tr');
    fila.id = `producto-${productoSeleccionado.id}`;
    fila.innerHTML = `
        <td>
            <img src="${productoSeleccionado.imagen}" width="100">
        </td>
        <td>${productoSeleccionado.nombre}</td>
        <td>${productoSeleccionado.precio}</td>
        <td><input type="number" min="1" value="${productoSeleccionado.cantidad}" class="cantidad"></td>
        <td><a href="#" class="borrar-producto">X</a></td>
    `;
    listaCarrito.appendChild(fila);


    fila.querySelector('.cantidad').addEventListener('change', modificarCantidad);

    fila.querySelector('.borrar-producto').addEventListener('click', borrarProducto);


    actualizarTotal();
}


function modificarCantidad(evento) {
    const input = evento.target;
    if (input.value <= 0) {
        input.value = 1;
    }
    actualizarTotal();
}


function borrarProducto(evento) {
    evento.preventDefault();
    const botonBorrar = evento.target;
    const productoId = botonBorrar.parentElement.parentElement.id;
    document.querySelector(`#${productoId}`).remove();
    actualizarTotal();
}


vaciarCarritoBtn.addEventListener('click', () => {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
    actualizarTotal();
});


function actualizarTotal() {
    let total = 0;
    const items = document.querySelectorAll('#lista-carrito tbody tr');
    items.forEach((item) => {
        const precio = parseFloat(item.querySelector('td:nth-child(3)').textContent.replace('$', ''));
        const cantidad = parseInt(item.querySelector('.cantidad').value);
        total += precio * cantidad;
    });
    document.querySelector('#total').textContent = `Total: $${total.toFixed(2)}`;
}