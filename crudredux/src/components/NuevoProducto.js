import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoActions';

const NuevoProductos = ({history}) => {

    //State del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    //Utilizar use dispatch y devuelve una funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector((state) => state.productos.loading);
    const error = useSelector(state => state.productos.error);

    //Manda llamar el action de productoAction
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))
    //Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //Validar formulario
        if(nombre.trim() === '' || precio <= 0){
            return;
        }
        //Si no hay errores

        //Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        //Redireccionar
        history.push('/')
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        {cargando ? <p>CaRGANDO...</p> : null}
                        {error ? <p className="alert alert-danger p2">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProductos;