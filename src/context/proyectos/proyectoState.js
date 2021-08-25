import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    INPUT_PROYECTO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    ERROR_PROYECTO,
    SET_ALLPROYECTOS
} from '../../types';

import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario : false,
        proyectoactual: null,
        mensaje: null
    }

    // Dispatch para ejecutar las acciones redux.
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const setAllState = () => {
        dispatch({
            type: SET_ALLPROYECTOS
        });
    }

    //Obtener proyectos de una base
    const obtenerProyectosBase = async() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
        try {
             const respuesta =  await clienteAxios.get('/api/proyectos', {
                headers: headers,
             });
             dispatch({
                 type: OBTENER_PROYECTOS,
                 payload: respuesta.data.proyectos
             })  
        } catch (error) {   
            const alerta = {
                msg: 'Hubo un error con el server',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta,
            })
        }
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }

        try {
            const respuesta = await clienteAxios.post('/api/proyectos', proyecto, {
                headers: headers,
            });
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data,
            });

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error con el server',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta,
            })
        }
    }

    //Mostrar error en Formulario
    const mostrarError = () => {
        dispatch({
            type: INPUT_PROYECTO
        })
    }
    //Obtener información de proyecto seleccionado para visualizar
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId,
        })
    }

    //Eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
        // console.log(proyectoId);
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`, {
                headers: headers,
            })
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload: proyectoId,
            })
        } catch (error) {

            const alerta = {
                msg: 'Hubo un error con el server',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta,
            })
        }
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyectoactual: state.proyectoactual,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectosBase,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto,
                setAllState
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;