import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertaContext from '../../context/alertas/alertaContext';


const Listado = () => {

    const proyectosContext = useContext(proyectoContext);
    // Extraer proyectos del State de Proyectos
    const { proyectos, mensaje, obtenerProyectosBase } = proyectosContext;

    //Context Alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    
    useEffect(() => {

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectosBase();
        //eslint.disable-next-line
    }, [mensaje]);

    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;
    
    return ( 
        <ul className="listado-proyectos">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default Listado;