import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auths/authContext';

const NuevaCuenta = (props) => {

    //Context Alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //Context Auths
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    //En caso de usuario autenticado o registro dupliacado 
    useEffect( () => {

        if (autenticado){
            props.history.push('/proyectos');
        }

        if (mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //eslint.disable-next-line
    }, [mensaje, autenticado, props.history]);

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: '',
    });

    const {nombre, email, password, confirmar} = usuario;

    const camposForm = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmitNuevaCuenta = e => {
        e.preventDefault();

        //Validar campos vacios
        if ( nombre.trim() === '' || 
             email.trim() === '' || 
             password.trim() === '' || 
             confirmar.trim() === '' ) {
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
                return;
        }

        //Contraseña minima de 6 caracteres
        if ( password.length < 6 || confirmar.length < 6 ){
            mostrarAlerta('La contraseña debe tener un minimo de 6 caracteres', 'alerta-error');
            return;
        }

        if ( password.trim() !== confirmar.trim() ){
            mostrarAlerta('Las contraseñas ingresadas no coinciden', 'alerta-error');
            return;
        }

        registrarUsuario({
            nombre,
            email, 
            password
        });
    }
    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={onSubmitNuevaCuenta}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={camposForm}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={camposForm}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={camposForm}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Contraseña</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirma tu contraseña"
                            value={confirmar}
                            onChange={camposForm}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme" 
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;
