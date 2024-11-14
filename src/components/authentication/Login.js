import './Login.css';
import { LogoCompletoIcono } from "../Iconos/IndexIcons";
import { useNavigate } from "react-router-dom";
import { useContext, useRef } from 'react';
import AutenticacionContexto from './AutenticacionContexto';
import { DecodificadorJWT } from './DecodificadorJWT';
import config from '../../config';

function Login () {

    const auteCtx = useContext(AutenticacionContexto);    
    const navigate = useNavigate(); 
    const usuarioReferenciado = useRef();
    const constraseñaReferenciado = useRef();

    const manejoEnvio = (event) => {        
        event.preventDefault();

        const usuario = usuarioReferenciado.current.value;
        const contraseña = constraseñaReferenciado.current.value;

        fetch(`${config.accountServiceUrl}auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: usuario,
                password: contraseña
            })
            })    
            .then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                    return res.json().then((data) => {
                        let errorMessage = 'Autenticación Fallida!';
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                const infoToken = DecodificadorJWT(data.token);
                auteCtx.login(data.token,infoToken.userRole,infoToken.sessionEnd.toISOString());                
                navigate(`/`);
            })                
            .catch((err) => {
                alert(err.message);
            });
    }    

    return (
        <div className="login">

            <div className='logo'>
                <LogoCompletoIcono />
            </div>

            <div className='left_Login'>           
                <div>
                    <p className='title_Login'>Sistema de Gestión de Herramienta Ingeniar Inoxidables SGHII</p>
                    <br/>
                    <p className='comment_Login'>Bienvenido, por favor ingrese sus datos de usuario.</p>
                </div>   

                <form id="login" action='/login' method='post' onSubmit={manejoEnvio}>

                    <label htmlFor="username" className="form-label">Nombre de usuario:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        id="username" 
                        ref={usuarioReferenciado}
                        placeholder='Ingrese su nombre de usuario'
                    />

                    <label htmlFor="password" className="form-label">Contraseña:</label>

                    <input 
                        type="password" 
                        className="form-control"
                        id="password" 
                        ref={constraseñaReferenciado}
                        placeholder='Ingrese su contraseña'
                    />

                    <br/>
                    <br/>

                    <input 
                        type="submit" 
                        className="btn btn-primary" 
                        id="btn-form" 
                        value="Ingresar"
                    />

                </form>

            </div>               
        </div>
    );
}
export default Login;


