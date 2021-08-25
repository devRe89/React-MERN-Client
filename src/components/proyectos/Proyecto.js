import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {
    
    const proyectosContext = useContext(proyectoContext);
    const tareasContext = useContext(TareaContext);

    // Destructuring
    const {proyectoActual} = proyectosContext;
    const { obtenerTareas } = tareasContext;

    const verProyecto = id => {
        proyectoActual(id);
        obtenerTareas(id);
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => verProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;