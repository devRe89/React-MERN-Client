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

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario : true,
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload,
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario : false,
                errorformulario: false,
            } 
        case INPUT_PROYECTO:
            return {
                ...state,
                errorformulario: true,
            }       
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyectoactual: state.proyectos.filter(proyecto => proyecto._id === action.payload),
            } 
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyectoactual: null,
            } 
        case SET_ALLPROYECTOS: 
            return {
                ...state,
                proyectos : [],
                formulario: false,
                errorformulario : false,
                proyectoactual: null,
                mensaje: null,
            }
        case ERROR_PROYECTO: 
            return {
                ...state,
                mensaje: action.payload,
            }             
        default:
            return state;
    }
}