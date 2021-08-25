import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/auths/authContext';



const Barra = () => {

    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint.disable-next-line
    },[]);

    const onCerrarSesion = () => {
        cerrarSesion();
    }

    return ( 
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={onCerrarSesion}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;