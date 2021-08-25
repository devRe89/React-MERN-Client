import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormularioTareas from '../tareas/FormularioTareas';
import Listado from '../tareas/Listado';
import AuthContext from '../../context/auths/authContext';


const Proyectos = () => {
    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint.disable-next-line
    },[]);

    return ( 
        <div className="contenedor-app">
            <Sidebar 
            
            />
            <div className="seccion-principal">
                <Barra
                    
                />
                <main>
                    <FormularioTareas />
                    <div className="contenedor-tareas">
                        <Listado />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;
