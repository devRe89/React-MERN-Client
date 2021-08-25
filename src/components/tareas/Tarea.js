import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';



const Tarea = ({tarea}) => {
    // console.log(tarea);
    //Context Proyectos
    const proyectosContext = useContext(proyectoContext);
    //Destructuring Context Proyectos
    const {proyectoactual} = proyectosContext;   
    // Context Tareas 
    const tareaContext = useContext(TareaContext);
    //Destructuring Context Tareas
    const {obtenerTareas, eliminarTarea, actualizarTarea, guardarTareaActual} = tareaContext;
    //Eliminar Tarea
    const onClickEliminar = tarea => {
        tarea.proyecto = proyectoactual[0]._id;
        eliminarTarea(tarea);
        obtenerTareas(proyectoactual[0]._id);
    }
    //Cambiar Estado
    const cambiarEstado = tarea => {
        if (tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea); 
    }
    // Obtener tarea actual
    const onClickTareaActual = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ?
                        (
                            <button 
                                className="completo"
                                type="button"
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    :
                        (
                            <button 
                                className="incompleto"
                                type="button"
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => onClickTareaActual(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClickEliminar(tarea)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;