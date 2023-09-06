const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const addProductForm = document.querySelector('.add-product-form');
const addProductBtn = document.getElementById('add-product-btn');

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProductsCart = [];
let allProductsShop = [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;
		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProductsCart.some(product => product.title === infoProduct.title);

		if (exits) {
			const products = allProductsCart.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProductsCart = [...products];
		} else {
			allProductsCart = [...allProductsCart, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProductsCart = allProductsCart.filter(product => product.title !== title);

		showHTML();
	}
});

// Agregar evento al botón para agregar un producto
addProductBtn.addEventListener('click', () => {
	const productNameInput = document.getElementById('product-name');
	const productPriceInput = document.getElementById('product-price');
	
	const productName = productNameInput.value.trim();
	const productPrice = parseFloat(productPriceInput.value);
	
	if (productName !== '' && !isNaN(productPrice)) {
		const newProduct = {
			quantity: 1,
			title: productName,
			price: '$' + productPrice.toFixed(2),
		};
	
		// Agregar el nuevo producto al arreglo de productos
		allProductsShop.push(newProduct);
	
		productNameInput.value = '';
		productPriceInput.value = '';
	
		// Agregar la nueva tarjeta (card) al HTML
		addProductCard(newProduct);
		localStorage.setItem("productos", JSON.stringify(allProductsShop))
		showHTML();
	}
});

if (localStorage.getItem('productos')){

	const productos = JSON.parse(localStorage.getItem('productos'));

	productos.forEach(producto => {
		addProductCard(producto);
	});

}

//  CHEQUEO ADMIN
document.addEventListener("DOMContentLoaded", function () {

	let CheckAdmin = localStorage.getItem("admin");

	let divElement = document.getElementById("add-product-form")

	if (CheckAdmin === "true"){
		divElement.style.display = "block";

	}
});

// si localStorage TIENE "productos", entonces llamas a la función addProductCard para cada producto


// Funcion para agregar una nueva tarjeta de producto
function addProductCard (product){
	const containerProduct = document.createElement('div');

    containerProduct.innerHTML = `
		<div class="item">
				<figure>
					<img
						src="https://images.unsplash.com/photo-1557431177-36141475c676?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
						alt="${product.title}"
					/>
				</figure>
				<div class="info-product">
					<h2>${product.title}</h2>
					<p class="price">${product.price}</p>
					<button class="btn-add-cart">Añadir al carrito</button>
				</div>
			</div>
    `;

    productsList.appendChild(containerProduct);
}


// Funcion para mostrar HTML
const showHTML = () => {
	if (!allProductsCart.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProductsCart.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
			<div class="info-cart-product">
				<span class="cantidad-producto-carrito">${product.quantity}</span>
				<p class="titulo-producto-carrito">${product.title}</p>
				<span class="precio-producto-carrito">${product.price}</span>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="icon-close"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		`;

		rowProduct.append(containerProduct);

		total += parseInt(product.quantity * product.price.slice(1));
		totalOfProducts += product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};

const deleteListBtn = document.getElementById('delete-list-btn');
const purchaseBtn = document.getElementById('purchase-btn');

deleteListBtn.addEventListener('click', () => {
  allProductsCart = []; // Vaciar el arreglo de productos
  showHTML(); // Actualizar la visualización del carrito
});

purchaseBtn.addEventListener('click', () => {
	const total = valorTotal.innerText;
	alert(`Total de compra: ${total}`);
	
	allProductsCart = []; // Vaciar el arreglo de productos
	showHTML(); // Actualizar la visualización del carrito
  });

