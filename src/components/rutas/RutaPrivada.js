import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/auths/authContext';
import {Route, Redirect} from 'react-router-dom';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const RutaPrivada = ({ component: Component, ...props }) => {
    const authContext = useContext(AuthContext);
    const {autenticado, cargando, usuarioAutenticado} = authContext;

    const proyectoContext = useContext(ProyectoContext);
    const {setAllState} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {setAllTareas} = tareaContext;

    useEffect(() => {
        usuarioAutenticado();

        if (!autenticado) {
            setAllState();
            setAllTareas();
        }
        //eslint.disable-next-line
    },[autenticado]);
    

    return ( 
        <Route 
            {...props}
            render={ props => !autenticado && !cargando ?
            (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            ) }
        />
     );
}
 
export default RutaPrivada;



