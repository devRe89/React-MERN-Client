import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const FormularioTareas = () => {
    
    const proyectosContext = useContext(proyectoContext);
    const {proyectoactual} = proyectosContext;
    
    const tareaContext = useContext(TareaContext);
    const { 
        errortarea, 
        tareaactual, 
        agregarTarea, 
        mostrarError, 
        obtenerTareas, 
        actualizarTarea,
        limpiarTarea,
    } = tareaContext;

    useEffect(() => {
        if ( tareaactual !== null )
        {
            guardarTarea(tareaactual);
        }else{
            guardarTarea({
                nombre: '',
            });
        }
    },[tareaactual]);
    
    //State Local para input de agregar tareas
    const [tarea, guardarTarea] = useState({
        nombre: '', 
    });
    const {nombre} = tarea;

    if (!proyectoactual) return null;

    //Obteniendo la primera posicion del arreglo
    const [proyectoActual] = proyectoactual;

    //Obtener datos de input
    const campoForm = (e) => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value,
        });
    }

    //Submit form nueva/editar tarea
    const nuevaTarea = e => {
        e.preventDefault();
        if(nombre.trim() === ''){
            mostrarError();
            return;
        }
        // si es edición de la tarea
        if (tareaactual === null){
            tarea.proyecto = proyectoActual._id;
            tarea.estado = false;
            agregarTarea(tarea);
        }else {
            actualizarTarea(tarea);
            limpiarTarea();
        }
        obtenerTareas(proyectoActual._id);
        guardarTarea({
            nombre: '',
        });
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={nuevaTarea}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        name="nombre"
                        onChange={campoForm}
                        value={nombre}
                        placeholder="Nombre Tarea..." 
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        value={tareaactual ? 'Editar tarea' : 'Agregar tarea' }
                        className="btn btn-primario btn-block btn-submit" 
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}
        </div>
     );
}
 
export default FormularioTareas;