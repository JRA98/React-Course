import React, {useReducer} from 'react';
import aletaReducer from './alertaReducer';
import alertaContext from './alertaContext';


import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types';
import alertaReducer from './alertaReducer';

const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    const [state, disptach] = useReducer(alertaReducer, initialState);

    //Funciones
    const mostrarAlerta = (msg, categoria) => {
        disptach({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        //Despues de 5 segundos limpiar la alerta
        setTimeout(() => {
            disptach({
                type: OCULTAR_ALERTA
            }, 5000);
        })
    }
    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}    
        >
                {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;
