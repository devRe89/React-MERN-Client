import React, {useReducer} from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    INPUT_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
    SET_ALLTAREAS,
} from '../../types';
import clienteAxios from '../../config/axios';

const TareaState = props => {

    //Inicializando valores de State
    const initialState = {
        tareas: [],
        tareasproyecto: null,
        errortarea: false,
        tareaactual: null,
    }
    
    // Dispatch y state para ejecutar las acciones redux.
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const setAllTareas = () => {
        dispatch({
            type: SET_ALLTAREAS
        });
    }
    //Obtener Listado de tareas
    const obtenerTareas = async proyectoId => {

        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }

        try {
            const respuesta = await clienteAxios.get(`/api/tareas/${proyectoId}`, {
                headers: headers,
            });
            dispatch({
                type: OBTENER_TAREAS,
                payload: respuesta.data.tareas,
            })
        } catch (error) {
            console.log(error);
        }

    }
    //Agregar una tarea nueva
    const agregarTarea = async tarea => {
        
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
        
        try {
            const respuesta = await clienteAxios.post('/api/tareas', tarea,{
                headers: headers,
            });
            dispatch({
                type:AGREGAR_TAREA,
                payload: respuesta.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    }
    //Validar Formulario nueva tarea.
    const mostrarError = () => {
        dispatch({
            type:INPUT_TAREA,
        });
    }
    //Elimina una tarea de un proyecto.
    const eliminarTarea = async tarea => {
        const proyecto = tarea.proyecto;
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                }
                await clienteAxios.delete(`/api/tareas/${tarea._id}`,{
                    headers: headers,
                    params: {proyecto}
                });

                dispatch({
                    type: ELIMINAR_TAREA,
                    payload: tarea._id,
                });
    
            } catch (error) {
                console.log(error.response);
            }
    
    }
    //Obtener tarea actualiz
    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        });
    }
    //Actualizar una tarea
    const actualizarTarea = async tarea => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea, {
                headers: headers
            });
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    //Limpiar tarea actual
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA,
        })
    }
    return(
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaactual: state.tareaactual,
                obtenerTareas,
                agregarTarea,
                mostrarError,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea,
                setAllTareas
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );
}

export default TareaState;
