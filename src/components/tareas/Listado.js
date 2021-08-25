import React, {Fragment, useContext, useEffect} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const Listado = () => {
    
    //Context Proyectos
    const proyectosContext = useContext(proyectoContext);
    // Destructuring State context
    const { proyectoactual, eliminarProyecto } = proyectosContext;
    // //Context Tareas
    const tareaContext = useContext(TareaContext);
    // // Destructuring State context
    const {tareasproyecto} = tareaContext;
    // Si no hay un proyecto seleccionado
    if ( !proyectoactual ) return <h2>Selecciona un Proyecto</h2>;
    //Obteniendo la primera posicion del arreglo
    const [proyectoActual] = proyectoactual;

    //Eliminar un proyecto
    const onClickEliminar = () => {
        // console.log(proyectoActual._id);
        eliminarProyecto(proyectoActual._id);
    }

    if (tareasproyecto === null) return null;

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :  
                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                            <Tarea 
                                tarea={tarea}
                            />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }    
            </ul>
            <button 
                type="button"
                onClick={onClickEliminar}
                className="btn btn-eliminar"
            >Eliminar Proyecto &times;</button>

        </Fragment>
     );
}
 
export default Listado;