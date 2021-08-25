import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auths/authContext';

const Login = (props) => {
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: '',
    });
    const {email, password} = usuario;

    //Context Auth
    const authContext = useContext(AuthContext);
    const {iniciarSesion, mensaje, autenticado} = authContext;

    //Context Alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {

        if (autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        
    },[autenticado, mensaje, props.history])

    const camposForm = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        })
    }

    const onIniciarSesion = e => {
        e.preventDefault();

        //Validar campos
        if ( email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son requeridos', 'alerta-error');
            return;
        }

        if ( password.length < 6 ){
            mostrarAlerta('La contraseña debe tener un minimo de 6 caracteres', 'alerta-error');
            return;
        }

        iniciarSesion({
            email,
            password
        });
    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>

                <form
                    onSubmit={onIniciarSesion}
                >
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
                            placeholder="Tu password"
                            value={password}
                            onChange={camposForm}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar sesión" 
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;
