import './Configuracion.css';
import { useContext } from "react";
import AutenticacionContexto from "../../authentication/AutenticacionContexto";
import { Modal } from '../../IndexComponents';
import { useLoaderData, Outlet, Form, Link } from 'react-router-dom';
import validatorPassword from './ValidarPassword';
import config from '../../../config';

const Configuracion = () => {

    const auteCtx = useContext(AutenticacionContexto);    
    const data_Usuarios = useLoaderData();    

    const user_Estado = (estado) => {
        if(estado){
            return 'Activo'
        }else{
            return 'Inactivo'
        }
    };

    const user_Role = (role) => {
        if(role === 'ROLE_ADMIN'){
            return 'Administrador'
        }else if (role === 'ROLE_USER'){
            return 'Usuario'
        }
    }
    
    return (
        <>
            <Modal
            title="Configuración"
            estiloModal="modal_completo"            
            >
                {auteCtx.role === 'ROLE_USER' &&

                    <div>
                        <Form id="changePass" className="form_changePass" name="changePass" action="/configuracion/changePass" method='put'>

                            <span id="messageInitial" className='badge bg-primary text-wrap'>Cambiar Contraseña Usuario</span>                                                        

                            <label htmlFor="oldPassword" className="form-label">Contraseña anterior:</label>

                            <input 
                                type='password' 
                                className="form-control"
                                name="oldPassword" 
                                id="oldPassword" 
                                placeholder={"Ingrese su contraseña anterior"} 
                                required                           
                            /> 

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
                            >
                                Enviar</button>

                        </Form>

                    </div>
                        
                }

                { auteCtx.role === 'ROLE_ADMIN' &&

                    <>

                        <Link to={`/configuracion/registrar`}>
                            <button type='button' className='btn botonReg btn-primary'>Nuevo usuario</button>
                        </Link>
                        
                        <div className='contenedor_Users'>
                            
                            {data_Usuarios.map((item,index) => (

                                <div className="card card_User" key={index}>

                                    <div className="card-body">
                                        <h5 className="card-title">Nombre de usuario: [ <span className='text-secondary'>{item.username}</span> ]</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Rol de usuario: [ <span className='text-secondary'>{user_Role(item.authority)}</span> ]</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">Estado de usuario: [ <span className='text-secondary'>{user_Estado(item.enabled)}</span> ]</h6>
                                        
                                        <a href={`/configuracion/${item.username}/update`} className="card-link">Modificar</a>
                                        <a href={`/configuracion/${item.username}/delete`} className="card-link">Eliminar</a>
                                    </div>

                                </div>                        

                            ))}   

                        </div> 

                    </>
                    
                }

            </Modal>

            <Outlet />

        </>
    );
}
export default Configuracion;

export const configuracionLoader = async () => {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if(role === 'ROLE_ADMIN'){

        const dataUsers = await fetch(`${config.accountServiceUrl}auth/users`,{
            method:'GET',
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`}
        });       
    
        if (!dataUsers.ok) {
            throw Error('No se pudo cargar la data indicada')
        }
    
        return await dataUsers.json();
    } else{
        return null;
    }  
}

export const ConfiguracionAction = async ({request}) => {

    const changePass = await request.formData()

    const dataPass = {};

    changePass.forEach((value,key) => {
        dataPass[key]=value;        
    });

    const finalData = {
        oldPassword: dataPass['oldPassword'],
        newPassword: dataPass['reNewPassword']
    }

    const token = localStorage.getItem('token');

    const chgPass = await fetch(`${config.accountServiceUrl}auth/changePWD`,{
        method:'PUT',
        headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`},
        body: JSON.stringify(finalData)
    })

    const result = chgPass.ok;
    console.log('Respuesta del servidor:', result);
    
    return result;

}