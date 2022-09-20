const Productos = require('../services/Productos');
const Producto = new Productos();
const logger = require('../operations/logger')

class ProductosClass {
	async AllProductos(req, res, next) {
		logger.info('Solicita todos los productos')
		Producto.getAll().then(result => {
			if (result !== undefined) {
				res.status(200).json({
					message: `Productos`,
					result: result
				});
			} else {
				logger.error('No existen productos')
				res.status(404).json({
					error: `No existen productos`,
				});
			}
		});   
	};
	
	async UnProducto(req, res, next) {
		logger.info('Solicita un producto')
		let id = req.params.id;
		Producto.getById(id).then(result => {
			if (result !== undefined) {
				if (result === null) {
					logger.error(`No existe el producto ${id}`)
					res.status(404).json({
						error: `Producto no encontrado para el id ${id}`,
					});
				} else {
					res.status(200).json({
						message: `Producto ID: ${id}`,
						result: result
					});
				}
			} else {
				logger.error(`No se pudo realizar la lectura del producto ${id}`)
				res.status(404).json({
					error: `El archivo no se puede leer`,
				});
			}
		});
	};
	
	async SaveProducto(req, res, next) {
		logger.info('Crea un producto')
		let { title, price, thumbnail } = req.body;
		if (title != '' && price > 0 && thumbnail != '') {
			let nuevoProducto = {
				title,
				price,
				thumbnail
			}
			Producto.save(nuevoProducto).then(result => {
				// console.log(result)
				if (result !== undefined) {
					res.status(200).json({
						message: `Nuevo producto`,
						result: result
					});
				} else {
					logger.error(`No se pudo crear el producto`)
					res.status(404).json({
						error: `No se pudo guardar el producto`,
					});
				}
			});
		} else {
			logger.error(`Datos incompletos al guardar`)
			res.status(404).json({
				error: `Datos incompletos`,
			});
		}
		
	};
	
	async updateProducto(req, res, next) {
		logger.info('Edita un producto')
		let id = req.params.id;
		let { title, price, thumbnail } = req.body;
		if (title != '' && price > 0 && thumbnail != '' && id > 0) {
			let editarProducto = {
				title,
				price,
				thumbnail
			}
			Producto.updateById(id, editarProducto).then(result => {
				console.log(result)
				if (result !== undefined) {
					res.status(200).json({
						message: `Editar producto ${id}`,
						result: result
					});
				} else {
					logger.error(`No se pudo editar el producto ${id}`)
					res.status(404).json({
						error: `No se pudo modificar el producto`,
					});
				}
			});
		} else {
			logger.error(`Datos incompletos al editar`)
			res.status(404).json({
				error: `Datos incompletos`,
			});
		}
		
	};
	
	async DeleteProducto(req, res, next) {
		logger.info('Elimina un producto')
		let id = req.params.id;
		Producto.deleteById(id).then(result => {
			console.log(result)
			if (result !== undefined) {
				res.status(200).json({
					message: `Eliminar producto ${id}`,
					result: result
				});
			} else {
				logger.error(`No se pudo eliminar el producto ${id}`)
				res.status(404).json({
					error: `No se pudo eliminar el producto`,
				});
			}
		});
	};
}

module.exports = ProductosClass;