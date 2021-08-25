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

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {

        case OBTENER_TAREAS:
            return{
                ...state,
                tareasproyecto: action.payload,
            }
        case AGREGAR_TAREA: 
            return{
                ...state,
                tareas: action.payload,
                errortarea: false,
            }
        case INPUT_TAREA:
            return{
                ...state,
                errortarea: true,
            }  
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload),
            }   
        case TAREA_ACTUAL:
            return{
                ...state,
                tareaactual: action.payload,
            }
        case ACTUALIZAR_TAREA: 
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                tareaactual: null,
            } 
        case SET_ALLTAREAS: 
            return{
                tareas: [],
                tareasproyecto: null,
                errortarea: false,
                tareaactual: null,
            }    
        case LIMPIAR_TAREA: 
            return{
                ...state,
                tareaactual: null,
            }          
        default:
            return{
                state,
            }
    }
}