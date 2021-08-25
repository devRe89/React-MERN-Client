import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // State del context
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: '',
    });

    const {nombre} = proyecto;

    // Mostrar formulario para crear un nuevo proyecto
    const onClickNuevoProyecto = () => {
        mostrarFormulario();
    }

    //Guardar valores de Inputs
    const campoForm = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        })
    }

    //Submit Form
    const nuevoProyecto = e => {
        e.preventDefault();

        if(nombre.trim() === ''){
            mostrarError();
            return;
        }

        agregarProyecto(proyecto);

        guardarProyecto({
            nombre: ''
        });

    }


    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-primario btn-block"
                onClick={onClickNuevoProyecto}
            >Nuevo Proyecto</button>

            {formulario 
                ?   (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={nuevoProyecto}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                name="nombre"
                                placeholder="Nombre Proyecto"
                                onChange={campoForm}
                                value={nombre}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />
                        </form>
                    )

                :   null            
            }
            {errorformulario 
                ? <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                : null
            }
        </Fragment>
     );
}
 
export default NuevoProyecto;