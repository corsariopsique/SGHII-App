import './ModificarUsuario.css';
import { useContext } from 'react';
import AutenticacionContexto from "../../authentication/AutenticacionContexto";
import { Modal } from '../../IndexComponents';
import { Outlet, Form, useParams, redirect } from 'react-router-dom';
import validatorPassword from './ValidarPassword';
import config from '../../../config';

const ModificarUsuario = () => {

    const auteCtx = useContext(AutenticacionContexto);
    const paramUsername = useParams().username;    

    return (
        <>
            <Modal
            title="Modificar Usuario"
            estiloModal="modal_completo">

            {auteCtx.role === 'ROLE_ADMIN' &&

                <div>

                    <Form id="edit_User" className="form_EditarUser" name="edit_User" action={`/configuracion/${paramUsername}/update`} method='put'>

                        <span id="messageInitial" className='badge bg-primary text-wrap'>Modificar datos de usuario</span>                                                        

                        <label htmlFor="username" className="form-label">Nombre de usuario:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="username" 
                            id="username" 
                            defaultValue={paramUsername}
                            placeholder={paramUsername} 
                            readOnly
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

                        <label htmlFor="estado_Usuario" className="form-label">Estado cuenta:</label>                      

                        <div className='radioContainer'>

                            <input 
                                type="radio" 
                                id="actvo" 
                                name="estado_Usuario" 
                                value="false"
                                required
                            />

                            <label htmlFor="activo">Activo</label>                        

                        </div> 

                        <div className='radioContainer'>

                            <input 
                                type="radio" 
                                id="inactvo" 
                                name="estado_Usuario" 
                                value="true"    
                                required                        
                            />

                            <label htmlFor="inactivo">Inactivo</label>                  

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
export default ModificarUsuario;

export const ModificarUserAction = async ({request}) => {

    const updateUser = await request.formData()

    const dataUser = {};

    updateUser.forEach((value,key) => {
        dataUser[key]=value;        
    });

    const finalDataUser = {
        username: dataUser['username'],
        role: dataUser['role'],
        estado: dataUser['estado_Usuario'],
        newPassword: dataUser['reNewPassword']
    }

    const token = localStorage.getItem('token');

    const updtUser = await fetch(`${config.accountServiceUrl}auth/update`,{
        method:'PUT',
        headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`},
        body: JSON.stringify(finalDataUser)
    })

    const result = updtUser.ok;
    console.log('Respuesta del servidor:', result);
    
    return redirect('/configuracion');

}
