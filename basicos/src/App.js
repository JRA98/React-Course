import React, { Fragment, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import Producto from "./components/Producto";
import Carrito from "./components/Carrito";

function App() {

	//Crear listado de productos
	const [ productos, guardarProductos ] = useState([
		{ id: 1, nombre: 'Camisa ReactJS', precio: 50 },
		{ id: 2, nombre: 'Camisa VueJS', precio: 30 },
		{ id: 3, nombre: 'Camisa Node.js', precio: 20 },
		{ id: 4, nombre: 'Camisa AngularJS', precio: 10 },

	]);

	// State para carrito de compras
	const [ carrito, agregarProducto] = useState([]);

	//Obtener la fecha
	const fecha = new Date().getFullYear();

	return (
		<Fragment>
			<Header 
			titulo='Tienda virtual'
			/>


			<h1>Lista de productos</h1>
			{productos.map(producto => (
				<Producto
					key = {producto.id}
					producto={producto}
					productos={productos}
					carrito={carrito}
					agregarProducto={agregarProducto}
				/>
			))}

			<Carrito
				carrito={carrito}
				agregarProducto={agregarProducto}
			/>
			<Footer 
				fecha={fecha}
			/>
		</Fragment>
	);
}

export default App;
