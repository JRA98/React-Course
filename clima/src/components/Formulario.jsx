import React, {useState} from 'react'
import Error from './components/Error'

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    // crear state del formulario
    

    const [error, guardarError] = useState(false);

    // extraer ciudad y pais
    const {ciudad, pais} = busqueda

    // funcion que coloca los elementos en el state

    const handleChange = (e) => {
        // actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            return null;
        }
        guardarError(false);

        // pasarlo al componente principal

        guardarConsultar(true)
    }
    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Todos los campos son obligatorio"/> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>

                </select>
                <label htmlFor="pais">País: </label>
                
            </div>
            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    );
}
 
export default Formulario;