import './Login.css';
import { LogoCompletoIcono } from "../Iconos";

function Login () {
    
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

                <form id="login">

                    <label for="username" class="form-label">Nombre de usuario:</label>

                    <input 
                        type='text' 
                        class="form-control"
                        id="username" 
                        placeholder='Ingrese su nombre de usuario'
                    />

                    <label for="password" class="form-label">Contraseña:</label>

                    <input 
                        type="password" 
                        class="form-control"
                        id="password" 
                        placeholder='Ingrese su contraseña'
                    />

                    <br/>
                    <br/>

                    <input 
                        type="submit" 
                        class="btn btn-primary" 
                        id="btn-form" 
                        value="Ingresar"
                    />

                </form>

            </div>               
        </div>
    );
}
export default Login;