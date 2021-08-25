import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
} from '../../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type){
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                mensaje: action.payload,
                cargando: false,
            }
        case LOGIN_EXITOSO:    
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                token: localStorage.getItem('token'),
                autenticado: true,
                mensaje: false,
                cargando: false,
            } 
        case OBTENER_USUARIO: 
            return{
                ...state,
                token: localStorage.getItem('token'),
                autenticado: true,
                usuario: action.payload,
                cargando: false,
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                token:null,
                mensaje: false,
                autenticado: false,
                usuario: null,
                cargando: false,
            }        
        default:
            return{
                state
            }
    }
}