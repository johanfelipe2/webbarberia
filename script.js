// ======== VARIABLES GLOBALES ========
const botonesAgregar = document.querySelectorAll(".agregar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const botonPagar = document.getElementById("pagar");

// Array para almacenar los productos en el carrito
let carrito = [];

// ======== FUNCIÓN: AGREGAR PRODUCTO ========
botonesAgregar.forEach(boton => {
  boton.addEventListener("click", () => {
    const nombre = boton.getAttribute("data-nombre");
    const precio = parseInt(boton.getAttribute("data-precio"));

    // Crear objeto producto
    const producto = { nombre, precio };

    // Agregar al carrito
    carrito.push(producto);

    // Actualizar vista
    actualizarCarrito();

    alert(`${nombre} fue agregado al carrito 🛒`);
  });
});

// ======== FUNCIÓN: ACTUALIZAR CARRITO ========
function actualizarCarrito() {
  // Limpiar lista anterior
  listaCarrito.innerHTML = "";

  // Si el carrito está vacío
  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<li>Tu carrito está vacío</li>";
    totalSpan.textContent = "$0";
    return;
  }

  // Generar lista de productos
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.background = "transparent";
    btnEliminar.style.border = "none";
    btnEliminar.style.cursor = "pointer";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
    });

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
  });

  // Calcular total
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  totalSpan.textContent = `$${total.toLocaleString()}`;
}

// ======== FUNCIÓN: ELIMINAR PRODUCTO ========
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// ======== FUNCIÓN: PAGAR ========
botonPagar.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const confirmar = confirm(`El total a pagar es $${total.toLocaleString()}. ¿Deseas continuar con el pago?`);

  if (confirmar) {
    alert("✅ ¡Pago realizado con éxito! Gracias por tu compra en Barbería El Estilo.");
    carrito = []; // Vaciar carrito
    actualizarCarrito();
  } else {
    alert("El pago fue cancelado.");
  }
});

// ======== MENSAJE DE BIENVENIDA ========
window.addEventListener("DOMContentLoaded", () => {
  console.log("💈 Bienvenido a Barbería El Estilo - Tienda en línea");
  actualizarCarrito();
});

