import './RegistrarUsuario.css';
import { useContext } from 'react';
import AutenticacionContexto from "../../authentication/AutenticacionContexto";
import validatorPassword from './ValidarPassword';
import { Modal } from '../../IndexComponents';
import { Outlet, Form, redirect } from 'react-router-dom';
import config from '../../../config';

const RegistrarUsuario = () => {

    const auteCtx = useContext(AutenticacionContexto);

    return (
        <>
            <Modal
            title="Registrar Usuario"
            estiloModal="modal_completo">

            {auteCtx.role === 'ROLE_ADMIN' &&

                <div>

                    <Form id="crear_User" className="form_CraerUser" name="crear_User" action={`/configuracion/registrar`} method='post'>

                        <span id="messageInitial" className='badge bg-primary text-wrap'>Registrar nuevo usuario</span>                                                        

                        <label htmlFor="username" className="form-label">Nombre de usuario:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="username" 
                            id="username"                             
                            placeholder={"Ingrese el nombre de usuario"}                             
                            required                           
                        />                         

                        <label htmlFor="role" className="form-label">Rol de usuario:</label>                      

                        <div className='radioContainer'>

                            <input 
                                type="radio" 
                                id="ADMIN" 
                                name="role" 
                                value="ADMIN"
                                required
                            />

                            <label htmlFor="ADMIN">Administrador</label>                        

                        </div> 

                        <div className='radioContainer'>

                            <input 
                                type="radio" 
                                id="USER" 
                                name="role" 
                                value="USER"   
                                required                         
                            />

                            <label htmlFor="USER">Usuario</label>

                        </div>                        

                        <label htmlFor="newPassword" className="form-label">Contraseña nueva:</label>

                        <input 
                            type='password' 
                            className="form-control"
                            name="newPassword" 
                            id="newPassword" 
                            placeholder={"Ingrese su contraseña nueva"}   
                            required                         
                        /> 

                        <label htmlFor="reNewPassword" className="form-label">Confirmar contraseña nueva:</label>

                        <input 
                            type='password' 
                            className="form-control"
                            name="reNewPassword" 
                            id="reNewPassword" 
                            placeholder={"Confirme su contraseña nueva"}  
                            onInput={validatorPassword}    
                            required                      
                        />                            
                        
                        <span id="message"></span><br></br><br></br>

                        <button
                        className='btn btn-primary'
                        id='changePasswordSubmit'
                        type='submit'    
                        disabled                        
                        >Enviar</button>

                    </Form>

                </div>
                
            }

            </Modal>

            <Outlet/>
        </>
    );
}
export default RegistrarUsuario;

export const RegistrarUserAction = async ({request}) => {

    const regUser = await request.formData()

    const dataNewUser = {};

    regUser.forEach((value,key) => {
        dataNewUser[key]=value;        
    });

    const finalDataNewUser = {
        username: dataNewUser['username'],
        role: dataNewUser['role'],        
        password: dataNewUser['reNewPassword']
    }

    const token = localStorage.getItem('token');

    const newUser = await fetch(`${config.accountServiceUrl}auth/register`,{
        method:'POST',
        headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`},
        body: JSON.stringify(finalDataNewUser)
    })

    const result = newUser.ok;
    console.log('Respuesta del servidor:', result);
    
    return redirect('/configuracion');

}

